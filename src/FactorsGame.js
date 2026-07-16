import TutorialState from "./States/TutorialState.js";
import PlayingState from "./States/PlayingState.js";
import CompleteState from "./States/CompleteState.js";
import SelectState from "./States/SelectState.js";

import Levels from "./Model/game/Levels.js";
import XSPRNG from "./Model/random/XSPRNG.js";

import OptimizedStorageManager from "./Storage/OptimizedStorageManager.js";
import Score from "./Storage/Score.js";

import NightRainbowTheme from "./View/Themes/NightRainbowTheme.js";

export default class FactorsGame {
  constructor(levels, config, storageManager, score, canvas) {
    this.levels = levels;
    this.config = config;
    this.storageManager = storageManager;
    this.score = score;
    this.canvas = canvas;

    this.brush = canvas.getContext("2d");

    this.brush.clearAll = () => {
      this.brush.clearRect(0, 0, canvas.width, canvas.height);
    };

    this.states = {
      TUTORIAL: new TutorialState(this),
      PLAYING: new PlayingState(this),
      COMPLETE: new CompleteState(this),
      SELECT: new SelectState(this)
    };

    this.state = null;
  }

  start() {
    const completedTutorial =
      this.score.totalLevelsPlayed() > 0;

    this.transition(
      completedTutorial || !this.config.showTutorial
        ? "PLAYING"
        : "TUTORIAL"
    );
  }

  transition(nextState) {
    let context;

    if (this.state) {
      context = this.state.onLeave();
    }

    if (this.states[nextState]) {
      this.state = this.states[nextState];
    }

    this.onStateChange(nextState, context);

    this.state.onEnter(context);
  }

  isComplete() {
    return (
      this.score.totalLevelsPlayed() >=
      this.config.levelLimit
    );
  }

  levelIsAvailable(levelNumber) {
    return (
      levelNumber > 0 &&
      levelNumber <=
        Math.min(
          this.score.totalLevelsPlayed() + 1,
          this.config.levelLimit
        )
    );
  }

  onStateChange(nextState, context) {}

  static init(canvas, config = {}) {
    this.configure(config);

    const levels = new Levels(
      new XSPRNG(1),
      config.theme
    );

    let storageManager;

    try {
      storageManager =
        new OptimizedStorageManager(
          config.storageMethod,
          config.storagePrefix
        );
    } catch (e) {
      // Temporary in-memory storage fallback
      config.storageMethod = {
        data: {},

        setItem(key, value) {
          this.data[key] = value;
        },

        getItem(key) {
          return this.data[key];
        }
      };

      storageManager =
        new OptimizedStorageManager(
          config.storageMethod,
          config.storagePrefix
        );
    }

    const score = new Score(() => {
      return storageManager.getLevelResults();
    });

    return new FactorsGame(
      levels,
      config,
      storageManager,
      score,
      canvas
    );
  }

  static configure(config) {
    const isPositiveInt = (number) => {
      return (
        (((number ^ 0) === number) && number > 0) ||
        number === Number.POSITIVE_INFINITY
      );
    };

    config.levelLimit = isPositiveInt(config.levelLimit)
      ? config.levelLimit
      : 256;

    config.storageMethod =
      config.storageMethod || localStorage;

    config.storagePrefix =
      config.storagePrefix || "factors_";

    config.showTutorial =
      config.showTutorial !== undefined
        ? config.showTutorial
        : true;

    config.theme =
      config.theme || new NightRainbowTheme();

    config.changeDocumentTextColor =
      config.changeDocumentTextColor !== undefined
        ? config.changeDocumentTextColor
        : false;

    config.statusBarOffsetTop =
      config.statusBarOffsetTop || 0;
  }
}