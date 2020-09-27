let clownImage; // Image Variable.

function preload() {
  clownImage = loadImage("assets/images/clown.png"); // Loads Image File.
}

function setup() {
  createCanvas(500, 500);

  noCursor();
}

function draw() {
  background(0);

  imageMode(CENTER); // Centers Image.
  image(clownImage, mouseX, mouseY, 50, 50); // Displays Image.
}
