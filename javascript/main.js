import { arr } from './arrayBoard.js';
import { isTaken, checkBoard, renderingCells } from './rendering.js';
import { functions } from './functions.js';
import { bot } from './bot.js';
console.log(arr.arrayBoard);
const firstHtmlPage = `
        <div class="first-page">
            <button class="btn">VS BOT</button>
            <button class="btn">VS FRIEND</button>
        </div>    
    `;
const secondHtmlPage = `
    <div class="second-page">
        <div class="result"></div>
        <button class="back-btn">←</button>
        <div class="main">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
        </div>
    </div>
`;

let move; // 1 represents x's move 

load();

function load(){
    
    let bot = Number(localStorage.getItem('Bot')) || 0;
    
    const isntStart = Number(localStorage.getItem('isntStart')) || 1;
    
    let renderPage = document.querySelector('body');

    //page rendering decicions
    if (isntStart === 1) {
        renderPage.innerHTML = firstHtmlPage;
        document.querySelectorAll('.btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                localStorage.setItem('isntStart', 2);
                renderPage.innerHTML = secondHtmlPage;
                goBack();
                if (btn.innerHTML === 'VS FRIEND') playingWithFriend(move);
                else if(btn.innerHTML === 'VS BOT'){
                    document.querySelector('.result').innerHTML = "You(X) Bot(O)";
                    localStorage.setItem('Bot',1);
                    playingWithBot(move);
                }
            });
        });
    } else if (isntStart === 2) {
        renderPage.innerHTML = secondHtmlPage;
        if(bot === 1){
            document.querySelector('.result').innerHTML = "You(X) Bot(O)";
            playingWithBot(move);
        }else playingWithFriend(move);
        goBack();
    }
}


function playingWithFriend() {
    move = Number(functions.checkMove());
    document.querySelectorAll('.cell').forEach((cell, i) => {
        renderingCells(cell, i);
        cell.addEventListener('click', () => {
            if (!isTaken(cell)) {
                if (move === 0) {
                    renderFill(cell,'O',i,1);
                    if (arr.checkRowWin('O') || arr.checkColumnWin('O') || arr.checkDiagWin('O')) winner('O');
                    else if (checkBoard()) tie();
                } else if (move === 1) {
                    renderFill(cell,'X',i,0);
                    if (arr.checkRowWin('X') || arr.checkColumnWin('X') || arr.checkDiagWin('X')) winner('X');
                    else if (checkBoard()) tie();
                }
            } else {
                cell.classList.add('red-cell')
                setTimeout(() => {
                    cell.classList.remove('red-cell');
                }, 200);
            }
        });
    });
}

function playingWithBot(){
    move = Number(functions.checkMove());
    document.querySelectorAll('.cell').forEach((cell,i) => {
        renderingCells(cell, i);
        cell.addEventListener('click',() => {
            if(!isTaken(cell)){
                if(move === 1){
                    renderFill(cell,'X',i,0);
                    if (arr.checkRowWin('X') || arr.checkColumnWin('X') || arr.checkDiagWin('X')) winner('X');
                    else if (checkBoard()) tie();
                }
                if(move === 0){
                    bot.thinking();
                    move = 1;
                    load();
                }
            }else{
                cell.classList.add('red-cell');
                setTimeout(() => {
                    cell.classList.remove('red-cell');
                }, 200);
            }
        });
    });
   
}

function goBack(){
    const backBTn = document.querySelector('.back-btn');
    backBTn.addEventListener('click', () =>{
        localStorage.setItem('isntStart', 1);
        localStorage.setItem('Bot',0);
        arr.setToZeroes();
        load();
    });
}

function renderFill(cell,player,i,playerMove){
    cell.innerHTML = player;
    arr.fillArrayBoard(i, player);
    move = playerMove;
}

function winner(player){
    move = -1;
    functions.theWinnerIs(player);
    setTimeout(() => {
        move = 1;
    }, 2000);
}

function tie(){
    move = -1;
    setTimeout(() => {
        move = 1;
    }, 2000);
}