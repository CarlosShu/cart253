class Blue {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.size = 60;
  }

  display() {
    // Blue.
    push();
    imageMode(CENTER);
    image(puckimage, 400, 250, this.size, this.size);
    pop();
  }
}
