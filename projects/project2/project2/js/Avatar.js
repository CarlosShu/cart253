class Avatar {
  constructor(x, y, note) {
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

      // Jump.
      if (keyIsDown(87)) {
        this.vy = -this.jumpheight;
        this.ay = 0;
        gravityForce = 0;
        this.jump = 2;
      }
    }
    // If avatar leaves the ground the gravity goes back to normal.
    else {
      gravityForce = 0.025;
      this.jump = 2;

      // If "s" is held down, the gravity increases for the avatar.
      if (keyIsDown(83)) {
        gravityForce = gravityForce + 0.1;
      }
    }

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

      // Jump.
      if (keyIsDown(87)) {
        this.vy = -this.jumpheight;
        this.ay = 0;
        gravityForce = 0;
        this.jump = 2;
      }
    }

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

      // Jump.
      if (keyIsDown(87)) {
        this.vy = -this.jumpheight;
        this.ay = 0;
        gravityForce = 0;
        this.jump = 2;
      }
    }

    // Collides with Rectangle.
    let drectangle = dist(this.x, this.y, rectangle.x, rectangle.y);
    if (
      this.x < rectangle.x - rectangle.width / 1.9 &&
      this.x < rectangle.x + rectangle.width / 1.9 &&
      drectangle < this.width / 1.9 + rectangle.width / 1.9 &&
      drectangle < this.height + rectangle.height &&
      this.vx == this.speed
    ) {
      this.vx = 0;
    } else if (
      this.x > rectangle.x - rectangle.width / 1.9 &&
      this.x > rectangle.x + rectangle.width / 1.9 &&
      drectangle < this.width / 1.9 + rectangle.width / 1.9 &&
      drectangle < this.height + rectangle.height &&
      this.vx == -this.speed
    ) {
      this.vx = 0;
    } else if (
      this.x > rectangle.x - rectangle.width / 1.9 &&
      this.x < rectangle.x + rectangle.width / 1.9 &&
      this.y + this.height / 2.25 > rectangle.y - rectangle.height / 2.25 &&
      this.y - this.height / 2.25 < rectangle.y + rectangle.height / 2.25
    ) {
      this.vy = 0;
      this.ay = 0;
      gravityForce = 0.0;
      this.jump = 0;

      // Jump.
      if (keyIsDown(87)) {
        this.vy = -this.jumpheight;
        this.ay = 0;
        gravityForce = 0;
        this.jump = 2;
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
      this.vx == 0 &&
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
    } else if (this.vx == 0 && this.face == 1 && this.crouched == 1) {
      image(avatarcrouchedleftimage, this.x, this.y, this.width, this.height);
    } else if (this.face == 0 && this.crouched == 0 && this.jump == 2) {
      image(avatarjumpright2image, this.x, this.y, this.width, this.height);
    } else if (this.face == 1 && this.crouched == 0 && this.jump == 2) {
      image(avatarjumpleft2image, this.x, this.y, this.width, this.height);
    } else if (
      this.vx > 0 &&
      this.face == 0 &&
      this.crouched == 1 &&
      this.jump == 2
    ) {
      image(avatarcrouchedrightimage, this.x, this.y, this.width, this.height);
    } else if (
      this.vx < 0 &&
      this.face == 1 &&
      this.crouched == 1 &&
      this.jump == 2
    ) {
      image(avatarcrouchedleftimage, this.x, this.y, this.width, this.height);
      pop();
    }
  }
}
