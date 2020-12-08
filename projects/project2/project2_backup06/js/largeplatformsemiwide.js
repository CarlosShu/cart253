class LargePlatformSemiWide {
  constructor(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    imageMode(CENTER);
    image(
      gamelargeplatformsemiwideimage,
      this.x,
      this.y,
      this.width,
      this.height
    );
    pop();
  }
}
