/**************************************************
Activity 04: Dodging Covid-19
Carlos-Enrique Salazar Aguilar

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.

let covid19 = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: {
    r: 255,
    g: 0,
    b: 0,
  }
};

let user = {
  x: 250,
  y: 250,
  size: 100,
  fill: 255,
}

let numStatic = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);

  noCursor(); // No cursor.

  covid19.y = random(0, height);
  covid19.vx = covid19.speed;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background (0);

  // Display static
  for (let i = 0; i < numStatic; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(255);
    point(x, y);
  }

  // Covid-19 Movement.
  covid19.x = covid19.x + covid19.vx;
  covid19.y = covid19.y + covid19.vy;

  if (covid19.x > width) {
    covid19.x = 0;
    covid19.y = random(0, height);
  }

  // User Movement.
  user.x = mouseX;
  user.y = mouseY;

  // Check for catching Covid-19.
  let d = dist(user.x, user.y, covid19.x, covid19.y);
  if (d < covid19.size/2 + user.size/2) {
    noLoop(); // Stop drawing frame, movie stops, game is over.

  }

  // Display Covid-19.
  fill(covid19.fill.r, covid19.fill.g, covid19.fill.b);
  ellipse(covid19.x, covid19.y, covid19.size);

  // Display Covid-19.
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
}
