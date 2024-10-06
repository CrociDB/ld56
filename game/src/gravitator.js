class Gravitator {
  constructor(gp) {
    this.pos = gp.pos;
    this.original_size = this.size = gp.size;
    this.growing = (gp.growing != undefined ? gp.growing : 0);
    this.t = 0;
  }

  update() {
    this.t += 0.016;
    this.size = this.original_size + (Math.sin(this.t * .3) + 1.0) * .3 * this.growing * this.original_size;
  }

  render(ctx) {
    ctx.fillStyle = "#210403";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    const lines = 3;
    const dist = this.size / lines;
    for (let i = 0; i < lines; i++) {
      let p = (mod((lines-i)-this.t, lines)/ lines);
      ctx.lineWidth = 10;
      ctx.strokeStyle = "#A37a64";
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, p * this.size, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }
  }

  hit() {
    playaudio(SOUNDS.bump);
  }
}
