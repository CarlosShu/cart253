let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0, // Velocity X.
  vy: 0, // Velocity Y.
  ax: 0, // Acceleration X.
  ay: 0, // Acceleration Y.
  acceleration: 0.25, // Acceleration.
  maxSpeed: 5, // Max Speed of Circle.
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  if (mouseX < circle.x) {
    circle.ax = -circle.acceleration;
  }
  else {
    circle.ax = circle.acceleration;
  }

  if (mouseY < circle.y) {
    circle.ay = -circle.acceleration;
  }
  else {
    circle.ay = circle.acceleration;
  }

  circle.vx = circle.vx + circle.ax;
  circle.vx = constrain(circle.vx,-circle.maxSpeed,circle.maxSpeed);
  circle.vy = circle.vy + circle.ay;
  circle.vy = constrain(circle.vy,-circle.maxSpeed,circle.maxSpeed);

  circle.x = circle.x + circle.vx; // Velocity to every frame.
  circle.y = circle.y + circle.vy; // Velocity to every frame.

  ellipse (circle.x, circle.y, circle.size);
}
