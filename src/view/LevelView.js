export default class LevelView {
  constructor(brush, renderRegion, spacing, numberColor, level) {
    this.brush = brush;
    this.renderRegion = renderRegion;
    this.spacing = spacing;
    this.numberColor = numberColor;
    this.level = level;
    this.last = this.level;
  }

  resetFont() {
    this.brush.font = `bold ${this.blockSize * 0.5}px sans-serif`;
    this.brush.textAlign = "center";
    this.brush.textBaseline = "middle";
  }

  determineBlockSize() {
    const columns = this.level.puzzle.board.columns;
    const rows = this.level.puzzle.board.rows + 1;

    const maxWidth = this.renderRegion.width / columns;
    const maxHeight = this.renderRegion.height / rows;

    this.blockSize = Math.min(maxWidth, maxHeight) - this.spacing;
  }

  determineLeftMargin() {
    const columns = this.level.puzzle.board.columns;

    this.leftMargin =
      (
        this.renderRegion.width -
        (
          this.blockSize * columns +
          this.spacing * (columns - 1)
        )
      ) / 2;
  }

  drawBoard() {
    let blockIndex =
      this.level.puzzle.currentRow *
      this.level.puzzle.board.columns;

    let x = 0;
    let y = 0;

    const offset =
      this.renderRegion.y +
      this.blockSize +
      this.spacing;

    for (let i = 0; i < this.level.puzzle.board.columns; i++) {
      for (
        let j = this.level.puzzle.history.length;
        j < this.level.puzzle.board.rows;
        j++
      ) {
        const number = this.level.puzzle.board.get(j, i);

        this.brush.fillStyle =
          this.level.palette.boardColors[number - 1].toString();

        x =
          i * this.blockSize +
          this.spacing * i +
          this.leftMargin;

        y =
          j * this.blockSize +
          offset +
          this.spacing * j;

        this.brush.fillRect(
          x,
          y,
          this.blockSize,
          this.blockSize
        );

        this.brush.fillStyle = this.numberColor;

        this.brush.fillText(
          String(number),
          x + this.blockSize / 2,
          y + this.blockSize / 2
        );

        blockIndex++;
      }
    }
  }

  drawNumber() {
    const index = this.level.index;
    const currentRow = this.level.puzzle.currentRow;

    const x =
      index * this.blockSize +
      this.spacing * index +
      this.leftMargin;

    const y =
      currentRow * this.blockSize +
      this.renderRegion.y +
      this.spacing * currentRow;

    this.brush.fillStyle =
      this.level.palette.numberColor.toString();

    this.brush.fillRect(
      x,
      y,
      this.blockSize,
      this.blockSize
    );

    this.brush.fillStyle = this.numberColor;

    this.brush.fillText(
      String(this.level.puzzle.number),
      x + this.blockSize / 2,
      y + this.blockSize / 2
    );
  }

  draw() {
    if (this.level === undefined) {
      return;
    }

    const board = this.level.puzzle.board;
    const shouldRecalculate =
      this.blockSize === undefined ||
      this.leftMargin === undefined ||
      this.lastLevel !== this.level ||
      this.lastRenderRegionWidth !== this.renderRegion.width ||
      this.lastRenderRegionHeight !== this.renderRegion.height ||
      this.lastRenderRegionX !== this.renderRegion.x ||
      this.lastRenderRegionY !== this.renderRegion.y;

    if (shouldRecalculate) {
      this.determineBlockSize();
      this.determineLeftMargin();
      this.lastLevel = this.level;
      this.lastRenderRegionWidth = this.renderRegion.width;
      this.lastRenderRegionHeight = this.renderRegion.height;
      this.lastRenderRegionX = this.renderRegion.x;
      this.lastRenderRegionY = this.renderRegion.y;
    }

    this.resetFont();
    this.drawNumber();
    this.drawBoard();
  }

  redraw() {
    this.brush.clearRect(
      this.renderRegion.x,
      this.renderRegion.y - 1,
      this.renderRegion.width,
      this.renderRegion.height + 1
    );

    this.draw();
  }
}