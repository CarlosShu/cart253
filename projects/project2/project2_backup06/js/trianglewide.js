class Trianglewide {
  constructor(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    imageMode(CENTER);
    image(gametrianglewideimage, this.x, this.y, this.width, this.height);
    pop();
  }
}
