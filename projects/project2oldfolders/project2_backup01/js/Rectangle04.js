class Rectangle04 {
  constructor(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    imageMode(CENTER);
    image(gamerectangle04image, this.x, this.y, this.width, this.height);
    pop();
  }
}
