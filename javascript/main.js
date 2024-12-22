import { arr } from './arrayBoard.js';
import { isTaken, checkBoard, renderingCells } from './rendering.js';
import { theWinnerIs } from './results.js';

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

load();

function load(){
    let flag = Number(checkMove()); // 1 represents x's move 
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
                if (btn.innerHTML === 'VS FRIEND') playingWithFriend(flag);
                else if(btn.innerHTML === 'VS BOT') console.log("BOt");
            });
        });
    } else if (isntStart === 2) {
        renderPage.innerHTML = secondHtmlPage;
        goBack();
        playingWithFriend(flag);
    }
}


function playingWithFriend(flag) {
    document.querySelectorAll('.cell').forEach((cell, i) => {
        renderingCells(cell, i);
        cell.addEventListener('click', () => {
            if (!isTaken(cell)) {
                if (flag === 0) {
                    cell.innerHTML = 'O';
                    arr.fillArrayBoard(i, 'O');
                    flag = 1;
                    localStorage.setItem('isntStart', 2);
                    if (arr.checkRowWin('O') || arr.checkColumnWin('O') || arr.checkDiagWin('O')) {
                        flag = -1;
                        theWinnerIs('O');
                        localStorage.setItem('isntStart', 1);
                        setTimeout(() => {
                            flag = 1;
                        }, 2000);
                    } else if (checkBoard()) {
                        flag = -1;
                        localStorage.setItem('isntStart', 1);
                        setTimeout(() => {
                            flag = 1;
                        }, 2000);
                    }
                } else if (flag === 1) {
                    cell.innerHTML = 'X';
                    arr.fillArrayBoard(i, 'X');
                    flag = 0;
                    localStorage.setItem('isntStart', 2);
                    if (arr.checkRowWin('X') || arr.checkColumnWin('X') || arr.checkDiagWin('X')) {
                        flag = -1;
                        theWinnerIs('X');
                        localStorage.setItem('isntStart', 1);
                        setTimeout(() => {
                            flag = 1;
                        }, 2000);
                    } else if (checkBoard()) {
                        flag = -1;
                        localStorage.setItem('isntStart', 1);
                        setTimeout(() => {
                            flag = 1;
                        }, 2000);
                    }
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


function checkMove(){
    let countX = 0;
    let countO = 0;
    for(let i = 0; i < 2; i++){
        for(let j = 0; j < 2; j++){
            if(arr.arrayBoard[i][j] === 'X') countX = countX + 1;
            else if(arr.arrayBoard[i][j] === 'O') countO = countO + 1;
        }
    }
    if((countX === 0 && countO === 0) || (countX === countO) || (countO > countX)) return 1;
    else if(countX > countO) return 0;
}

function goBack(){
    const backBTn = document.querySelector('.back-btn');
    backBTn.addEventListener('click', () =>{
        localStorage.setItem('isntStart', 1);
        arr.setToZeroes();
        arr.loadBoardToStorage();
        load();
    });
}