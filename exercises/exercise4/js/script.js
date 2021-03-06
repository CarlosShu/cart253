/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.

"use strict";

let bubbleamount = []; // Calling card of the array.
let bubbleamountSize = 20; // Bubble amount size.

let smallbubbleamount = []; // Calling card of the array.
let smallbubbleamountSize = 40; // Bubble amount size.

let timecounter = 0;

// Fonts variables.
let lemonfont;

// Visuals variables.
let cursorimage;
let waterimage;
let lightimage;
let bgimage;
let titleimage;
let bubbleimage;
let smallbubbleimage;

// Audio variables.
let underwater;
let bubblepop;
let highbubblepop;

// State.
let state = "title";

// Preload Function.
function preload() {
  // Fonts.
  lemonfont = loadFont("assets/LEMONMILK-Medium.otf");

  // Visuals.
  cursorimage = loadImage("assets/images/cursor.png");
  bgimage = loadImage("assets/images/background.png");
  titleimage = loadImage("assets/images/title.png");
  waterimage = loadImage("assets/images/water.png");
  lightimage = loadImage("assets/images/light.png");
  bubbleimage = loadImage("assets/images/bubble.png");
  smallbubbleimage = loadImage("assets/images/smallbubble.png");

  // Audio.
  underwater = loadSound("assets/sounds/underwater.wav");
  bubblepop = loadSound("assets/sounds/pop.wav");
  highbubblepop = loadSound("assets/sounds/highpop.wav");
}

// Score variable.
var score = 0;

// Time left variable.
var timeleft = 10;

// Function setup.
function setup() {
  createCanvas(1000, 500);

  noCursor();

  // Counter for arrays.
  for (let i = 0; i < bubbleamountSize; i++) {
    let bubble = createbubble(random(0, width), random(0, height));
    bubbleamount.push(bubble);
  }

  // Counter for arrays.
  for (let i = 0; i < smallbubbleamountSize; i++) {
    let smallbubble = createsmallbubble(random(0, width), random(0, height));
    smallbubbleamount.push(smallbubble);
  }
}

// Re-sizes the canvas to stretch along the window.
function windowResized() {
  resizeCanvas(width, height);
}

// Draw setup.
function draw() {
  background(bgimage);

  if (state === "title") {
    smallbubbleAppear();
    bubbleAppear();
    waterOverlay();
    title();
  } else if (state === "instructions") {
    smallbubbleAppear();
    bubbleAppear();
    waterOverlay();
    instructions();
  } else if (state === "simulation") {
    smallbubbleAppear();
    bubbleAppear();
    waterOverlay();
    simulation();
  } else if (state === "ending") {
    smallbubbleAppear();
    bubbleAppear();
    waterOverlay();
    ending();
  }
}

// Global lighting.
function waterOverlay() {
  // Color overlay.
  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(waterimage, width / 2, height / 2, width, height);
  pop();

  // Light overlay.
  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(lightimage, width / 2, height / 2, width, height);
  pop();

  // Color overlay.
  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(waterimage, width / 2, height / 2, width, height);
  pop();

  // Light overlay.
  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(lightimage, width / 2, height / 2, width, height);
  pop();

  // Cursor Image.
  push();
  imageMode(CENTER);
  image(cursorimage, mouseX, mouseY, 1000, 1000);
  pop();
}

// Title function.
function title() {
  push();
  imageMode(CENTER);
  image(titleimage, width / 2, height / 2, width, height);
  pop();

  // Play again.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(15);
  fill(255, 255, 255);
  text("Press ENTER to play.", width / 2, height / 1.1);
  pop();
}

// Instructions function.
function instructions() {
  // Instructions
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(30);
  fill(255, 255, 255);
  text("Pop as many bubbles as you can in 10 seconds!", width / 2, height / 2);
  pop();
}

function simulation() {
  // Time.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(15);
  fill(255, 255, 255);
  text("Time: " + timeleft, width / 2, height / 1.1);
  pop();

  // 10 second timer.
  if (timecounter == 70) {
    // This only happens every second.
    timecounter = 10;
    timeleft--;
  }
  timecounter++;

  // Goes to ending state once 10 seconds have passed.
  if (timeleft === 0) {
    state = "ending";
  }
}

// Ending function.
function ending() {
  // Score.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(50);
  fill(255, 255, 255);
  text("Your Score: " + score, width / 2, height / 2);
  pop();
  // Play again.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(15);
  fill(255, 255, 255);
  text("Press ESC to play again.", width / 2, height / 1.1);
  pop();
}
function bubbleAppear() {
  // Counter for arrays. Less than four moving bubble.
  for (let i = 0; i < bubbleamount.length; i++) {
    movebubble(bubbleamount[i]);
    displaybubble(bubbleamount[i]);
  }
}

