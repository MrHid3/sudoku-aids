import Tile from "./Tile"

export default class GameBoard {
    board: Tile[][];
    container: HTMLElement;
    currentArrow: number[];
    constructor(container : string, difficulty: string) {
        this.board = [];
        this.container = document.querySelector(container);
        this.currentArrow = [0, 0];

        this.createBord(difficulty);
        this.cweldoubleu()
    }

    cweldoubleu(){
        document.addEventListener("onkeypress", (e: KeyboardEvent) => {
            if(e.key == "ArrowRight") {
                console.log("ArrowRight");
                this.board[this.currentArrow[0]][this.currentArrow[1]].div.classList.remove("arrow");
                this.currentArrow[1]++;
                // this.board[this.currentArrow[0]][this.currentArrow[1]].div.classList.add("arrow");
            }
        })
    }

    async createBord(difficulty: string) {
        let data = {};
        //@ts-ignore
        while (await data.difficulty != difficulty) {
            //@ts-ignore
            data = await fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value, solution, difficulty}}}')
            //@ts-ignore
            data = await data.json()
            //@ts-ignore
            data = await data.newboard.grids[0];
        }
        console.log(data);
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
                //@ts-ignore
                this.board[i].push((new Tile(data.solution[i][j], data.value[i][j], data.solution[i][j] == data.value[i][j], data.solution[i][j] == data.value[i][j], tile, i, j, this)));
                row.appendChild(tile);
            }
            this.container.appendChild(row);
        }
        console.log(this.board);
        return data;
    }

    delete(){
        this.board.forEach(row => {
            row.forEach(element => {
                element.div.style.display = "none";
            })
        })
    }

    solve(){
        this.board.forEach(row => {
            row.forEach(element => {
                element.div.innerText = element.correct;
                element.div.classList.remove("correct");
                element.div.classList.remove("incorrect");
            })
        })
    }
}