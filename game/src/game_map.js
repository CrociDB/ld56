class GameMap {
  constructor(level) {
    this.level = level;
    this.size = this.level.size;
    this.goal = this.level.goal;

    this.fishes = [];

    for (let f = 0; f < this.level.fish; f++) {
      this.fishes[f] = new Fish();
      this.fishes[f].color = "#D1798B";
      this.fishes[f].pos.set(
        Math.random() * this.size - this.size / 2,
        Math.random() * this.size - this.size / 2,
      );
    }
  }

  update(player) {
    for (let f in this.fishes) {
      if (!this.fishes[f].active) continue;
      this.fishes[f].follow(player.pos, this.fishes);
      this.fishes[f].update(this);
    }
  }

  render_background(camera, ctx) {
    ctx.fillStyle = "#2A454F";
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = "#43707F";

    const distance = 150;
    const lines = this.size * 2 / distance;
    for (let i = 1; i < lines; i++) {
      ctx.beginPath();
      let x = (i - (lines / 2)) * distance;
      ctx.moveTo(x, -this.size);
      ctx.lineTo(x, this.size);
      ctx.stroke();

      ctx.beginPath();
      let y = (i - (lines / 2)) * distance;
      ctx.moveTo(-this.size, y);
      ctx.lineTo(this.size, y);
      ctx.stroke();
    }
    
  }

  render(ctx) {
    // goal
    ctx.fillStyle = "#417F68";
    ctx.beginPath();
    ctx.arc(this.goal.pos.x, this.goal.pos.y, this.goal.size, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();

    for (let f in this.fishes) {
      if (!this.fishes[f].active) continue;
      this.fishes[f].render(ctx);
    }
  }

  render_radar(player, camera, ctx) {
    ctx.strokeStyle = "#D1798B07";

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
}
