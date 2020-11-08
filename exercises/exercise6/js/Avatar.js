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

    // Oscillator.
    this.oscillator = new p5.Oscillator();
    this.nearFreq = 220;
    this.farFreq = 440;
    this.oscillator.amp(0.025);
    this.oscillator.start();

    // Note.
    this.note = note;
    this.synth = new p5.PolySynth();
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

    // Update frequency.
    let d = dist(this.x, this.y, width / 2, height / 2);
    let maxDist = dist(0, 0, width / 2, height / 2);
    let newFreq = map(d, 0, maxDist, this.nearFreq, this.farFreq);
    this.oscillator.freq(newFreq);
  }

  bounce(ground) {
    if (
      this.x > ground.x - ground.width / 2 &&
      this.x < ground.x + ground.width / 2 &&
      this.y + this.size / 2 > ground.y - ground.height / 2 &&
      this.y - this.size / 2 < ground.y + ground.height / 2
    ) {
      // Bounce.
      let dx = this.x - ground.x;
      // Bounces in x direction.
      this.vx = this.vx + map(dx, -ground.width / 2, ground.width / 2, 0, 0);
      this.vy = -this.vy;
      this.ay = 0;
      gravityForce = 0.0;
      this.playNote(); // plays note when bounces.
    } else {
      // If avatar leaves the ground the gravity goes back to normal.
      gravityForce = 0.015;
      // If "s" is held down, the gravity increases for the avatar.
      if (keyIsDown(83)) {
        gravityForce = gravityForce + 0.1;
      }
    }

    // Walls constraint.
    if (this.x <= 180) {
      this.x = this.x + this.speed;
    }
    if (this.x >= 1120) {
      this.x = this.x - this.speed;
    }

    // Avatar keys switch.
    else if (this.y >= 350 && this.x > 180 && this.x <= 297.5) {
      key = 1;
    } else if (this.y >= 350 && this.x > 297.5 && this.x <= 415) {
      key = 2;
    } else if (this.y >= 350 && this.x > 415 && this.x <= 532.5) {
      key = 3;
    } else if (this.y >= 350 && this.x > 532.5 && this.x <= 650) {
      key = 4;
    } else if (this.y >= 350 && this.x > 650 && this.x <= 767.5) {
      key = 5;
    } else if (this.y >= 350 && this.x > 767.5 && this.x <= 885) {
      key = 6;
    } else if (this.y >= 350 && this.x > 885 && this.x <= 1002.5) {
      key = 7;
    } else if (this.y >= 350 && this.x > 1002.5 && this.x <= 1120) {
      key = 8;
    } else {
      key = 0;
    }
  }

  // Play a note function.
  playNote() {
    this.synth.play(this.note, 0.4, 0, 0.1);
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
    }
    pop();
  }
}
