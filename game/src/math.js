class V2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        let v = new V2d();
        v.x = this.x + other.x;
        v.y = this.y + other.y;
        return v;
    }

    sub(other) {
        let v = new V2d();
        v.x = this.x - other.x;
        v.y = this.y - other.y;
        return v;
    }

    mulv(other) {
        let v = new V2d();
        v.x = this.x * other.x;
        v.y = this.y * other.y;
        return v;
    }

    muls(other) {
        let v = new V2d();
        v.x = this.x * other;
        v.y = this.y * other;
        return v;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    dist(other) {
        return Math.abs(this.sub(other).length());
    }

    opp(other) {
        let delta = this.sub(other);
        return this.add(delta);
    }

    normalize() {
        let v = new V2d();
        let l = this.length();
        v.x = this.x / l;
        v.y = this.y / l;
        return v;
    }

    lengthsqrt() {
        return this.x * this.x + this.y * this.y;
    }

    setAngle(a) {
        let l = this.length();
        this.x = Math.cos(a) * l;
        this.y = Math.sin(a) * l;
        return this;
    }
}