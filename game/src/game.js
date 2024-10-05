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
      2,
      this.canvas.width / 2,
      this.canvas.height / 2,
    );

    this.initialized = false;
    this.level = LEVELS[0];
  }

  initLevel() {
    // Map
    this.map = new GameMap(this.level);
    this.initialized = true;
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
      this.ctx.fillStyle = "#842B20";
      this.ctx.textAlign = "center";
      this.ctx.fillText(this.level.title, this.canvas.width / 2, this.canvas.height / 2 - 40);


      this.ctx.font = "30px 'Amatic SC'";
      this.ctx.fillStyle = "#aaaaaa";
      this.ctx.fillText(this.level.desc, this.canvas.width / 2, this.canvas.height / 2);

      this.ctx.fillText("Press any key to continue...", this.canvas.width / 2, this.canvas.height / 2 + 300);
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
}
