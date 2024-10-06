class Bumper {
  constructor(bp) {
    this.pos = bp.pos;
    this.target_size = bp.size;
    this.size = this.target_size / 2;
  }

  update() {
    this.size = lerp(this.size, this.target_size, 0.08);
  }

  render(ctx) {
    ctx.fillStyle = "#31688F";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  hit() {
    this.size = this.target_size * 1.3;
    playaudio(SOUNDS.bump);
  }
}
