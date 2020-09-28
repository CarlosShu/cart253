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
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3,
}

let circle2 = {
  x: undefined,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3,
}

let state = `title`; // Can be title, simulation, love, sadness.

function setup() {
  createCanvas(500, 500);

  // Postiion circles seperated from one another.
  circle1.x = width/ 3;
  circle2.x = 2 * width / 3;

  // Start circle moving in a random direction.
  circle1.vx = random(-circle1.speed, circle1.speed);
  circle1.vy = random(-circle1.speed, circle1.speed);
  circle2.vx = random(-circle1.speed, circle2.speed);
  circle2.vy = random(-circle1.speed, circle2.speed);
}

function draw() {
  background(0);

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
}

// Title Function.
function title() {
  push();
  textSize(64);
  fill(200, 100, 100);
  textAlign(CENTER, CENTER);
  text(`LOVE?`, width/2, height/2)
  pop();
}
// Runs simulation.
function simulation() {
  move();
  checkOffscreen();
  checkOverlap();
  display();
}

// Love state.
function love() {
  push();
  textSize(64);
  fill(200, 100, 100);
  textAlign(CENTER, CENTER);
  text(`LOVE!`, width/2, height/2)
  pop();
}

// Love state.
function sadness() {
  push();
  textSize(64);
  fill(200, 100, 100);
  textAlign(CENTER, CENTER);
  text(`:'(`, width/2, height/2)
  pop();
}

  // Move the circles.
  function move() {
  circle1.x = circle1.x + circle1.vx;
  circle1.y = circle1.y + circle1.vy;
  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}

  // Check if the circles have gone offscreen.
  function checkOffscreen() {
    if (isOffscreen(circle1) || isOffscreen(circle2)) {
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
    if (d < circle1.size/2 + circle2.size/2) {
      state = `love`;
    }
  }

  // Display the circles.
  function display() {
    ellipse(circle1.x, circle1.y, circle1.size);
    ellipse(circle2.x, circle2.y, circle2.size);
  }

  // Mouse press function that switches title state to simulation.
  function mousePressed() {
    if (state === `title`) {
      state = `simulation`;
    }
}

// // Check if the circles have gone offscreen.
// function checkOffscreen() {
//   if (circle1.x < 0 || circle1.x > width || circle1.y < 0 || circle1.y > height || circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {
//       state = `sadness`;
//     }
//   }
