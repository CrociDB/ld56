class Game {
    constructor() {
        // Get DOM stuff
        this.canvas = gId("game");
        this.ctx = this.canvas.getContext('2d');

        // Create game components
        this.input = new Input(this.canvas);

        // Camera
        this.camera = new Camera(0, 0, 2, this.canvas.width / 2, this.canvas.height / 2);

        // Fish!
        this.fish = new Fish();
        this.fish.pos.set(0, 0);

        // Map
        this.map = new Map(20000, 20000);

        // Main loop
        window.requestAnimationFrame(this.update.bind(this));
    }
    
    update() {
        this.update_logic();
        this.update_render();
        
        window.requestAnimationFrame(this.update.bind(this));
    }

    update_logic() {
        if (this.input.key(Input.UP)) this.fish.thurst(3);
        if (this.input.key(Input.DOWN)) console.log("DOWN");
        if (this.input.key(Input.LEFT)) this.fish.turn(-.05);
        if (this.input.key(Input.RIGHT)) this.fish.turn(.05);

        if (this.input.key(65)) this.camera.dist += .03;
        if (this.input.key(83)) this.camera.dist -= .03;

        this.fish.update(this.map.fishes, 4);
        this.map.update(this.fish);
        this.camera.follow(this.fish.pos);
    }
    
    update_render() {
        // Clear screen
        this.ctx.fillStyle = "#2A454F";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // entities

        // camera
        this.ctx.save();
        this.camera.update(this.ctx);

        // player
        this.fish.render(this.ctx);

        // map
        this.map.render(this.ctx);
        this.map.render_radar(this.fish, this.camera, this.ctx);
        

        this.ctx.restore();
    }
}

(function() {
    new Game();
})();
