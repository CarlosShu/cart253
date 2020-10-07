/**************************************************
Project 01: Simulation
Carlos-Enrique Salazar Aguilar

A cummulation of everything that I have learned so far.
**************************************************/
let counter = 0; // Samuel (TA) helped me out with this.

let state = `title`; // Can be title, instructions, simulation, ending.

// Preload Function.
function preload() {
  titlescreen = loadImage("assets/images/title.png");
  keystart = loadImage("assets/images/keystart.png");
  instructionsscreen = loadImage("assets/images/instructions.png");
}

// Setup Function.
function setup() {
  createCanvas(windowHeight, windowHeight);
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
}

// Draw Function.
function draw() {
  background(0);



  if (state === `title`) {
    title();
  }
  else if (state === `instructions`) {
    instructions();
  }
}

// Title Function.
function title() {

  // Title Image.
  if (counter >= 60){
  push();
  imageMode(CENTER);
  image(titlescreen, windowHeight/2, windowHeight/2.05, windowHeight/1.1, windowHeight/2.1);
  pop();
  }
  else if (counter < 60) {
    push();
    imageMode(CENTER);
    image(titlescreen, windowHeight/2, windowHeight/2, windowHeight/1.1, windowHeight/2.1);
    pop();
  }
  if (counter == 120) { // This only happens every second.
    counter = 0;
  }
  counter++;

  // Key Start Image.
  // Samuel (TA) helped me out with this.
   if (counter >= 30){
    push();
    imageMode(CENTER);
    image(keystart, windowHeight/2, windowHeight/1.1, windowHeight/1.7, windowHeight/3.5);
    pop();
    }
    if (counter == 60) { // This only happens every second.
    counter = 0;
    }
    counter++;
}

// Instructions function.
function instructions() {
  // Instructions.
  push();
  imageMode(CENTER);
  image(instructionsscreen, windowHeight/2, windowHeight/2, windowHeight/4, windowHeight/6);
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
