const add_list_btn = document.querySelector('.add_list_btn');
const list_btn_pop = document.querySelector('.list_btn_pop');

add_list_btn.addEventListener('click',handleClick);
function handleClick(){
    console.log("list button clicked");
    add_list_btn.style.display = "none";
    list_btn_pop.style.display = "block";
}

const create_list_btn = document.querySelector('.create_list_btn');
create_list_btn.addEventListener('click',handleCreateNewList);

function handleCreateNewList(){
    console.log("list create button clicked");
    const list_name=document.querySelector('#list_name');
    let listName = list_name.value;
    console.log(listName);
    if(listName!=''){
        createNewList(listName,"");
        createListInOrignalTrello(listName)
    }
    setTimeout(()=>{
        location.reload();   
    },2000)
    listName="";
    list_btn_pop.style.display = "none";
    add_list_btn.style.display = "block";
}
// ---------------------------------------creating new list function-----------------------------------------------//
function createNewList(listName,listId){
    // console.log(listId);
    const container = document.createElement('div');
    container.classList.add('list_C','border-2', 'w-72', 'h-max', 'min-w-72', 'rounded-2xl', 'bg-gray-100', 'p-2', 'flex', 'flex-col', 'justify-between');


    const todoDiv = document.createElement('div');
    todoDiv.classList.add('flex', 'justify-between', 'items-center');
    container.appendChild(todoDiv);


    const todoText = document.createElement('p');
    todoText.classList.add('font-semibold', 'text-gray-600', 'my-2');
    todoText.textContent =listName;
    todoDiv.appendChild(todoText);


    const dropdownDetails = document.createElement('details');
    dropdownDetails.classList.add('dropdown', 'outline-none');


    const dropdownSummary = document.createElement('summary');
    dropdownSummary.classList.add('btn', 'bg-gray-100');
    dropdownSummary.innerHTML = '<i class="fa-solid fa-ellipsis-vertical" style="color: #0c0d0d;"></i>';
    dropdownDetails.appendChild(dropdownSummary);


    const dropdownContent = document.createElement('ul');
    dropdownContent.classList.add('p-2', 'shadow', 'menu', 'dropdown-content', 'z-[1]', 'bg-base-100', 'rounded-box', 'w-52');
    const dropdownItem = document.createElement('li');

    const dropdownItemContent= document.createElement('button');
    dropdownItemContent.classList.add('delete_list');
    dropdownItemContent.innerText='Archive this list';

    dropdownItem.appendChild(dropdownItemContent);
    dropdownContent.appendChild(dropdownItem);


    dropdownDetails.appendChild(dropdownContent);
    todoDiv.appendChild(dropdownDetails);

    const cardListDiv = document.createElement('div');
    cardListDiv.classList.add('cardListDiv', 'flex', 'flex-col', 'gap-2', 'mb-3');

    container.appendChild(cardListDiv);

    const addButton = document.createElement('button');
    addButton.classList.add('addACardBtn','rounded-lg', 'p-1', 'hover:bg-gray-300', 'text-sm', 'text-gray-500', 'text-start');
    addButton.textContent = '+ Add a card';
    container.appendChild(addButton);


    const addCardDiv = document.createElement('div');
    addCardDiv.classList.add('addCardHiddenBlock','hidden');


    const inputField = document.createElement('input');
    inputField.classList.add('flex', 'border-2',  'rounded-2xl', 'mb-2','pb-4','p-1','outline-blue-400');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('id', 'card_Name');
    inputField.setAttribute('placeholder', 'Enter a title for this card...');
    addCardDiv.appendChild(inputField);


    const inputDiv = document.createElement('div');
    inputDiv.classList.add('flex', 'gap-2');

    const addCardButton = document.createElement('button');
    addCardButton.classList.add('addCard','w-24', 'rounded-md', 'bg-blue-500', 'hover:bg-blue-600', 'text-white','p-2');
    addCardButton.textContent = 'Add card';
    inputDiv.appendChild(addCardButton);


    const deleteButton = document.createElement('button');
    deleteButton.classList.add('cancelCardAddBtn','hover:bg-gray-200', 'w-10', 'rounded-md');
    deleteButton.textContent = 'X';
    inputDiv.appendChild(deleteButton);


    addCardDiv.appendChild(inputDiv);
    container.appendChild(addCardDiv);


    const listContainer = document.querySelector('.list_container');   ///main container
    const createListContainer = document.querySelector('.create_list_new_container');   //add another list container
    
    container.dataset.listId=listId;
    listContainer.insertBefore(container, createListContainer);
    // console.log(container);
    
}

//--------------cancel the list creation -----------------//

const cancel_list_create_btn=document.querySelector('.cancel_list_create_btn');
cancel_list_create_btn.addEventListener('click',handleCancel);

