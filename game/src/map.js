const FISHES = 200;

class Map {
    constructor(w, h) {
        this.width = w;
        this.height = h;

        this.fishes = [];

        for (let f = 0; f < FISHES; f++) 
        {
            this.fishes[f] = new Fish();
            this.fishes[f].color = "#D1798B";
            this.fishes[f].pos.set(Math.random() * w - (w/2), Math.random() * h - (h/2));
        }
    }

    update(player) {
        for (let f in this.fishes) 
        {
            this.fishes[f].follow(player.pos, this.fishes);
            this.fishes[f].update(this.fishes);
        }
    }

    render_background(camera, ctx) {

    }

    render(ctx) {
        for (let f in this.fishes) 
        {
            this.fishes[f].render(ctx);
        }
    }

    render_radar(player, camera, ctx) {
        ctx.strokeStyle = "#D1798B07";
        
        for (let f in this.fishes) 
        {
            let delta = this.fishes[f].pos.sub(player.pos);
            let dirangle = Math.atan2(delta.y, delta.x);

            let size = Math.PI * (0.0003 + 0.0001 * Math.min(Math.max(delta.length(), 300), 2000));
            ctx.lineWidth = (21 - (Math.min(20, delta.length() * 0.02))) * camera.dist * 1.0;

            let radius = 60 + Math.sin(time() * 3.5) * 3;

            ctx.beginPath();
            ctx.arc(player.pos.x, player.pos.y, radius * camera.dist, dirangle - size, dirangle + size);
            ctx.stroke();
            ctx.closePath();

        }
    }
}
