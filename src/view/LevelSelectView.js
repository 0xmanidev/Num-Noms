import BoundingBox from "../Input/BoundingBox.js";

export default class LevelSelectView {
  constructor(brush, renderRegion, storageManager, theme, blockSize, xPad) {
    this.brush = brush;
    this.renderRegion = renderRegion;
    this.storageManager = storageManager;
    this.theme = theme;
    this.sliderY = this.renderRegion.height * 0.5;
    this.blockSize = blockSize;
    this.xPad = xPad || 0;
  }

  drawLevelResults(value) {
    const results = this.storageManager.getLevelResult(value);

    if (!results) {
      return;
    }

    const number = results.endNumber;
    let result;

    if (number === 1) {
      result = "ACE!";
    } else {
      result = number < 10 ? "LOW!" : "High";
    }

    this.brush.fillStyle = this.theme.sliderColor;
    this.brush.font = `bold ${this.blockSize * 0.5}px sans-serif`;
    this.brush.fillText(
      result,
      this.renderRegion.width / 2,
      this.renderRegion.height * 0.4
    );

    this.brush.font = `bold ${this.blockSize * 0.25}px sans-serif`;
    this.brush.fillText(
      "End Number: " + number,
      this.renderRegion.width / 2,
      this.renderRegion.height * 0.6
    );

    if (number === 1) {
      this.brush.fillText(
        "Moves: " + results.path.length,
        this.renderRegion.width / 2,
        this.renderRegion.height * 0.6675
      );
    }
  }

  drawNumber(value, blockColor) {
    this.brush.fillStyle = blockColor;

    this.brush.fillRect(
      this.renderRegion.width / 2 - this.blockSize / 2,
      this.renderRegion.height * 0.15,
      this.blockSize,
      this.blockSize
    );

    if (value < 1) {
      value = "?";
    }

    this.brush.font = `bold ${this.blockSize * 0.5}px sans-serif`;
    this.brush.fillStyle = this.theme.numberColor;

    this.brush.fillText(
      String(value),
      this.renderRegion.width / 2,
      this.renderRegion.height * 0.15 + this.blockSize / 2
    );
  }

  drawSlider(value, x, y, color) {
    const radius = this.blockSize / 6;

    this.brush.font = `bold ${this.blockSize * 0.5}px sans-serif`;
    this.brush.strokeStyle = color;
    this.brush.lineWidth = 5;

    this.brush.beginPath();
    this.brush.moveTo(this.xPad - radius * 2, this.sliderY);
    this.brush.lineTo(
      this.renderRegion.width - this.xPad + radius * 2,
      this.sliderY
    );
    this.brush.stroke();
    this.brush.closePath();

    this.brush.beginPath();
    this.brush.arc(x, this.sliderY, radius, 2 * Math.PI, false);
    this.brush.stroke();
    this.brush.closePath();

    this.drawSliderTapControls(color);
  }

  drawSliderTapControls(color) {
    this.brush.fillStyle = color;
    this.brush.strokeStyle = color;
    this.brush.lineWidth = 10;

    const xPos = this.xPad / 2;
    const xSize = this.blockSize / 3;
    const yPos = this.sliderY;
    const ySize = this.blockSize / 1.5;

    this.brush.beginPath();
    this.brush.moveTo(this.renderRegion.width - xPos, yPos + ySize);
    this.brush.lineTo(this.renderRegion.width - xPos + xSize, yPos);
    this.brush.lineTo(this.renderRegion.width - xPos, yPos - ySize);
    this.brush.lineTo(this.renderRegion.width - xPos, yPos + ySize);
    this.brush.fill();
    this.brush.closePath();

    this.brush.beginPath();
    this.brush.moveTo(xPos, yPos + ySize);
    this.brush.lineTo(xPos - xSize, yPos);
    this.brush.lineTo(xPos, yPos - ySize);
    this.brush.lineTo(xPos, yPos + ySize);
    this.brush.fill();
    this.brush.closePath();
  }

  drawButton(color) {
    this.brush.fillStyle = color;

    this.brush.fillRect(
      this.xPad,
      this.renderRegion.height * 0.75,
      this.renderRegion.width - this.xPad * 2,
      this.renderRegion.height * 0.15
    );

    this.brush.font = `bold ${this.blockSize * 0.5}px sans-serif`;
    this.brush.fillStyle = this.theme.numberColor;

    this.brush.fillText(
      "Play",
      this.renderRegion.width / 2,
      this.renderRegion.height * 0.825
    );
  }

  getButtonBoundingBox() {
    return new BoundingBox(
      this.xPad / 2,
      this.renderRegion.height * 0.75,
      this.renderRegion.width - this.xPad,
      this.renderRegion.height * 0.15
    );
  }

  getSliderTapBoundingBoxes() {
    const ySize = this.blockSize / 1.5;
    const ySizeDoubled = ySize * 2;
    const topY = this.sliderY - ySize;
    const additionalPadding = this.blockSize / 2;

    return {
      previous: new BoundingBox(
        0,
        topY,
        this.xPad - additionalPadding,
        ySizeDoubled
      ),
      next: new BoundingBox(
        this.renderRegion.width - this.xPad + additionalPadding,
        topY,
        this.xPad - additionalPadding,
        ySizeDoubled
      )
    };
  }

  draw(value, x, y, end) {
    this.brush.textAlign = "center";
    this.brush.textBaseline = "middle";

    let blockColor = this.theme.defaultGray || "#808080";

    if (end && value > 0) {
      blockColor = this.theme
        .getLevelPalette(value)
        .numberColor.toString();
    }

    this.brush.font = `bold ${this.blockSize * 0.25}px sans-serif`;
    this.brush.fillStyle = this.theme.sliderColor;

    this.brush.fillText(
      "LEVEL",
      this.renderRegion.width / 2,
      this.renderRegion.height * 0.1
    );

    this.drawNumber(value, blockColor);
    this.drawLevelResults(value);
    this.drawSlider(value, x, y, this.theme.sliderColor);
    this.drawButton(blockColor);
  }

  redraw(value, x, y, end) {
    this.brush.clearRect(
      0,
      0,
      this.renderRegion.width,
      this.renderRegion.height
    );

    this.draw(value, x, y, end);
  }
}