function handleCancel(){
    list_btn_pop.style.display = "none";
    add_list_btn.style.display = "block";
}

//------------------------for loading the lists from the original trello---------------------//
document.addEventListener('DOMContentLoaded', function() {
    fetchListsForBoard();
});

const urlParams = new URLSearchParams(window.location.search);
const boardId = urlParams.get('boardId');
// console.log(boardId);
const apiKey = '21d7e5b0f2c469b792b250d4484b7778';
const token ='ATTA5073ddff703c2459757f23c606bdd646a09b1a2265669321d1cf5ab44c4e61a644AFE18E';

function fetchListsForBoard() {
    const apiKey = '21d7e5b0f2c469b792b250d4484b7778';
    const token ='ATTA5073ddff703c2459757f23c606bdd646a09b1a2265669321d1cf5ab44c4e61a644AFE18E';
    
    const url = `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        getBoard(boardId)
        .then((board)=>{
            // console.log(board);
            // console.log(board.prefs.backgroundImage);
            const backgroundImg=board.prefs.backgroundImage;
            const backgroundCol=board.prefs.backgroundColor;
            // console.log(backgroundCol);
            const list_container = document.querySelector('.list_container');
            if(backgroundImg){
                list_container.style.backgroundImage = `url(${backgroundImg})`;
                list_container.style.backgroundSize = "cover";
            }
            list_container.style.backgroundColor=`${backgroundCol}`;
            const boardName = board.name;
            // console.log(boardName);
            const nameDiv = document.querySelector('.board_N');
            // console.log(nameDiv);
            nameDiv.innerHTML = boardName;
        })
    
       
        displayLists(data);
    })
    .catch(error => console.error('Error fetching lists:', error));
}

//------------------function for displaying the all the lists of that board in the clone------------------//
function displayLists(lists) {
    // console.log(lists);
    lists.forEach(list=>{
        // console.log(list.name);
        const listId=list.id;
        // console.log(listId);
        createNewList(list.name,listId);
    })
}
  

//-------------------------after creating the list in the clone adding it to the main trello -----------------//
function createListInOrignalTrello(name_list){
    const urlForCreatingNewList=`https://api.trello.com/1/lists?name=${name_list}&idBoard=${boardId}&key=${apiKey}&token=${token}`;
    fetch(urlForCreatingNewList, {
      method: 'POST'
    })
      .then(response => {
        return response.text();
      })
      .then(text => console.log(text))
      .catch(err => console.error(err));
}

//----------------------geting board by id ---------------------------//

function getBoard(id) {
    const url = `https://api.trello.com/1/boards/${id}?key=${apiKey}&token=${token}`;
    const fetchValue= fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      }
    })
    .then((fetchResponse) => {
      return fetchResponse.json();
    })
    .catch((error) => {
      console.error(error);
    });
    return fetchValue;
  }


//-------------Archive the list------------------------------------//


document.addEventListener('DOMContentLoaded', function() {
    // Other code...
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete_list')) {
            // console.log('clicked')
            const listElement = event.target.closest('.list_C');
            // console.log(listElement);
            const listId = listElement.dataset.listId;
            // console.log(listId);
            archiveList(listId);
        }
    });
});

