class CanonLeft {
  constructor(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
  }

  move() {}

  display() {
    push();
    imageMode(CENTER);
    image(gamecanonleftimage, this.x, this.y, this.width, this.height);
    pop();
  }
}
