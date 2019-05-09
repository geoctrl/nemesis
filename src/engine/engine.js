const testScene = {
  assets: [],
  backgroundColor: '',
}

const testGame = {
  initScene: 0,
  scenes: [testScene, testScene, testScene],
};


class Engine {
  run(game, config) {
    this.startTime = Date.now();
    this.logger('Game Started');
    this.game = testGame;
    this.config = config;
    this.game.scenes[this.game.initScene].scripts
  }

  restart() {
    this.startTime = Date.now();
  }

  stop() {
    this.logger(`Game Stopped`)
  }

  logger(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message} - ${Date.now() - this.startTime}ms`);
  }
}

export const engine = new Engine();