let bg = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(bg);

  if (keyIsDown(65)) {
    rectMode(CENTER);
    rect(250, 250, 100, 100);
  }
}

// Key Pressed Function Examples.
// function keyPressed() {
//   if (key === 'a') {
//     bg = 0
//   }
//   else if (key === 'b') {
//     bg = 128
//   }
//   else if (key === 'c') {
//     bg = 255
//   }

// Arrow Examples.
// function keyPressed() {
//   if (keyCode === UP_ARROW) {
//     bg = bg + 10;
//     bg = constrain (bg, 0, 255);
//   }
//   else if (keyCode === DOWN_ARROW) {
//     bg = bg - 10;
//     bg = constrain(bg, 0, 255);
