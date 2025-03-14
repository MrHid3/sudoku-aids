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

    click(){
        this.div.addEventListener("mouseover", (event, div = this.div) =>{
            const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            function klucz(event){
                if(event.key in keys) {
                    this.current = event.key;
                    div.innerText = event.key;
                }
                document.removeEventListener("keydown", klucz)
            }
            document.addEventListener("keydown", klucz)
            this.div.addEventListener("mouseout", () =>{
                document.removeEventListener("keydown", klucz)
            })
        });
    }

    andrewTate(){
        for (let i = 1; i < 9; i++) {
            if (this.row == i) continue;
            if(this.parent.board[i][this.col].current == this.current){
                this.div.classList.add("wrong");
            }
        }
    }
}