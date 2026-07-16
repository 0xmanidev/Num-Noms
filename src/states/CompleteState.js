import RenderRegion from "../View/RenderRegion.js";
import LevelCompleteAnimation from "../View/LevelCompleteAnimation.js";
import LevelCompleteView from "../View/LevelCompleteView.js";

import LevelCompleteController from "../Input/LevelCompleteController.js";
import TapInput from "../Input/TapInput.js";
import TapRegion from "../Input/TapRegion.js";
import BoundingBox from "../Input/BoundingBox.js";
import KeyboardInput from "../Input/KeyboardInput.js";
import SwipeInput from "../Input/SwipeInput.js";

export default class CompleteState {
  constructor(game) {
    this.game = game;

    const renderRegion = new RenderRegion(
      0,
      0,
      game.canvas.width,
      game.canvas.height
    );

    this.animation = new LevelCompleteAnimation(
      game.brush,
      renderRegion
    );

    this.completeView = new LevelCompleteView(
      game.brush,
      renderRegion,
      game.config.theme.numberColor
    );

    this.levelCompleteController =
      new LevelCompleteController(
        game.storageManager,
        (levelNumber, playing) => {
          this.nextLevel = game.levels.get(levelNumber);

          game.transition(
            playing ? "PLAYING" : "SELECT"
          );
        }
      );

    this.levelCompleteController.levelLimit =
      game.config.levelLimit;

    // Tap regions for retry and next
    const leftTapRegion = new TapRegion(
      new BoundingBox(
        0,
        renderRegion.height * 0.825,
        renderRegion.width * 0.5 - 1,
        renderRegion.height * 0.1
      ),
      () => {
        this.levelCompleteController.left();
      }
    );

    const rightTapRegion = new TapRegion(
      new BoundingBox(
        renderRegion.width * 0.5 + 1,
        renderRegion.height * 0.825,
        renderRegion.width * 0.5 - 1,
        renderRegion.height * 0.1
      ),
      () => {
        this.levelCompleteController.right();
      }
    );

    this.tapInputMethod = new TapInput(
      game.canvas,
      [leftTapRegion, rightTapRegion]
    );

    this.keyboardInputMethod =
      new KeyboardInput(this.levelCompleteController);

    this.swipeInputMethod =
      new SwipeInput(
        game.canvas,
        this.levelCompleteController
      );
  }

  onEnter(context) {
    const result = {
      level: context.level.getNumber(),
      path: context.level.puzzle.history,
      endNumber: context.level.puzzle.number
    };

    try {
      const currentResult =
        this.game.storageManager.getLevelResult(
          result.level
        );

      if (
        result.endNumber < currentResult.endNumber ||
        (
          result.endNumber === currentResult.endNumber &&
          result.path.length <= currentResult.path.length
        )
      ) {
        this.game.storageManager.setLevelResult(
          result.level,
          result
        );
      }
    } catch (e) {
      this.game.storageManager.setLevelResult(
        result.level,
        result
      );

      if (
        result.level <
        this.game.config.levelLimit
      ) {
        this.game.storageManager
          .incrementCurrentLevel();
      }
    }

    this.levelView = context.levelView;

    this.completeView.level = context.level;
    this.completeView.score = this.game.score;

    this.animation.level = context.level;
    this.animation.levelView = context.levelView;
    this.animation.statusBar = context.statusBar;

    this.levelCompleteController.level =
      context.level;

    const completeView = this.completeView;
    const keyboardInputMethod =
      this.keyboardInputMethod;
    const swipeInputMethod =
      this.swipeInputMethod;
    const tapInputMethod =
      this.tapInputMethod;

    this.animation.run(() => {
      completeView.draw();

      // Listen after animation
      keyboardInputMethod.listen();
      swipeInputMethod.listen();
      tapInputMethod.listen();
    });
  }

  onLeave() {
    this.keyboardInputMethod.detach();
    this.swipeInputMethod.detach();
    this.tapInputMethod.detach();

    this.levelView.level = this.nextLevel;

    return {
      level: this.nextLevel,
      levelView: this.levelView
    };
  }
}