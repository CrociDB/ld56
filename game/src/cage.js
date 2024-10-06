class Cage {
  constructor(c) {
    this.pos = c.pos;
    this.size = c.size;
    this.key = c.key;
    this.fishes = [];
    this.activated = false;
    this.destroyed = false;
    this.point = this.key;
    this.dir = this.key.sub(this.pos);
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
    if (this.destroyed) return;

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#996666";
    ctx.fillStyle = "#664444";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    let posout = this.pos.add(this.dir.normalize().muls(this.size));

    ctx.beginPath();
    ctx.moveTo(posout.x, posout.y);
    ctx.lineTo(this.point.x, this.point.y);
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
      yield .2;

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
