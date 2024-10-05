class Game {
  constructor() {
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

    // Fish!
    this.fish = new Fish();
    this.fish.is_player = true;
    this.fish.pos.set(0, 0);

    // Map
    this.map = new Map(2000);

    // Main loop
    window.requestAnimationFrame(this.update.bind(this));
  }

  update() {
    this.update_logic();
    this.update_render();

    window.requestAnimationFrame(this.update.bind(this));
  }

  update_logic() {
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
  }

  update_render() {
    // Clear screen
    this.ctx.fillStyle = "#842B20";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // entities

    // camera
    this.ctx.save();
    this.camera.update(this.ctx);

    // map background
    this.map.render_background(this.camera, this.ctx);

    // player
    this.fish.render(this.ctx);

    // map
    this.map.render(this.ctx);
    this.map.render_radar(this.fish, this.camera, this.ctx);

    // particles
    this.particles.render();

    this.ctx.restore();
  }

  // FX and stuff
  fishDie(fish) {
      this.particles.emit(fish.pos.x, fish.pos.y, 0.1, 30);
      this.camera.shake(20, 100);
  }
}

let game = new Game();
