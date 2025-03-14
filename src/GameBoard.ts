import Tile from "./Tile"

export default class GameBoard {
    board: Tile[][];
    container: HTMLElement;
    constructor(container : string) {
        this.board = [];
        this.container = document.querySelector(container);
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
    }
}