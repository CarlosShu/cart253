"use strict";

let barkSFX;

let rates = [1.5, 1.75, 2.25, 2.5, 2.75, 3];

function preload() {
  barkSFX = loadSound('assets/sounds/bark.wav');
}
// setup() the canvas ready
function setup() {
  createCanvas(600, 600);
}

// draw() draws a circle with a trails
function draw() {
  background(0);
}

function mousePressed() {
  let randomRate = random(rates);
  barkSFX.rate(randomRate);
  barkSFX.play();
}
