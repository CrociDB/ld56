class Fish {
  constructor() {
    this.pos = new V2d(0, 0);
    this.vel = new V2d(0, 0);
    this.spd = 0.1;
    this.rot = 0;
    this.forward = new V2d(0, 0);
    this.time_offset = Math.random() * 20;

    this.color = "#A64B5D";

    this.cspeed = 0;
    this.cw = 0;

    this.direction = null;

    this.thrusting = false;
    this.is_player = false;
    this.active = true;
    this.dead = false;
    this.saved = false;

    this.in_cage = false;
    this.my_cage = null;
  }

  render(ctx) {
    ctx.save();

    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rot);

    let speed = 15;

    let sin =
      Math.sin((time() + this.time_offset) * speed) * Math.pow(this.cspeed, 2);
    let cos =
      Math.cos((time() + this.time_offset) * speed) * Math.pow(this.cspeed, 2);

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 7;
    ctx.lineCap = "round";

    // big central circle
    ctx.beginPath();
    ctx.arc(sin * 4.5, 0 - 10, 17, 0, 2 * Math.PI, false);
    ctx.arc(sin * 2.5, 0 - 20, 15, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();

    // side fins
    ctx.beginPath(); // right
    ctx.moveTo(sin * 4.5 + 12, -12);
    ctx.quadraticCurveTo(sin * 4.5 + 30, 10, sin * 4.5 + 12, -9);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath(); // left
    ctx.moveTo(sin * 4.5 - 12, -12);
    ctx.quadraticCurveTo(sin * 4.5 - 30, 10, sin * 4.5 - 12, -9);
    ctx.stroke();
    ctx.closePath();

    // head
    ctx.beginPath();
    ctx.moveTo(-13, -25);
    ctx.quadraticCurveTo(cos * 4.5, -65 + sin * 2.0, 13, -25);
    ctx.lineTo(-13, -25);
    ctx.fill();
    ctx.closePath();

    // mid static
    ctx.beginPath();
    ctx.arc(0, 0 + 10, 15, 0, 2 * Math.PI, false);
    ctx.arc(sin * 2.5, 0 + 2, 17, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();

    // tail body
    ctx.beginPath();
    ctx.arc(cos * 6.5, 0 + 20, 12, 0, 2 * Math.PI, false);
    ctx.arc(cos * 8.5, 0 + 25, 9, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(cos * 9.5, 0 + 30, 7, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();

    // tail
    ctx.beginPath();
    ctx.moveTo(cos * 8.5, 0 + 23);
    ctx.quadraticCurveTo(
      cos * 10.5,
      25,
      cos * 28.5 + 4.0,
      42 + (1.0 - sin) * 6.0,
    );
    ctx.moveTo(cos * 8.5, 0 + 23);
    ctx.quadraticCurveTo(cos * 10.5, 25, cos * 20.5, 39 + (1.0 - sin) * 6.0);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }

  follow(target, fishlist) {
    let [center, avoid] = this.center_avoidance(fishlist);

    center = center.x == center.y && center.x == 0 ? target : center;
    let t = center.add(avoid);

    if (this.in_cage) {
      target = center;
      center = this.my_cage.pos;
      t = center;
    }

    if (this.pos.dist(target) < 1500) {
      t = target.muls(2).add(center).muls(0.3333).add(avoid);
    }

    let delta = t.sub(this.pos);

    this.direction = delta.normalize();

    let dirangle = Math.atan2(delta.y, delta.x);
    let myangle = this.rot - Math.PI / 2;

    let dist = delta.length();
    if (dist > 40) {
      this.thurst(Math.min(dist / 30) / 30);

      if (Math.abs(dirangle - myangle) > 0.1) {
        if (dirangle > myangle) {
          this.turn(0.05);
        } else {
          this.turn(-0.05);
        }
      }
    }
  }

  center_avoidance(fishlist) {
    let center = new V2d(0, 0);
    let center_count = 0;
    let avoidance = new V2d(0, 0);

    for (let f in fishlist) {
      if (fishlist[f] == this || !fishlist[f].active) continue;

      let d = this.pos.dist(fishlist[f].pos);

      if (d < 600) {
        center = center.add(fishlist[f].pos);
        center_count++;
      }

      if (d < 100) {
        avoidance = avoidance.sub(fishlist[f].pos.sub(this.pos));
      }
    }

    if (center_count > 0) center = center.muls(1 / center_count);

    return [center, avoidance];
  }

  update(map, strength) {
    if (!this.active) return;
    if (this.in_cage) {
      this.follow(this.my_cage.pos, map.fishes);
      let delta = this.my_cage.pos.sub(this.pos);
      let dist = Math.abs(delta.length());
      if (dist >= this.my_cage.size) {
        this.pos = this.my_cage.pos.add(
          delta.normalize().muls(this.my_cage.size * -0.8),
        );
        this.vel = delta.normalize().muls(0.8);
      }
      this.vel.muls(0.01);
    }

    let fishlist = map.fishes;
    this.forward = new V2d(0, 1);
    this.forward.setAngle(this.rot - Math.PI / 2);

    this.pos = this.pos.add(this.vel);
    this.vel = this.vel.muls(0.99);

    if (!this.is_player) {
      if (this.pos.length() >= map.size) {
        this.die();
      }

      let distanceGoal = this.pos.dist(map.goal.pos);
      if (distanceGoal < map.goal.size * 0.8) {
        this.save();
      } else if (distanceGoal < map.goal.size * 3) {
        let delta = map.goal.pos.sub(this.pos);
        if (!this.in_cage) this.vel = this.vel.add(delta.muls(0.0004));
      }
    } else {
      if (this.pos.length() >= map.size) {
        this.dead = true;
        Game.instance.gameOver();
      }
    }

    if (!this.in_cage) {
      for (let bp of map.bumpers) {
        let dp = this.pos.dist(bp.pos);
        if (dp < bp.size) {
          bp.hit();
          let d = this.pos.sub(bp.pos).normalize();
          this.pos = bp.pos.add(d.muls(bp.size));
          this.vel = this.vel.add(d.muls(14).add(this.vel.muls(-2)));
        }
      }

      for (let c of map.cages) {
        if (c.destroyed) continue;

        let dp = this.pos.dist(c.pos);
        if (dp < c.size) {
          let d = this.pos.sub(c.pos).normalize();
          this.pos = c.pos.add(d.muls(c.size));
        }

        if (!c.activated && this.is_player) {
          dp = this.pos.dist(c.key);
          if (dp < 80) {
            c.hit();
          }
        }
      }

      for (let gp of map.gravitators) {
        let dp = this.pos.dist(gp.pos);
        if (dp < gp.size * 0.95) {
          gp.hit();
          if (this.is_player) Game.instance.gameOver();
          this.die();
        } else if (dp < gp.size * 2.0) {
          let d = this.pos.sub(gp.pos).normalize();
          this.vel = this.vel.add(d.muls(-0.1));
        }
      }
    }

    if (fishlist != undefined) {
      for (let f in fishlist) {
        if (fishlist[f] == this || !fishlist[f].active) continue;
        if (fishlist[f].in_cage != this.in_cage) continue;

        let d = this.pos.dist(fishlist[f].pos);
        if (d < 70) {
          if (strength != undefined) {
            playaudio(SOUNDS.bump_fish);
          }
          let s = strength != undefined ? strength : 0.8;
          fishlist[f].vel = fishlist[f].vel.add(
            fishlist[f].pos.sub(this.pos).normalize().muls(s),
          );
          break;
        }
      }
    }

    if (this.thrusting) {
      this.cspeed =
        Math.min(this.vel.length() * 0.3, this.spd / 2) / (this.spd / 2);
    } else {
      this.cspeed *= 0.98;
      this.cspeed = Math.max(this.cspeed, 0.2);
    }

    this.thrusting = false;
  }

  thurst(mul = 1.0, fishlist) {
    let a = new V2d(1.0, 0.0);
    a.setAngle(
      this.rot -
        Math.PI / 2 +
        Math.sin(time() * 20) * Math.pow(this.cspeed, 2) * 0.2,
    );
    a = a.muls(this.spd * mul);
    this.vel = this.vel.add(a);
    this.thrusting = true;
  }

  descelerate(mul) {
    this.vel = this.vel.muls(mul);
  }

  turn(val) {
    this.rot += val;
    this.vel = this.vel.muls(0.965);
    this.thurst(0.2);
  }

  die() {
    this.dead = true;
    this.active = false;
    Game.instance.map.fishDie(this);
  }

  save() {
    this.saved = true;
    this.active = false;
    Game.instance.map.fishSave(this);
  }
}
