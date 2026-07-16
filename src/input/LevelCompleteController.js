
export default class LevelCompleteController {
  constructor(storageManager, onSelect, levelLimit, level) {
    this.storageManager = storageManager;
    this.onSelect = onSelect;
    this.levelLimit = levelLimit;
    this.level = level;
  }

  left() {
    if (typeof this.onSelect === "function") {
      this.onSelect(this.level.getNumber(), true);
    }
  }

  right() {
    let nextLevelNumber = this.level.getNumber() + 1;

    // Wrap back around if above limit
    if (this.levelLimit && nextLevelNumber > this.levelLimit) {
      nextLevelNumber = 1;
    }

    if (typeof this.onSelect === "function") {
      this.onSelect(nextLevelNumber, true);
    }
  }

  up() {
    if (typeof this.onSelect === "function") {
      this.onSelect(this.level.getNumber(), false);
    }
  }

  down() {}
}