class Car extends Vehicle {
  // Call Vehicle super class.
  constructor(x, y) {
    super(x, y); // Calls super class constructor.
    this.width = 50; // Keep individual car properties.
    this.height = 20;
    this.vx = 5;
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
