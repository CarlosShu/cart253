/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
let circle = {
  x: 0,
  y: 400,
  size: 100,
  speed: 1,
  fill: 255,
}
// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(800, 800);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  let randomNumber = random(140, 150);
  background(randomNumber);

  rectMode(CENTER);

  circle.x = mouseX;
  circle.x = constrain(circle.x, 50, width - 50);

  circle.y = mouseY;
  circle.y = constrain(circle.y, 50, height - 50);

  //circle.size = map(mouseY, 0, height, 50, 100);

  //circle.fill = map (mouseX, 0, width, 0, 255);
  fill(circle.fill);
  rect(circle.x, circle.y, circle.size);
}
