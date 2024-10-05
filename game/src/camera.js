class Camera {
  constructor(x, y, d, ox, oy) {
    this.pos = new V2d(x, y);
    this.dist = d;
    this.offset = new V2d(ox, oy);

    this.shakeStrength = 0;
    this.shakeTimeMax = 0;
    this.shakeTime = 0;
  }

  shake(strength, time) {
    this.shakeStrength = strength;
    this.shakeTimeMax = this.shakeTime = time;
  }

  follow(target) {
    this.pos.x = lerp(this.pos.x, target.x, 0.08);
    this.pos.y = lerp(this.pos.y, target.y, 0.08);
  }

  update(ctx) {
    let s = 1 / this.dist;

    let o = this.offset.muls(this.dist);

    if (this.shakeTime > 0) {
      this.shakeTime--;
      this.shakeStrength = lerp(
        0,
        this.shakeStrength,
        this.shakeTime / this.shakeTimeMax,
      );
    }

    const shakeOffsetX = this.shakeStrength * Math.random();
    const shakeOffsetY = this.shakeStrength * Math.random();

    ctx.scale(s, s);
    ctx.translate(
      (this.offset.x + shakeOffsetX) * this.dist - this.pos.x,
      (this.offset.y + shakeOffsetY) * this.dist - this.pos.y,
    );
  }
}
