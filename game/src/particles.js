const PARTICLES_IN_SYSTEM = 60;
const PARTICLE_SIZE = 6;
const PARTICLE_SIZE_HALF = PARTICLE_SIZE / 2;

class ParticlesSystem {
  constructor() {
    this.pos = new V2d(0, 0);
    this.active = false;
    this.particles = [];

    for (let i = 0; i < PARTICLES_IN_SYSTEM; i++) {
      let p = {
        pos: new V2d(0, 0),
        vel: new V2d(0, 0),
        acc: 0,
        dir: 0,
        lifetime: 0,
        active: false,
      };

      this.particles.push(p);
    }
  }

  emit(x, y, acc, lifetime) {
    this.active = true;

    this.pos.set(x, y);

    for (let p of this.particles) {
      p.active = true;

      p.pos.set(x, y);
      p.vel.set(0, 0);
      p.dir = Math.random() * 2 * Math.PI;
      p.acc = acc + Math.random() * 6;

      p.lifetime = lifetime + Math.random() * lifetime * 1.2;
    }
  }

  update() {
    for (let p of this.particles) {
      if (!p.active) continue;

      p.lifetime--;

      p.vel.x += Math.sin(p.dir) * p.acc;
      p.vel.y += Math.cos(p.dir) * p.acc;

      p.pos = p.pos.add(p.vel);
      p.vel = p.vel.muls(0.42);

      if (p.lifetime <= 0) p.active = false;
    }
  }

  render(ctx) {
    for (let p of this.particles) {
      if (!p.active) continue;

      ctx.fillStyle = "white";
      ctx.fillRect(p.pos.x - PARTICLE_SIZE_HALF, p.pos.y - PARTICLE_SIZE_HALF, PARTICLE_SIZE, PARTICLE_SIZE);
    }
  }
}

class ParticleManager {
  constructor(ctx) {
    this.ctx = ctx;
    this.systems = [];
  }

  emit(x, y, acc, lifetime) {
    let system = new ParticlesSystem();
    system.emit(x, y, acc, lifetime);
    this.systems.push(system);
  }

  update() {
    let remove = [];

    for (let s in this.systems) {
      let system = this.systems[s];
      system.update();
      if (!system.active) remove.push(s);
    }

    // TODO remove old systems
    for (const i in remove) this.systems.splice(i, 1);
  }

  render() {
    for (let system of this.systems) {
      system.render(this.ctx);
    }
  }
}
