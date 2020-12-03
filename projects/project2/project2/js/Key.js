class Key {
  constructor(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
  }

  display() {
    if (keynumber == 0) {
      push();
      imageMode(CENTER);
      image(gamekeyimage, this.x, this.y, this.width, this.height);
      pop();
    }
  }
}
