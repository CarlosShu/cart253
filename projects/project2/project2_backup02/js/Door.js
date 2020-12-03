class Door {
  constructor(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
  }

  display() {
    if (doorlock == false) {
      push();
      imageMode(CENTER);
      image(gamedoorimage, this.x, this.y, this.width, this.height);
      pop();
    } else if (doorlock == true) {
      push();
      imageMode(CENTER);
      image(gamedoorlockedimage, this.x, this.y, this.width, this.height);
      pop();
    }
  }
}
