let bg = {
  r: 0,
  b: 0,
  g: 0
}

let circle = {
  x: 250,
  y: 250,
  size: 100
}


function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(bg.r, bg.b, bg.g);

  ellipse(circle.x, circle.y, circle.size);
}

function mouseDragged() {
 circle.x = mouseX;
 circle.y = mouseY;

// function mousePressed() { // Mouse Pressed Function
//   bg.r = random(0,255);
//   bg.b = random(0,255);
//   bg.g = random(0,255);
}
