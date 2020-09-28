let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
}

let titleString = "Life: A Metaphor";
let endingString = "Ah, mortality.";

let state = `title`;

function setup() {
  createCanvas(500, 500);
  circle.vx = circle.speed;
  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `animation`) {
    animation();
    
  // If the circle reaches the width then the animation changes to the ending title.
    if (circle.x > width) {
      state = `ending`;
    }
  }
  else if (state === `ending`) {
    ending();
  }
}

// Title Function.
function title() {
  fill(255);
  text(titleString, width / 2, height / 2);
}

// Animation Function.
function animation() {
  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;
  ellipse(circle.x, circle.y, circle.size);
}

// Ending Function.
function ending() {
  fill(255, 0, 0);
  text(endingString, width / 2, height / 2)
}

// Key Press switches from title to animation.
function keyPressed() {
  if (state === `title`) {
    state = `animation`;
  }
}
