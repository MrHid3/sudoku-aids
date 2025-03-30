import Tile from "./Tile"

export default class GameBoard {
    board: Tile[][];
    container: HTMLElement;
    constructor(container : string, difficulty: string) {
        this.board = [];
        this.container = document.querySelector(container);

        this.createBord(difficulty);
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
                //@ts-ignore
                element.div.innerText = element.correct;
                element.current = element.correct;
                element.div.classList.remove("correct");
                element.div.classList.remove("incorrect");
            })
        })
    }

    checkCorrect(){
        let good = true;
        this.board.forEach(row => {
            row.forEach(element => {
                if (element.correct != element.current)
                    good = false;
            })
        })
        if (good)
            this.win();
    }

    win(){
        let div = document.createElement("div");
        div.classList.add("win");
        div.innerText = "Wygrałeś!";
        document.body.appendChild(div);
        let x = document.createElement("button");
        x.onclick = () => {
            document.body.removeChild(div);
        }
        x.innerText = "Zamknij";
        div.appendChild(x);
        this.board.forEach(row => {
            row.forEach(element => {
                element.blocked = true;
            })
        })
    }

}

