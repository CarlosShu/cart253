/**************************************************
Project 01: Simulation
Carlos-Enrique Salazar Aguilar

A cummulation of everything that I have learned so far.
**************************************************/
let pipe = {
  x: undefined,
  y: undefined,
}

let counter = 0; // Samuel (TA) helped me out with this.

let state = `title`; // Can be title, instructions, simulation, ending.

// Preload Function.
function preload() {
  titlescreen = loadImage("assets/images/title.png");
  keystart = loadImage("assets/images/keystart.png");
  instructionsscreen = loadImage("assets/images/instructions.png");
  onewaypipe1 = loadImage("assets/images/onewaypipe1.png");
  onewaypipe2 = loadImage("assets/images/onewaypipe2.png");
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
  else if (state === `simulation`) {
    simulation();
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

  // 1-Way Pipe.
  push();
  imageMode(CENTER);
  if (keyCode === 82) {
    image(onewaypipe1, pipe.x, pipe.y, windowHeight/3, windowHeight/3);
    } else {
      image(onewaypipe2, pipe.x, pipe.y, windowHeight/3, windowHeight/3);
    }
    pop();
  }

function move() {

  // Center Middle Square.
  if (mouseX <= windowHeight/1.5) {
    if (mouseY <= windowHeight/1.5) {
      if (mouseX >= windowHeight/3) {
        if (mouseY >= windowHeight/3) {
          if (mouseIsPressed) {
            pipe.x = windowHeight/2;
            pipe.y = windowHeight/2;
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
          pipe.x = windowHeight/6;
          pipe.y = windowHeight/2;
        }
      }
    }
  }

  // Center Right Square.
  if (mouseX > windowHeight/1.5) {
    if (mouseY <= windowHeight/1.5) {
      if (mouseY >= windowHeight/3) {
        if (mouseIsPressed) {
          pipe.x = windowHeight/1.2;
          pipe.y = windowHeight/2;
        }
      }
    }
  }

  // Top Middle Square.
  if (mouseX <= windowHeight/1.5) {
    if (mouseX >= windowHeight/3) {
      if (mouseY <= windowHeight/3) {
        if (mouseIsPressed) {
          pipe.x = windowHeight/2;
          pipe.y = windowHeight/6;
        }
      }
    }
  }

  // Top Left Square.
  if (mouseX < windowHeight/3) {
    if (mouseY <= windowHeight/1.5) {
      if (mouseY <= windowHeight/3) {
        if (mouseIsPressed) {
          pipe.x = windowHeight/6;
          pipe.y = windowHeight/6;
        }
      }
    }
  }

  // Top Right Square.
  if (mouseX > windowHeight/1.5) {
    if (mouseY <= windowHeight/1.5) {
      if (mouseY <= windowHeight/3) {
        if (mouseIsPressed) {
          pipe.x = windowHeight/1.2;
          pipe.y = windowHeight/6;
        }
      }
    }
  }

  // Bottom Middle Square.
  if (mouseX <= windowHeight/1.5) {
    if (mouseY >= windowHeight/1.5) {
      if (mouseX >= windowHeight/3) {
        if (mouseIsPressed) {
          pipe.x = windowHeight/2;
          pipe.y = windowHeight/1.2;
        }
      }
    }
  }

  // Bottom Left Square.
  if (mouseX < windowHeight/3) {
    if (mouseY >= windowHeight/1.5) {
      if (mouseY >= windowHeight/3) {
        if (mouseIsPressed) {
          pipe.x = windowHeight/6;
          pipe.y = windowHeight/1.2;
        }
      }
    }
  }

  // Bottom Right Square.
  if (mouseX > windowHeight/1.5) {
    if (mouseY >= windowHeight/1.5) {
      if (mouseY >= windowHeight/3) {
        if (mouseIsPressed) {
          pipe.x = windowHeight/1.2;
          pipe.y = windowHeight/1.2;
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
       state = 'simulation';
     }
  }

  // // Vertical 1-Way Pipe.
  // push();
  // imageMode(CENTER);
  // image(onewaypipe1, windowHeight/2, windowHeight/1.2, windowHeight/3, windowHeight/3);
  // pop();
  //
  // // Vertical 1-Way Pipe.
  // push();
  // imageMode(CENTER);
  // image(onewaypipe1, windowHeight/2, windowHeight/6, windowHeight/3, windowHeight/3);
  // pop();

  // function move() {
  //   if (keyCode === 87) {
  //     pipe.y = pipe.y - windowHeight/6;
  //   }
  //   else if (keyCode === 83) {
  //     pipe.y = pipe.y + windowHeight/1.2;
  //   }
  // }

  // // 1-Way Pipe.
  //   imageMode(CENTER);
  //     if (key === 'r') {
  //     image(onewaypipe1, pipe.x, pipe.y, windowHeight/3, windowHeight/3);
  //     } else {
  //     image(onewaypipe2, pipe.x, pipe.y, windowHeight/3, windowHeight/3);
  //     }
  //   }
