class Gravitator {
  constructor(gp) {
    this.pos = gp.pos;
    this.size = gp.size;
  }

  update() {}

  render(ctx) {
    ctx.fillStyle = "#210403";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    const lines = 3;
    const dist = this.size / lines;
    for (let i = 0; i < 5; i++) {
      ctx.lineWidth = 10;
      ctx.strokeStyle = "#A37a64";
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, mod(i * dist - Game.instance.frames, this.size), 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }
  }

  hit() {
    playaudio(SOUNDS.bump);
  }
}
