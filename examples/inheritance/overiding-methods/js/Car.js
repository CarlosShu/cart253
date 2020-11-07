class Car extends Vehicle {
  // Call Vehicle super class.
  constructor(x, y) {
    super(x, y); // Calls super class constructor.
    this.width = 50; // Keep individual car properties.
    this.height = 20;
    this.vx = 5;
    this.drunkenness = 0.2;
  }

  move() {
    this.veer(); // call veer function.

    super.move(); // calls method in super class.
  }

  veer() {
    // Random drunkenness.
    let r = random();
    if (r < this.drunkenness) {
      this.vy = random(-5, 5);
    }
  }

  wrap() {
    super.wrap();

    // causes vehicles to pop up on y axis if they leave canvas.
    if (this.y > height) {
      this.y -= height;
    } else if (this.y < 0) {
      this.y += height;
    }
  }

  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
