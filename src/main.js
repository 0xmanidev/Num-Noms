import './style.css'

import FactorGame from "./FactorsGame.js"

const canvas = document.getElementById("factors-game-canvas");
canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight* 1.6;

FactorGame.init(canvas,{
    changeDocumentTextColor:true
}).start();