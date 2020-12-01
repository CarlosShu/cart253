class Movingplatformvertical {
  constructor(x, y, w, h, vy, speed) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.speed = speed;
  }

  move() {
    this.y = this.y + this.vy;
    if (movingplatformverticaltimer == 0) {
      this.vy = this.speed;
    }
    if (movingplatformverticaltimer == 120) {
      this.vy = -this.speed;
    }
    if (movingplatformverticaltimer == 239) {
      // Only happens every second.
      this.vy = this.speed;
      movingplatformverticaltimer = 0;
    }
    movingplatformverticaltimer++;
  }

  display() {
    push();
    imageMode(CENTER);
    image(gameplatformimage, this.x, this.y, this.width, this.height);
    pop();
  }
}
