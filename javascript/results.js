import {clearBoard} from './rendering.js';
import { arr } from './arrayBoard.js';

export function theWinnerIs(move){
    arr.setToZeroes();
    arr.loadBoardToStorage();
    let result = document.querySelector('.result')
    if(move === 'X') result.innerHTML = `1st Player Wins(${move})`;
    else if(move === 'O') result.innerHTML = `2nd Player Wins(${move})`;
    clearBoard();
    setTimeout(() => {
        result.innerHTML = '';
    },2000);
}