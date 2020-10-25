class Puck {
  constructor() {
    this.x = 400;
    this.y = 400;
    this.vx = 0;
    this.vy = 0;
    this.maxSpeed = 10;
    this.size = 40;
  }

  move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.x = constrain(this.x, 270, 530);
    this.y = constrain(this.y, 140, 660);

    if (this.x == 270) {
      this.vx = 2;
    } else if (this.x == 530) {
      this.vx = -2;
    }

    if (this.y == 140) {
      this.vy = 2;
    } else if (this.y == 660) {
      this.vy = -2;
    }

    if (this.x > 350 && this.x < 450 && this.y == 140) {
      this.x = 400;
      this.y = 400;
      this.vx = 0;
      this.vy = 0;
      redscore = redscore + 1;
    }

    if (this.x > 350 && this.x < 450 && this.y == 660) {
      this.x = 400;
      this.y = 400;
      this.vx = 0;
      this.vy = 0;
      bluescore = bluescore + 1;
    }

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);
  }

  bounce() {
    if (
      this.x > red.x - red.width / 2 &&
      this.x < red.x + red.width / 2 &&
      this.y + this.size / 2 > red.y - red.height / 2 &&
      this.y - this.size / 2 < red.y + red.height / 2
    ) {
      let dx = this.x - red.x;
      this.vx = this.vx + map(dx, -red.width / 1.7, red.width / 1.7, -2, 2);
      let dy = this.y - red.y;
      this.vy = this.vy + map(dy, -red.height / 1.7, red.height / 1.7, -2, 2);
    }
  }

  display() {
    // Puck.
    push();
    imageMode(CENTER);
    image(puckimage, this.x, this.y, this.size, this.size);
    pop();
  }
}
