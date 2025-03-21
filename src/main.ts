import GameBoard from "./GameBoard";

let app = new GameBoard("#app", "Hard");

// @ts-ignore

const difficultioes = ["Easy", "Medium", "Hard"]

let buttons = document.querySelectorAll(".difficulty");
buttons.forEach((button, i) => {
    button.addEventListener("click", (e) => {
        app.delete();
        app = new GameBoard("#app", difficultioes[i]);
    })
})

document.querySelector(".solution").addEventListener("click", (e) => {
    app.solve();
})