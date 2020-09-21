/**************************************************
Exercise 01: I like to move it move it!
Carlos-Enrique Salazar Aguilar

Learning variables and using maps and constrains.
**************************************************/

// Assigning Variables to the Background.
let bg = {
value: 0,
}

// Assigning Variables to the Circle.
let circle = {
  x: 0,
  y: 0,
  size: 100, // Standard size of the Circle.
  minSize: 100, // Smallest size that the Circle can be.
  maxSize: 300, // Largest size that the Circle can be.
  circleGrowth: 15, // Growth speed of Circle.
  xBorder: 50, // Width Border as to not exceed canvas.
  yBorder: 150, // Height Border as to not exceed canvas.
  xBorderLarge: 150, // Width Border as to not exceed canvas.
  yBorderLarge: 250, // Height Border as to not exceed canvas.
  r: 255,
  b: 255,
  g: 255,
}

// Variables for First Square.
let square1 = {
  x: 0,
  y: 50,
  size: 100,
  minSize: 50, // Smallest size that the Circle can be.
  maxSize: 200, // Largest size that the Circle can be.
  circleGrowth: 15, // Growth speed of Circle.
  border: 50, // Border as to not exceed canvas.
  r: 255,
  b: 255,
  g: 255,
}

// Variables for Second Square.
let square2 = {
  x: 0,
  y: 50,
  size: 100,
  minSize: 50, // Smallest size that the Circle can be.
  maxSize: 200, // Largest size that the Circle can be.
  circleGrowth: 15, // Growth speed of Circle.
  border: 50, // Border as to not exceed canvas.
  r: 255,
  b: 255,
  g: 255,
}

// Setting up the Canvas.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor(); // Gets rid of the standard mouse cursor.
}

// Draw function.
function draw() {

// Drawing the Background.
  background(bg.value);

// Drawing the Circle.
  circle.r = map(circle.x, 0, width, 0, 255);
  circle.b = map(circle.x, 0, width, 255, 0);
  circle.g = map(circle.x, 0, width, 0, 255);
  circle.r = map(circle.y, 0, height, 255, 0);
  circle.b = map(circle.y, 0, height, 0, 255);
  circle.g = map(circle.y, 0, height, 255, 0);
  fill(circle.r, circle.b, circle.g);
  ellipse(circle.x, circle.y, circle.size);

// Mapping and Constraining the Circle.
  circle.x = mouseX;
  circle.x = constrain(circle.x, circle.xBorder, width - circle.xBorder);
  circle.y = mouseY;
  circle.y = constrain(circle.y, circle.yBorder, height - circle.yBorder);

// Mouse pressing function to make the Circle larger and deflate upon release.
  if (mouseIsPressed) {
    circle.size = circle.size + circle.circleGrowth;
    circle.x = constrain(circle.x, circle.xBorderLarge, width - circle.xBorderLarge);
    circle.y = constrain(circle.y, circle.yBorderLarge, height - circle.yBorderLarge);
  } else {
    circle.size = circle.size - circle.circleGrowth;
  }

// Constraining the Circle's size.
  circle.size = constrain(circle.size, circle.minSize, circle.maxSize);

// Draw a Square.
  square1.r = map(square1.x, 0, width, 0, 255);
  square1.b = map(square1.x, 0, width, 255, 0);
  square1.g = map(square1.x, 0, width, 255, 0);

  fill(square1.r, square1.b, square1.g);
  rectMode(CENTER);
  rect(square1.x, height - square1.y, square1.size);

// Constaining square to Mouse X.
  square1.x = mouseX;
  square1.x = constrain(square1.x, square1.border, width - square1.border);

// Draw a Second Square.
  square2.r = map(square2.x, 0, width, 0, 255);
  square2.b = map(square2.x, 0, width, 255, 0);
  square2.g = map(square2.x, 0, width, 255, 0);

  fill(square2.r, square2.b, square2.g);
  rectMode(CENTER);
  rect(square2.x, square2.y, square2.size);

// Constaining square to Mouse X.
  square2.x = mouseX;
  square2.x = constrain(square2.x, square2.border, width - square2.border);

}
