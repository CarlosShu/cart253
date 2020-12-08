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

  collide(ground) {
    // Collides with spawn.
    let dspawn = dist(this.x, this.y, spawn.x, spawn.y);
    if (
      this.x < spawn.x - spawn.width / 2 &&
      this.x < spawn.x + spawn.width / 2 &&
      dspawn < this.width / 2 + spawn.width / 2 &&
      dspawn < this.height + spawn.height &&
      this.vx == this.speed
    ) {
      this.vx = 0;
    } else if (
      this.x > spawn.x - spawn.width / 2 &&
      this.x > spawn.x + spawn.width / 2 &&
      dspawn < this.width / 2 + spawn.width / 2 &&
      dspawn < this.height + spawn.height &&
      this.vx == -this.speed
    ) {
      this.vx = 0;
    } else if (
      this.x > spawn.x - spawn.width / 1.75 &&
      this.x < spawn.x + spawn.width / 1.75 &&
      this.y < spawn.y - spawn.height / 1.2 &&
      this.y > spawn.y - spawn.height / 0.6
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
      this.x > spawn.x - spawn.width / 1.75 &&
      this.x < spawn.x + spawn.width / 1.75 &&
      this.y < spawn.y + spawn.height &&
      this.y > spawn.y
    ) {
      this.vy = this.jumpheight;
    }

    // Collides with Door.
    if (
      this.x > door.x - door.width / 3 &&
      this.x < door.x + door.width / 3 &&
      this.y > door.y - door.height / 2 &&
      this.y < door.y + door.height / 2
    ) {
      push();
      textAlign(CENTER, CENTER);
      textFont(blockfont);
      textSize(15);
      fill(255, 255, 255);
      text("PRESS SHIFT TO ENTER", width / 2, 750);
      pop();
    }

    // Collides with Cube.
    if (state == "level02") {
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

    if (state == "level01") {
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

        // If "s" is held down, the gravity increases for the avatar.
        if (keyIsDown(83)) {
          gravityForce = gravityForce + 0.1;
        }
      }
    }

    // Collides with Groundblock01.
    if (state == "level02") {
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

    // Collides with Groundblock02.
    if (state == "level02") {
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

    // Collides with Cubewide.
    if (state == "level02") {
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

    // Collides with Rectangle.
    if (state == "level02") {
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

        // Jump.
        if (keyIsDown(87)) {
          this.vy = -this.jumpheight;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }
    }

    // Collides with Platform.
    if (state == "level02") {
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

    // Collides with movingplatform.
    if (state == "level02") {
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

    // Collides with movingplatformvertical.
    if (state == "level02") {
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

    // Collides with button.
    if (state == "level02") {
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

    // Collides with Trampoline.
    if (state == "level02") {
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

    // Collides with boostplatform.
    if (state == "level02") {
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

    // Collides with roller.
    if (state == "level02") {
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

    // Collides with canon.
    if (state == "level02") {
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

    // Collides with canonball.
    if (state == "level02") {
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
