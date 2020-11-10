class Avatar {
  constructor(x, y, note) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10;
    this.speed = 4;
    this.size = 70;
    this.active = true;
    this.face = 0;
    this.crouched = 0;
    this.jump = 0;
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
    } else if (keyIsDown(68)) {
      this.vx = this.speed;
      this.face = 0;
    } else if (keyIsDown(83)) {
      this.vx = 0;
      this.crouched = 1;
    } else {
      this.vx = 0;
      this.crouched = 0;
      this.jump = 0;
    }

    if (this.y - this.size / 2 > height) {
      this.active = false;
    }
  }

  collide(ground) {
    if (
      (this.x > ground.x - ground.width / 2 &&
        this.x < ground.x + ground.width / 2 &&
        this.y + this.size / 2 > ground.y - ground.height / 2 &&
        this.y - this.size / 2 < ground.y + ground.height / 2) ||
      (this.x > ground2.x - ground2.width / 2 &&
        this.x < ground2.x + ground2.width / 2 &&
        this.y + this.size / 2 > ground2.y - ground2.height &&
        this.y - this.size / 2 < ground2.y + ground2.height)
    ) {
      this.vy = 0;
      this.ay = 0;
      gravityForce = 0.0;
      this.jump = 0;

      // Jump.
      if (keyIsPressed === true) {
        if (keyCode === 87) {
          this.vy = -7;
          this.ay = 0;
          gravityForce = 0;
          this.jump = 2;
        }
      }

      // If avatar leaves the ground the gravity goes back to normal.
    } else {
      gravityForce = 0.025;
      this.jump = 2;

      // If "s" is held down, the gravity increases for the avatar.
      if (keyIsDown(83)) {
        gravityForce = gravityForce + 0.1;
      }
    }
  }

  display() {
    push();
    imageMode(CENTER);
    if (this.vx < 0 && this.jump == 0) {
      image(avatarrunningleftimage, this.x, this.y, this.size, this.size);
    } else if (this.vx > 0 && this.jump == 0) {
      image(avatarrunningrightimage, this.x, this.y, this.size, this.size);
    } else if (
      this.vx == 0 &&
      this.face == 0 &&
      this.crouched == 0 &&
      this.jump == 0
    ) {
      image(avataridlerightimage, this.x, this.y, this.size, this.size);
    } else if (
      this.vx == 0 &&
      this.face == 1 &&
      this.crouched == 0 &&
      this.jump == 0
    ) {
      image(avataridleleftimage, this.x, this.y, this.size, this.size);
    } else if (this.vx == 0 && this.face == 0 && this.crouched == 1) {
      image(avatarcrouchedrightimage, this.x, this.y, this.size, this.size);
    } else if (this.vx == 0 && this.face == 1 && this.crouched == 1) {
      image(avatarcrouchedleftimage, this.x, this.y, this.size, this.size);
    } else if (this.face == 0 && this.crouched == 0 && this.jump == 2) {
      image(avatarjumpright2image, this.x, this.y, this.size, this.size);
    } else if (this.face == 1 && this.crouched == 0 && this.jump == 2) {
      image(avatarjumpleft2image, this.x, this.y, this.size, this.size);
    }
    pop();
  }
}
