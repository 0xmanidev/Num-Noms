import PlayingState from "./PlayingState";
import RenderRegion from "../View/RenderRegion.js";
import TutorialRenderer from "../View/TutorialRenderer.js";

export default class TutorialState {
  constructor(game) {
    this.game = game;

    this.playingState = new PlayingState(game);

    const renderRegion = new RenderRegion(
      null,
      game.canvas.height * 0.005,
      null,
      game.canvas.height * 0.10
    );

    const tutorial = new TutorialRenderer(
      game.brush,
      renderRegion,
      game.config.theme.textColor,
      game.config.theme.textBackground
    );

    this.tutorial = tutorial;

    const afterInput =
      this.playingState.levelController.afterInput;

    // Draw tutorial content after level view is drawn
    const tutorialAfterInput = () => {
      afterInput();
      tutorial.draw();
    };

    this.playingState.levelController.afterInput =
      tutorialAfterInput;

    this.playingState.levelController.onInitialStateUp = null;
  }

  onEnter(context = {}) {
    context.level = this.tutorial.level =
      this.game.levels.get(1);

    this.playingState.onEnter(context);

    this.playingState.selectTransitionTapInputMethod.detach();

    this.tutorial.renderRegion.x =
      this.playingState.statusBar.renderRegion.x;

    this.tutorial.renderRegion.width =
      this.playingState.statusBar.renderRegion.width;

    this.tutorial.draw();
    this.tutorial.initial = false;
  }

  onLeave() {
    return this.playingState.onLeave();
  }
}