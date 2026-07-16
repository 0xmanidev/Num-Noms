export default class StatusBar {
  constructor(brush, renderRegion, fontSize, score, level, offsetTop) {
    this.brush = brush;
    this.fontSize = fontSize;
    this.renderRegion = renderRegion;
    this.score = score;
    this.level = level;
    this.offsetTop = offsetTop || 0;
  }

  draw() {
    this.brush.font = `${this.fontSize}px sans-serif`;
    this.brush.textAlign = "left";
    this.brush.textBaseline = "top";
    this.brush.fillStyle = this.level.palette.numberColor.toString();

    let levelStr = "Level " + this.level.getNumber();

    if (this.score) {
      try {
        levelStr += " | Avg: " + this.score.average().toFixed(4);
      } catch (e) {
        // Ignore if no score is available yet.
      }
    }

    this.brush.fillText(
      levelStr,
      this.renderRegion.x,
      this.renderRegion.y + this.offsetTop
    );

    this.brush.textAlign = "right";

    this.brush.fillText(
      "[Select]",
      this.renderRegion.x + this.renderRegion.width,
      this.renderRegion.y + this.offsetTop
    );
  }

  redraw() {
    this.brush.clearRect(
      this.renderRegion.x,
      this.renderRegion.y,
      this.renderRegion.width,
      this.renderRegion.height
    );

    this.draw();
  }
}