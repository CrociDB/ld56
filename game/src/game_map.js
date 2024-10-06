class GameMap {
  constructor(level) {
    this.level = level;
    this.size = this.level.size;
    this.goal = this.level.goal;

    this.fishes = [];

    let fc = 0;
    for (let sp of this.level.fish_spawn_points) {
      for (
        let f = 0;
        f < this.level.fish / this.level.fish_spawn_points.length;
        f++
      ) {
        this.fishes[fc] = new Fish();
        this.fishes[fc].color = "#D1798B";
        this.fishes[fc].pos.set(
          sp.pos.x + Math.random() * sp.size - sp.size / 2,
          sp.pos.y + Math.random() * sp.size - sp.size / 2,
        );
        fc++;
      }
    }

    // Fish!
    this.fish = new Fish();
    this.fish.is_player = true;
    this.fish.pos.set(this.level.spawn.x, this.level.spawn.y);
    Game.instance.camera.pos = this.fish.pos.muls(1);
    Game.instance.camera.dist = 0.5;

    // Bumpers
    this.bumpers = [];
    if (this.level.bumpers != undefined) {
      for (let bp of this.level.bumpers) {
        this.bumpers.push(new Bumper(bp));
      }
    }

    // Gravitators
    this.gravitators = [];
    if (this.level.gravitators != undefined) {
      for (let gp of this.level.gravitators) {
        this.gravitators.push(new Gravitator(gp));
      }
    }
    
    // Cages
    this.cages = [];
    if (this.level.cages != undefined) {
      for (let c of this.level.cages) {
        let cage = new Cage(c);
        this.cages.push(cage);
        for (let f of this.fishes) {
          if (cage.distToFish(f) < c.size) {
            cage.addFish(f);
          }
        }
      }
    }

    this.health = 1;
    this.saved = 0;
    this.camera_dist_target = this.level.camera_dist;

    playaudio(SOUNDS.level_start);
  }

  update() {
    if (!this.fish.dead) {
      for (let f in this.fishes) {
        if (!this.fishes[f].active) continue;
        this.fishes[f].follow(this.fish.pos, this.fishes);
        this.fishes[f].update(this);
      }

      if (Game.instance.input.key(Input.UP)) this.fish.thurst(3);
      if (Game.instance.input.key(Input.DOWN)) console.log("DOWN");
      if (Game.instance.input.key(Input.LEFT)) this.fish.turn(-0.05);
      if (Game.instance.input.key(Input.RIGHT)) this.fish.turn(0.05);

      if (Game.instance.input.key(65)) Game.instance.camera.dist += 0.03;
      if (Game.instance.input.key(83)) Game.instance.camera.dist -= 0.03;

      if (Game.instance.input.key(Input.SPACE)) {
        this.particles.emit(this.fish.pos.x, this.fish.pos.y, 0.1, 50);
        Game.instance.camera.shake(100, 500);
      }

      this.fish.update(this, 4);
      Game.instance.camera.follow(this.fish.pos);

      this.health = this.fishAlive() / this.level.fish;
      this.saved = this.fishSaved() / this.level.fish;

      if (this.health < this.level.finish) {
        this.fish.dead = true;
        Game.instance.gameOver();
      }

      if (this.saved >= this.level.finish) {
        this.fish.dead = true;
        Game.instance.levelWin();
      }
    }

    for (let bp of this.bumpers) {
      bp.update();
    }

    for (let gp of this.gravitators) {
      gp.update();
    }

    for (let c of this.cages) {
      c.update();
    }

    Game.instance.camera.dist = lerp(
      Game.instance.camera.dist,
      this.camera_dist_target,
      0.05,
    );
  }

  render_background(camera, ctx) {
    ctx.fillStyle = "#2A454F";
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = "#43707F";

    const distance = 150;
    const lines = (this.size * 2) / distance;
    for (let i = 1; i < lines; i++) {
      ctx.beginPath();
      let x = (i - lines / 2) * distance;
      ctx.moveTo(x, -this.size);
      ctx.lineTo(x, this.size);
      ctx.stroke();

      ctx.beginPath();
      let y = (i - lines / 2) * distance;
      ctx.moveTo(-this.size, y);
      ctx.lineTo(this.size, y);
      ctx.stroke();
    }
  }

  render(ctx) {
    this.render_background(Game.instance.camera, ctx);

    // goal
    ctx.fillStyle = "#417F68";
    ctx.beginPath();
    ctx.arc(this.goal.pos.x, this.goal.pos.y, this.goal.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    const lines = 5;
    const dist = this.goal.size / lines;
    for (let i = 0; i < 5; i++) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#60BD82";
      ctx.beginPath();
      ctx.arc(
        this.goal.pos.x,
        this.goal.pos.y,
        mod(i * dist - Game.instance.frames, this.goal.size),
        0,
        2 * Math.PI,
      );
      ctx.stroke();
      ctx.closePath();
    }

    for (let bp of this.bumpers) {
      bp.render(ctx);
    }

    for (let gp of this.gravitators) {
      gp.render(ctx);
    }

    for (let c of this.cages) {
      c.render(ctx);
    }

    // player
    if (!this.fish.dead) {
      for (let f in this.fishes) {
        if (!this.fishes[f].active) continue;
        this.fishes[f].render(ctx);
      }

      this.fish.render(ctx);
      this.render_radar(this.fish, Game.instance.camera, ctx);
    }
  }

  renderHud(ctx) {
    ctx.fillStyle = "#222222";

    let w = Game.instance.canvas.width - 100;
    ctx.fillRect(50, Game.instance.canvas.height - 50, w, 20);
    ctx.fillStyle = "#444477";
    ctx.fillRect(50, Game.instance.canvas.height - 50, w * this.health, 20);
    ctx.fillStyle = "#447755";
    ctx.fillRect(50, Game.instance.canvas.height - 50, w * this.saved, 20);
    ctx.fillRect(
      50 + w * this.level.finish - 10,
      Game.instance.canvas.height - 50,
      10,
      20,
    );

    ctx.font = "20px 'Amatic SC'";
    ctx.fillStyle = "#aaaaaa";
    ctx.fillText(
      "Fish left to save: " + parseInt(Math.ceil((this.level.finish * this.level.fish) - this.fishSaved())),
      115 + w * this.level.finish - 10,
      Game.instance.canvas.height - 33,
    );
    
    ctx.font = "40px 'Spicy Rice'";
    ctx.fillStyle = "#aaaaaa";
    ctx.fillText(
      `${Game.instance.currentLevel + 1}`,
      Game.instance.canvas.width / 2,
      60,
    );
  }

  render_radar(player, camera, ctx) {
    ctx.strokeStyle = "#D1798B20";

    for (let f in this.fishes) {
      if (!this.fishes[f].active) continue;
      let delta = this.fishes[f].pos.sub(player.pos);
      let dirangle = Math.atan2(delta.y, delta.x);

      let size =
        Math.PI *
        (0.0003 + 0.0001 * Math.min(Math.max(delta.length(), 300), 2000));
      ctx.lineWidth =
        (21 - Math.min(20, delta.length() * 0.02)) * camera.dist * 1.0;

      let radius = 60 + Math.sin(time() * 3.5) * 3;

      ctx.beginPath();
      ctx.arc(
        player.pos.x,
        player.pos.y,
        radius * camera.dist,
        dirangle - size,
        dirangle + size,
      );
      ctx.stroke();
      ctx.closePath();
    }
  }

  fishAlive() {
    return this.fishes.filter((f) => !f.dead).length;
  }

  fishSaved() {
    return this.fishes.filter((f) => f.saved).length;
  }

  // FX and stuff
  fishDie(fish) {
    Game.instance.particles.emit(fish.pos.x, fish.pos.y, 0.05, 20, "#FF7777");
    Game.instance.camera.shake(20, 100);
    playaudio(SOUNDS.death);
  }

  fishSave(fish) {
    Game.instance.particles.emit(fish.pos.x, fish.pos.y, 0.1, 30, "#99FF99");
    Game.instance.camera.shake(20, 60);
    playaudio(SOUNDS.fish_saved);
  }
}
