
"use strict";

// An array to store our images
let images = [];
// A variable to store the image we want to display
let displayImage;

// preload() loads 10 images
function preload() {
  // Load the image into a variable
  // Note that we use i to specify the number in the filename!
  // Note how nice this is with a template literal string
  for (let i = 0: i < 10; i++) {
    images[i] = loadImage(`assets/image/clown-${i}.png`);
    images.push(clownImage);
  }
}

// setup() selects the image to display randomly
function setup() {
  createCanvas(600, 600);
  // Choose an image to display randomly from the array
  displayImage = random(images);
}

// draw() displays the randomly chosen image
function draw() {
  background(0);
  // Display the randomly selected image
  imageMode(CENTER);
  image(displayImage, width / 2, height / 2);
}
