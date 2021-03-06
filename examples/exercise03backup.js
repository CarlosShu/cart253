/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.

let circle1 = {
  x: undefined,
  y: undefined,
  size: 200,
  vx: 0,
  vy: 0,
  xSpeed: 3,
  ySpeed: 3,
}

let circle2 = {
  x: undefined,
  y: undefined,
  size: 200,
  vx: 0,
  vy: 0,
  xSpeed: 3,
  ySpeed: 3,
}

let points = {
  score: 0,
  size: 70,
}


let state = `title`; // Can be title, simulation, love, sadness.

function preload() {
  bg = loadImage("assets/images/background.png");
  titleName = loadImage("assets/images/Title.png");
  titleEnter = loadImage("assets/images/Enter.png");
  textLoveIsFound = loadImage("assets/images/LoveIsFound.png");
  textLoveIsLost = loadImage("assets/images/LoveIsLost.png");
  textLoveIsIgnored = loadImage("assets/images/LoveIsIgnored.png");
  fairyBlue = loadImage("assets/images/FairyBlue.gif");
  fairyPink = loadImage("assets/images/FairyPink.gif");
  fairyBlueLeft = loadImage("assets/images/FairyBlueLeft.gif");
  fairyBlueRight = loadImage("assets/images/fairyBlueRight.gif");
  fairyPinkLeft = loadImage("assets/images/fairyPinkLeft.gif");
  fairyPinkRight = loadImage("assets/images/fairyPinkRight.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Postiion circles seperated from one another.
  circle1.x = width/ 3;
  circle1.y = height/ 2;
  circle2.x = 2 * width / 3;
  circle2.y = height/ 2;

  // Start circle moving in a random direction.
  circle2.vx = random(circle2.xSpeed, -circle2.xSpeed);
  circle2.vy = random(circle2.ySpeed, -circle2.ySpeed);
  }

 //  // Start circle moving in a random direction.
 // circle1.vx = random(circle1.xSpeed);
 // circle1.vy = random(circle1.ySpeed);
 // circle2.vx = random(circle2.xSpeed);
 // circle2.vy = random(circle2.ySpeed);
 // }

function draw() {
  background(bg);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `love`) {
    love();
  }
  else if (state === `sadness`) {
    sadness();
  }
  else if (state === `ignored`) {
    ignored();
  }
}

// Title Function.
function title() {
// Title Image.
  push();
  imageMode(CENTER);
  image(titleName, windowWidth/2, windowHeight/2, windowWidth/2, windowWidth/3);
  pop();

// Press Enter Image.
  push();
  imageMode(CENTER);
  image(titleEnter, windowWidth/2, windowHeight/1.5, windowWidth/4, windowWidth/8);
  pop();
}
// Runs simulation.
function simulation() {
  move();
  checkOffscreenBlue();
  checkOffscreenPink();
  checkOverlap();
  display();
}

// Love state.
function sadness() {
  push();
  imageMode(CENTER);
  image(textLoveIsLost, windowWidth/2, windowHeight/2, windowWidth/3, windowWidth/5);
  pop();
}

// Love state.
function love() {
  push();
  imageMode(CENTER);
  image(textLoveIsFound, windowWidth/2, windowHeight/2, windowWidth/3, windowWidth/5);
  pop();
}

// Ignored state.
function ignored() {
  push();
  imageMode(CENTER);
  image(textLoveIsIgnored, windowWidth/2, windowHeight/2, windowWidth/3, windowWidth/5);
  pop();
}

function move() {

  // Blue Fairy Controls.
  if (keyIsDown(65)) {
    circle1.vx = -circle1.xSpeed;
  }
  else if (keyIsDown(68)) {
    circle1.vx = circle1.xSpeed;
  }
  else {
    circle1.vx = 0;
  }
  if (keyIsDown(87)) {
    circle1.vy = -circle1.ySpeed;
  }
  else if (keyIsDown(83)) {
    circle1.vy = circle1.ySpeed;
  }
  else {
    circle1.vy = 0;
    }

  // if (keyIsDown(32)) {
  //   circle1.xSpeed = circle1.xSpeed + 1;
  //   circle1.ySpeed = circle1.ySpeed + 1;
  // }


  // Velocity of the Fairies.
  circle1.x = circle1.x + circle1.vx;
  circle1.y = circle1.y + circle1.vy;
  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;

  points.x = width/8;
  points.y = height/8;
}

  // Check if the circles have gone offscreen.
  function checkOffscreenBlue() {
    if (isOffscreen(circle1)) {
      state = `ignored`;
    }
  }

  function checkOffscreenPink() {
    if (isOffscreen(circle2)) {
      state = `sadness`;
    }
  }

  function isOffscreen(circle) {
    if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
      return true;
    }
    else {
      return false;
    }
  }

  // Check if the circles overlap.
  function checkOverlap() {
    let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    if (d < circle1.size/3 + circle2.size/3) {
      state = `love`;
    }
  }

  // Display the circles.
  function display() {

    // Draw Blue Fairy.
    push();
    imageMode(CENTER);
    if (circle1.vx < 0) {
      image(fairyBlueLeft, circle1.x, circle1.y, circle1.size, circle1.size);
  }
    else if (circle1.vx > 0) {
      image(fairyBlueRight, circle1.x, circle1.y, circle1.size, circle1.size);
  }
    else {
      image(fairyBlue, circle1.x, circle1.y, circle1.size, circle1.size);
  }
    pop();

    // Draw Pink Fairy.
    push();
    imageMode(CENTER);
    if (circle2.vx < 0) {
      image(fairyPinkLeft, circle2.x, circle2.y, circle2.size, circle2.size);
  }
    else if (circle2.vx > 0) {
      image(fairyPinkRight, circle2.x, circle2.y, circle2.size, circle2.size);
  }
    else {
      image(fairyPink, circle1.x, circle1.y, circle1.size, circle1.size);
  }
    pop();

  }

  // Key press function that switches title state to simulation.
  function keyPressed() {
    if (keyCode === 13) {
    if (state === `title`) {
      state = `simulation`;
    }
  }
}


// // Check if the circles have gone offscreen.
// function checkOffscreen() {
//   if (circle1.x < 0 || circle1.x > width || circle1.y < 0 || circle1.y > height || circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {
//       state = `sadness`;
//     }
//   }
