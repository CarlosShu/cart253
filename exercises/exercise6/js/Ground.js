class Ground {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = 650;
    this.y = 425;
  }

  display() {
    push();
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