//-----------Archiving the list for the trello--------------//
function archiveList(listId) {
    const url = `https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${token}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: true })
    })
    .then(response => {
        if (response.ok) {
            console.log('List archived successfully');

            //---------Archiving the list from the clone------------------//
            const listElement = document.querySelector(`[data-list-id="${listId}"]`);
            if (listElement) {
                listElement.remove();
                console.log('List element removed from UI');
            } else {
                console.warn('List element not found in UI');
            }
        } else {
            console.error('Failed to archive list');
        }
    })
    .catch(error => {
        console.error('Error archiving list:', error);
    });
}


//---------Add a Card Button action--------------------//
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('addACardBtn')) {
            console.log("clicked");
            const addACardBtn = event.target;
            const listContainer = addACardBtn.closest('.list_C');
            const addCardHiddenBlock = listContainer.querySelector('.addCardHiddenBlock');
            
            addCardHiddenBlock.style.display = "block";
            addACardBtn.style.display = "none";
        }
    });
});

//-----------------cancel card button action-----------------//
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('cancelCardAddBtn')) {
            console.log("clicked");
            const cancelCardAddBtn = event.target;
            const listContainer = cancelCardAddBtn.closest('.list_C');
            const addACardBtn = listContainer.querySelector('.addACardBtn');
            const addCardHiddenBlock = listContainer.querySelector('.addCardHiddenBlock');
            
            addACardBtn.style.display = "block";
            addCardHiddenBlock.style.display = "none";
        }
    });
});

//----------------card btn--------------------------//


document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('addCard')) {
            const addCard = event.target;
            const cardContainer = addCard.closest('.list_C');
            const listId = cardContainer.dataset.listId;
            // console.log(listId);
            const cardInput = cardContainer.querySelector('#card_Name');
            const cardName = cardInput.value; 
            // console.log(cardName);
            if(cardName!=''){
                createCard(cardName,listId,"");
                addCardToTrello(cardName,listId);
            }
            setTimeout(()=>{
              location.reload();   
            },2000)
            cardInput.value='';
        }
    });
});

//-----------------------adding card to the clone-------------------//
function createCard(card_name,listId,cardId){
    const cardsContainer = document.createElement('div');
    cardsContainer.setAttribute('cardId',cardId);
    cardsContainer.classList.add('cardsContainer', 'border-2', 'w-full', 'text-start', 'rounded-xl', 'hover:border-blue-600', 'flex', 'justify-between', 'items-center', 'cursor-pointer');
    cardsContainer.dataset.cardId = cardId;
    const cardName = document.createElement('p');
    cardName.classList.add('cardName', 'p-2');
    cardName.textContent = card_name;

    const dropdownDetails = document.createElement('details');
    dropdownDetails.classList.add('dropdown', 'outline-none');


    const dropdownSummary = document.createElement('summary');
    dropdownSummary.classList.add('w-2', 'btn', 'bg-gray-100');
    dropdownSummary.innerHTML = '<i class="editCardName fa-solid fa-pen hover:border-2 hover:rounded-full  hover:bg-gray-400 p-1"></i>';
    
    dropdownDetails.appendChild(dropdownSummary);


    const dropdownContent = document.createElement('ul');
    dropdownContent.classList.add('p-2', 'shadow', 'menu', 'dropdown-content', 'z-[1]', 'bg-base-100', 'rounded-box', 'w-52');
    const dropdownItem = document.createElement('li');

    const dropdownItemContent= document.createElement('button');
    dropdownItemContent.classList.add('delete_card');
    dropdownItemContent.innerText='Archive card';

    dropdownItem.appendChild(dropdownItemContent);
    dropdownContent.appendChild(dropdownItem);


    dropdownDetails.appendChild(dropdownContent);
    cardsContainer.appendChild(cardName);
    cardsContainer.appendChild(dropdownDetails);
    
    
    // console.log(cardId);

    const listContainer = document.querySelector(`[data-list-id="${listId}"] .cardListDiv`); 
    listContainer.appendChild(cardsContainer);
    // console.log(cardsContainer);
}

//--------------adding card to the original trello-------------//

function addCardToTrello(cardName,listId){
    const url = `https://api.trello.com/1/cards?key=${apiKey}&token=${token}&idList=${listId}&name=${encodeURIComponent(cardName)}`;
    const value= fetch(url, {
        method: 'POST'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to add card: ' + response.statusText);
        }
    }).then(data => {
        console.log('Card added successfully:', data);
    }).catch(error => {
        console.error('Error adding card:', error);
    });
}

//----------fetching all the list from the original trello----------------//
document.addEventListener('DOMContentLoaded', function() {
    
    function fetchAllCards() {
        const url = `https://api.trello.com/1/boards/${boardId}/cards?key=${apiKey}&token=${token}`;
        
        return fetch(url)
            .then(response => {
               return response.json();  
            })
            .then(cards => {
                console.log('All cards fetched successfully:');
                cards.forEach((card)=>{
                    // console.log(card);
                    const cardId = card.id;
                    // console.log(cardId);
                    const cardName = card.name;
                    // console.log(cardName);
                    const listId = card.idList;
                    // console.log(listId);
                    createCard(cardName,listId,cardId);
                });
            })
            .catch(error => {
                console.error('Error fetching cards:', error);
            });
    }
    fetchAllCards();
});
//------------------function when we click on the card it show the id of that card in the console---
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        const clickedElement = event.target;
        if (clickedElement.dataset.cardId) {
            cardId = clickedElement.dataset.cardId;
            console.log('Clicked card ID:', cardId);
        }
       
    });
});

//---------------function to delete the card from the list------------------//
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete_card')) {
            const cardElement = event.target.closest('.cardsContainer');
            const cardId = cardElement.dataset.cardId;           
        //  console.log(cardId);
            deleteCard(cardId);     

        }
    });
});

//--------------------function to delete card from the list--------------
function deleteCard(cardId) {
    const url = `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`;

    const response= fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete card');
        }
        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
            if (cardElement) {
                cardElement.remove();
                console.log('card element removed from UI');
            } else {
                console.log('card element not found in UI');
            }
        console.log('Card deleted successfully');
        return response.json();
    })
    .catch(error => {
        console.error('Error deleting card:', error);
    });
}
