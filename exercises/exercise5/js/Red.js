class Red {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.width = 60;
    this.height = 60;
  }

  move() {
    this.x = mouseX;
    this.x = constrain(red.x, 275, 525);

    this.y = mouseY;
    this.y = constrain(red.y, 430, 650);
  }

  display() {
    // Red.
    push();
    imageMode(CENTER);
    image(redimage, this.x, this.y, this.width, this.height);
    pop();
  }
}
