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
        this.correct = correct;
        this.current = current;
        this.blocked = blocked;
        this.revealed = revealed;
        this.div = div;
        if(this.revealed)
            //@ts-ignore
            this.div.innerText = this.correct;
        this.row = row;
        this.col = col;
        this.parent = parent;
        this.click();
    }

    error(event){
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
                parent.div.classList.add("nohover");
                let isin = false;
                keys.forEach(e => {
                    if(e == event.key){
                        isin = true;
                    }})
                if(event.key == "Backspace"){
                    parent.div.innerText = "";
                    parent.current = 0;
                    parent.color();
                }else if(isin) {
                    parent.current = event.key;
                    parent.div.innerText = event.key;
                    parent.parent.currentArrow = [parent.col, parent.row];
                    parent.color();
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

    color(){
        //@ts-ignore
        if(this.div.innerText == this.correct){
            this.div.classList.add("correct")
            this.div.classList.remove("incorrect");
        }else if (this.div.innerText != ""){
            this.div.classList.add("incorrect");
            this.div.classList.remove("correct")
        }else{
            this.div.classList.remove("incorrect");
            this.div.classList.remove("correct");
        }
        this.parent.checkCorrect();
    }
}