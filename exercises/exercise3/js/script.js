/**************************************************
Exercise 03: Love, Actually
Carlos-Enrique Salazar Aguilar

Learning functions.
**************************************************/

// setup()

let blueFairy = {
  x: undefined,
  y: undefined,
  size: 200,
  vx: 0,
  vy: 0,
  xSpeed: 3,
  ySpeed: 3,
}

let pinkFairy = {
  x: undefined,
  y: undefined,
  size: 200,
  vx: 0,
  vy: 0,
  xSpeed: 3,
  ySpeed: 3,
}

let state = `title`; // Can be title, simulation, love, sadness.

function preload() {
  bg = loadImage("assets/images/background.png");
  titleName = loadImage("assets/images/title.png");
  titleEnter = loadImage("assets/images/enter.png");
  textInstructions = loadImage("assets/images/instructions.png");
  textLoveIsFound = loadImage("assets/images/loveisfound.png");
  textLoveIsLost = loadImage("assets/images/loveislost.png");
  textLoveIsIgnored = loadImage("assets/images/loveisignored.png");
  fairyBlue = loadImage("assets/images/fairyblue.gif");
  fairyPink = loadImage("assets/images/fairypink.gif");
  fairyBlueLeft = loadImage("assets/images/fairyblueleft.gif");
  fairyBlueRight = loadImage("assets/images/fairyblueright.gif");
  fairyPinkLeft = loadImage("assets/images/fairypinkleft.gif");
  fairyPinkRight = loadImage("assets/images/fairypinkright.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Postiion circles seperated from one another.
  blueFairy.x = width/ 3;
  blueFairy.y = height/ 2;
  pinkFairy.x = 2 * width / 3;
  pinkFairy.y = height/ 2;

  // Start circle moving in a random direction.
  pinkFairy.vx = random(pinkFairy.xSpeed, -pinkFairy.xSpeed);
  pinkFairy.vy = random(pinkFairy.ySpeed, -pinkFairy.ySpeed);
  }

function draw() {
  background(bg);

  if (state === `title`) {
    title();
  }
  else if (state === `instructions`) {
    instructions();
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

// Instructions Function.
function instructions() {
  push();
  imageMode(CENTER);
  image(textInstructions, windowWidth/2, windowHeight/2, windowWidth/2, windowWidth/3);
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
    blueFairy.vx = -blueFairy.xSpeed;
  }
  else if (keyIsDown(68)) {
    blueFairy.vx = blueFairy.xSpeed;
  }
  else {
    blueFairy.vx = 0;
  }
  if (keyIsDown(87)) {
    blueFairy.vy = -blueFairy.ySpeed;
  }
  else if (keyIsDown(83)) {
    blueFairy.vy = blueFairy.ySpeed;
  }
  else {
    blueFairy.vy = 0;
    }

  // Velocity of the Fairies.
  blueFairy.x = blueFairy.x + blueFairy.vx;
  blueFairy.y = blueFairy.y + blueFairy.vy;
  pinkFairy.x = pinkFairy.x + pinkFairy.vx;
  pinkFairy.y = pinkFairy.y + pinkFairy.vy;
}

  // Check if the circles have gone offscreen.
  function checkOffscreenBlue() {
    if (isOffscreen(blueFairy)) {
      state = `ignored`;
    }
  }

  function checkOffscreenPink() {
    if (isOffscreen(pinkFairy)) {
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
    let d = dist(blueFairy.x, blueFairy.y, pinkFairy.x, pinkFairy.y);
    if (d < blueFairy.size/3 + pinkFairy.size/3) {
      state = `love`;
    }
  }

  // Display the circles.
  function display() {

    // Draw Blue Fairy.
    push();
    imageMode(CENTER);
    if (blueFairy.vx < 0) {
      image(fairyBlueLeft, blueFairy.x, blueFairy.y, blueFairy.size, blueFairy.size);
  }
    else if (blueFairy.vx > 0) {
      image(fairyBlueRight, blueFairy.x, blueFairy.y, blueFairy.size, blueFairy.size);
  }
    else {
      image(fairyBlue, blueFairy.x, blueFairy.y, blueFairy.size, blueFairy.size);
  }
    pop();

    // Draw Pink Fairy.
    push();
    imageMode(CENTER);
    if (pinkFairy.vx < 0) {
      image(fairyPinkLeft, pinkFairy.x, pinkFairy.y, pinkFairy.size, pinkFairy.size);
  }
    else if (pinkFairy.vx > 0) {
      image(fairyPinkRight, pinkFairy.x, pinkFairy.y, pinkFairy.size, pinkFairy.size);
  }
    else {
      image(fairyPink, pinkFairy.x, pinkFairy.y, pinkFairy.size, pinkFairy.size);
  }
    pop();

}

// Key press function that switches title state to simulation.
function keyPressed() {
  if (state === `title` && keyCode === 13) {
   state = `instructions`;
     }
     else if (state === 'instructions') {
       state = 'simulation';
     }
  }
