let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let change = random();

  // Distance between mouse and circle.
  let dx = circle.x - mouseX;
  let dy = circle.y - mouseY;


  // Circle runs from the mouse.
  if (dx < 0) {
    circle.vx = -circle.speed;
  }
  else if (dx > 0) {
    circle.vx = circle.speed
  }

  if (dy < 0) {
    circle.vy = -circle.speed;
  }
  else if (dy > 0) {
    circle.vy = circle.speed;
  }

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);
}

// if (change < 0.05) { // The circle will change directions sometimes.
//   circle.vx = random(-circle.speed, circle.speed);
//   circle.vy = random(-circle.speed, circle.speed);
// }
