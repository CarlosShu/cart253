class PlatformRed {
  constructor(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    imageMode(CENTER);
    image(gameplatformredimage, this.x, this.y, this.width, this.height);
    pop();
  }
}
