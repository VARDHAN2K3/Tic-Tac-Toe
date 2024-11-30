let flag = 1; // 1 represents x's move 
let arr = [[],[],[]];

document.querySelectorAll('.cell').forEach((cell,i) =>{
    cell.addEventListener('click',()=>{
        if(!isTaken(cell)){
            if(!flag){
                cell.innerHTML = 'O';
                fillArrayBoard(i,'O');
                flag = 1;
                checkRowWin('O');
                checkColumnWin('O');
                checkDiagWin('O');
            }else if(flag){
                cell.innerHTML = 'X';
                fillArrayBoard(i,'X');
                flag = 0;
                checkRowWin('X');
                checkColumnWin('X');
                checkDiagWin('X');
            }
            checkBoard();
        }else{
            cell.classList.add('red-cell')
            setTimeout(() =>{
                cell.classList.remove('red-cell');
            },1000);
        } 
    });
});

//for rendering
function isTaken(cell){
    if(cell.innerHTML === 'X' || cell.innerHTML === 'O') return true;
    else return false;
}

function checkBoard(){
    let count = 9;
    document.querySelectorAll('.cell').forEach(cell =>{
        if(cell.innerHTML === '') count--;
    });
    if(count === 9){
        let result =  document.querySelector('.result');
        setTimeout(() => {
            result.innerHTML = 'It\'s a Tie';
        },0);
        clearBoard()
        setTimeout(() => {
            result.innerHTML = '';
        },2000);
    };
}

function clearBoard(){
    flag = 1;
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++) arr[i][j] = 0;
    setTimeout(() =>{
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
    },2000); 
}//upto here

//for filling array
function fillArrayBoard(i,move){
    if(i === 0) arr[0][0] = move;
    else if(i ===1) arr[0][1] = move;
    else if(i ===2) arr[0][2] = move;
    else if(i ===3) arr[1][0] = move;
    else if(i ===4) arr[1][1] = move;
    else if(i ===5) arr[1][2] = move;
    else if(i ===6) arr[2][0] = move;
    else if(i ===7) arr[2][1] = move;
    else if(i ===8) arr[2][2] = move;
}

//checks for wins
function checkRowWin(move){
    for(let i = 0; i < 3; i++){
        let count = 0;
        for(let j = 0; j < 3; j++){
            if(arr[i][j] !== move) break;
            else count++;
        }
        if(count === 3) theWinnerIs(move);
    }
}

function checkColumnWin(move){
    for(let i = 0; i < 3; i++){
        let count = 0;
        for(let j = 0; j < 3; j++){
            if(arr[j][i] !== move) break;
            else count++;
        }
        if(count === 3) theWinnerIs(move);
    }
}

function checkDiagWin(move){
    let count = 0;
    for(let i = 0; i < 3; i++){
        if(arr[i][i] !== move) break;
        else count++;
    }
    if(count === 3){
        theWinnerIs(move);
        return 0;
    }
    count = 0;
    let temp = 2
    for(let i = 0; i < 3; i++){
        if(arr[i][temp--] !== move)
            break;
        else count++;
    }
    if(count === 3) theWinnerIs(move);
}

function theWinnerIs(move){
    let result = document.querySelector('.result')
    if(move === 'X') result.innerHTML = `1st Player Wins(${move})`;
    else if(move === 'O') result.innerHTML = `2nd Player Wins(${move})`;
    clearBoard();
    setTimeout(() => {
        result.innerHTML = '';
    },3000);
    
}