function smallbubbleAppear() {
  // Counter for arrays. Less than four moving bubble.
  for (let i = 0; i < smallbubbleamount.length; i++) {
    movesmallbubble(smallbubbleamount[i]);
    displaysmallbubble(smallbubbleamount[i]);
  }
}

// Creates a new JavaScript Object describing a bubble and returns it.
function createbubble(x, y) {
  let bubble = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    marginx: 30,
    marginy: 30,
    speed: 1,
    maxspeed: 2,
  };
  return bubble;
}

// Chooses whether the provided bubble changes direction and moves it.
function movebubble(bubble) {
  bubble.vy = random(-bubble.speed, -bubble.maxspeed);
  let change = random(0, 100);
  if (change < 0.1) {
    bubble.vx = random(-bubble.speed, bubble.speed);
  }

  // Move the bubble
  bubble.x = bubble.x + bubble.vx;
  bubble.y = bubble.y + bubble.vy;

  // Constrain the bubble to the canvas
  bubble.x = constrain(bubble.x, -bubble.marginx, width + bubble.marginx);
  bubble.y = constrain(bubble.y, -bubble.marginy, height + bubble.marginy);

  // If bubbles leaves the canvas then new ones are generated.
  if (bubble.y === -bubble.marginy) {
    bubble.x = random(-bubble.marginx, width + bubble.marginx);
    bubble.y = height + bubble.marginy;
  }

  let bubbled = dist(bubble.x, bubble.y, mouseX, mouseY);
  if (state === "simulation") {
    if (mouseIsPressed) {
      if (bubbled < bubble.size / 1.5) {
        score = score + 1;
        bubble.x = random(-bubble.marginx, width + bubble.marginx);
        bubble.y = height + bubble.marginy;
        bubblepop.play();
      }
    }
  }
}

// Displays the bubbles.
function displaybubble(bubble) {
  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(bubbleimage, bubble.x, bubble.y, bubble.size, bubble.size);
  pop();
}

// Creates a new JavaScript Object describing a bubble and returns it.
function createsmallbubble(x, y) {
  let smallbubble = {
    x: x,
    y: y,
    size: 25,
    vx: 0,
    vy: 0,
    marginx: 20,
    marginy: 20,
    speed: 1.5,
    maxspeed: 2.5,
  };
  return smallbubble;
}

// Chooses whether the provided smallbubble changes direction and moves it.
function movesmallbubble(smallbubble) {
  smallbubble.vy = random(-smallbubble.speed, -smallbubble.maxspeed);
  let change = random(0, 100);
  if (change < 0.1) {
    smallbubble.vx = random(-smallbubble.speed, smallbubble.speed);
  }

  // Move the smallbubble
  smallbubble.x = smallbubble.x + smallbubble.vx;
  smallbubble.y = smallbubble.y + smallbubble.vy;

  // Constrain the smallbubble to the canvas
  smallbubble.x = constrain(
    smallbubble.x,
    -smallbubble.marginx,
    width + smallbubble.marginx
  );
  smallbubble.y = constrain(
    smallbubble.y,
    -smallbubble.marginy,
    height + smallbubble.marginy
  );

  // If smallbubbles leaves the canvas then new ones are generated.
  if (smallbubble.y === -smallbubble.marginy) {
    smallbubble.x = random(-smallbubble.marginx, width + smallbubble.marginx);
    smallbubble.y = height + smallbubble.marginy;
  }

  let smallbubbled = dist(smallbubble.x, smallbubble.y, mouseX, mouseY);
  if (state === "simulation") {
    if (mouseIsPressed) {
      if (smallbubbled < smallbubble.size) {
        score = score + 1;
        smallbubble.x = random(
          -smallbubble.marginx,
          width + smallbubble.marginx
        );
        smallbubble.y = height + smallbubble.marginy;
        highbubblepop.play();
      }
    }
  }
}

// Displays the smallbubbles.
function displaysmallbubble(smallbubble) {
  push();
  imageMode(CENTER);
  image(
    smallbubbleimage,
    smallbubble.x,
    smallbubble.y,
    smallbubble.size,
    smallbubble.size
  );
  pop();
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
  } else if (state === "ending") {
    if (keyCode == 27) {
      state = "title";
      score = 0;
      timeleft = 10;
    }
  }
}
