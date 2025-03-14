import Tile from "./Tile"

export default class GameBoard {
    board: Tile[][];
    container: HTMLElement;
    currentArrow: number[];
    constructor(container : string) {
        this.board = [];
        this.container = document.querySelector(container);
        this.currentArrow = [0, 0];
        for(let i = 0; i < 9; i++) {
            this.board[i] = [];
            let row = document.createElement("div");
            row.classList.add("row");
            for(let j = 0; j < 9; j++) {
                let tile = document.createElement("div");
                tile.classList.add("tile");
                if((i < 3 || i > 5) && (j > 2 && j < 6) || (j < 3 || j > 5) && (i > 2 && i < 6)){
                    tile.classList.add("contrast")
                }
                this.board[i].push((new Tile((i*j)%10, 0, false, true, tile, i, j, this)));
                row.appendChild(tile);
            }
            this.container.appendChild(row);
        }
        this.cweldoubleu()
    }

    cweldoubleu(){
        document.addEventListener("onkeypress", (e: KeyboardEvent) => {
            if(e.key == "ArrowRight") {
                console.log("ArrowRight");
                this.currentArrow[1]++;
                this.board[this.currentArrow[0]][this.currentArrow[1]].div.classList.add("arrow")
            }
        })
    }
}