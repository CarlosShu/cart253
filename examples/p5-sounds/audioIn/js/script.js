"use strict";

let mic;
let ghost = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  image: undefined,
};

function preload() {
  ghost.image = loadImage("assets/images/clown.png");
}

function setup() {
  createCanvas(600, 600);

  ghost.x = width / 2;
  ghost.y = height / 2;

  mic = new p5.AudioIn();
  // Starts microphone: asks user for permission.
  mic.start();
}

function draw() {
  background(0);

  // Trembling.
  ghost.x = ghost.x + random(-1, 1);
  ghost.y = ghost.y + random(-1, 1);

  // Get volume into microphone.
  let level = mic.getLevel();

  // Check if the ghost is scared.
  if (level > 0.01) {
    // Exit stage right.
    ghost.vx = 20;
  }

  // Move the ghost.
  ghost.x = ghost.x + ghost.vx;
  ghost.y = ghost.y + ghost.vy;

  // Display the ghost.
  push();
  imageMode(CENTER);
  tint(255, 50);
  image(ghost.image, ghost.x, ghost.y);
  pop();
}
