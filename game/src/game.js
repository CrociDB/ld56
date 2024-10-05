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

    this.health = 1;
    this.saved = 0;
    this.level = LEVELS[0];
  }

  initLevel() {
    // Fish!
    this.fish = new Fish();
    this.fish.is_player = true;
    this.fish.pos.set(this.level.spawn.x, this.level.spawn.y);

    // Map
    this.map = new GameMap(this.level);
    this.initialized = true;
  }

  update_logic() {
    if (!this.initialized) {
      if (this.input.anykey()) {
        this.initLevel();
      }
      return;
    }

    if (this.input.key(Input.UP)) this.fish.thurst(3);
    if (this.input.key(Input.DOWN)) console.log("DOWN");
    if (this.input.key(Input.LEFT)) this.fish.turn(-0.05);
    if (this.input.key(Input.RIGHT)) this.fish.turn(0.05);

    if (this.input.key(65)) this.camera.dist += 0.03;
    if (this.input.key(83)) this.camera.dist -= 0.03;

    if (this.input.key(Input.SPACE)) {
      this.particles.emit(this.fish.pos.x, this.fish.pos.y, 0.1, 50);
      this.camera.shake(100, 500);
    }

    this.fish.update(this.map, 4);
    this.map.update(this.fish);
    this.camera.follow(this.fish.pos);
    this.particles.update();

    this.health = this.map.fishAlive() / this.level.fish;
    this.saved = this.map.fishSaved() / this.level.fish;
  }

  update_render() {
    this.ctx.save();

    if (!this.initialized) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


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

    // Clear screen
    this.ctx.fillStyle = "#842B20";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // entities

    // camera
    this.camera.update(this.ctx);

    // map background
    this.map.render_background(this.camera, this.ctx);

    // map
    this.map.render(this.ctx);
    this.map.render_radar(this.fish, this.camera, this.ctx);

    // player
    this.fish.render(this.ctx);

    // particles
    this.particles.render();

    this.ctx.restore();

    // hud
    this.renderHud();
  }

  renderHud() {
    this.ctx.fillStyle = "#222222";

    let w = this.canvas.width - 100;
    this.ctx.fillRect(50, this.canvas.height - 50, w, 20);
    this.ctx.fillStyle = "#444477";
    this.ctx.fillRect(50, this.canvas.height - 50, w * this.health, 20);
    this.ctx.fillStyle = "#447755";
    this.ctx.fillRect(50, this.canvas.height - 50, w * this.saved, 20);
    this.ctx.fillRect(
      50 + w * this.level.finish - 10,
      this.canvas.height - 50,
      10,
      20,
    );
  }

  // FX and stuff
  fishDie(fish) {
    this.particles.emit(fish.pos.x, fish.pos.y, 0.05, 20, "#FFBBBB");
    this.camera.shake(20, 100);
  }

  fishSave(fish) {
    this.particles.emit(fish.pos.x, fish.pos.y, 0.1, 30, "#99FF99");
    this.camera.shake(20, 60);
  }
}
