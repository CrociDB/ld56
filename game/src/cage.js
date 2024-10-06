class Cage {
  constructor(c) {
    this.pos = c.pos;
    this.size = c.size;
    this.key = c.key;
    this.fishes = [];
    this.activated = false;
    this.destroyed = false;
    this.total_total = this.total = 1.0;
  }

  distToFish(fish) {
    return fish.pos.dist(this.pos);
  }

  addFish(fish) {
    this.fishes.push(fish);
    fish.my_cage = this;
    fish.in_cage = true;
  }

  update() {}

  render(ctx) {
    this.total = lerp(this.total, this.total_total, 0.05);
    if (this.destroyed) return;

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#996666";
    ctx.fillStyle = "#664444";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    let delta = this.key.sub(this.pos);
    let posout = this.pos.add(delta.normalize().muls(this.size));

    let p =
      this.total == 1
        ? this.key
        : delta
            .normalize()
            .muls(this.total * (delta.length() - this.size * 1.9));

    ctx.beginPath();
    ctx.moveTo(posout.x, posout.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.closePath();

    if (!this.activated) {
      ctx.fillStyle = "#88DD99";
      ctx.strokeStyle = "green";
      ctx.beginPath();
      ctx.arc(this.key.x, this.key.y, 30, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.arc(this.key.x, this.key.y, 30, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  hit() {
    let that = this;
    co(function* () {
      Game.instance.particles.emit(that.key.x, that.key.y, 0.05, 50, "#88DD99");
      playaudio(SOUNDS.key_picked);

      that.activated = true;
      let t = 8;
      for (let i = 0; i < t; i++) {
        that.total_total = (t - i) / t;
        yield 0.06;
      }

      for (let a = 0; a < 5; a++) {
        Game.instance.particles.emit(
          that.pos.x,
          that.pos.y,
          0.05,
          100,
          "#88DD99",
        );
      }

      playaudio(SOUNDS.cage_destroyed);
      that.destroyed = true;
      for (let f of that.fishes) {
        f.in_cage = false;
        f.my_cage = null;
      }
    });
  }
}
