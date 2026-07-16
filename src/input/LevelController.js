export default class LevelController {
  constructor(afterInput, onComplete, onInitialStateUp, level) {
    this.afterInput = afterInput;
    this.onComplete = onComplete;
    this.onInitialStateUp = onInitialStateUp;
    this.level = level;
  }

  left() {
    // Prevent exceeding board
    if (this.level.index === 0) {
      return;
    }
    this.level.index -= 1;
    this.tryAfterInput();
  }

  right() {
    // Prevent exceeding board
    if (this.level.index === this.level.puzzle.board.columns - 1) {
      return;
    }
    this.level.index += 1;
    this.tryAfterInput();
  }

  down() {
    if (!this.level.puzzle.isComplete()) {
      this.level.puzzle.playIndex(this.level.index);
    }
    if (this.level.puzzle.isComplete() && typeof this.onComplete === 'function') {
      this.onComplete(this.level);
    }
    this.tryAfterInput();
  }

  up() {
    const initialState = this.level.puzzle.history.length === 0;
    if (initialState && typeof this.onInitialStateUp === 'function') {
      this.onInitialStateUp();
      return;
    }
    this.level.puzzle.reset();
    this.tryAfterInput();
  }

  tryAfterInput() {
    if (typeof this.afterInput === 'function') {
      this.afterInput();
    }
  }
}