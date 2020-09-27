/**************************************************
Exercise 02: Dodge-Em!
Carlos-Enrique Salazar Aguilar

Learning conditionals and other functions.
**************************************************/

// Assigning Virus Variables.
let virus = {
  x: 250,
  y: 250,
  size: 150,
  vx: 0,
  vy: 0,
  speed: 10,
  ax: 0, // Acceleration X.
  ay: 0, // Acceleration Y.
  acceleration: 0.2, // Acceleration.
  maxSpeed: 5, // Max Speed of virus.
  maxSize: 200,
  minSize: 100,
};

// Assigning User Variables.
let user = {
  x: 250,
  y: 250,
  size: 100,
  speed: 10,
}

// Assigning Numstatic Variables.
let numStatic = 50;

function preload() {
  imgCell = loadImage('assets/images/cell.png');
  imgVirus2 = loadImage('assets/images/Virus2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor(); // No cursor.
}

// Draw function.
function draw() {
  background (0);

  // Display static
  for (let i = 25; i < numStatic; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(255);
    point(x, y);
  }

  // Covid 19 Velocity Acceleration.
  if (mouseX < virus.x) {
    virus.ax = -virus.acceleration;
  }
  else {
    virus.ax = virus.acceleration;
  }

  if (mouseY < virus.y) {
    virus.ay = -virus.acceleration;
  }
  else {
    virus.ay = virus.acceleration;
  }

  // Covid 19 Velocity Constrain.
  virus.vx = virus.vx + virus.ax;
  virus.vx = constrain(virus.vx, -virus.maxSpeed, virus.maxSpeed);
  virus.vy = virus.vy + virus.ay;
  virus.vy = constrain(virus.vy, -virus.maxSpeed, virus.maxSpeed);

  virus.x = virus.x + virus.vx; // Velocity to every frame.
  virus.y = virus.y + virus.vy; // Velocity to every frame.

  // User Movement.
  user.x = mouseX;
  user.y = mouseY;

  // Distance Variable.
  let d = dist(user.x, user.y, virus.x, virus.y);

  // Distance Size Growth.
  if (d < virus.size/.7 + user.size/.7) {
    virus.size = virus.size + 2;
  }
  else {
    virus.size = virus.size - 2;
  }

  // Distance Constraint.
  virus.size = constrain(virus.size, virus.minSize, virus.maxSize);

  // Check for catching Covid-19.
  if (d < virus.size/3 + user.size/3) {
    noLoop(); // Stop drawing frame, movie stops, game is over.
  }

  // Display Covid-19.
  push();
  imageMode(CENTER);
  image(imgVirus2, virus.x, virus.y, virus.size, virus.size);
  pop();

  // Display User.
  push();
  imageMode(CENTER);
  image(imgCell, user.x, user.y, user.size, user.size);
  pop();
}
