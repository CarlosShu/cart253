class RectangleRed {
  constructor(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    imageMode(CENTER);
    image(gamerectangleredimage, this.x, this.y, this.width, this.height);
    pop();
  }
}
