class SportsCar extends Car {
  constructor(x, y) {
    super(x, y);
    this.vx = 15;
  }

  display() {
    super.display();

    push();
    rectMode(CENTER);
    fill(255, 255, 0);
    noStroke();
    rect(this.x, this.y - this.height / 5, this.width, this.height / 5);
    rect(this.x, this.y + this.height / 5, this.width, this.height / 5);
    pop();
  }
}
