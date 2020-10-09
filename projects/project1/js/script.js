/**************************************************
Project 01: Simulation
Carlos-Enrique Salazar Aguilar

A cummulation of everything that I have learned so far.
**************************************************/
let pipe = {
  x: 0,
  y: 0,
  position: undefined,
  angle: 0,
  capture: 5,
}

let grid = {
  position: 0,
}

let counter = 0; // Samuel (TA) helped me out with this.

let state = `title`; // Can be title, instructions, simulation, ending.

// Preload Function.
function preload() {
  titlescreen = loadImage("assets/images/title.png");
  keystart = loadImage("assets/images/keystart.png");
  instructionsscreen = loadImage("assets/images/instructions.png");
  levelone = loadImage("assets/images/level1.png");
  leveltwo = loadImage("assets/images/level2.png");
  images[0] = loadImage("assets/images/onewaypipe.png");
  images[1] = loadImage("assets/images/twowaypipe.png");
  images[2] = loadImage("assets/images/threewaypipe.png");
  images[3] = loadImage("assets/images/fourwaypipe.png");
}

// I got this ImageSwitcher and Rotating Function from StackOverflow. https://stackoverflow.com/questions/63331653/how-could-i-make-a-rotating-image-alternate-in-p5-js
var angle = 0.0;
var images = [];
var imageSwitcher = 0;

// Setup Function.
function setup() {
  createCanvas(windowHeight, windowHeight);
  noCursor();
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
  else if (state === `simulation1`) {
    simulation();
    level1();
  }
  else if (state === `simulation2`) {
    simulation();
    level2();
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

// Simulation function.
function simulation() {
display();
move();
}

function display() {

  // Pipe
  push();
  imageMode(CENTER);
  translate(pipe.x, pipe.y);
  rotate(angle);
  image(images[abs(imageSwitcher) % 4], pipe.position, pipe.position, windowHeight/3, windowHeight/3); angle;
  pop();

  // Pipe Cursor.
  push();
  imageMode(CENTER);
  translate(mouseX, mouseY);
  rotate(angle);
  image(images[abs(imageSwitcher) % 4], 0, 0, windowHeight/6, windowHeight/6); angle;
  pop();
  }

  function level1() {
  // // Level 1.
  push();
  imageMode(CENTER);
  image(levelone, windowHeight/2, windowHeight/2, windowHeight/1, windowHeight/1);
  pop();

    if (grid.position === 5) {
      state = 'simulation2';
    }
  }

function level2() {
// // Level 1.
push();
imageMode(CENTER);
image(leveltwo, windowHeight/2, windowHeight/2, windowHeight/1, windowHeight/1);
pop();
}

function move() {

  // Center Middle Square.
  if (mouseX <= windowHeight/1.5) {
    if (mouseY <= windowHeight/1.5) {
      if (mouseX >= windowHeight/3) {
        if (mouseY >= windowHeight/3) {
          if (mouseIsPressed) {
            if(state === 'simulation1', 'simulation2') {
              pipe.x = windowHeight/2;
              pipe.y = windowHeight/2;
              pipe.position = 0;
                if (state === 'simulation1') {
                  grid.position = 5;
                }
            }
          }
        }
      }
    }
  }

  // Center left Square.
  if (mouseX < windowHeight/3) {
    if (mouseY <= windowHeight/1.5) {
      if (mouseY >= windowHeight/3) {
        if (mouseIsPressed) {
          if(state === 'simulation1') {
            pipe.x = windowHeight/6;
            pipe.y = windowHeight/2;
            pipe.position = 0;
          }
        }
      }
    }
  }

  // Center Right Square.
  if (mouseX > windowHeight/1.5) {
    if (mouseY <= windowHeight/1.5) {
      if (mouseY >= windowHeight/3) {
        if (mouseIsPressed) {
          if(state === 'simulation1') {
            pipe.x = windowHeight/1.2;
            pipe.y = windowHeight/2;
            pipe.position = 0;
          }
        }
      }
    }
  }

  // Top Middle Square.
  if (mouseX <= windowHeight/1.5) {
    if (mouseX >= windowHeight/3) {
      if (mouseY <= windowHeight/3) {
        if (mouseIsPressed) {
          if(state === 'simulation3') {
            pipe.x = windowHeight/2;
            pipe.y = windowHeight/6;
            pipe.position = 0;
          }
        }
      }
    }
  }

  // Top Left Square.
  if (mouseX < windowHeight/3) {
    if (mouseY <= windowHeight/1.5) {
      if (mouseY <= windowHeight/3) {
        if (mouseIsPressed) {
          if(state === 'simulation1') {
            pipe.x = windowHeight/6;
              pipe.y = windowHeight/6;
                pipe.position = 0;
              }
            }
          }
        }
      }

  // Top Right Square.
  if (mouseX > windowHeight/1.5) {
    if (mouseY <= windowHeight/1.5) {
      if (mouseY <= windowHeight/3) {
        if (mouseIsPressed) {
          if(state === 'simulation1') {
            pipe.x = windowHeight/1.2;
            pipe.y = windowHeight/6;
            pipe.position = 0;
          }
        }
      }
    }
  }

  // Bottom Middle Square.
  if (mouseX <= windowHeight/1.5) {
    if (mouseY >= windowHeight/1.5) {
      if (mouseX >= windowHeight/3) {
        if (mouseIsPressed) {
          if(state === 'simulation3') {
            pipe.x = windowHeight/2;
            pipe.y = windowHeight/1.2;
            pipe.position = 0;
          }
        }
      }
    }
  }

  // Bottom Left Square.
  if (mouseX < windowHeight/3) {
    if (mouseY >= windowHeight/1.5) {
      if (mouseY >= windowHeight/3) {
        if (mouseIsPressed) {
          if(state === 'simulation2') {
            pipe.x = windowHeight/6;
            pipe.y = windowHeight/1.2;
            pipe.position = 0;
          }
        }
      }
    }
  }

  // Bottom Right Square.
  if (mouseX > windowHeight/1.5) {
    if (mouseY >= windowHeight/1.5) {
      if (mouseY >= windowHeight/3) {
        if (mouseIsPressed) {
          if(state === 'simulation1', 'simulation2') {
            pipe.x = windowHeight/1.2;
            pipe.y = windowHeight/1.2;
            pipe.position = 0;
          }
        }
      }
    }
  }
}


// Key press function that switches title state to simulation.
function keyPressed() {
  if (state === `title` && keyCode === 13) {
   state = `instructions`;
     }
     else if (state === 'instructions') {
       state = 'simulation1';
     }
  if (keyCode == 65) {
    imageSwitcher--;
    } else if (keyCode == 68) {
      imageSwitcher++;
      } else if (keyCode == 69) {
        angle = angle + (PI / 2.0);
        } else if (keyCode == 81) {
          angle = angle - (PI / 2.0);
          }
  }

  // pipe.angle = 1;
