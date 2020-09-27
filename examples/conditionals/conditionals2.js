let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 2,
}

function setup() {
  createCanvas(500, 500);
}


function draw() {
  background(backgroundShade);

  circle.x = circle.x + circle.speed;

  fill(255, 255, 255);

  // if (circle.x > width/3 && circle.x < 2 * width/3) { // AND STATEMENTS
  //  fill(255, 0, 0);
  // }

  // if (circle.x > width/3 || circle.x < 2 * width/3) { // OR STATEMENTS
  //  fill(255, 0, 0);
  // }

  //  if (!(circle.x < width/3)) { // NOT STATEMENTS
  //    fill(255, 0, 0);
  //  }

  ellipse(circle.x, circle.y, circle.size);
}
