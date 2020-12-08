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
    this.force = false;
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

    this.x = constrain(this.x, 0, width);

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
        jump.stop();
        jump.play();
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
        this.force = true;
      } else {
        this.force = false;
      }
    }

    // Collides with Door.
    if (
      state == "level01" ||
      state == "level02" ||
      state == "level03" ||
      state == "level04" ||
      state == "level05" ||
      state == "level06" ||
      state == "level07" ||
      state == "level08" ||
      state == "level09" ||
      state == "level10"
    ) {
      if (
        this.x > door.x - door.width / 3 &&
        this.x < door.x + door.width / 3 &&
        this.y > door.y - door.height / 1 &&
        this.y < door.y + door.height / 1.5
      ) {
        if (doorlock == false) {
          exit = true;
        }
      } else {
        exit = false;
      }
    }

    // Collides with key.
    if (state == "level06" || state == "level07" || state == "level09") {
      if (
        this.x > key.x - key.width / 1 &&
        this.x < key.x + key.width / 1 &&
        this.y > key.y - key.height / 1 &&
        this.y < key.y + key.height / 1
      ) {
        doorlock = false;
        keynumber = 1;
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
        this.y < groundblock01.y - groundblock01.height / 2 &&
        this.y > groundblock01.y - groundblock01.height / 2
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level05" || state == "level07" || state == "level10") {
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
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > groundblock03.x - groundblock03.width / 1.9 &&
        this.x > groundblock03.x + groundblock03.width / 1.9 &&
        dgroundblock03 < this.width / 1.9 + groundblock03.width / 1.9 &&
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level09") {
      // Collides with groundblock04.
      let dgroundblock04 = dist(
        this.x,
        this.y,
        groundblock04.x,
        groundblock04.y
      );
      if (
        this.x < groundblock04.x - groundblock04.width / 1.9 &&
        this.x < groundblock04.x + groundblock04.width / 1.9 &&
        dgroundblock04 < this.width / 1.9 + groundblock04.width / 1.9 &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > groundblock04.x - groundblock04.width / 1.9 &&
        this.x < groundblock04.x + groundblock04.width / 1.9 &&
        this.y < groundblock04.y - groundblock04.height / 3 &&
        this.y > groundblock04.y - groundblock04.height / 2
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > groundblock04.x - groundblock04.width / 1.75 &&
        this.x < groundblock04.x + groundblock04.width / 1.75 &&
        this.y < groundblock04.y + groundblock04.height &&
        this.y > groundblock04.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level09") {
      // Collides with groundblock05.
      let dgroundblock05 = dist(
        this.x,
        this.y,
        groundblock05.x,
        groundblock05.y
      );
      if (
        this.x > groundblock05.x - groundblock05.width / 1.9 &&
        this.x < groundblock05.x + groundblock05.width / 1.9 &&
        this.y < groundblock05.y - groundblock05.height / 3 &&
        this.y > groundblock05.y - groundblock05.height / 2
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > groundblock05.x - groundblock05.width / 1.75 &&
        this.x < groundblock05.x + groundblock05.width / 1.75 &&
        this.y < groundblock05.y + groundblock05.height &&
        this.y > groundblock05.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (
      state == "level01" ||
      state == "level06" ||
      state == "level09" ||
      state == "level10"
    ) {
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
        this.y - this.height / 5 < cube.y + cube.height / 5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > cube.x - cube.width / 1.9 &&
        this.x < cube.x + cube.width / 1.9 &&
        this.y + this.height / 2 > cube.y - cube.height / 2 &&
        this.y - this.height / 2 < cube.y + cube.height / 2 &&
        this.y > cube.y + cube.height / 2
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level03" || state == "level09") {
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
        this.y - this.height / 5 < cube02.y + cube02.height / 5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > cube02.x - cube02.width / 1.9 &&
        this.x < cube02.x + cube02.width / 1.9 &&
        this.y + this.height / 2 > cube02.y - cube02.height / 2 &&
        this.y - this.height / 2 < cube02.y + cube02.height / 2 &&
        this.y > cube02.y + cube02.height / 2
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level02" || state == "level09") {
      // Collides with cube03.
      let dcube03 = dist(this.x, this.y, cube03.x, cube03.y);
      if (
        this.x < cube03.x - cube03.width / 1.9 &&
        this.x < cube03.x + cube03.width / 1.9 &&
        dcube03 < this.width / 1.9 + cube03.width / 1.9 &&
        dcube03 < this.height + cube03.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube03.x - cube03.width / 1.9 &&
        this.x > cube03.x + cube03.width / 1.9 &&
        dcube03 < this.width / 1.9 + cube03.width / 1.9 &&
        dcube03 < this.height + cube03.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube03.x - cube03.width / 1.9 &&
        this.x < cube03.x + cube03.width / 1.9 &&
        this.y + this.height / 2.25 > cube03.y - cube03.height / 2.25 &&
        this.y - this.height / 5 < cube03.y + cube03.height / 5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > cube03.x - cube03.width / 1.9 &&
        this.x < cube03.x + cube03.width / 1.9 &&
        this.y + this.height / 2 > cube03.y - cube03.height / 2 &&
        this.y - this.height / 2 < cube03.y + cube03.height / 2 &&
        this.y > cube03.y + cube03.height / 2
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level09") {
      // Collides with cube04.
      let dcube04 = dist(this.x, this.y, cube04.x, cube04.y);
      if (
        this.x < cube04.x - cube04.width / 1.9 &&
        this.x < cube04.x + cube04.width / 1.9 &&
        dcube04 < this.width / 1.9 + cube04.width / 1.9 &&
        dcube04 < this.height + cube04.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube04.x - cube04.width / 1.9 &&
        this.x > cube04.x + cube04.width / 1.9 &&
        dcube04 < this.width / 1.9 + cube04.width / 1.9 &&
        dcube04 < this.height + cube04.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube04.x - cube04.width / 1.9 &&
        this.x < cube04.x + cube04.width / 1.9 &&
        this.y + this.height / 2.25 > cube04.y - cube04.height / 2.25 &&
        this.y - this.height / 2.25 < cube04.y + cube04.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level09") {
      // Collides with cube05.
      let dcube05 = dist(this.x, this.y, cube05.x, cube05.y);
      if (
        this.x < cube05.x - cube05.width / 1.9 &&
        this.x < cube05.x + cube05.width / 1.9 &&
        dcube05 < this.width / 1.9 + cube05.width / 1.9 &&
        dcube05 < this.height + cube05.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube05.x - cube05.width / 1.9 &&
        this.x > cube05.x + cube05.width / 1.9 &&
        dcube05 < this.width / 1.9 + cube05.width / 1.9 &&
        dcube05 < this.height + cube05.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube05.x - cube05.width / 1.9 &&
        this.x < cube05.x + cube05.width / 1.9 &&
        this.y + this.height / 2.25 > cube05.y - cube05.height / 2.25 &&
        this.y - this.height / 5 < cube05.y + cube05.height / 5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > cube05.x - cube05.width / 1.9 &&
        this.x < cube05.x + cube05.width / 1.9 &&
        this.y + this.height / 2 > cube05.y - cube05.height / 2 &&
        this.y - this.height / 2 < cube05.y + cube05.height / 2 &&
        this.y > cube05.y + cube05.height / 2
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level09") {
      // Collides with cube06.
      let dcube06 = dist(this.x, this.y, cube06.x, cube06.y);
      if (
        this.x < cube06.x - cube06.width / 1.9 &&
        this.x < cube06.x + cube06.width / 1.9 &&
        dcube06 < this.width / 1.9 + cube06.width / 1.9 &&
        dcube06 < this.height + cube06.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube06.x - cube06.width / 1.9 &&
        this.x > cube06.x + cube06.width / 1.9 &&
        dcube06 < this.width / 1.9 + cube06.width / 1.9 &&
        dcube06 < this.height + cube06.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube06.x - cube06.width / 1.9 &&
        this.x < cube06.x + cube06.width / 1.9 &&
        this.y + this.height / 2.25 > cube06.y - cube06.height / 2.25 &&
        this.y - this.height / 5 < cube06.y + cube06.height / 5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > cube06.x - cube06.width / 1.9 &&
        this.x < cube06.x + cube06.width / 1.9 &&
        this.y + this.height / 2 > cube06.y - cube06.height / 2 &&
        this.y - this.height / 2 < cube06.y + cube06.height / 2 &&
        this.y > cube06.y + cube06.height / 2
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level09") {
      // Collides with cube07.
      let dcube07 = dist(this.x, this.y, cube07.x, cube07.y);
      if (
        this.x < cube07.x - cube07.width / 1.9 &&
        this.x < cube07.x + cube07.width / 1.9 &&
        dcube07 < this.width / 1.9 + cube07.width / 1.9 &&
        dcube07 < this.height + cube07.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube07.x - cube07.width / 1.9 &&
        this.x > cube07.x + cube07.width / 1.9 &&
        dcube07 < this.width / 1.9 + cube07.width / 1.9 &&
        dcube07 < this.height + cube07.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube07.x - cube07.width / 1.9 &&
        this.x < cube07.x + cube07.width / 1.9 &&
        this.y + this.height / 2.25 > cube07.y - cube07.height / 2.25 &&
        this.y - this.height / 5 < cube07.y + cube07.height / 5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > cube07.x - cube07.width / 1.9 &&
        this.x < cube07.x + cube07.width / 1.9 &&
        this.y + this.height / 2 > cube07.y - cube07.height / 2 &&
        this.y - this.height / 2 < cube07.y + cube07.height / 2 &&
        this.y > cube07.y + cube07.height / 2
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level09") {
      // Collides with cube08.
      let dcube08 = dist(this.x, this.y, cube08.x, cube08.y);
      if (
        this.x < cube08.x - cube08.width / 1.9 &&
        this.x < cube08.x + cube08.width / 1.9 &&
        dcube08 < this.width / 1.9 + cube08.width / 1.9 &&
        dcube08 < this.height + cube08.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube08.x - cube08.width / 1.9 &&
        this.x > cube08.x + cube08.width / 1.9 &&
        dcube08 < this.width / 1.9 + cube08.width / 1.9 &&
        dcube08 < this.height + cube08.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube08.x - cube08.width / 1.9 &&
        this.x < cube08.x + cube08.width / 1.9 &&
        this.y + this.height / 2.25 > cube08.y - cube08.height / 2.25 &&
        this.y - this.height / 5 < cube08.y + cube08.height / 5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > cube08.x - cube08.width / 1.9 &&
        this.x < cube08.x + cube08.width / 1.9 &&
        this.y + this.height / 2 > cube08.y - cube08.height / 2 &&
        this.y - this.height / 2 < cube08.y + cube08.height / 2 &&
        this.y > cube08.y + cube08.height / 2
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level09") {
      // Collides with cube09.
      let dcube09 = dist(this.x, this.y, cube09.x, cube09.y);
      if (
        this.x < cube09.x - cube09.width / 1.9 &&
        this.x < cube09.x + cube09.width / 1.9 &&
        dcube09 < this.width / 1.9 + cube09.width / 1.9 &&
        dcube09 < this.height + cube09.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube09.x - cube09.width / 1.9 &&
        this.x > cube09.x + cube09.width / 1.9 &&
        dcube09 < this.width / 1.9 + cube09.width / 1.9 &&
        dcube09 < this.height + cube09.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > cube09.x - cube09.width / 1.9 &&
        this.x < cube09.x + cube09.width / 1.9 &&
        this.y + this.height / 2.25 > cube09.y - cube09.height / 2.25 &&
        this.y - this.height / 5 < cube09.y + cube09.height / 5
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > cube09.x - cube09.width / 1.9 &&
        this.x < cube09.x + cube09.width / 1.9 &&
        this.y + this.height / 2 > cube09.y - cube09.height / 2 &&
        this.y - this.height / 2 < cube09.y + cube09.height / 2 &&
        this.y > cube09.y + cube09.height / 2
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level02" || state == "level03" || state == "level06") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level06") {
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
          jump.stop();
          jump.play();
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
          jump.stop();
          jump.play();
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level04") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level08") {
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
        this.vx == this.speed &&
        buttonactivated == true
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock.x - giantrectangleblock.width / 2 &&
        this.x > giantrectangleblock.x + giantrectangleblock.width / 2 &&
        dgiantrectangleblock < giantrectangleblock.width &&
        dgiantrectangleblock < this.height + giantrectangleblock.height &&
        this.vx == -this.speed &&
        buttonactivated == true
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock.x - giantrectangleblock.width / 2 &&
        this.x < giantrectangleblock.x + giantrectangleblock.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock.y - giantrectangleblock.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock.y + giantrectangleblock.height / 3 &&
        buttonactivated == true
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level08") {
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
        this.vx == this.speed &&
        buttonactivated == true
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock02.x - giantrectangleblock02.width / 2 &&
        this.x > giantrectangleblock02.x + giantrectangleblock02.width / 2 &&
        dgiantrectangleblock02 < giantrectangleblock02.width &&
        dgiantrectangleblock02 < this.height + giantrectangleblock02.height &&
        this.vx == -this.speed &&
        buttonactivated == true
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock02.x - giantrectangleblock02.width / 2 &&
        this.x < giantrectangleblock02.x + giantrectangleblock02.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock02.y - giantrectangleblock02.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock02.y + giantrectangleblock02.height / 3 &&
        buttonactivated == true
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level08") {
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
        this.vx == this.speed &&
        buttonactivated == true
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock03.x - giantrectangleblock03.width / 2 &&
        this.x > giantrectangleblock03.x + giantrectangleblock03.width / 2 &&
        dgiantrectangleblock03 < giantrectangleblock03.width &&
        dgiantrectangleblock03 < this.height + giantrectangleblock03.height &&
        this.vx == -this.speed &&
        buttonactivated == true
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock03.x - giantrectangleblock03.width / 2 &&
        this.x < giantrectangleblock03.x + giantrectangleblock03.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock03.y - giantrectangleblock03.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock03.y + giantrectangleblock03.height / 3 &&
        buttonactivated == true
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level08") {
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
        this.vx == this.speed &&
        buttonactivated == true
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock04.x - giantrectangleblock04.width / 2 &&
        this.x > giantrectangleblock04.x + giantrectangleblock04.width / 2 &&
        dgiantrectangleblock04 < giantrectangleblock04.width &&
        dgiantrectangleblock04 < this.height + giantrectangleblock04.height &&
        this.vx == -this.speed &&
        buttonactivated == true
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock04.x - giantrectangleblock04.width / 2 &&
        this.x < giantrectangleblock04.x + giantrectangleblock04.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock04.y - giantrectangleblock04.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock04.y + giantrectangleblock04.height / 3 &&
        buttonactivated == true
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level08") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level08") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level08") {
      // Collides with giantrectangleblock07.
      let dgiantrectangleblock07 = dist(
        this.x,
        this.y,
        giantrectangleblock07.x,
        giantrectangleblock07.y
      );
      if (
        this.x < giantrectangleblock07.x - giantrectangleblock07.width / 2 &&
        this.x < giantrectangleblock07.x + giantrectangleblock07.width / 2 &&
        dgiantrectangleblock07 < giantrectangleblock07.width &&
        dgiantrectangleblock07 < this.height + giantrectangleblock07.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock07.x - giantrectangleblock07.width / 2 &&
        this.x > giantrectangleblock07.x + giantrectangleblock07.width / 2 &&
        dgiantrectangleblock07 < giantrectangleblock07.width &&
        dgiantrectangleblock07 < this.height + giantrectangleblock07.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock07.x - giantrectangleblock07.width / 2 &&
        this.x < giantrectangleblock07.x + giantrectangleblock07.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock07.y - giantrectangleblock07.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock07.y + giantrectangleblock07.height / 3
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level08") {
      // Collides with giantrectangleblock08.
      let dgiantrectangleblock08 = dist(
        this.x,
        this.y,
        giantrectangleblock08.x,
        giantrectangleblock08.y
      );
      if (
        this.x < giantrectangleblock08.x - giantrectangleblock08.width / 2 &&
        this.x < giantrectangleblock08.x + giantrectangleblock08.width / 2 &&
        dgiantrectangleblock08 < giantrectangleblock08.width &&
        dgiantrectangleblock08 < this.height + giantrectangleblock08.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock08.x - giantrectangleblock08.width / 2 &&
        this.x > giantrectangleblock08.x + giantrectangleblock08.width / 2 &&
        dgiantrectangleblock08 < giantrectangleblock08.width &&
        dgiantrectangleblock08 < this.height + giantrectangleblock08.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > giantrectangleblock08.x - giantrectangleblock08.width / 2 &&
        this.x < giantrectangleblock08.x + giantrectangleblock08.width / 2 &&
        this.y + this.height / 3 >
          giantrectangleblock08.y - giantrectangleblock08.height / 3 &&
        this.y - this.height / 3 <
          giantrectangleblock08.y + giantrectangleblock08.height / 3
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level30") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level01" || state == "level03" || state == "level07") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level07" || state == "level02") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level03") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level02") {
      // Collides with rectangle04.
      let drectangle04 = dist(this.x, this.y, rectangle04.x, rectangle04.y);
      if (
        this.x < rectangle04.x - rectangle04.width / 3.2 &&
        this.x < rectangle04.x + rectangle04.width / 3.2 &&
        drectangle04 < this.width / 3.2 + rectangle04.width / 1.2 &&
        drectangle04 < this.height + rectangle04.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangle04.x - rectangle04.width / 3.2 &&
        this.x > rectangle04.x + rectangle04.width / 3.2 &&
        drectangle04 < this.width / 3.2 + rectangle04.width / 1.2 &&
        drectangle04 < this.height + rectangle04.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangle04.x - rectangle04.width / 1.8 &&
        this.x < rectangle04.x + rectangle04.width / 1.8 &&
        this.y + this.height / 2.25 >
          rectangle04.y - rectangle04.height / 2.25 &&
        this.y - this.height / 2.25 < rectangle04.y + rectangle04.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level02") {
      // Collides with rectangletall.
      let drectangletall = dist(
        this.x,
        this.y,
        rectangletall.x,
        rectangletall.y
      );
      if (
        this.x < rectangletall.x - rectangletall.width / 3.2 &&
        this.x < rectangletall.x + rectangletall.width / 3.2 &&
        drectangletall < this.width / 3.2 + rectangletall.width / 0.8 &&
        drectangletall < this.height + rectangletall.height / 2 &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangletall.x - rectangletall.width / 3.2 &&
        this.x > rectangletall.x + rectangletall.width / 3.2 &&
        drectangletall < this.width / 3.2 + rectangletall.width / 0.8 &&
        drectangletall < this.height + rectangletall.height / 2 &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangletall.x - rectangletall.width / 1.8 &&
        this.x < rectangletall.x + rectangletall.width / 1.8 &&
        this.y + this.height / 2.15 >
          rectangletall.y - rectangletall.height / 2.15 &&
        this.y - this.height / 2.15 <
          rectangletall.y + rectangletall.height / 2.15
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level02") {
      // Collides with rectangletall02.
      let drectangletall02 = dist(
        this.x,
        this.y,
        rectangletall02.x,
        rectangletall02.y
      );
      if (
        this.x < rectangletall02.x - rectangletall02.width / 3.2 &&
        this.x < rectangletall02.x + rectangletall02.width / 3.2 &&
        drectangletall02 < this.width / 3.2 + rectangletall02.width / 0.8 &&
        drectangletall02 < this.height + rectangletall02.height / 2 &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangletall02.x - rectangletall02.width / 3.2 &&
        this.x > rectangletall02.x + rectangletall02.width / 3.2 &&
        drectangletall02 < this.width / 3.2 + rectangletall02.width / 0.8 &&
        drectangletall02 < this.height + rectangletall02.height / 2 &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > rectangletall02.x - rectangletall02.width / 1.8 &&
        this.x < rectangletall02.x + rectangletall02.width / 1.8 &&
        this.y + this.height / 2.15 >
          rectangletall02.y - rectangletall02.height / 2.15 &&
        this.y - this.height / 2.15 <
          rectangletall02.y + rectangletall02.height / 2.15
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level01" || state == "level02") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (
      state == "level04" ||
      state == "level05" ||
      state == "level06" ||
      state == "level07"
    ) {
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
          jump.stop();
          jump.play();
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

    if (state == "level05" || state == "level07") {
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
          jump.stop();
          jump.play();
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

    if (state == "level05" || state == "level07") {
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
          jump.stop();
          jump.play();
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

    if (state == "level30") {
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
          jump.stop();
          jump.play();
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

    if (state == "level03" || state == "level05") {
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
        // something broken here.
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
          jump.stop();
          jump.play();
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

    if (state == "level03") {
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
          jump.stop();
          jump.play();
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

    if (state == "level05") {
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
          jump.stop();
          jump.play();
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

    if (state == "level05") {
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
          jump.stop();
          jump.play();
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

    if (state == "level05") {
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
          jump.stop();
          jump.play();
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

    if (state == "level07") {
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
          jump.stop();
          jump.play();
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

    if (state == "level09") {
      // Collides with movingplatformvertical04.
      let dmovingplatformvertical04 = dist(
        this.x,
        this.y,
        movingplatformvertical04.x,
        movingplatformvertical04.y
      );
      if (
        this.x <
          movingplatformvertical04.x - movingplatformvertical04.width / 2 &&
        this.x <
          movingplatformvertical04.x + movingplatformvertical04.width / 2 &&
        dmovingplatformvertical04 <
          this.width / 2 + movingplatformvertical04.width / 2 &&
        dmovingplatformvertical04 <
          this.height + movingplatformvertical04.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x >
          movingplatformvertical04.x - movingplatformvertical04.width / 2 &&
        this.x >
          movingplatformvertical04.x + movingplatformvertical04.width / 2 &&
        dmovingplatformvertical04 <
          this.width / 2 + movingplatformvertical04.width / 2 &&
        dmovingplatformvertical04 <
          this.height + movingplatformvertical04.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x >
          movingplatformvertical04.x - movingplatformvertical04.width / 1.75 &&
        this.x <
          movingplatformvertical04.x + movingplatformvertical04.width / 1.75 &&
        this.y <
          movingplatformvertical04.y - movingplatformvertical04.height / 2 &&
        this.y >
          movingplatformvertical04.y - movingplatformvertical04.height / 1
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.y = this.y + movingplatformvertical04.vy;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x >
          movingplatformvertical04.x - movingplatformvertical04.width / 1.75 &&
        this.x <
          movingplatformvertical04.x + movingplatformvertical04.width / 1.75 &&
        this.y < movingplatformvertical04.y + movingplatformvertical04.height &&
        this.y > movingplatformvertical04.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level08") {
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
        this.y > button.y - button.height / 0.9 &&
        this.y < button.y + button.height / 0.7 &&
        buttonactivated == false
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        if (this.force == true) {
          buttonactivated = true;
        }

        //  Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > button.x - button.width / 2 &&
        this.x < button.x + button.width / 2 &&
        this.y > button.y - button.height / 1.2 &&
        this.y < button.y + button.height / 1.1 &&
        buttonactivated == true
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        //  Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level06") {
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
        bounce.stop();
        bounce.play();
      }

      if (this.bounce == true) {
        gravityForce = 0.01;
        this.jump = 2;
      } else if (
        this.x > trampoline.x - trampoline.width / 1.75 &&
        this.x < trampoline.x + trampoline.width / 1.75 &&
        this.y < trampoline.y + trampoline.height &&
        this.y > trampoline.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level06") {
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
        bounce.stop();
        bounce.play();
      }

      if (this.bounce == true) {
        gravityForce = 0.01;
        this.jump = 2;
      } else if (
        this.x > trampoline02.x - trampoline02.width / 1.75 &&
        this.x < trampoline02.x + trampoline02.width / 1.75 &&
        this.y < trampoline02.y + trampoline02.height &&
        this.y > trampoline02.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level06") {
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
        bounce.stop();
        bounce.play();
      }

      if (this.bounce == true) {
        gravityForce = 0.01;
        this.jump = 2;
      }
    }

    if (state == "level06") {
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
        bounce.stop();
        bounce.play();
      }

      if (this.bounce == true) {
        gravityForce = 0.01;
        this.jump = 2;
      }
    }

    if (state == "level07") {
      // Collides with boostplatform.
      let dboostplatform = dist(
        this.x,
        this.y,
        boostplatform.x,
        boostplatform.y
      );
      if (
        this.x < boostplatform.x - boostplatform.width / 1.9 &&
        this.x < boostplatform.x + boostplatform.width / 1.9 &&
        dboostplatform < this.width / 1.9 + boostplatform.width / 1.9 &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > boostplatform.x - boostplatform.width / 1.9 &&
        this.x > boostplatform.x + boostplatform.width / 1.9 &&
        dboostplatform < this.width / 1.9 + boostplatform.width / 1.9 &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > boostplatform.x - boostplatform.width / 1.9 &&
        this.x < boostplatform.x + boostplatform.width / 1.9 &&
        this.y > boostplatform.y - boostplatform.height / 1 &&
        this.y < boostplatform.y + boostplatform.height / 1
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > boostplatform.x - boostplatform.width / 1.9 &&
        this.x < boostplatform.x + boostplatform.width / 1.9 &&
        this.y < boostplatform.y + boostplatform.height / 0.9 &&
        this.y > boostplatform.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level07") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > boostplatform02.x - boostplatform02.width / 1.9 &&
        this.x < boostplatform02.x + boostplatform02.width / 1.9 &&
        this.y < boostplatform02.y + boostplatform02.height / 0.9 &&
        this.y > boostplatform02.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level04") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }
    if (state == "level04") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }
    if (state == "level04") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }
    if (state == "level04") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level09") {
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
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > canon.x - canon.width / 1.75 &&
        this.x < canon.x + canon.width / 1.75 &&
        this.y < canon.y + canon.height &&
        this.y > canon.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level09") {
      // Collides with canonright.
      let dcanonright = dist(this.x, this.y, canonright.x, canonright.y);
      if (
        this.x < canonright.x - canonright.width / 1.9 &&
        this.x < canonright.x + canonright.width / 1.9 &&
        dcanonright < this.width / 1.9 + canonright.width / 1.9 &&
        dcanonright < this.height + canonright.height &&
        this.vx == this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > canonright.x - canonright.width / 1.9 &&
        this.x > canonright.x + canonright.width / 1.9 &&
        dcanonright < this.width / 1.9 + canonright.width / 1.9 &&
        dcanonright < this.height + canonright.height &&
        this.vx == -this.speed
      ) {
        this.vx = 0;
      } else if (
        this.x > canonright.x - canonright.width / 1.9 &&
        this.x < canonright.x + canonright.width / 1.9 &&
        this.y + this.height / 2.25 > canonright.y - canonright.height / 2.25 &&
        this.y - this.height / 2.25 < canonright.y + canonright.height / 2.25
      ) {
        this.vy = 0;
        this.ay = 0;
        gravityForce = 0.0;
        this.jump = 0;
        this.bounce = false;
        this.speed = 4;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      } else if (
        this.x > canonright.x - canonright.width / 1.75 &&
        this.x < canonright.x + canonright.width / 1.75 &&
        this.y < canonright.y + canonright.height &&
        this.y > canonright.y
      ) {
        this.vy = this.jumpheight;
      }
    }

    if (state == "level09") {
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
        keynumber = 0;
        doorlock = true;
      } else if (
        this.x > canonball.x - canonball.width / 2.25 &&
        this.x > canonball.x + canonball.width / 2.25 &&
        dcanonball < this.width / 2.25 + canonball.width / 2.25 &&
        dcanonball < this.height + canonball.height &&
        this.vx == -this.speed
      ) {
        this.x = this.xspawn;
        this.y = this.yspawn;
        keynumber = 0;
        doorlock = true;
      } else if (
        this.x > canonball.x - canonball.width / 2.25 &&
        this.x < canonball.x + canonball.width / 2.25 &&
        this.y + this.height / 2.25 > canonball.y - canonball.height / 2.25 &&
        this.y - this.height / 2.25 < canonball.y + canonball.height / 2.25
      ) {
        this.x = this.xspawn;
        this.y = this.yspawn;
        keynumber = 0;
        doorlock = true;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level09") {
      // Collides with canonball02.
      let dcanonball02 = dist(this.x, this.y, canonball02.x, canonball02.y);
      if (
        this.x < canonball02.x - canonball02.width / 2.25 &&
        this.x < canonball02.x + canonball02.width / 2.25 &&
        dcanonball02 < this.width / 2.25 + canonball02.width / 2.25 &&
        dcanonball02 < this.height + canonball02.height
      ) {
        this.x = this.xspawn;
        this.y = this.yspawn;
        keynumber = 0;
        doorlock = true;
      } else if (
        this.x > canonball02.x - canonball02.width / 2.25 &&
        this.x > canonball02.x + canonball02.width / 2.25 &&
        dcanonball02 < this.width / 2.25 + canonball02.width / 2.25 &&
        dcanonball02 < this.height + canonball02.height &&
        this.vx == -this.speed
      ) {
        this.x = this.xspawn;
        this.y = this.yspawn;
        keynumber = 0;
        doorlock = true;
      } else if (
        this.x > canonball02.x - canonball02.width / 2.25 &&
        this.x < canonball02.x + canonball02.width / 2.25 &&
        this.y + this.height / 2.25 >
          canonball02.y - canonball02.height / 2.25 &&
        this.y - this.height / 2.25 < canonball02.y + canonball02.height / 2.25
      ) {
        this.x = this.xspawn;
        this.y = this.yspawn;
        keynumber = 0;
        doorlock = true;

        // Jump.
        if (keyIsDown(87)) {
          jump.stop();
          jump.play();
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    if (state == "level10") {
      if (disappearingplatformblue01timer == true) {
        // Collides with disappearingplatformblue01.
        let ddisappearingplatformblue01 = dist(
          this.x,
          this.y,
          disappearingplatformblue01.x,
          disappearingplatformblue01.y
        );
        if (
          this.x <
            disappearingplatformblue01.x -
              disappearingplatformblue01.width / 2 &&
          this.x <
            disappearingplatformblue01.x +
              disappearingplatformblue01.width / 2 &&
          ddisappearingplatformblue01 <
            this.width / 2 + disappearingplatformblue01.width / 2 &&
          ddisappearingplatformblue01 <
            this.height + disappearingplatformblue01.height &&
          this.vx == this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformblue01.x -
              disappearingplatformblue01.width / 2 &&
          this.x >
            disappearingplatformblue01.x +
              disappearingplatformblue01.width / 2 &&
          ddisappearingplatformblue01 <
            this.width / 2 + disappearingplatformblue01.width / 2 &&
          ddisappearingplatformblue01 <
            this.height + disappearingplatformblue01.height &&
          this.vx == -this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformblue01.x -
              disappearingplatformblue01.width / 1.75 &&
          this.x <
            disappearingplatformblue01.x +
              disappearingplatformblue01.width / 1.75 &&
          this.y <
            disappearingplatformblue01.y -
              disappearingplatformblue01.height / 2 &&
          this.y >
            disappearingplatformblue01.y - disappearingplatformblue01.height / 1
        ) {
          this.vy = 0;
          this.ay = 0;
          gravityForce = 0.0;
          this.jump = 0;
          this.bounce = false;
          this.speed = 4;

          //  Jump.
          if (keyIsDown(87)) {
            jump.stop();
            jump.play();
            this.vy = -this.jumpheight;
            this.ay = 0;
            gravityForce = 0;
            this.jump = 2;
          }
        } else if (
          this.x >
            disappearingplatformblue01.x -
              disappearingplatformblue01.width / 1.75 &&
          this.x <
            disappearingplatformblue01.x +
              disappearingplatformblue01.width / 1.75 &&
          this.y <
            disappearingplatformblue01.y + disappearingplatformblue01.height &&
          this.y > disappearingplatformblue01.y
        ) {
          this.vy = this.jumpheight;
        }
      }
    }

    if (state == "level10") {
      if (disappearingplatformyellow01timer == true) {
        // Collides with disappearingplatformyellow01.
        let ddisappearingplatformyellow01 = dist(
          this.x,
          this.y,
          disappearingplatformyellow01.x,
          disappearingplatformyellow01.y
        );
        if (
          this.x <
            disappearingplatformyellow01.x -
              disappearingplatformyellow01.width / 2 &&
          this.x <
            disappearingplatformyellow01.x +
              disappearingplatformyellow01.width / 2 &&
          ddisappearingplatformyellow01 <
            this.width / 2 + disappearingplatformyellow01.width / 2 &&
          ddisappearingplatformyellow01 <
            this.height + disappearingplatformyellow01.height &&
          this.vx == this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformyellow01.x -
              disappearingplatformyellow01.width / 2 &&
          this.x >
            disappearingplatformyellow01.x +
              disappearingplatformyellow01.width / 2 &&
          ddisappearingplatformyellow01 <
            this.width / 2 + disappearingplatformyellow01.width / 2 &&
          ddisappearingplatformyellow01 <
            this.height + disappearingplatformyellow01.height &&
          this.vx == -this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformyellow01.x -
              disappearingplatformyellow01.width / 1.75 &&
          this.x <
            disappearingplatformyellow01.x +
              disappearingplatformyellow01.width / 1.75 &&
          this.y <
            disappearingplatformyellow01.y -
              disappearingplatformyellow01.height / 2 &&
          this.y >
            disappearingplatformyellow01.y -
              disappearingplatformyellow01.height / 1
        ) {
          this.vy = 0;
          this.ay = 0;
          gravityForce = 0.0;
          this.jump = 0;
          this.bounce = false;
          this.speed = 4;

          //  Jump.
          if (keyIsDown(87)) {
            jump.stop();
            jump.play();
            this.vy = -this.jumpheight;
            this.ay = 0;
            gravityForce = 0;
            this.jump = 2;
          }
        } else if (
          this.x >
            disappearingplatformyellow01.x -
              disappearingplatformyellow01.width / 1.75 &&
          this.x <
            disappearingplatformyellow01.x +
              disappearingplatformyellow01.width / 1.75 &&
          this.y <
            disappearingplatformyellow01.y +
              disappearingplatformyellow01.height &&
          this.y > disappearingplatformyellow01.y
        ) {
          this.vy = this.jumpheight;
        }
      }
    }

    if (state == "level10") {
      if (disappearingplatformgreen01timer == true) {
        // Collides with disappearingplatformgreen01.
        let ddisappearingplatformgreen01 = dist(
          this.x,
          this.y,
          disappearingplatformgreen01.x,
          disappearingplatformgreen01.y
        );
        if (
          this.x <
            disappearingplatformgreen01.x -
              disappearingplatformgreen01.width / 2 &&
          this.x <
            disappearingplatformgreen01.x +
              disappearingplatformgreen01.width / 2 &&
          ddisappearingplatformgreen01 <
            this.width / 2 + disappearingplatformgreen01.width / 2 &&
          ddisappearingplatformgreen01 <
            this.height + disappearingplatformgreen01.height &&
          this.vx == this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformgreen01.x -
              disappearingplatformgreen01.width / 2 &&
          this.x >
            disappearingplatformgreen01.x +
              disappearingplatformgreen01.width / 2 &&
          ddisappearingplatformgreen01 <
            this.width / 2 + disappearingplatformgreen01.width / 2 &&
          ddisappearingplatformgreen01 <
            this.height + disappearingplatformgreen01.height &&
          this.vx == -this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformgreen01.x -
              disappearingplatformgreen01.width / 1.75 &&
          this.x <
            disappearingplatformgreen01.x +
              disappearingplatformgreen01.width / 1.75 &&
          this.y <
            disappearingplatformgreen01.y -
              disappearingplatformgreen01.height / 2 &&
          this.y >
            disappearingplatformgreen01.y -
              disappearingplatformgreen01.height / 1
        ) {
          this.vy = 0;
          this.ay = 0;
          gravityForce = 0.0;
          this.jump = 0;
          this.bounce = false;
          this.speed = 4;

          //  Jump.
          if (keyIsDown(87)) {
            jump.stop();
            jump.play();
            this.vy = -this.jumpheight;
            this.ay = 0;
            gravityForce = 0;
            this.jump = 2;
          }
        } else if (
          this.x >
            disappearingplatformgreen01.x -
              disappearingplatformgreen01.width / 1.75 &&
          this.x <
            disappearingplatformgreen01.x +
              disappearingplatformgreen01.width / 1.75 &&
          this.y <
            disappearingplatformgreen01.y +
              disappearingplatformgreen01.height &&
          this.y > disappearingplatformgreen01.y
        ) {
          this.vy = this.jumpheight;
        }
      }
    }

    if (state == "level10") {
      if (disappearingplatformred01timer == true) {
        // Collides with disappearingplatformred01.
        let ddisappearingplatformred01 = dist(
          this.x,
          this.y,
          disappearingplatformred01.x,
          disappearingplatformred01.y
        );
        if (
          this.x <
            disappearingplatformred01.x - disappearingplatformred01.width / 2 &&
          this.x <
            disappearingplatformred01.x + disappearingplatformred01.width / 2 &&
          ddisappearingplatformred01 <
            this.width / 2 + disappearingplatformred01.width / 2 &&
          ddisappearingplatformred01 <
            this.height + disappearingplatformred01.height &&
          this.vx == this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformred01.x - disappearingplatformred01.width / 2 &&
          this.x >
            disappearingplatformred01.x + disappearingplatformred01.width / 2 &&
          ddisappearingplatformred01 <
            this.width / 2 + disappearingplatformred01.width / 2 &&
          ddisappearingplatformred01 <
            this.height + disappearingplatformred01.height &&
          this.vx == -this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformred01.x -
              disappearingplatformred01.width / 1.75 &&
          this.x <
            disappearingplatformred01.x +
              disappearingplatformred01.width / 1.75 &&
          this.y <
            disappearingplatformred01.y -
              disappearingplatformred01.height / 2 &&
          this.y >
            disappearingplatformred01.y - disappearingplatformred01.height / 1
        ) {
          this.vy = 0;
          this.ay = 0;
          gravityForce = 0.0;
          this.jump = 0;
          this.bounce = false;
          this.speed = 4;

          //  Jump.
          if (keyIsDown(87)) {
            jump.stop();
            jump.play();
            this.vy = -this.jumpheight;
            this.ay = 0;
            gravityForce = 0;
            this.jump = 2;
          }
        } else if (
          this.x >
            disappearingplatformred01.x -
              disappearingplatformred01.width / 1.75 &&
          this.x <
            disappearingplatformred01.x +
              disappearingplatformred01.width / 1.75 &&
          this.y <
            disappearingplatformred01.y + disappearingplatformred01.height &&
          this.y > disappearingplatformred01.y
        ) {
          this.vy = this.jumpheight;
        }
      }
    }
    if (state == "level10") {
      if (disappearingplatformblue02timer == true) {
        // Collides with disappearingplatformblue02.
        let ddisappearingplatformblue02 = dist(
          this.x,
          this.y,
          disappearingplatformblue02.x,
          disappearingplatformblue02.y
        );
        if (
          this.x <
            disappearingplatformblue02.x -
              disappearingplatformblue02.width / 2 &&
          this.x <
            disappearingplatformblue02.x +
              disappearingplatformblue02.width / 2 &&
          ddisappearingplatformblue02 <
            this.width / 2 + disappearingplatformblue02.width / 2 &&
          ddisappearingplatformblue02 <
            this.height + disappearingplatformblue02.height &&
          this.vx == this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformblue02.x -
              disappearingplatformblue02.width / 2 &&
          this.x >
            disappearingplatformblue02.x +
              disappearingplatformblue02.width / 2 &&
          ddisappearingplatformblue02 <
            this.width / 2 + disappearingplatformblue02.width / 2 &&
          ddisappearingplatformblue02 <
            this.height + disappearingplatformblue02.height &&
          this.vx == -this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformblue02.x -
              disappearingplatformblue02.width / 1.75 &&
          this.x <
            disappearingplatformblue02.x +
              disappearingplatformblue02.width / 1.75 &&
          this.y <
            disappearingplatformblue02.y -
              disappearingplatformblue02.height / 2 &&
          this.y >
            disappearingplatformblue02.y - disappearingplatformblue02.height / 1
        ) {
          this.vy = 0;
          this.ay = 0;
          gravityForce = 0.0;
          this.jump = 0;
          this.bounce = false;
          this.speed = 4;

          //  Jump.
          if (keyIsDown(87)) {
            jump.stop();
            jump.play();
            this.vy = -this.jumpheight;
            this.ay = 0;
            gravityForce = 0;
            this.jump = 2;
          }
        } else if (
          this.x >
            disappearingplatformblue02.x -
              disappearingplatformblue02.width / 1.75 &&
          this.x <
            disappearingplatformblue02.x +
              disappearingplatformblue02.width / 1.75 &&
          this.y <
            disappearingplatformblue02.y + disappearingplatformblue02.height &&
          this.y > disappearingplatformblue02.y
        ) {
          this.vy = this.jumpheight;
        }
      }
    }

    if (state == "level10") {
      if (disappearingplatformyellow02timer == true) {
        // Collides with disappearingplatformyellow02.
        let ddisappearingplatformyellow02 = dist(
          this.x,
          this.y,
          disappearingplatformyellow02.x,
          disappearingplatformyellow02.y
        );
        if (
          this.x <
            disappearingplatformyellow02.x -
              disappearingplatformyellow02.width / 2 &&
          this.x <
            disappearingplatformyellow02.x +
              disappearingplatformyellow02.width / 2 &&
          ddisappearingplatformyellow02 <
            this.width / 2 + disappearingplatformyellow02.width / 2 &&
          ddisappearingplatformyellow02 <
            this.height + disappearingplatformyellow02.height &&
          this.vx == this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformyellow02.x -
              disappearingplatformyellow02.width / 2 &&
          this.x >
            disappearingplatformyellow02.x +
              disappearingplatformyellow02.width / 2 &&
          ddisappearingplatformyellow02 <
            this.width / 2 + disappearingplatformyellow02.width / 2 &&
          ddisappearingplatformyellow02 <
            this.height + disappearingplatformyellow02.height &&
          this.vx == -this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformyellow02.x -
              disappearingplatformyellow02.width / 1.75 &&
          this.x <
            disappearingplatformyellow02.x +
              disappearingplatformyellow02.width / 1.75 &&
          this.y <
            disappearingplatformyellow02.y -
              disappearingplatformyellow02.height / 2 &&
          this.y >
            disappearingplatformyellow02.y -
              disappearingplatformyellow02.height / 1
        ) {
          this.vy = 0;
          this.ay = 0;
          gravityForce = 0.0;
          this.jump = 0;
          this.bounce = false;
          this.speed = 4;

          //  Jump.
          if (keyIsDown(87)) {
            jump.stop();
            jump.play();
            this.vy = -this.jumpheight;
            this.ay = 0;
            gravityForce = 0;
            this.jump = 2;
          }
        } else if (
          this.x >
            disappearingplatformyellow02.x -
              disappearingplatformyellow02.width / 1.75 &&
          this.x <
            disappearingplatformyellow02.x +
              disappearingplatformyellow02.width / 1.75 &&
          this.y <
            disappearingplatformyellow02.y +
              disappearingplatformyellow02.height &&
          this.y > disappearingplatformyellow02.y
        ) {
          this.vy = this.jumpheight;
        }
      }
    }

    if (state == "level10") {
      if (disappearingplatformgreen02timer == true) {
        // Collides with disappearingplatformgreen02.
        let ddisappearingplatformgreen02 = dist(
          this.x,
          this.y,
          disappearingplatformgreen02.x,
          disappearingplatformgreen02.y
        );
        if (
          this.x <
            disappearingplatformgreen02.x -
              disappearingplatformgreen02.width / 2 &&
          this.x <
            disappearingplatformgreen02.x +
              disappearingplatformgreen02.width / 2 &&
          ddisappearingplatformgreen02 <
            this.width / 2 + disappearingplatformgreen02.width / 2 &&
          ddisappearingplatformgreen02 <
            this.height + disappearingplatformgreen02.height &&
          this.vx == this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformgreen02.x -
              disappearingplatformgreen02.width / 2 &&
          this.x >
            disappearingplatformgreen02.x +
              disappearingplatformgreen02.width / 2 &&
          ddisappearingplatformgreen02 <
            this.width / 2 + disappearingplatformgreen02.width / 2 &&
          ddisappearingplatformgreen02 <
            this.height + disappearingplatformgreen02.height &&
          this.vx == -this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformgreen02.x -
              disappearingplatformgreen02.width / 1.75 &&
          this.x <
            disappearingplatformgreen02.x +
              disappearingplatformgreen02.width / 1.75 &&
          this.y <
            disappearingplatformgreen02.y -
              disappearingplatformgreen02.height / 2 &&
          this.y >
            disappearingplatformgreen02.y -
              disappearingplatformgreen02.height / 1
        ) {
          this.vy = 0;
          this.ay = 0;
          gravityForce = 0.0;
          this.jump = 0;
          this.bounce = false;
          this.speed = 4;

          //  Jump.
          if (keyIsDown(87)) {
            jump.stop();
            jump.play();
            this.vy = -this.jumpheight;
            this.ay = 0;
            gravityForce = 0;
            this.jump = 2;
          }
        } else if (
          this.x >
            disappearingplatformgreen02.x -
              disappearingplatformgreen02.width / 1.75 &&
          this.x <
            disappearingplatformgreen02.x +
              disappearingplatformgreen02.width / 1.75 &&
          this.y <
            disappearingplatformgreen02.y +
              disappearingplatformgreen02.height &&
          this.y > disappearingplatformgreen02.y
        ) {
          this.vy = this.jumpheight;
        }
      }
    }

    if (state == "level10") {
      if (disappearingplatformred02timer == true) {
        // Collides with disappearingplatformred02.
        let ddisappearingplatformred02 = dist(
          this.x,
          this.y,
          disappearingplatformred02.x,
          disappearingplatformred02.y
        );
        if (
          this.x <
            disappearingplatformred02.x - disappearingplatformred02.width / 2 &&
          this.x <
            disappearingplatformred02.x + disappearingplatformred02.width / 2 &&
          ddisappearingplatformred02 <
            this.width / 2 + disappearingplatformred02.width / 2 &&
          ddisappearingplatformred02 <
            this.height + disappearingplatformred02.height &&
          this.vx == this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformred02.x - disappearingplatformred02.width / 2 &&
          this.x >
            disappearingplatformred02.x + disappearingplatformred02.width / 2 &&
          ddisappearingplatformred02 <
            this.width / 2 + disappearingplatformred02.width / 2 &&
          ddisappearingplatformred02 <
            this.height + disappearingplatformred02.height &&
          this.vx == -this.speed
        ) {
          this.vx = 0;
        } else if (
          this.x >
            disappearingplatformred02.x -
              disappearingplatformred02.width / 1.75 &&
          this.x <
            disappearingplatformred02.x +
              disappearingplatformred02.width / 1.75 &&
          this.y <
            disappearingplatformred02.y -
              disappearingplatformred02.height / 2 &&
          this.y >
            disappearingplatformred02.y - disappearingplatformred02.height / 1
        ) {
          this.vy = 0;
          this.ay = 0;
          gravityForce = 0.0;
          this.jump = 0;
          this.bounce = false;
          this.speed = 4;

          //  Jump.
          if (keyIsDown(87)) {
            jump.stop();
            jump.play();
            this.vy = -this.jumpheight;
            this.ay = 0;
            gravityForce = 0;
            this.jump = 2;
          }
        } else if (
          this.x >
            disappearingplatformred02.x -
              disappearingplatformred02.width / 1.75 &&
          this.x <
            disappearingplatformred02.x +
              disappearingplatformred02.width / 1.75 &&
          this.y <
            disappearingplatformred02.y + disappearingplatformred02.height &&
          this.y > disappearingplatformred02.y
        ) {
          this.vy = this.jumpheight;
        }
      }
    }
  }

  keyPressed() {
    // Hop from Tutorial to level 01.
    if (state == "tutorial") {
      if (tutorialend == true) {
        if (keyCode == 16) {
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
          timeleft = 5;
          buttonactivated = false;
          levelenter01.play();
          state = "level01";

          // Plays and loops the Theme.
          if (!theme.isPlaying()) {
            theme.loop();
          }
        }
      }
    }

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
          timeleft = 5;
          buttonactivated = false;
          levelenter02.play();
          state = "level02";
        }
      }
    }

    // Hop from level 02 to level 03.
    if (state == "level02") {
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
          timeleft = 5;
          buttonactivated = false;
          levelenter01.play();
          state = "level03";
        }
      }
    }
    // Hop from level 03 to level 04.
    if (state == "level03") {
      if (keyCode == 16) {
        if (exit == true) {
          this.x = 150;
          this.y = 100;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = false;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          timeleft = 5;
          buttonactivated = false;
          levelenter02.play();
          state = "level04";
        }
      }
    }
    // Hop from level 04 to level 05.
    if (state == "level04") {
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
          timeleft = 5;
          buttonactivated = false;
          levelenter01.play();
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
          doorlock = true;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          timeleft = 5;
          buttonactivated = false;
          levelenter02.play();
          state = "level06";
        }
      }
    }

    // Hop from level 06 to level 07.
    if (state == "level06") {
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
          timeleft = 5;
          buttonactivated = false;
          levelenter01.play();
          state = "level07";
        }
      }
    }

    // Hop from level 07 to level 08.
    if (state == "level07") {
      if (keyCode == 16) {
        if (exit == true) {
          this.x = 150;
          this.y = 200;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = false;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          timeleft = 5;
          buttonactivated = false;
          levelenter02.play();
          state = "level08";
        }
      }
    }

    // Hop from level 08 to level 09.
    if (state == "level08") {
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
          timeleft = 5;
          buttonactivated = false;
          levelenter01.play();
          state = "level09";
        }
      }
    }

    // Hop from level 09 to level 10.
    if (state == "level09") {
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
          timeleft = 5;
          buttonactivated = false;
          levelenter02.play();
          state = "level10";
        }
      }
    }

    // Hop from level 10 to ending.
    if (state == "level10") {
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
          timeleft = 5;
          buttonactivated = false;
          levelexit.play();
          state = "endmenu";
        }
      }
    }

    if (this.y > 800) {
      reset = true;
    }

    if (state == "level01") {
      if (reset == true) {
        if (keyCode == 82) {
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
          timeleft = 5;
          buttonactivated = false;
          levelreset.play();
        }
      }
    } else if (state == "level02") {
      if (reset == true) {
        if (keyCode == 82) {
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
          timeleft = 5;
          buttonactivated = false;
          levelreset.play();
        }
      }
    } else if (state == "level03") {
      if (reset == true) {
        if (keyCode == 82) {
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
          timeleft = 5;
          buttonactivated = false;
          levelreset.play();
        }
      }
    } else if (state == "level04") {
      if (reset == true) {
        if (keyCode == 82) {
          this.x = 150;
          this.y = 100;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = false;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          timeleft = 5;
          buttonactivated = false;
          levelreset.play();
        }
      }
    } else if (state == "level05") {
      if (reset == true) {
        if (keyCode == 82) {
          this.x = 150;
          this.y = 300;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = false;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          timeleft = 5;
          buttonactivated = false;
          levelreset.play();
        }
      }
    } else if (state == "level06") {
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
          timeleft = 5;
          buttonactivated = false;
          levelreset.play();
        }
      }
    } else if (state == "level07") {
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
          timeleft = 5;
          buttonactivated = false;
          levelreset.play();
        }
      }
    } else if (state == "level08") {
      if (reset == true) {
        if (keyCode == 82) {
          this.x = 150;
          this.y = 200;
          gravityForce = 0.025;
          exit = false;
          reset = false;
          keynumber = 0;
          doorlock = false;
          movingplatformtimer = 0;
          movingplatform02timer = 0;
          movingplatformverticaltimer = 0;
          movingplatformvertical02timer = 0;
          timeleft = 5;
          buttonactivated = false;
          levelreset.play();
        }
      }
    } else if (state == "level09") {
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
          timeleft = 5;
          buttonactivated = false;
          levelreset.play();
        }
      }
    } else if (state == "level10") {
      if (reset == true) {
        if (keyCode == 82) {
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
          timeleft = 5;
          buttonactivated = false;
          levelreset.play();
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
