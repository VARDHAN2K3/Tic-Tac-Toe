import { arr } from "./arrayBoard.js";

export function isTaken(cell){
    if(cell.innerHTML === 'X' || cell.innerHTML === 'O') return true;
    else return false;
}

export function checkBoard(){
    let count = 9;
    document.querySelectorAll('.cell').forEach(cell =>{
        if(cell.innerHTML === '') count--;
    });
    if(count === 9){
        let result =  document.querySelector('.result');
        result.innerHTML = 'It\'s a Tie';
        clearBoard()
        setTimeout(() => {
            result.innerHTML = '';
        },2000);
        return 1;
    }else return 0;
}

export function clearBoard(){
    arr.setToZeroes();
    arr.loadBoardToStorage();
    setTimeout(() =>{
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
    },2000); 
}

export function renderingCells(cell,i){
    if(i === 0 && (arr.arrayBoard[0][0] === 'X' || arr.arrayBoard[0][0] === 'O')) cell.innerHTML = arr.arrayBoard[0][0]; 
    else if(i === 1 && (arr.arrayBoard[0][1] === 'X' || arr.arrayBoard[0][1] === 'O')) cell.innerHTML = arr.arrayBoard[0][1];
    else if(i === 2 && (arr.arrayBoard[0][2] === 'X' || arr.arrayBoard[0][2] === 'O')) cell.innerHTML = arr.arrayBoard[0][2];
    else if(i === 3 && (arr.arrayBoard[1][0] === 'X' || arr.arrayBoard[1][0] === 'O')) cell.innerHTML = arr.arrayBoard[1][0];
    else if(i === 4 && (arr.arrayBoard[1][1] === 'X' || arr.arrayBoard[1][1] === 'O')) cell.innerHTML = arr.arrayBoard[1][1];
    else if(i === 5 && (arr.arrayBoard[1][2] === 'X' || arr.arrayBoard[1][2] === 'O')) cell.innerHTML = arr.arrayBoard[1][2];
    else if(i === 6 && (arr.arrayBoard[2][0] === 'X' || arr.arrayBoard[2][0] === 'O')) cell.innerHTML = arr.arrayBoard[2][0];
    else if(i === 7 && (arr.arrayBoard[2][1] === 'X' || arr.arrayBoard[2][1] === 'O')) cell.innerHTML = arr.arrayBoard[2][1];
    else if(i === 8 && (arr.arrayBoard[2][2] === 'X' || arr.arrayBoard[2][2] === 'O')) cell.innerHTML = arr.arrayBoard[2][2];
}