class Button {
  constructor(x, y, w, h, activated) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.activated = activated;
  }

  display(Avatar) {
    if (this.activated == true) {
      push();
      imageMode(CENTER);
      image(gamebuttonactivatedimage, this.x, this.y, this.width, this.height);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(gamebuttonimage, this.x, this.y, this.width, this.height);
      pop();
    }
  }
}
