/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
let bg = {
value: 125
}

let square1 = {
  x: 0,
  y: 0,
  size: 100,
}

let square2 = {
  x: 0,
  y: 0,
  size: 100,
}

let square3 = {
  x: 0,
  y: 0,
  size: 100,
}

let square4 = {
  x: 0,
  y: 0,
  size: 100,
}
// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500, 500);
  noCursor();
}

// draw()
//
// Description of draw() goes here.
function draw() {

  background(bg.value);

  rectMode (CENTER);
  fill (mouseX, mouseY, 255, 255);
  square(square1.x, square1.y, square1.size);

  square1.x = mouseX;
  square1.x = constrain(square1.x, 50, width - 150);

  square1.y = mouseY;
  square1.y = constrain(square1.y, 50, height - 150);

  if (mouseIsPressed) {
    square1.size = square1.size + 15;
  } else {
    square1.size = square1.size - 15;
  }
  square1.size = constrain(square1.size, 50, 100);

  rectMode (CENTER);

  fill (mouseX, mouseY, 255, 255);
  square(square2.x + 100, square2.y, square2.size);

  square2.x = mouseX;
  square2.x = constrain(square2.x, 50, width -150);

  square2.y = mouseY;
  square2.y = constrain(square2.y, 50, height - 150);

  if (mouseIsPressed) {
    square2.size = square2.size + 15;
  } else {
    square2.size = square2.size - 15;
  }
  square2.size = constrain(square2.size, 50, 100);

  rectMode (CENTER);
  fill (mouseX, mouseY, 255, 255);
  square(square3.x, square3.y + 100, square3.size);

  square3.x = mouseX;
  square3.x = constrain(square3.x, 50, width -150);

  square3.y = mouseY;
  square3.y = constrain(square3.y, 50, height - 150);

  if (mouseIsPressed) {
    square3.size = square3.size + 15;
  } else {
    square3.size = square3.size - 15;
  }
  square3.size = constrain(square3.size, 50, 100);

  rectMode (CENTER);
  fill (mouseX, mouseY, 255, 255);
  square(square4.x + 100, square4.y + 100, square4.size);

  square4.x = mouseX;
  square4.x = constrain(square4.x, 50, width -150);

  square4.y = mouseY;
  square4.y = constrain(square4.y, 50, height - 150);

  if (mouseIsPressed) {
    square4.size = square4.size + 15;
  } else {
    square4.size = square4.size - 15;
  }
  square4.size = constrain(square4.size, 50, 100);


}
