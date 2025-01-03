class ArrayBoard{
    arrayBoard;
    localStorageKey;
    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadBoardFromStorage();
    }
    loadBoardToStorage(){
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.arrayBoard));
    }
    loadBoardFromStorage(){
        this.arrayBoard = JSON.parse(localStorage.getItem(this.localStorageKey)) || [[],[],[]];
    }
    fillArrayBoard(i,move){
        if(i === 0) this.arrayBoard[0][0] = move;
        else if(i === 1) this.arrayBoard[0][1] = move;
        else if(i === 2) this.arrayBoard[0][2] = move;
        else if(i === 3) this.arrayBoard[1][0] = move;
        else if(i === 4) this.arrayBoard[1][1] = move;
        else if(i === 5) this.arrayBoard[1][2] = move;
        else if(i === 6) this.arrayBoard[2][0] = move;
        else if(i === 7) this.arrayBoard[2][1] = move;
        else if(i === 8) this.arrayBoard[2][2] = move;
        this.loadBoardToStorage();
    }
    setToZeroes(){
        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++) this.arrayBoard[i][j] = null;
        this.loadBoardToStorage();
    }
    checkRowWin(move){
        for(let i = 0; i < 3; i++){
            let count = 0;
            for(let j = 0; j < 3; j++){
                if(this.arrayBoard[i][j] !== move) break;
                else count++;
            }
            if(count === 3) return 1;
        }
    }
    checkColumnWin(move){
        for(let i = 0; i < 3; i++){
            let count = 0;
            for(let j = 0; j < 3; j++){
                if(this.arrayBoard[j][i] !== move) break;
                else count++;
            }
            if(count === 3) return 1;
        }
    }
    checkDiagWin(move){
        let count = 0;
        for(let i = 0; i < 3; i++){
            if(this.arrayBoard[i][i] !== move) break;
            else count++;
        }
        if(count === 3){
            return 1;
        }
        count = 0;
        let temp = 2
        for(let i = 0; i < 3; i++){
            if(this.arrayBoard[i][temp--] !== move)
                break;
            else count++;
        }
        if(count === 3) return 1;
    }
    countXcountO(){
        let countX = 0;
        let countO = 0;
        for(let i = 0; i < 2; i++){
            for(let j = 0; j < 2; j++){
                if(arr.arrayBoard[i][j] === 'X') countX = countX + 1;
                else if(arr.arrayBoard[i][j] === 'O') countO = countO + 1;
            }
        }
        return [countX,countO];
    }
}

export let arr = new ArrayBoard('arrayBoard');
