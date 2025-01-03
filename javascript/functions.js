import {clearBoard} from './rendering.js';
import { arr } from './arrayBoard.js';

class Functions{
    theWinnerIs(move){
        arr.setToZeroes();
        let result = document.querySelector('.result')
        if(move === 'X') result.innerHTML = `1st Player Wins(${move})`;
        else if(move === 'O') result.innerHTML = `2nd Player Wins(${move})`;
        clearBoard();
        setTimeout(() => {
            result.innerHTML = '';
        },2000);
    }
    checkMove(){
        let [countX,countO] = arr.countXcountO();
        if((countX === 0 && countO === 0) || (countX === countO) || (countO > countX)) return 1;
        else if(countX > countO) return 0;
    }
}

export const functions = new Functions();