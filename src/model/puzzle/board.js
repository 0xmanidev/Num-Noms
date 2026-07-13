export default class Board {
  constructor(board, prng) {
    this.board = board;
    this.rows = board.length;
    this.columns = board[0].length;
    this.prng = typeof prng !== "undefined" ? prng : Math;
  }

  static create(rows, columns, prng) {
    const board = [];
    let c = 1;

    for (let i = 0; i < rows; i += 1) {
      const row = [];
      for (let j = 0; j < columns; j += 1) {
        row.push(c);
        c += 1;
      }
      board.push(row);
    }

    return new Board(board, prng);
  }

  // Uses modified Fisher-Yates/Durstenfeld algorithm
  shuffle() {
    for (let i = 0; i < this.board.length; i += 1) {
      for (let j = 0; j < this.board[i].length; j += 1) {
        const randomI = Math.floor(this.prng.random() * this.board.length);
        const randomJ = Math.floor(this.prng.random() * this.board[i].length);

        const temp = this.board[i][j];
        this.board[i][j] = this.board[randomI][randomJ];
        this.board[randomI][randomJ] = temp;
      }
    }
  }

  get(row, column) {
    if (typeof row === "undefined") {
      return this.board;
    }
    if (typeof column === "undefined") {
      return this.board[row];
    }
    return this.board[row][column];
  }

  [Symbol.iterator]() {
    let pos = 0;
    const board = this.board;

    return {
      next() {
        if (pos >= board.length) {
          return { done: true };
        }

        return {
          value: board[pos++],
          done: false,
        };
      },
    };
  }
}