//---------------------creating board ---------------------------------------//
function createBoard(boardName){
    const container = document.createElement('div');
    const text=document.createTextNode(boardName);
    container.appendChild(text);
    document.querySelector('.create_board').appendChild(container);
    container.style.width="18rem";
    container.style.height="7rem";
    container.style.backgroundColor="gray";
    container.style.color="white"

    container.style.paddingTop="1rem";
    container.style.paddingLeft="1rem";
    container.style.borderRadius="5px";
    return;
}
const create_board_btn=document.querySelector('.create_board_btn');
let board_count=0;
create_board_btn.addEventListener('click',function(e){
     const name = document.getElementById('boardName')
    //  console.log(name);
    if (name.value !== "" && board_count < 10) { // Check if name is not empty and board_count is less than 10
        createBoard(name.value);
        createBoardByName(name.value);
        location.reload();
        board_count++;
        if (board_count >= 10) {
            create_board_btn.disabled = true; // Disable the button if board_count reaches 10
        }
    }
     name.value ="";
})

const apiKey = '21d7e5b0f2c469b792b250d4484b7778';
const token ='ATTA5073ddff703c2459757f23c606bdd646a09b1a2265669321d1cf5ab44c4e61a644AFE18E';
const permissionLevel = 'public';
const desc = 'Board Created';



// -----creating board in trello clone and the adding it to the original trello also-------//
function createBoardByName(boardName){
    const url = `https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${token}&prefs_permissionLevel=${permissionLevel}&desc=${desc}`;
    const fetchValue= fetch(url,{
        method : 'POST'
    })
    .then((fetchResponse) => {
      return fetchResponse.json();
    })
    .catch((error) => {
      console.error(error);
    });
    return fetchValue;
}



// -----geting all the boards of the orginal trello website -------------------------//
const boardContainer = document.querySelector('.create_board');
fetch(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`)
      .then(response => response.json())
      .then(boards => {
        boards.forEach(board => {
        //    console.log(board);
        //    console.log(board.prefs.backgroundImage)
           const imageUrl=board.prefs.backgroundImage;
        //    console.log(board);
           const board_Name=board.name;
           board_count++;
        //    console.log(imageUrl);
           createBoardWithBackgroundUrl(board_Name,imageUrl,board);
        });
        // console.log(board_count);
        if(board_count>1){
            const remaining_boards= document.querySelector('.remaining_boards');
            const countText = document.createTextNode(`${10 - board_count} remaining`);
            remaining_boards.appendChild(countText);
        }
      })
      .catch(error => {
        console.error('Error fetching boards:', error);
      });


//--------creating all the boards that are in the original trello and setting their background image---------//
function getRandomColor() {
    // Generate a random hexadecimal color code
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
function createBoardWithBackgroundUrl(boardName,imageUrl,board){

    const container = document.createElement('button');
    container.addEventListener('click',()=>{
        window.location.href = `./board_page.html?boardId=${board.id}`;
    })
    const text=document.createTextNode(boardName);
    container.appendChild(text);
    container.style.textAlign="left";
    container.style.width="18rem";
    container.style.height="7rem";
    container.style.backgroundColor = getRandomColor();
    container.style.color="white"
    container.style.paddingTop="1rem";
    container.style.paddingLeft="1rem";
    container.style.borderRadius="5px";
    if (imageUrl) {
        container.style.backgroundImage = `url(${imageUrl})`;
        container.style.backgroundSize = "cover";
    }
    document.querySelector('.create_board').appendChild(container);
    return;
}


