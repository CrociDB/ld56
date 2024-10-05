class Camera {
    constructor(x, y, d, ox, oy) {
        this.pos = new V2d(x, y);
        this.dist = d;
        this.offset = new V2d(ox, oy);
    }

    follow(target) {
        this.pos.x = lerp(this.pos.x, target.x, 0.08);
        this.pos.y = lerp(this.pos.y, target.y, 0.08);
    }

    update(ctx) {
        let s = 1 / this.dist;

        let o = this.offset.muls(this.dist);

        ctx.scale(s, s);
        ctx.translate(
            this.offset.x * this.dist - this.pos.x, 
            this.offset.y * this.dist - this.pos.y);
    }
}
