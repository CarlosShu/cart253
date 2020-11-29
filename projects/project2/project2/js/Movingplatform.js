class Movingplatform {
  constructor(x, y, w, h, vx, speed) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.speed = speed;
  }

  move() {
    this.x = this.x + this.vx;
    if (movingplatformtimer == 0) {
      this.vx = this.speed;
    }
    if (movingplatformtimer == 120) {
      this.vx = -this.speed;
    }
    if (movingplatformtimer == 239) {
      // Only happens every second.
      this.vx = this.speed;
      movingplatformtimer = 0;
    }
    movingplatformtimer++;
  }

  display() {
    push();
    imageMode(CENTER);
    image(gameplatformimage, this.x, this.y, this.width, this.height);
    pop();
  }
}
