import GameBoard from "./GameBoard";

export default class Tile {
    correct: number;
    current: number;
    blocked: boolean;
    revealed: boolean;
    div: HTMLDivElement;
    parent: GameBoard;
    row: number;
    col: number;

    constructor(correct: number, current: number, blocked: boolean, revealed: boolean, div: HTMLDivElement, row : number, col :number,
            parent : GameBoard) {
        this.current = current;
        this.blocked = blocked;
        this.revealed = revealed;
        this.div = div;
        this.row = row;
        this.col = col;
        this.parent = parent;
        this.click();
    }

    error(event){
        const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        if(this.div.innerText == "" && event.key in keys)
            this.div.innerText = event.key;
        this.div.classList.add("error");
        this.current = 0;
        setTimeout(()=>{
            if(this.div.innerText == event.key)
                this.div.innerText = "";

        }, 50)
        setTimeout(()=>{
            this.div.classList.remove("error");
        }, 200)
    }

    click(){
        this.div.addEventListener("mouseover", (event, parent = this) =>{
            const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            function klucz(event){
                parent.div.classList.add("nohover")
                if(event.key in keys && parent.andrewTate(event.key)) {
                    parent.current = event.key;
                    parent.div.innerText = event.key;
                    parent.parent.currentArrow = [parent.col, parent.row];
                }else{
                    parent.error(event)
                }
                document.removeEventListener("keydown", klucz)
            }
            document.addEventListener("keydown", klucz)
            this.div.addEventListener("mouseout", () =>{
                document.removeEventListener("keydown", klucz)
                parent.div.classList.remove("nohover");
            })
        });
    }

    andrewTate(nt: number){

        for (let i = 0; i < 9; i++) {
            if (this.row == i)
                continue;
            if(this.parent.board[i][this.col].current == nt){
                return false;
            }
        }
        for (let j = 0; j < 9; j++) {
            if(this.row == j)
                continue;
            if(this.parent.board[this.row][j].current == nt){
                return false;
            }
        }
        for(let i = Math.floor(this.row/3) * 3; i < Math.floor(this.row/3) * 3 + 3; i++){
            for(let j = Math.floor(this.col/3) * 3; j < Math.floor(this.col/3) * 3 + 3; j++) {
                if (i == this.row && j == this.col)
                    continue;
                if (this.parent.board[i][j].current == nt)
                    return false;
            }
        }
        return true;
    }
}