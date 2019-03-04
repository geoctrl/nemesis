class HeroScript {
  start() {

  }

  update() {

  }
}

const testGame = [
  {
    scripts: [new HeroScript()],
  },
];


class Engine {
  run(game, config) {
    this.startTime = Date.now();
    this.logger('Game Started');
    this.game = game;
    this.config = config;
    game.forEach(item => {
      item.scripts.forEach(script => script.start())
    })
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

const engine = new Engine();

engine.run(testGame);

engine.stop()
