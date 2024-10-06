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
      0.5,
      this.canvas.width / 2,
      this.canvas.height / 2,
    );

    this.initialized = false;
    this.currentLevel = 0;
    this.level = LEVELS[this.currentLevel];

    this.frames = 0;

    this.goToMenu();
  }

  goToMenu() {
    let that = this;
    co(function*() {
      that.playMusic(22050);
      that.menu = true;
      that.menu_background = 1;
      that.menu_moving = true;
      yield .1;
      that.menu_moving = false;
    });
  }

  playMusic(freq) {
    console.dir(freq);
    if (this.pzmusic == undefined) {
      this.pzmusic = new Pizzicato.Sound(
        {
          source: "file",
          options: {
            path: "./music/main.ogg",
            loop: true,
          },
        },
        this.playMusic.bind(this, freq),
      );

      this.musicLowPass = new Pizzicato.Effects.LowPassFilter({
        frequency: 400,
        peak: 10,
      });

      this.pzmusic.addEffect(this.musicLowPass);
    } else {
      this.setFreqLowPass(freq);
      this.pzmusic.play();
    }
  }

  setFreqLowPass(v) {
    let value = parseFloat(v);

    if (isFinite(value)) {
      this.musicLowPass.filterNode.frequency.value = value;
    }
  }

  stopMusic() {
    if (this.pzmusic != undefined) {
      this.pzmusic.stop();
    }
  }

  initLevel() {
    // Map
    this.map = new GameMap(this.level);
    this.initialized = true;
    this.playMusic(22050);
  }

  nextLevel() {
    this.playMusic(100);
    this.currentLevel = (this.currentLevel + 1) % LEVELS.length;
    this.level = LEVELS[this.currentLevel];
    this.initialized = false;
  }

  update_logic() {
    this.frames++;

    if (this.menu) {
      if (this.input.anykey() && !this.menu_moving) {
        this.closeMenu();
      }
      return;
    }

    if (!this.initialized) {
      if (this.input.key(Input.ESCAPE)) {
        this.goToMenu();
      } else if (this.input.anykey()) {
        this.initLevel();
      }
    } else {
      this.map.update(this.fish);
    }

    this.particles.update();
  }

  update_render() {
    this.ctx.save();

    if (this.menu) {
      this.ctx.fillStyle = `rgb(${this.menu_background * 45}, ${this.menu_background * 87}, ${this.menu_background * 104})`;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = `rgb(${this.menu_background * 132}, ${this.menu_background * 43}, ${this.menu_background * 32})`;
      this.ctx.beginPath();
      this.ctx.arc(
        this.canvas.width / 2,
        this.canvas.height / 2,
        300,
        0,
        2 * Math.PI,
      );
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.font = "300px 'Spicy Rice'";
      this.ctx.fillStyle = "#aa8888";
      this.ctx.textAlign = "center";
      const t = "Fish\nRescue";
      const text = t.split("\n");
      for (let t in text) {
        const x =
          t % 2 == 0
            ? -Math.pow(1 - this.menu_background, 3)
            : Math.pow(1 - this.menu_background, 3) * 0.7;
        this.ctx.fillText(
          text[t],
          this.canvas.width / 2 + x * 180,
          this.canvas.height / 2 + t * 200 - 50,
        );
      }

      this.ctx.font = "30px 'Amatic SC'";
      this.ctx.fillStyle = "#ffaaaa";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "a game by Bruno Croci",
        this.canvas.width / 2,
        this.canvas.height / 2 +
          220 +
          Math.pow(1 - this.menu_background, 5) * 200,
      );

      this.ctx.fillText(
        "Press any key to play",
        this.canvas.width / 2,
        this.canvas.height / 2 +
          370 +
          Math.pow(1 - this.menu_background, 5) * 100,
      );

      return;
    }

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
      let text = this.level.desc.split("\n");
      for (let t in text) {
        this.ctx.fillText(
          text[t],
          this.canvas.width / 2,
          this.canvas.height / 2 + t * 30,
        );
      }
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
    if (this.initialized && !this.map.fish.dead) {
      this.map.renderHud(this.ctx);
    }
  }

  gameOver() {
    this.stopMusic();
    let that = this;
    this.map.camera_dist_target = 0.8;
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
      that.playMusic(100);
    });

    playaudio(SOUNDS.game_over);
  }

  levelWin() {
    this.stopMusic();
    playaudio(SOUNDS.win);
    let that = this;
    this.camera.pos.set(this.map.goal.pos.x, this.map.goal.pos.y);
    co(function* () {
      yield 0.2;
      that.map.camera_dist_target = 0.8;
      yield 0.1;
      for (let i = 0; i < 9; i++) {
        playaudio(SOUNDS.explosion);
        that.particles.emit(
          that.camera.pos.x - Math.random() * 800 + 400,
          that.camera.pos.y - Math.random() * 800 + 400,
          0.05,
          80,
          "#AAFFAA",
        );
        that.camera.shake(50, 300);
        yield 0.3;
      }
      that.nextLevel();
    });
  }

  closeMenu() {
    let that = this;
    this.menu_moving = true;
    playaudio(SOUNDS.menu_play);
    co(function* () {
      yield 0.2;
      let t = 60;
      for (let i = 0; i < t; i++) {
        that.menu_background = lerp(that.menu_background, 0, i / t);
        yield 0.04;
      }
      that.menu = false;
      that.menu_moving = false;
      that.playMusic(100);
    });
  }
}
