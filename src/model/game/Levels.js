import Board from "../Puzzle/Board.js";
import Puzzle from "../Puzzle/Puzzle.js";
import Level from "./Level.js";

export default class Levels {
  constructor(prng, theme) {
    this.prng = prng;
    this.theme = theme;
  }

  get(level) {
    if (typeof this.prng.seed === "function") {
      this.prng.seed(level);
      this.prng.random();
      this.prng.random();
      this.prng.random();
    }

    const levelPalette = this.theme.getLevelPalette(level);

    const board = Board.create(4, 4, this.prng);
    board.shuffle();

    const puzzle = new Puzzle(level, board);

    return new Level(puzzle, levelPalette);
  }
}