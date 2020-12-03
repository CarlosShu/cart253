class Movingplatformvertical02 {
  constructor(x, y, w, h, vy, speed, yspawn) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.speed = speed;
    this.yspawn = yspawn;
  }

  move() {
    this.y = this.y + this.vy;
    if (movingplatformvertical02timer == 0) {
      this.vy = -this.speed;
      this.y = this.yspawn;
    }
    if (movingplatformvertical02timer == 120) {
      this.vy = this.speed;
    }
    if (movingplatformvertical02timer == 239) {
      // Only happens every second.
      this.vy = -this.speed;
      this.y = this.yspawn;
      movingplatformvertical02timer = 0;
    }
    movingplatformvertical02timer++;
  }

  display() {
    push();
    imageMode(CENTER);
    image(gameplatformimage, this.x, this.y, this.width, this.height);
    pop();
  }
}
