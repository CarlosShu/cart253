class Movingplatformhorizontal02 {
  constructor(x, y, w, h, vx, speed, xspawn) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.speed = speed;
    this.xspawn = xspawn;
  }

  move() {
    this.x = this.x + this.vx;
    if (movingplatform02timer == 0) {
      this.vx = -this.speed;
      this.x = this.xspawn;
    }
    if (movingplatform02timer == 120) {
      this.vx = this.speed;
    }
    if (movingplatform02timer == 239) {
      // Only happens every second.
      this.vx = -this.speed;
      this.x = this.xspawn;
      movingplatform02timer = 0;
    }
    movingplatform02timer++;
  }

  display() {
    push();
    imageMode(CENTER);
    image(gameplatformyellowimage, this.x, this.y, this.width, this.height);
    pop();
  }
}
