class Avatar {
  constructor(x, y, xspawn, yspawn) {
    this.xspawn = xspawn;
    this.yspawn = yspawn;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.jumpheight = 7.5;
    this.maxSpeed = 10;
    this.speed = 4;
    this.width = 50;
    this.height = 75;
    this.active = true;
    this.face = 0;
    this.crouched = 0;
    this.jump = 0;
    this.run = 0;
    this.bounce = false;
    this.bouncecounter = 0;
  }

  gravity(force) {
    this.ay = this.ay + force;
  }

  move() {
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // this moves.
    if (keyIsDown(65)) {
      this.vx = -this.speed;
      this.face = 1;
      this.run = 1;
    } else if (keyIsDown(68)) {
      this.vx = this.speed;
      this.face = 0;
      this.run = 2;
    } else if (keyIsDown(83)) {
      this.vx = 0;
      this.crouched = 1;
    } else {
      this.vx = 0;
      this.crouched = 0;
      this.jump = 0;
      this.run = 0;
    }

    if (this.y - this.size / 2 > height) {
      this.active = false;
    }
  }

  collide() {
    // Ground collition.
    if (
      this.x > ground.x - ground.width / 2 &&
      this.x < ground.x + ground.width / 2 &&
      this.y + this.height / 2 > ground.y - ground.height / 2 &&
      this.y - this.height / 2 < ground.y + ground.height / 2
    ) {
      this.vy = 0;
      this.ay = 0;
      gravityForce = 0.0;
      this.jump = 0;
      this.bounce = false;
      this.speed = 4;
      reset = true;

      // Jump.
      if (keyIsDown(87)) {
        this.vy = -this.jumpheight;
        this.ay = 0;
        gravityForce = 0;
        this.jump = 2;
      }
    }

    // If avatar leaves the ground the gravity goes back to normal.
    else if (this.bounce == false) {
      gravityForce = 0.025;
      this.jump = 2;
      reset = false;

      // If "s" is held down, the gravity increases for the avatar.
      if (keyIsDown(83)) {
        gravityForce = gravityForce + 0.1;
      }
    }

    if (state == "level30") {
      // Collides with Groundblock01.
      let dgroundblock01 = dist(
        this.x,
        this.y,
        groundblock01.x,
        groundblock01.y
      );
      if (
        this.x < groundblock01.x - groundblock01.width / 1.9 &&
        this.x < groundblock01.x + groundblock01.width / 1.9 &&
        dgroundblock01 < this.width / 1.9 + groundblock01.width / 1.9 &&
        dgroundblock01 < this.height + groundblock01.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > groundblock01.x - groundblock01.width / 1.9 &&
        this.x > groundblock01.x + groundblock01.width / 1.9 &&
        dgroundblock01 < this.width / 1.9 + groundblock01.width / 1.9 &&
        dgroundblock01 < this.height + groundblock01.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > groundblock01.x - groundblock01.width / 1.9 &&
        this.x < groundblock01.x + groundblock01.width / 1.9 &&
        this.y < groundblock01.y - groundblock01.height / 3 &&
        this.y > groundblock01.y - groundblock01.height / 2.5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level30") {
      // Collides with Groundblock02.
      let dgroundblock02 = dist(
        this.x,
        this.y,
        groundblock02.x,
        groundblock02.y
      );
      if (
        this.x < groundblock02.x - groundblock02.width / 1.9 &&
        this.x < groundblock02.x + groundblock02.width / 1.9 &&
        dgroundblock02 < this.width / 1.9 + groundblock02.width / 1.9 &&
        dgroundblock02 < this.height + groundblock02.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > groundblock02.x - groundblock02.width / 1.9 &&
        this.x > groundblock02.x + groundblock02.width / 1.9 &&
        dgroundblock02 < this.width / 1.9 + groundblock02.width / 1.9 &&
        dgroundblock02 < this.height + groundblock02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > groundblock02.x - groundblock02.width / 1.9 &&
        this.x < groundblock02.x + groundblock02.width / 1.9 &&
        this.y < groundblock02.y - groundblock02.height / 3 &&
        this.y > groundblock02.y - groundblock02.height / 2.5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level04" || state == "level06") {
      // Collides with groundblock03.
      let dgroundblock03 = dist(
        this.x,
        this.y,
        groundblock03.x,
        groundblock03.y
      );
      if (
        this.x < groundblock03.x - groundblock03.width / 1.9 &&
        this.x < groundblock03.x + groundblock03.width / 1.9 &&
        dgroundblock03 < this.width / 1.9 + groundblock03.width / 1.9 &&
        dgroundblock03 < this.height + groundblock03.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > groundblock03.x - groundblock03.width / 1.9 &&
        this.x > groundblock03.x + groundblock03.width / 1.9 &&
        dgroundblock03 < this.width / 1.9 + groundblock03.width / 1.9 &&
        dgroundblock03 < this.height + groundblock03.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > groundblock03.x - groundblock03.width / 1.9 &&
        this.x < groundblock03.x + groundblock03.width / 1.9 &&
        this.y < groundblock03.y - groundblock03.height / 3 &&
        this.y > groundblock03.y - groundblock03.height / 2
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    // Collides with Door.
    if (
      this.x > door.x - door.width / 3 &&
      this.x < door.x + door.width / 3 &&
      this.y > door.y - door.height / 1 &&
      this.y < door.y + door.height / 1
    ) {
      if (doorlock == false) {
        exit = true;
      }
    } else {
      exit = false;
    }

    // Collides with key.
    if (state == "level05" || state == "level06") {
      if (
        this.x > key.x - key.width / 3 &&
        this.x < key.x + key.width / 3 &&
        this.y > key.y - key.height / 1 &&
        this.y < key.y + key.height / 1
      ) {
        keynumber = 1;
        doorlock = false;
      }
    }

    if (state == "level01" || state == "level05") {
      // Collides with Cube.
      let dcube = dist(this.x, this.y, cube.x, cube.y);
      if (
        this.x < cube.x - cube.width / 1.9 &&
        this.x < cube.x + cube.width / 1.9 &&
        dcube < this.width / 1.9 + cube.width / 1.9 &&
        dcube < this.height + cube.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube.x - cube.width / 1.9 &&
        this.x > cube.x + cube.width / 1.9 &&
        dcube < this.width / 1.9 + cube.width / 1.9 &&
        dcube < this.height + cube.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube.x - cube.width / 1.9 &&
        this.x < cube.x + cube.width / 1.9 &&
        this.y + this.height / 2.25 > cube.y - cube.height / 2.25 &&
        this.y - this.height / 2.25 < cube.y + cube.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level02") {
      // Collides with Cube02.
      let dcube02 = dist(this.x, this.y, cube02.x, cube02.y);
      if (
        this.x < cube02.x - cube02.width / 1.9 &&
        this.x < cube02.x + cube02.width / 1.9 &&
        dcube02 < this.width / 1.9 + cube02.width / 1.9 &&
        dcube02 < this.height + cube02.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube02.x - cube02.width / 1.9 &&
        this.x > cube02.x + cube02.width / 1.9 &&
        dcube02 < this.width / 1.9 + cube02.width / 1.9 &&
        dcube02 < this.height + cube02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube02.x - cube02.width / 1.9 &&
        this.x < cube02.x + cube02.width / 1.9 &&
        this.y + this.height / 2.25 > cube02.y - cube02.height / 2.25 &&
        this.y - this.height / 2.25 < cube02.y + cube02.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level02" || state == "level05") {
      // Collides with Cubewide.
      let dcubewide = dist(this.x, this.y, cubewide.x, cubewide.y);
      if (
        this.x < cubewide.x - cubewide.width / 1.9 &&
        this.x < cubewide.x + cubewide.width / 1.9 &&
        dcubewide < this.width / 1.9 + cubewide.width / 1.9 &&
        dcubewide < this.height + cubewide.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cubewide.x - cubewide.width / 1.9 &&
        this.x > cubewide.x + cubewide.width / 1.9 &&
        dcubewide < this.width / 1.9 + cubewide.width / 1.9 &&
        dcubewide < this.height + cubewide.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cubewide.x - cubewide.width / 1.9 &&
        this.x < cubewide.x + cubewide.width / 1.9 &&
        this.y + this.height / 2.25 > cubewide.y - cubewide.height / 2.25 &&
        this.y - this.height / 2.25 < cubewide.y + cubewide.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level05") {
      // Collides with cubewide02.
      let dcubewide02 = dist(this.x, this.y, cubewide02.x, cubewide02.y);
      if (
        this.x < cubewide02.x - cubewide02.width / 1.9 &&
        this.x < cubewide02.x + cubewide02.width / 1.9 &&
        dcubewide02 < this.width / 1.9 + cubewide02.width / 1.9 &&
        dcubewide02 < this.height + cubewide02.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cubewide02.x - cubewide02.width / 1.9 &&
        this.x > cubewide02.x + cubewide02.width / 1.9 &&
        dcubewide02 < this.width / 1.9 + cubewide02.width / 1.9 &&
        dcubewide02 < this.height + cubewide02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cubewide02.x - cubewide02.width / 1.9 &&
        this.x < cubewide02.x + cubewide02.width / 1.9 &&
        this.y + this.height / 2.25 > cubewide02.y - cubewide02.height / 2.25 &&
        this.y - this.height / 2.25 < cubewide02.y + cubewide02.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level01") {
      // Collides with Big Block.
      let dbigblock = dist(this.x, this.y, bigblock.x, bigblock.y);
      if (
        this.x < bigblock.x - bigblock.width / 1.9 &&
        this.x < bigblock.x + bigblock.width / 1.9 &&
        dbigblock < this.width / 1.9 + bigblock.width / 1.9 &&
        dbigblock < this.height + bigblock.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > bigblock.x - bigblock.width / 1.9 &&
        this.x > bigblock.x + bigblock.width / 1.9 &&
        dbigblock < this.width / 1.9 + bigblock.width / 1.9 &&
        dbigblock < this.height + bigblock.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > bigblock.x - bigblock.width / 1.9 &&
        this.x < bigblock.x + bigblock.width / 1.9 &&
        this.y + this.height / 2.25 > bigblock.y - bigblock.height / 2.25 &&
        this.y - this.height / 2.25 < bigblock.y + bigblock.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level01") {
      // Collides with Big Block.
      let dbigblock02 = dist(this.x, this.y, bigblock02.x, bigblock02.y);
      if (
        this.x < bigblock02.x - bigblock02.width / 1.9 &&
        this.x < bigblock02.x + bigblock02.width / 1.9 &&
        dbigblock02 < this.width / 1.9 + bigblock02.width / 1.9 &&
        dbigblock02 < this.height + bigblock02.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > bigblock02.x - bigblock02.width / 1.9 &&
        this.x > bigblock02.x + bigblock02.width / 1.9 &&
        dbigblock02 < this.width / 1.9 + bigblock02.width / 1.9 &&
        dbigblock02 < this.height + bigblock02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > bigblock02.x - bigblock02.width / 1.9 &&
        this.x < bigblock02.x + bigblock02.width / 1.9 &&
        this.y + this.height / 2.25 > bigblock02.y - bigblock02.height / 2.25 &&
        this.y - this.height / 2.25 < bigblock02.y + bigblock02.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level03") {
      // Collides with Giant Block.
      let dgiantblock = dist(this.x, this.y, giantblock.x, giantblock.y);
      if (
        this.x < giantblock.x - giantblock.width / 1.9 &&
        this.x < giantblock.x + giantblock.width / 1.9 &&
        dgiantblock < this.width / 1.9 + giantblock.width / 1.9 &&
        dgiantblock < this.height + giantblock.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantblock.x - giantblock.width / 1.9 &&
        this.x > giantblock.x + giantblock.width / 1.9 &&
        dgiantblock < this.width / 1.9 + giantblock.width / 1.9 &&
        dgiantblock < this.height + giantblock.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantblock.x - giantblock.width / 1.9 &&
        this.x < giantblock.x + giantblock.width / 1.9 &&
        this.y + this.height / 3 > giantblock.y - giantblock.height / 3 &&
        this.y - this.height / 3 < giantblock.y + giantblock.height / 3
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level07") {
      // Collides with giantrectangleblock.
      let dgiantrectangleblock = dist(
        this.x,
        this.y,
        giantrectangleblock.x,
        giantrectangleblock.y
      );
      if (
        this.x < giantrectangleblock.x - giantrectangleblock.width / 2 &&
        this.x < giantrectangleblock.x + giantrectangleblock.width / 2 &&
        dgiantrectangleblock < giantrectangleblock.width &&
        dgiantrectangleblock < this.height + giantrectangleblock.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock.x - giantrectangleblock.width / 2 &&
        this.x > giantrectangleblock.x + giantrectangleblock.width / 2 &&
        dgiantrectangleblock < giantrectangleblock.width &&
        dgiantrectangleblock < this.height + giantrectangleblock.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock.x - giantrectangleblock.width / 2 &&
        this.x < giantrectangleblock.x + giantrectangleblock.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock.y - giantrectangleblock.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock.y + giantrectangleblock.height / 3
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level07") {
      // Collides with giantrectangleblock02.
      let dgiantrectangleblock02 = dist(
        this.x,
        this.y,
        giantrectangleblock02.x,
        giantrectangleblock02.y
      );
      if (
        this.x < giantrectangleblock02.x - giantrectangleblock02.width / 2 &&
        this.x < giantrectangleblock02.x + giantrectangleblock02.width / 2 &&
        dgiantrectangleblock02 < giantrectangleblock02.width &&
        dgiantrectangleblock02 < this.height + giantrectangleblock02.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock02.x - giantrectangleblock02.width / 2 &&
        this.x > giantrectangleblock02.x + giantrectangleblock02.width / 2 &&
        dgiantrectangleblock02 < giantrectangleblock02.width &&
        dgiantrectangleblock02 < this.height + giantrectangleblock02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock02.x - giantrectangleblock02.width / 2 &&
        this.x < giantrectangleblock02.x + giantrectangleblock02.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock02.y - giantrectangleblock02.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock02.y + giantrectangleblock02.height / 3
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level07") {
      // Collides with giantrectangleblock03.
      let dgiantrectangleblock03 = dist(
        this.x,
        this.y,
        giantrectangleblock03.x,
        giantrectangleblock03.y
      );
      if (
        this.x < giantrectangleblock03.x - giantrectangleblock03.width / 2 &&
        this.x < giantrectangleblock03.x + giantrectangleblock03.width / 2 &&
        dgiantrectangleblock03 < giantrectangleblock03.width &&
        dgiantrectangleblock03 < this.height + giantrectangleblock03.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock03.x - giantrectangleblock03.width / 2 &&
        this.x > giantrectangleblock03.x + giantrectangleblock03.width / 2 &&
        dgiantrectangleblock03 < giantrectangleblock03.width &&
        dgiantrectangleblock03 < this.height + giantrectangleblock03.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock03.x - giantrectangleblock03.width / 2 &&
        this.x < giantrectangleblock03.x + giantrectangleblock03.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock03.y - giantrectangleblock03.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock03.y + giantrectangleblock03.height / 3
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level07") {
      // Collides with giantrectangleblock05.
      let dgiantrectangleblock05 = dist(
        this.x,
        this.y,
        giantrectangleblock05.x,
        giantrectangleblock05.y
      );
      if (
        this.x < giantrectangleblock05.x - giantrectangleblock05.width / 2 &&
        this.x < giantrectangleblock05.x + giantrectangleblock05.width / 2 &&
        dgiantrectangleblock05 < giantrectangleblock05.width &&
        dgiantrectangleblock05 < this.height + giantrectangleblock05.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock05.x - giantrectangleblock05.width / 2 &&
        this.x > giantrectangleblock05.x + giantrectangleblock05.width / 2 &&
        dgiantrectangleblock05 < giantrectangleblock05.width &&
        dgiantrectangleblock05 < this.height + giantrectangleblock05.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock05.x - giantrectangleblock05.width / 2 &&
        this.x < giantrectangleblock05.x + giantrectangleblock05.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock05.y - giantrectangleblock05.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock05.y + giantrectangleblock05.height / 3
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level07") {
      // Collides with giantrectangleblock04.
      let dgiantrectangleblock04 = dist(
        this.x,
        this.y,
        giantrectangleblock04.x,
        giantrectangleblock04.y
      );
      if (
        this.x < giantrectangleblock04.x - giantrectangleblock04.width / 2 &&
        this.x < giantrectangleblock04.x + giantrectangleblock04.width / 2 &&
        dgiantrectangleblock04 < giantrectangleblock04.width &&
        dgiantrectangleblock04 < this.height + giantrectangleblock04.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock04.x - giantrectangleblock04.width / 2 &&
        this.x > giantrectangleblock04.x + giantrectangleblock04.width / 2 &&
        dgiantrectangleblock04 < giantrectangleblock04.width &&
        dgiantrectangleblock04 < this.height + giantrectangleblock04.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock04.x - giantrectangleblock04.width / 2 &&
        this.x < giantrectangleblock04.x + giantrectangleblock04.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock04.y - giantrectangleblock04.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock04.y + giantrectangleblock04.height / 3
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level30") {
      // Collides with Big Block.
      let dgiantcubeblock = dist(
        this.x,
        this.y,
        giantcubeblock.x,
        giantcubeblock.y
      );
      if (
        this.x < giantcubeblock.x - giantcubeblock.width / 2 &&
        this.x < giantcubeblock.x + giantcubeblock.width / 2.5 &&
        dgiantcubeblock < this.width / 2 + giantcubeblock.width / 2 &&
        dgiantcubeblock < this.height + giantcubeblock.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantcubeblock.x - giantcubeblock.width / 2 &&
        this.x > giantcubeblock.x + giantcubeblock.width / 2.5 &&
        dgiantcubeblock < this.width / 2 + giantcubeblock.width / 2 &&
        dgiantcubeblock < this.height + giantcubeblock.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantcubeblock.x - giantcubeblock.width / 2 &&
        this.x < giantcubeblock.x + giantcubeblock.width / 2 &&
        this.y > giantcubeblock.y - giantcubeblock.height / 2 &&
        this.y < giantcubeblock.y - giantcubeblock.height / 2.5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level07") {
      // Collides with giantrectangleblock06.
      let dgiantrectangleblock06 = dist(
        this.x,
        this.y,
        giantrectangleblock06.x,
        giantrectangleblock06.y
      );
      if (
        this.x < giantrectangleblock06.x - giantrectangleblock06.width / 2 &&
        this.x < giantrectangleblock06.x + giantrectangleblock06.width / 2 &&
        dgiantrectangleblock06 < giantrectangleblock06.width &&
        dgiantrectangleblock06 < this.height + giantrectangleblock06.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock06.x - giantrectangleblock06.width / 2 &&
        this.x > giantrectangleblock06.x + giantrectangleblock06.width / 2 &&
        dgiantrectangleblock06 < giantrectangleblock06.width &&
        dgiantrectangleblock06 < this.height + giantrectangleblock06.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock06.x - giantrectangleblock06.width / 2 &&
        this.x < giantrectangleblock06.x + giantrectangleblock06.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock06.y - giantrectangleblock06.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock06.y + giantrectangleblock06.height / 3
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level07") {
      // Collides with Big Block.
      let dgiantcubeblock = dist(
        this.x,
        this.y,
        giantcubeblock.x,
        giantcubeblock.y
      );
      if (
        this.x < giantcubeblock.x - giantcubeblock.width / 2 &&
        this.x < giantcubeblock.x + giantcubeblock.width / 2.5 &&
        dgiantcubeblock < this.width / 2 + giantcubeblock.width / 2 &&
        dgiantcubeblock < this.height + giantcubeblock.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantcubeblock.x - giantcubeblock.width / 2 &&
        this.x > giantcubeblock.x + giantcubeblock.width / 2.5 &&
        dgiantcubeblock < this.width / 2 + giantcubeblock.width / 2 &&
        dgiantcubeblock < this.height + giantcubeblock.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantcubeblock.x - giantcubeblock.width / 2 &&
        this.x < giantcubeblock.x + giantcubeblock.width / 2 &&
        this.y > giantcubeblock.y - giantcubeblock.height / 2 &&
        this.y < giantcubeblock.y - giantcubeblock.height / 2.5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level07") {
      // Collides with Big Block.
      let dgiantcubeblock02 = dist(
        this.x,
        this.y,
        giantcubeblock02.x,
        giantcubeblock02.y
      );
      if (
        this.x < giantcubeblock02.x - giantcubeblock02.width / 2 &&
        this.x < giantcubeblock02.x + giantcubeblock02.width / 2.5 &&
        dgiantcubeblock02 < this.width / 2 + giantcubeblock02.width / 2 &&
        dgiantcubeblock02 < this.height + giantcubeblock02.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantcubeblock02.x - giantcubeblock02.width / 2 &&
        this.x > giantcubeblock02.x + giantcubeblock02.width / 2.5 &&
        dgiantcubeblock02 < this.width / 2 + giantcubeblock02.width / 2 &&
        dgiantcubeblock02 < this.height + giantcubeblock02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantcubeblock02.x - giantcubeblock02.width / 2 &&
        this.x < giantcubeblock02.x + giantcubeblock02.width / 2 &&
        this.y > giantcubeblock02.y - giantcubeblock02.height / 2 &&
        this.y < giantcubeblock02.y - giantcubeblock02.height / 2.5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level01" || state == "level02" || state == "level06") {
      // Collides with Rectangle.
      let drectangle = dist(this.x, this.y, rectangle.x, rectangle.y);
      if (
        this.x < rectangle.x - rectangle.width / 3.2 &&
        this.x < rectangle.x + rectangle.width / 3.2 &&
        drectangle < this.width / 3.2 + rectangle.width / 1.2 &&
        drectangle < this.height + rectangle.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangle.x - rectangle.width / 3.2 &&
        this.x > rectangle.x + rectangle.width / 3.2 &&
        drectangle < this.width / 3.2 + rectangle.width / 1.2 &&
        drectangle < this.height + rectangle.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangle.x - rectangle.width / 1.8 &&
        this.x < rectangle.x + rectangle.width / 1.8 &&
        this.y + this.height / 2.25 > rectangle.y - rectangle.height / 2.25 &&
        this.y - this.height / 2.25 < rectangle.y + rectangle.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level06") {
      // Collides with rectangle02.
      let drectangle02 = dist(this.x, this.y, rectangle02.x, rectangle02.y);
      if (
        this.x < rectangle02.x - rectangle02.width / 3.2 &&
        this.x < rectangle02.x + rectangle02.width / 3.2 &&
        drectangle02 < this.width / 3.2 + rectangle02.width / 1.2 &&
        drectangle02 < this.height + rectangle02.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangle02.x - rectangle02.width / 3.2 &&
        this.x > rectangle02.x + rectangle02.width / 3.2 &&
        drectangle02 < this.width / 3.2 + rectangle02.width / 1.2 &&
        drectangle02 < this.height + rectangle02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangle02.x - rectangle02.width / 1.8 &&
        this.x < rectangle02.x + rectangle02.width / 1.8 &&
        this.y + this.height / 2.25 >
          rectangle02.y - rectangle02.height / 2.25 &&
        this.y - this.height / 2.25 < rectangle02.y + rectangle02.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level02") {
      // Collides with rectangle03.
      let drectangle03 = dist(this.x, this.y, rectangle03.x, rectangle03.y);
      if (
        this.x < rectangle03.x - rectangle03.width / 3.2 &&
        this.x < rectangle03.x + rectangle03.width / 3.2 &&
        drectangle03 < this.width / 3.2 + rectangle03.width / 1.2 &&
        drectangle03 < this.height + rectangle03.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangle03.x - rectangle03.width / 3.2 &&
        this.x > rectangle03.x + rectangle03.width / 3.2 &&
        drectangle03 < this.width / 3.2 + rectangle03.width / 1.2 &&
        drectangle03 < this.height + rectangle03.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangle03.x - rectangle03.width / 1.8 &&
        this.x < rectangle03.x + rectangle03.width / 1.8 &&
        this.y + this.height / 2.25 >
          rectangle03.y - rectangle03.height / 2.25 &&
        this.y - this.height / 2.25 < rectangle03.y + rectangle03.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level01") {
      // Collides with Rectangle Wide.
      let drectanglewide = dist(
        this.x,
        this.y,
        rectanglewide.x,
        rectanglewide.y
      );
      if (
        this.x < rectanglewide.x - rectanglewide.width / 1.9 &&
        this.x < rectanglewide.x + rectanglewide.width / 1.9 &&
        drectanglewide < this.width / 1.9 + rectanglewide.width / 1.9 &&
        drectanglewide < this.height + rectanglewide.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectanglewide.x - rectanglewide.width / 1.9 &&
        this.x > rectanglewide.x + rectanglewide.width / 1.9 &&
        drectanglewide < this.width / 1.9 + rectanglewide.width / 1.9 &&
        drectanglewide < this.height + rectanglewide.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectanglewide.x - rectanglewide.width / 1.9 &&
        this.x < rectanglewide.x + rectanglewide.width / 1.9 &&
        this.y + this.height / 2.25 >
          rectanglewide.y - rectanglewide.height / 2.25 &&
        this.y - this.height / 2.25 <
          rectanglewide.y + rectanglewide.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level04" || state == "level05" || state == "level06") {
      // Collides with Platform.
      let dplatform = dist(this.x, this.y, platform.x, platform.y);
      if (
        this.x < platform.x - platform.width / 2 &&
        this.x < platform.x + platform.width / 2 &&
        dplatform < this.width / 2 + platform.width / 2 &&
        dplatform < this.height + platform.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > platform.x - platform.width / 2 &&
        this.x > platform.x + platform.width / 2 &&
        dplatform < this.width / 2 + platform.width / 2 &&
        dplatform < this.height + platform.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > platform.x - platform.width / 1.75 &&
        this.x < platform.x + platform.width / 1.75 &&
        this.y < platform.y - platform.height / 2 &&
        this.y > platform.y - platform.height / 1
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > platform.x - platform.width / 1.75 &&
        this.x < platform.x + platform.width / 1.75 &&
        this.y < platform.y + platform.height &&
        this.y > platform.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level04" || state == "level06") {
      // Collides with platform02.
      let dplatform02 = dist(this.x, this.y, platform02.x, platform02.y);
      if (
        this.x < platform02.x - platform02.width / 2 &&
        this.x < platform02.x + platform02.width / 2 &&
        dplatform02 < this.width / 2 + platform02.width / 2 &&
        dplatform02 < this.height + platform02.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > platform02.x - platform02.width / 2 &&
        this.x > platform02.x + platform02.width / 2 &&
        dplatform02 < this.width / 2 + platform02.width / 2 &&
        dplatform02 < this.height + platform02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > platform02.x - platform02.width / 1.75 &&
        this.x < platform02.x + platform02.width / 1.75 &&
        this.y < platform02.y - platform02.height / 2 &&
        this.y > platform02.y - platform02.height / 1
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > platform02.x - platform02.width / 1.75 &&
        this.x < platform02.x + platform02.width / 1.75 &&
        this.y < platform02.y + platform02.height &&
        this.y > platform02.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level04") {
      // Collides with platform03.
      let dplatform03 = dist(this.x, this.y, platform03.x, platform03.y);
      if (
        this.x < platform03.x - platform03.width / 2 &&
        this.x < platform03.x + platform03.width / 2 &&
        dplatform03 < this.width / 2 + platform03.width / 2 &&
        dplatform03 < this.height + platform03.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > platform03.x - platform03.width / 2 &&
        this.x > platform03.x + platform03.width / 2 &&
        dplatform03 < this.width / 2 + platform03.width / 2 &&
        dplatform03 < this.height + platform03.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > platform03.x - platform03.width / 1.75 &&
        this.x < platform03.x + platform03.width / 1.75 &&
        this.y < platform03.y - platform03.height / 2 &&
        this.y > platform03.y - platform03.height / 1
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > platform03.x - platform03.width / 1.75 &&
        this.x < platform03.x + platform03.width / 1.75 &&
        this.y < platform03.y + platform03.height &&
        this.y > platform03.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level04") {
      // Collides with platform04.
      let dplatform04 = dist(this.x, this.y, platform04.x, platform04.y);
      if (
        this.x < platform04.x - platform04.width / 2 &&
        this.x < platform04.x + platform04.width / 2 &&
        dplatform04 < this.width / 2 + platform04.width / 2 &&
        dplatform04 < this.height + platform04.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > platform04.x - platform04.width / 2 &&
        this.x > platform04.x + platform04.width / 2 &&
        dplatform04 < this.width / 2 + platform04.width / 2 &&
        dplatform04 < this.height + platform04.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > platform04.x - platform04.width / 1.75 &&
        this.x < platform04.x + platform04.width / 1.75 &&
        this.y < platform04.y - platform04.height / 2 &&
        this.y > platform04.y - platform04.height / 1
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > platform04.x - platform04.width / 1.75 &&
        this.x < platform04.x + platform04.width / 1.75 &&
        this.y < platform04.y + platform04.height &&
        this.y > platform04.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level02" || state == "level04") {
      // Collides with movingplatform.
      let dmovingplatform = dist(
        this.x,
        this.y,
        movingplatform.x,
        movingplatform.y
      );
      if (
        this.x < movingplatform.x - movingplatform.width / 2 &&
        this.x < movingplatform.x + movingplatform.width / 2 &&
        dmovingplatform < this.width / 2 + movingplatform.width / 2 &&
        dmovingplatform < this.height + movingplatform.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > movingplatform.x - movingplatform.width / 2 &&
        this.x > movingplatform.x + movingplatform.width / 2 &&
        dmovingplatform < this.width / 2 + movingplatform.width / 2 &&
        dmovingplatform < this.height + movingplatform.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > movingplatform.x - movingplatform.width / 1.75 &&
        this.x < movingplatform.x + movingplatform.width / 1.75 &&
        this.y < movingplatform.y - movingplatform.height / 2 &&
        this.y > movingplatform.y - movingplatform.height / 1
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.x = this.x + movingplatform.vx;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > movingplatform.x - movingplatform.width / 1.75 &&
        this.x < movingplatform.x + movingplatform.width / 1.75 &&
        this.y < movingplatform.y + movingplatform.height &&
        this.y > movingplatform.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level02") {
      // Collides with movingplatform02.
      let dmovingplatform02 = dist(
        this.x,
        this.y,
        movingplatform02.x,
        movingplatform02.y
      );
      if (
        this.x < movingplatform02.x - movingplatform02.width / 2 &&
        this.x < movingplatform02.x + movingplatform02.width / 2 &&
        dmovingplatform02 < this.width / 2 + movingplatform02.width / 2 &&
        dmovingplatform02 < this.height + movingplatform02.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > movingplatform02.x - movingplatform02.width / 2 &&
        this.x > movingplatform02.x + movingplatform02.width / 2 &&
        dmovingplatform02 < this.width / 2 + movingplatform02.width / 2 &&
        dmovingplatform02 < this.height + movingplatform02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > movingplatform02.x - movingplatform02.width / 1.75 &&
        this.x < movingplatform02.x + movingplatform02.width / 1.75 &&
        this.y < movingplatform02.y - movingplatform02.height / 2 &&
        this.y > movingplatform02.y - movingplatform02.height / 1
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.x = this.x + movingplatform02.vx;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > movingplatform02.x - movingplatform02.width / 1.75 &&
        this.x < movingplatform02.x + movingplatform02.width / 1.75 &&
        this.y < movingplatform02.y + movingplatform02.height &&
        this.y > movingplatform02.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level04") {
      // Collides with movingplatform03.
      let dmovingplatform03 = dist(
        this.x,
        this.y,
        movingplatform03.x,
        movingplatform03.y
      );
      if (
        this.x < movingplatform03.x - movingplatform03.width / 2 &&
        this.x < movingplatform03.x + movingplatform03.width / 2 &&
        dmovingplatform03 < this.width / 2 + movingplatform03.width / 2 &&
        dmovingplatform03 < this.height + movingplatform03.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > movingplatform03.x - movingplatform03.width / 2 &&
        this.x > movingplatform03.x + movingplatform03.width / 2 &&
        dmovingplatform03 < this.width / 2 + movingplatform03.width / 2 &&
        dmovingplatform03 < this.height + movingplatform03.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > movingplatform03.x - movingplatform03.width / 1.75 &&
        this.x < movingplatform03.x + movingplatform03.width / 1.75 &&
        this.y < movingplatform03.y - movingplatform03.height / 2 &&
        this.y > movingplatform03.y - movingplatform03.height / 1
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.x = this.x + movingplatform03.vx;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > movingplatform03.x - movingplatform03.width / 1.75 &&
        this.x < movingplatform03.x + movingplatform03.width / 1.75 &&
        this.y < movingplatform03.y + movingplatform03.height &&
        this.y > movingplatform03.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level04") {
      // Collides with movingplatformvertical.
      let dmovingplatformvertical = dist(
        this.x,
        this.y,
        movingplatformvertical.x,
        movingplatformvertical.y
      );
      if (
        this.x < movingplatformvertical.x - movingplatformvertical.width / 2 &&
        this.x < movingplatformvertical.x + movingplatformvertical.width / 2 &&
        dmovingplatformvertical <
          this.width / 2 + movingplatformvertical.width / 2 &&
        dmovingplatformvertical < this.height + movingplatformvertical.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > movingplatformvertical.x - movingplatformvertical.width / 2 &&
        this.x > movingplatformvertical.x + movingplatformvertical.width / 2 &&
        dmovingplatformvertical <
          this.width / 2 + movingplatformvertical.width / 2 &&
        dmovingplatformvertical < this.height + movingplatformvertical.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x >
          movingplatformvertical.x - movingplatformvertical.width / 1.75 &&
        this.x <
          movingplatformvertical.x + movingplatformvertical.width / 1.75 &&
        this.y < movingplatformvertical.y - movingplatformvertical.height / 2 &&
        this.y > movingplatformvertical.y - movingplatformvertical.height / 1
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.y = this.y + movingplatformvertical.vy;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x >
          movingplatformvertical.x - movingplatformvertical.width / 1.75 &&
        this.x <
          movingplatformvertical.x + movingplatformvertical.width / 1.75 &&
        this.y < movingplatformvertical.y + movingplatformvertical.height &&
        this.y > movingplatformvertical.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level04") {
      // Collides with movingplatformvertical02.
      let dmovingplatformvertical02 = dist(
        this.x,
        this.y,
        movingplatformvertical02.x,
        movingplatformvertical02.y
      );
      if (
        this.x <
          movingplatformvertical02.x - movingplatformvertical02.width / 2 &&
        this.x <
          movingplatformvertical02.x + movingplatformvertical02.width / 2 &&
        dmovingplatformvertical02 <
          this.width / 2 + movingplatformvertical02.width / 2 &&
        dmovingplatformvertical02 <
          this.height + movingplatformvertical02.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x >
          movingplatformvertical02.x - movingplatformvertical02.width / 2 &&
        this.x >
          movingplatformvertical02.x + movingplatformvertical02.width / 2 &&
        dmovingplatformvertical02 <
          this.width / 2 + movingplatformvertical02.width / 2 &&
        dmovingplatformvertical02 <
          this.height + movingplatformvertical02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x >
          movingplatformvertical02.x - movingplatformvertical02.width / 1.75 &&
        this.x <
          movingplatformvertical02.x + movingplatformvertical02.width / 1.75 &&
        this.y <
          movingplatformvertical02.y - movingplatformvertical02.height / 2 &&
        this.y >
          movingplatformvertical02.y - movingplatformvertical02.height / 1
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.y = this.y + movingplatformvertical02.vy;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x >
          movingplatformvertical02.x - movingplatformvertical02.width / 1.75 &&
        this.x <
          movingplatformvertical02.x + movingplatformvertical02.width / 1.75 &&
        this.y < movingplatformvertical02.y + movingplatformvertical02.height &&
        this.y > movingplatformvertical02.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level06") {
      // Collides with movingplatformvertical03.
      let dmovingplatformvertical03 = dist(
        this.x,
        this.y,
        movingplatformvertical03.x,
        movingplatformvertical03.y
      );
      if (
        this.x <
          movingplatformvertical03.x - movingplatformvertical03.width / 2 &&
        this.x <
          movingplatformvertical03.x + movingplatformvertical03.width / 2 &&
        dmovingplatformvertical03 <
          this.width / 2 + movingplatformvertical03.width / 2 &&
        dmovingplatformvertical03 <
          this.height + movingplatformvertical03.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x >
          movingplatformvertical03.x - movingplatformvertical03.width / 2 &&
        this.x >
          movingplatformvertical03.x + movingplatformvertical03.width / 2 &&
        dmovingplatformvertical03 <
          this.width / 2 + movingplatformvertical03.width / 2 &&
        dmovingplatformvertical03 <
          this.height + movingplatformvertical03.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x >
          movingplatformvertical03.x - movingplatformvertical03.width / 1.75 &&
        this.x <
          movingplatformvertical03.x + movingplatformvertical03.width / 1.75 &&
        this.y <
          movingplatformvertical03.y - movingplatformvertical03.height / 2 &&
        this.y >
          movingplatformvertical03.y - movingplatformvertical03.height / 1
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.y = this.y + movingplatformvertical03.vy;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x >
          movingplatformvertical03.x - movingplatformvertical03.width / 1.75 &&
        this.x <
          movingplatformvertical03.x + movingplatformvertical03.width / 1.75 &&
        this.y < movingplatformvertical03.y + movingplatformvertical03.height &&
        this.y > movingplatformvertical03.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level30") {
      // Collides with button.
      let dbutton = dist(this.x, this.y, button.x, button.y);
      if (
        this.x < button.x - button.width / 2 &&
        this.x < button.x + button.width / 2 &&
        dbutton < this.width / 2 + button.width / 2 &&
        dbutton < this.height + button.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > button.x - button.width / 2 &&
        this.x > button.x + button.width / 2 &&
        dbutton < this.width / 2 + button.width / 2 &&
        dbutton < this.height + button.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > button.x - button.width / 2 &&
        this.x < button.x + button.width / 2 &&
        this.y > button.y - button.height / 1.05 &&
        this.y < button.y + button.height / 0.85
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        button.activated = true;
        this.bounce = false;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        } else if (
          this.x > button.x - button.width / 1.75 &&
          this.x < button.x + button.width / 1.75 &&
          this.y < button.y + button.height &&
          this.y > button.y
        ) {
          this.vy = this.jumpheight;
        }
      }
    }

    if (state == "level05") {
      // Collides with Trampoline.
      let dtrampoline = dist(this.x, this.y, trampoline.x, trampoline.y);
      if (
        this.x < trampoline.x - trampoline.width / 2 &&
        this.x < trampoline.x + trampoline.width / 2 &&
        dtrampoline < this.width / 2 + trampoline.width / 2 &&
        dtrampoline < this.height + trampoline.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > trampoline.x - trampoline.width / 2 &&
        this.x > trampoline.x + trampoline.width / 2 &&
        dtrampoline < this.width / 2 + trampoline.width / 2 &&
        dtrampoline < this.height + trampoline.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > trampoline.x - trampoline.width / 1.75 &&
        this.x < trampoline.x + trampoline.width / 1.75 &&
        this.y < trampoline.y - trampoline.height / 1.5 &&
        this.y > trampoline.y - trampoline.height / 1.2
      ) {
        this.vy = -this.vy;
        this.ay = 0;
        gravityForce = 0;
        this.jump = 2;
        this.bounce = true;
        this.speed = 4;
      }

      if (this.bounce == true) {
        gravityForce = 0.01;
        this.jump = 2;
      }
    }

    if (state == "level05") {
      // Collides with trampoline02.
      let dtrampoline02 = dist(this.x, this.y, trampoline02.x, trampoline02.y);
      if (
        this.x < trampoline02.x - trampoline02.width / 2 &&
        this.x < trampoline02.x + trampoline02.width / 2 &&
        dtrampoline02 < this.width / 2 + trampoline02.width / 2 &&
        dtrampoline02 < this.height + trampoline02.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > trampoline02.x - trampoline02.width / 2 &&
        this.x > trampoline02.x + trampoline02.width / 2 &&
        dtrampoline02 < this.width / 2 + trampoline02.width / 2 &&
        dtrampoline02 < this.height + trampoline02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > trampoline02.x - trampoline02.width / 1.75 &&
        this.x < trampoline02.x + trampoline02.width / 1.75 &&
        this.y < trampoline02.y - trampoline02.height / 1.5 &&
        this.y > trampoline02.y - trampoline02.height / 1.2
      ) {
        this.vy = -this.vy;
        this.ay = 0;
        gravityForce = 0;
        this.jump = 2;
        this.bounce = true;
        this.speed = 4;
      }

      if (this.bounce == true) {
        gravityForce = 0.01;
        this.jump = 2;
      }
    }

    if (state == "level05") {
      // Collides with trampoline03.
      let dtrampoline03 = dist(this.x, this.y, trampoline03.x, trampoline03.y);
      if (
        this.x < trampoline03.x - trampoline03.width / 2 &&
        this.x < trampoline03.x + trampoline03.width / 2 &&
        dtrampoline03 < this.width / 2 + trampoline03.width / 2 &&
        dtrampoline03 < this.height + trampoline03.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > trampoline03.x - trampoline03.width / 2 &&
        this.x > trampoline03.x + trampoline03.width / 2 &&
        dtrampoline03 < this.width / 2 + trampoline03.width / 2 &&
        dtrampoline03 < this.height + trampoline03.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > trampoline03.x - trampoline03.width / 1.75 &&
        this.x < trampoline03.x + trampoline03.width / 1.75 &&
        this.y < trampoline03.y - trampoline03.height / 1.5 &&
        this.y > trampoline03.y - trampoline03.height / 1.2
      ) {
        this.vy = -this.vy;
        this.ay = 0;
        gravityForce = 0;
        this.jump = 2;
        this.bounce = true;
        this.speed = 4;
      }

      if (this.bounce == true) {
        gravityForce = 0.01;
        this.jump = 2;
      }
    }

    if (state == "level05") {
      // Collides with trampoline04.
      let dtrampoline04 = dist(this.x, this.y, trampoline04.x, trampoline04.y);
      if (
        this.x < trampoline04.x - trampoline04.width / 2 &&
        this.x < trampoline04.x + trampoline04.width / 2 &&
        dtrampoline04 < this.width / 2 + trampoline04.width / 2 &&
        dtrampoline04 < this.height + trampoline04.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > trampoline04.x - trampoline04.width / 2 &&
        this.x > trampoline04.x + trampoline04.width / 2 &&
        dtrampoline04 < this.width / 2 + trampoline04.width / 2 &&
        dtrampoline04 < this.height + trampoline04.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > trampoline04.x - trampoline04.width / 1.75 &&
        this.x < trampoline04.x + trampoline04.width / 1.75 &&
        this.y < trampoline04.y - trampoline04.height / 1.5 &&
        this.y > trampoline04.y - trampoline04.height / 1.2
      ) {
        this.vy = -this.vy;
        this.ay = 0;
        gravityForce = 0;
        this.jump = 2;
        this.bounce = true;
        this.speed = 4;
      }

      if (this.bounce == true) {
        gravityForce = 0.01;
        this.jump = 2;
      }
    }

    if (state == "level06") {
      // Collides with boostplatform.
      let dboostplatform = dist(
        this.x,
        this.y,
        boostplatform.x,
        boostplatform.y
      );
      if (
        this.x < boostplatform.x - boostplatform.width / 2 &&
        this.x < boostplatform.x + boostplatform.width / 2 &&
        dboostplatform < this.width / 2 + boostplatform.width / 2 &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > boostplatform.x - boostplatform.width / 2 &&
        this.x > boostplatform.x + boostplatform.width / 2 &&
        dboostplatform < this.width / 2 + boostplatform.width / 2 &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > boostplatform.x - boostplatform.width / 2 &&
        this.x < boostplatform.x + boostplatform.width / 2 &&
        this.y + this.height / 2.25 >
          boostplatform.y - boostplatform.height / 2.25 &&
        this.y - this.height / 2.25 <
          boostplatform.y + boostplatform.height / 2.25
      ) {
        this.vy = 0;
        this.vx = this.vx + 4;
        this.speed = 8;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level06") {
      // Collides with boostplatform02.
      let dboostplatform02 = dist(
        this.x,
        this.y,
        boostplatform02.x,
        boostplatform02.y
      );
      if (
        this.x < boostplatform02.x - boostplatform02.width / 2 &&
        this.x < boostplatform02.x + boostplatform02.width / 2 &&
        dboostplatform02 < this.width / 2 + boostplatform02.width / 2 &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > boostplatform02.x - boostplatform02.width / 2 &&
        this.x > boostplatform02.x + boostplatform02.width / 2 &&
        dboostplatform02 < this.width / 2 + boostplatform02.width / 2 &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > boostplatform02.x - boostplatform02.width / 2 &&
        this.x < boostplatform02.x + boostplatform02.width / 2 &&
        this.y + this.height / 2.25 >
          boostplatform02.y - boostplatform02.height / 2.25 &&
        this.y - this.height / 2.25 <
          boostplatform02.y + boostplatform02.height / 2.25
      ) {
        this.vy = 0;
        this.vx = this.vx - 4;
        this.speed = 8;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level03") {
      // Collides with roller.
      let droller = dist(this.x, this.y, roller.x, roller.y);
      if (
        this.x < roller.x - roller.width / 2.25 &&
        this.x < roller.x + roller.width / 2.25 &&
        droller < this.width / 2.25 + roller.width / 2.25 &&
        droller < this.height + roller.height
      ) {
        this.vx = -roller.speed;
      } else if (
        this.x > roller.x - roller.width / 2.25 &&
        this.x > roller.x + roller.width / 2.25 &&
        droller < this.width / 2.25 + roller.width / 2.25 &&
        droller < this.height + roller.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > roller.x - roller.width / 2.25 &&
        this.x < roller.x + roller.width / 2.25 &&
        this.y + this.height / 2.25 > roller.y - roller.height / 2.25 &&
        this.y - this.height / 2.25 < roller.y + roller.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }
    if (state == "level03") {
      // Collides with roller02.
      let droller02 = dist(this.x, this.y, roller02.x, roller02.y);
      if (
        this.x < roller02.x - roller02.width / 2.25 &&
        this.x < roller02.x + roller02.width / 2.25 &&
        droller02 < this.width / 2.25 + roller02.width / 2.25 &&
        droller02 < this.height + roller02.height
      ) {
        this.vx = -roller02.speed;
      } else if (
        this.x > roller02.x - roller02.width / 2.25 &&
        this.x > roller02.x + roller02.width / 2.25 &&
        droller02 < this.width / 2.25 + roller02.width / 2.25 &&
        droller02 < this.height + roller02.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > roller02.x - roller02.width / 2.25 &&
        this.x < roller02.x + roller02.width / 2.25 &&
        this.y + this.height / 2.25 > roller02.y - roller02.height / 2.25 &&
        this.y - this.height / 2.25 < roller02.y + roller02.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }
    if (state == "level03") {
      // Collides with roller03.
      let droller03 = dist(this.x, this.y, roller03.x, roller03.y);
      if (
        this.x < roller03.x - roller03.width / 2.25 &&
        this.x < roller03.x + roller03.width / 2.25 &&
        droller03 < this.width / 2.25 + roller03.width / 2.25 &&
        droller03 < this.height + roller03.height
      ) {
        this.vx = -roller03.speed;
      } else if (
        this.x > roller03.x - roller03.width / 2.25 &&
        this.x > roller03.x + roller03.width / 2.25 &&
        droller03 < this.width / 2.25 + roller03.width / 2.25 &&
        droller03 < this.height + roller03.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > roller03.x - roller03.width / 2.25 &&
        this.x < roller03.x + roller03.width / 2.25 &&
        this.y + this.height / 2.25 > roller03.y - roller03.height / 2.25 &&
        this.y - this.height / 2.25 < roller03.y + roller03.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }
    if (state == "level03") {
      // Collides with roller04.
      let droller04 = dist(this.x, this.y, roller04.x, roller04.y);
      if (
        this.x < roller04.x - roller04.width / 2.25 &&
        this.x < roller04.x + roller04.width / 2.25 &&
        droller04 < this.width / 2.25 + roller04.width / 2.25 &&
        droller04 < this.height + roller04.height
      ) {
        this.vx = -roller04.speed;
      } else if (
        this.x > roller04.x - roller04.width / 2.25 &&
        this.x > roller04.x + roller04.width / 2.25 &&
        droller04 < this.width / 2.25 + roller04.width / 2.25 &&
        droller04 < this.height + roller04.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > roller04.x - roller04.width / 2.25 &&
        this.x < roller04.x + roller04.width / 2.25 &&
        this.y + this.height / 2.25 > roller04.y - roller04.height / 2.25 &&
        this.y - this.height / 2.25 < roller04.y + roller04.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level30") {
      // Collides with canon.
      let dcanon = dist(this.x, this.y, canon.x, canon.y);
      if (
        this.x < canon.x - canon.width / 1.9 &&
        this.x < canon.x + canon.width / 1.9 &&
        dcanon < this.width / 1.9 + canon.width / 1.9 &&
        dcanon < this.height + canon.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > canon.x - canon.width / 1.9 &&
        this.x > canon.x + canon.width / 1.9 &&
        dcanon < this.width / 1.9 + canon.width / 1.9 &&
        dcanon < this.height + canon.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > canon.x - canon.width / 1.9 &&
        this.x < canon.x + canon.width / 1.9 &&
        this.y + this.height / 2.25 > canon.y - canon.height / 2.25 &&
        this.y - this.height / 2.25 < canon.y + canon.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level30") {
      // Collides with canonball.
      let dcanonball = dist(this.x, this.y, canonball.x, canonball.y);
      if (
        this.x < canonball.x - canonball.width / 2.25 &&
        this.x < canonball.x + canonball.width / 2.25 &&
        dcanonball < this.width / 2.25 + canonball.width / 2.25 &&
        dcanonball < this.height + canonball.height
      ) {
        this.x = this.xspawn;
        this.y = this.yspawn;
      } else if (
        this.x > canonball.x - canonball.width / 2.25 &&
        this.x > canonball.x + canonball.width / 2.25 &&
        dcanonball < this.width / 2.25 + canonball.width / 2.25 &&
        dcanonball < this.height + canonball.height &&
        this.vx == -this.speed
      ) {
        this.x = this.xspawn;
        this.y = this.yspawn;
      } else if (
        this.x > canonball.x - canonball.width / 2.25 &&
        this.x < canonball.x + canonball.width / 2.25 &&
        this.y + this.height / 2.25 > canonball.y - canonball.height / 2.25 &&
        this.y - this.height / 2.25 < canonball.y + canonball.height / 2.25
      ) {
        this.x = this.xspawn;
        this.y = this.yspawn;

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }
  }

  keyPressed() {
    // Hop from level 01 to level 02.
    if (state == "level01") {
      if (keyCode == 16) {
        if (exit == true) {
          this.x = 150;
          this.y = 400;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = false;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          state = "level02";
        }
      }
    }
    // Hop from level 02 to level 03.
    if (state == "level02") {
      if (keyCode == 16) {
        if (exit == true) {
          this.x = 150;
          this.y = 350;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = false;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          state = "level03";
        }
      }
    }
    // Hop from level 03 to level 04.
    if (state == "level03") {
      if (keyCode == 16) {
        if (exit == true) {
          this.x = 150;
          this.y = 350;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = false;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          state = "level04";
        }
      }
    }

    // Hop from level 04 to level 05.
    if (state == "level04") {
      if (keyCode == 16) {
        if (exit == true) {
          this.x = 150;
          this.y = 500;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = true;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          state = "level05";
        }
      }
    }

    // Hop from level 05 to level 06.
    if (state == "level05") {
      if (keyCode == 16) {
        if (exit == true) {
          this.x = 150;
          this.y = 500;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = false;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          state = "level06";
        }
      }
    }

    // Hop from level 06 to level 07.
    if (state == "level06") {
      if (keyCode == 16) {
        if (exit == true) {
          this.x = 150;
          this.y = 500;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = false;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          state = "level07";
        }
      }
    }

    if (this.y > 800) {
      reset = true;
    }

    if (state == "level01" || state == "level05") {
      if (reset == true) {
        if (keyCode == 82) {
          this.x = 150;
          this.y = 500;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = true;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
        }
      }
    } else if (state == "level02" || state == "level06") {
      if (reset == true) {
        if (keyCode == 82) {
          this.x = 150;
          this.y = 400;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = true;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
        }
      }
    } else if (state == "level03") {
      if (reset == true) {
        if (keyCode == 82) {
          this.x = 150;
          this.y = 350;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = true;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
        }
      }
    } else if (state == "level04") {
      if (reset == true) {
        if (keyCode == 82) {
          this.x = 150;
          this.y = 300;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = true;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
        }
      }
    }
  }

  keyReleased() {
    if (keyCode === 65) {
      this.run = 0;
    } else if (keyCode === 68) {
      this.run = 0;
    }
  }

  display() {
    push();
    imageMode(CENTER);
    if (this.run == 1 && this.jump == 0) {
      image(avatarrunningleftimage, this.x, this.y, this.width, this.height);
    } else if (this.run == 2 && this.jump == 0) {
      image(avatarrunningrightimage, this.x, this.y, this.width, this.height);
    } else if (
      this.run == 0 &&
      this.face == 0 &&
      this.crouched == 0 &&
      this.jump == 0
    ) {
      image(avataridlerightimage, this.x, this.y, this.width, this.height);
    } else if (
      this.run == 0 &&
      this.face == 0 &&
      this.crouched == 0 &&
      this.jump == 0
    ) {
      image(avataridlerightimage, this.x, this.y, this.width, this.height);
    } else if (
      this.run == 0 &&
      this.face == 1 &&
      this.crouched == 0 &&
      this.jump == 0
    ) {
      image(avataridleleftimage, this.x, this.y, this.width, this.height);
    } else if (this.run == 0 && this.face == 0 && this.crouched == 1) {
      image(avatarcrouchedrightimage, this.x, this.y, this.width, this.height);
    } else if (this.run == 0 && this.face == 1 && this.crouched == 1) {
      image(avatarcrouchedleftimage, this.x, this.y, this.width, this.height);
    } else if (this.face == 0 && this.crouched == 0 && this.jump == 2) {
      image(avatarjumpright2image, this.x, this.y, this.width, this.height);
    } else if (this.face == 1 && this.crouched == 0 && this.jump == 2) {
      image(avatarjumpleft2image, this.x, this.y, this.width, this.height);
    } else if (
      this.run > 0 &&
      this.face == 0 &&
      this.crouched == 1 &&
      this.jump == 2
    ) {
      image(avatarcrouchedrightimage, this.x, this.y, this.width, this.height);
    } else if (
      this.run > 0 &&
      this.face == 1 &&
      this.crouched == 1 &&
      this.jump == 2
    ) {
      image(avatarcrouchedleftimage, this.x, this.y, this.width, this.height);
    } else if (
      this.run < 0 &&
      this.face == 1 &&
      this.crouched == 1 &&
      this.jump == 2
    ) {
      image(avatarcrouchedleftimage, this.x, this.y, this.width, this.height);
    } else if (
      this.run > 0 &&
      this.face == 1 &&
      this.crouched == 1 &&
      this.jump == 2
    ) {
      image(avatarcrouchedleftimage, this.x, this.y, this.width, this.height);
    }
    pop();
  }
}
