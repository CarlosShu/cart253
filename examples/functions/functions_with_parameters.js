
function setup() {
  createCanvas(500, 500)
}

function draw() {
  background(0);

  parallels(100, 100, 5, 8, 100, 10); // Calling Parallel Functions.
  }

function parallels(x, y, numLines, lineWidth, lineHeight, lineSpacing) { // Parallel function.
for (let i = 0; i < numLines; i++) {
  noStroke();
  fill(255);
  rectMode(CENTER);
  rect(x, y, lineWidth, lineHeight);
  x = x + lineSpacing;
  }
}
