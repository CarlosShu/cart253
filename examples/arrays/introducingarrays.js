"use strict";

let school = []; // Calling card of the array.
let schoolSize = 10; // School size.

// Our fish
let fish1;
let fish2;
let fish3;
let fish4;

function setup() {
  createCanvas(600, 600);

  // Counter for arrays. Less than four fish.
  for (let i = 0; i < schoolSize; i++) {
  let fish = createFish(random(0, width), random(0, height));
  school.push(fish);
  }
}

// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 10,
    vx: 0,
    vy: 0,
    speed: 2
  };
  return fish;
}

// draw()
// Moves and displays our fish
function draw() {
  background(0);

  // Counter for arrays. Less than four moving fish.
  for (let i = 0; i < school.length; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
  }
}

// moveFish(fish)
// Chooses whether the provided fish changes direction and moves it
function moveFish(fish) {
  // Choose whether to change direction
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  // Move the fish
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  // Constrain the fish to the canvas
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

// displayFish(fish)
// Displays the provided fish on the canvas
function displayFish(fish) {
  push();
  fill(200, 100, 100);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}

// Creates new fish upon mouse press.
function mousePressed() {
  let fish = createFish(mouseX, mouseY);
  school.push(fish);
}
