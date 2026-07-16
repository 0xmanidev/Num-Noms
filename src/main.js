import './style.css'

import FactorGame from "./FactorsGame.js"

const canvas = document.getElementById("factors-game-canvas");
canvas.width = Math.min(900, window.innerWidth - 40);
canvas.height = Math.min(700, window.innerHeight * 0.8);
canvas.style.width = "100%";
canvas.style.maxWidth = "900px";
canvas.style.height = "auto";

const game = FactorGame.init(canvas, {
    changeDocumentTextColor: true
});
window.__game = game;
game.start();