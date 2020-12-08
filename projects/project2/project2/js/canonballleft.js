class CanonballLeft {
  constructor(x, y, w, h, vx, speed, disappear, xspawn) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.speed = speed;
    this.disappear = disappear;
    this.xspawn = xspawn;
  }

  move() {
    this.vx = -this.speed;
    this.x = this.x + this.vx;

    if (this.x < this.disappear) {
      this.x = this.xspawn;
    }
  }

  display() {
    push();
    imageMode(CENTER);
    image(gamecanonballimage, this.x, this.y, this.width, this.height);
    pop();
  }
}
