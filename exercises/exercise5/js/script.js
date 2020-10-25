/**************************************************
Exercise 5
Air Hockey Practice
Carlos-Enrique Salazar Aguilar

Learning to how use objected oriented programming.
**************************************************/

"use strict";

let gravityForce = 0.0025;
let red = new Red();
let blue = new Blue();
let puck = new Puck();

// Fonts variables.
let laserfont;

// Visuals variables.
let bordersimage;
let staticimage;
let coloroverlayimage;
let titleimage;
let titlegridimage;
let airhockeytableimage;
let airhockeytablebordersimage;
let gridimage;
let redimage;
let blueimage;
let puckimage;

// State.
let state = "title";

// Red Score variable.
var redscore = 0;

// Blue Score variable.
var bluescore = 0;

function preload() {
  // Fonts.
  laserfont = loadFont("assets/laser.regular.otf");

  // Visuals.
  bordersimage = loadImage("assets/images/borders.png");
  staticimage = loadImage("assets/images/static.gif");
  coloroverlayimage = loadImage("assets/images/coloroverlay.png");
  titleimage = loadImage("assets/images/title.png");
  titlegridimage = loadImage("assets/images/titlegrid.png");
  airhockeytableimage = loadImage("assets/images/airhockeytable.png");
  airhockeytablebordersimage = loadImage(
    "assets/images/airhockeytableborders.png"
  );
  gridimage = loadImage("assets/images/grid.png");
  redimage = loadImage("assets/images/red.png");
  blueimage = loadImage("assets/images/blue.png");
  puckimage = loadImage("assets/images/puck.png");
}

// Setup function.
function setup() {
  createCanvas(800, 800);
  noCursor();
}

// Re-sizes the canvas to stretch along the window.
function windowResized() {
  resizeCanvas(width, height);
}

// Draw function.
function draw() {
  background(0);

  if (state === "title") {
    grid();
    overlay();
    titletext();
  } else if (state === "instructions") {
    grid();
    overlay();
    instructionstext();
  } else if (state === "simulation") {
    simulation();
    overlay();
    simulationtext();
  } else if (state === "won") {
    grid();
    overlay();
    wontext();
  } else if (state === "lost") {
    grid();
    overlay();
    losttext();
  }
}

function overlay() {
  // Color overlay.
  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(coloroverlayimage, width / 2, height / 2, width, width);
  pop();

  // Static.
  push();
  imageMode(CENTER);
  blendMode(SCREEN);
  image(staticimage, width / 2, height / 2, 1000, 1000);
  pop();

  // Borders.
  push();
  imageMode(CENTER);
  image(bordersimage, width / 2, height / 2, width, width);
  pop();
}

function grid() {
  // Title Grid.
  push();
  imageMode(CENTER);
  image(titlegridimage, width / 2, height / 2, width, width);
  pop();
}

function titletext() {
  // Title.
  push();
  textAlign(CENTER, CENTER);
  textFont(laserfont);
  textSize(50);
  fill(255, 255, 255);
  text("AIR HOCKEY PRACTICE", 400, 385);
  pop();

  // Enter.
  push();
  textAlign(CENTER, CENTER);
  textFont(laserfont);
  textSize(25);
  fill(255, 255, 255);
  text("Press Enter to Continue", 400, 755);
  pop();

  // Static.
  push();
  imageMode(CENTER);
  blendMode(SCREEN);
  image(staticimage, width / 2, height / 2, 1000, 1000);
  pop();
}

function instructionstext() {
  // Instructions.
  push();
  textAlign(CENTER, CENTER);
  textFont(laserfont);
  textSize(50);
  fill(255, 255, 255);
  text("SCORE 5 POINTS TO WIN", 400, 390);
  pop();

  // Enter to Continue.
  push();
  textAlign(CENTER, CENTER);
  textFont(laserfont);
  textSize(25);
  fill(255, 255, 255);
  text("Press Enter to Continue", 400, 755);
  pop();

  // Static.
  push();
  imageMode(CENTER);
  blendMode(SCREEN);
  image(staticimage, width / 2, height / 2, 1000, 1000);
  pop();
}

function simulationtext() {
  // Score.
  push();
  textAlign(CENTER, CENTER);
  textFont(laserfont);
  textSize(25);
  fill(255, 255, 255);
  text("YOUR SCORE = " + redscore, 400, 760);
  pop();

  // Score.
  push();
  textAlign(CENTER, CENTER);
  textFont(laserfont);
  textSize(25);
  fill(255, 255, 255);
  text("OPPONENT'S SCORE = " + bluescore, 400, 40);
  pop();

  // Static.
  push();
  imageMode(CENTER);
  blendMode(SCREEN);
  image(staticimage, width / 2, height / 2, 1000, 1000);
  pop();
}

function wontext() {
  // You won or lost.
  push();
  textAlign(CENTER, CENTER);
  textFont(laserfont);
  textSize(75);
  fill(255, 255, 255);
  text("YOU WON", 400, 385);
  pop();

  // Score.
  push();
  textAlign(CENTER, CENTER);
  textFont(laserfont);
  textSize(25);
  fill(255, 255, 255);
  text("Press ESC to play again", 400, 760);
  pop();

  // Static.
  push();
  imageMode(CENTER);
  blendMode(SCREEN);
  image(staticimage, width / 2, height / 2, 1000, 1000);
  pop();
}

function losttext() {
  // You won or lost.
  push();
  textAlign(CENTER, CENTER);
  textFont(laserfont);
  textSize(75);
  fill(255, 255, 255);
  text("YOU LOST", 400, 385);
  pop();

  // Score.
  push();
  textAlign(CENTER, CENTER);
  textFont(laserfont);
  textSize(25);
  fill(255, 255, 255);
  text("Press ESC to play again", 400, 760);
  pop();

  // Static.
  push();
  imageMode(CENTER);
  blendMode(SCREEN);
  image(staticimage, width / 2, height / 2, 1000, 1000);
  pop();
}

function simulation() {
  // Grid.
  push();
  imageMode(CENTER);
  image(gridimage, width / 2, height / 2, width, width);
  pop();

  // Air Hockey Table.
  push();
  imageMode(CENTER);
  image(airhockeytableimage, width / 2, height / 2, width / 1.2, width / 1.2);
  pop();

  // Red.
  red.move();
  red.display();

  // Blue.
  // blue.display();

  // Puck.
  puck.move();
  puck.bounce();
  puck.display();

  // Air Hockey Table Borders
  push();
  imageMode(CENTER);
  image(
    airhockeytablebordersimage,
    width / 2,
    height / 2,
    width / 1.2,
    width / 1.2
  );
  pop();

  if (redscore === 5) {
    state = "won";
  } else if (bluescore === 5) {
    state = "lost";
  }
}

// Key press function.
function keyPressed() {
  // Switch from title to instructions.
  if (state === "title") {
    if (keyCode == 13) {
      state = "instructions";
    }
  } else if (state === "instructions") {
    if (keyCode == 13) {
      state = "simulation";
    }
  } else if (state === "won") {
    if (keyCode == 27) {
      state = "title";
      redscore = 0;
      bluescore = 0;
    }
  } else if (state === "lost") {
    if (keyCode == 27) {
      state = "title";
      redscore = 0;
      bluescore = 0;
    }
  }
}
