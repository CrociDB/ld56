class Game {
  constructor() {
    Game.instance = this;

    // Get DOM stuff
    this.canvas = gId("game");
    this.ctx = this.canvas.getContext("2d");

    // Create game components
    this.input = new Input(this.canvas);
    this.particles = new ParticleManager(this.ctx);

    // Camera
    this.camera = new Camera(
      0,
      0,
      .5,
      this.canvas.width / 2,
      this.canvas.height / 2,
    );

    this.initialized = false;
    this.currentLevel = 2;
    this.level = LEVELS[this.currentLevel];
  }

  initLevel() {
    // Map
    this.map = new GameMap(this.level);
    this.initialized = true;
  }

  nextLevel() {
    this.currentLevel = (this.currentLevel + 1) % LEVELS.length;
    this.level = LEVELS[this.currentLevel];
    this.initialized = false;
  }

  update_logic() {
    if (!this.initialized) {
      if (this.input.anykey()) {
        this.initLevel();
      }
    } else {
      this.map.update(this.fish);
    }

    this.particles.update();
  }

  update_render() {
    this.ctx.save();

    // Clear screen
    this.ctx.fillStyle = "#842B20";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.initialized) {
      this.ctx.font = "70px 'Spicy Rice'";
      this.ctx.fillStyle = "#ffaaaa";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        this.level.title,
        this.canvas.width / 2,
        this.canvas.height / 2 - 40,
      );

      this.ctx.font = "30px 'Amatic SC'";
      this.ctx.fillStyle = "#aaaaaa";
      this.ctx.fillText(
        this.level.desc,
        this.canvas.width / 2,
        this.canvas.height / 2,
      );

      this.ctx.fillText(
        "Press any key to continue...",
        this.canvas.width / 2,
        this.canvas.height / 2 + 300,
      );
      this.ctx.restore();
      return;
    }

    this.camera.update(this.ctx);
    this.map.render(this.ctx);

    // particles
    this.particles.render();

    this.ctx.restore();

    // hud
    this.renderHud();
  }

  renderHud() {
    if (this.initialized) {
      this.map.renderHud(this.ctx);
    }
  }

  gameOver() {
    let that = this;
    this.map.camera_dist_target = .8;
    co(function* () {
      that.particles.emit(
        that.map.fish.pos.x,
        that.map.fish.pos.y,
        0.05,
        100,
        "red",
      );
      that.camera.shake(40, 200);
      yield 1.0;
      that.initialized = false;
      // yield 1.0;
      // that.initLevel();
    });

    playaudio(SOUNDS.game_over);
  }

  levelWin() {
    let that = this;
    this.map.camera_dist_target = .8;
    this.camera.pos.set(this.map.goal.pos.x, this.map.goal.pos.y);
    co(function* () {
      for (let i = 0; i < 9; i++) {
        playaudio(SOUNDS.explosion);
        that.particles.emit(
          that.camera.pos.x - (Math.random() * 800) + 400,
          that.camera.pos.y - (Math.random() * 800) + 400,
          0.05,
          80,
          "#AAFFAA",
        );
        that.camera.shake(50, 300);
        yield .3;
      }
      that.nextLevel();

      playaudio(SOUNDS.win);
    });
  }
  
}
