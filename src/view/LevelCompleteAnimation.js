export default class LevelCompleteAnimation {
  constructor(
    brush,
    renderRegion,
    level,
    levelView,
    statusBar,
    onComplete
  ) {
    this.brush = brush;
    this.renderRegion = renderRegion;
    this.level = level;
    this.levelView = levelView;

    // Keep status bar in animation
    this.statusBar = statusBar;
    this.onComplete = onComplete;
  }

  frame() {
    const brush = this.brush;
    const number = this.level.puzzle.number;

    // Quickness is based on width and height
    const movementFactor = Math.floor(
      Math.max(
        this.renderRegion.width,
        this.renderRegion.height
      ) * 0.025
    );

    // Move block to bottom
    if (this.y < this.renderRegion.height - this.blockSize) {
      this.y += movementFactor;

    // Lock block to bottom
    } else if (this.y !== this.renderRegion.height - this.blockSize) {
      this.y = this.renderRegion.height - this.blockSize;

    // Expand block
    } else if (this.x <= 0) {
      this.x = 0;
      this.blockSize += movementFactor;
      this.y -= movementFactor;

    // Move block over
    } else {
      this.x -= movementFactor;
    }

    brush.fillStyle = this.blockColor;
    brush.clearRect(
      0,
      0,
      this.renderRegion.width,
      this.renderRegion.height
    );

    brush.fillRect(
      this.x,
      this.y,
      this.blockSize,
      this.blockSize
    );

    if (this.x > 0) {
      this.resetFont();

      brush.fillStyle = this.numberColor;

      brush.fillText(
        String(number),
        this.x + this.blockSize / 2,
        this.y + this.blockSize / 2
      );
    }

    if (
      this.blockSize > this.renderRegion.width &&
      this.blockSize > this.renderRegion.height
    ) {
      if (typeof this.onComplete === "function") {
        this.onComplete();
      }

      return;
    }

    if (
      this.statusBar &&
      typeof this.statusBar.draw === "function"
    ) {
      this.statusBar.draw();
    }

    window.requestAnimationFrame(() => {
      this.frame();
    });
  }

  run(onComplete) {
    if (typeof onComplete === "function") {
      this.onComplete = onComplete;
    }

    const lastIndex =
      this.level.puzzle.history[
        this.level.puzzle.history.length - 1
      ];

    this.x =
      lastIndex * this.levelView.blockSize +
      this.levelView.spacing * lastIndex +
      this.levelView.leftMargin;

    const offset =
      this.levelView.renderRegion.y +
      this.levelView.blockSize +
      this.levelView.spacing;

    this.y =
      this.level.puzzle.history.length *
        this.levelView.blockSize +
      offset +
      this.levelView.spacing *
        this.level.puzzle.history.length;

    this.blockSize = this.levelView.blockSize;

    const blockColor =
      this.level.palette.numberColor.clone();

    blockColor.a = 1;

    this.blockColor = blockColor;
    this.numberColor = this.levelView.numberColor;
    this.resetFont = this.levelView.resetFont;

    setTimeout(() => {
      this.frame();
    }, 500);
  }
}