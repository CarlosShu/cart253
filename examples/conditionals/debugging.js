let circle = {
  x: 250,
  y: 250,
  size: 100,
};

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  let mouseIsLeft = undefined;

  if (mouseX >= width / 2){
    console.log('Mouse is to the Right...');
    mouseIsLeft = false;
  }
  else {
    console.log('Mouse is to the Left...');
    mouseIsLeft = true;
  }

  ellipse (circle.x, circle.y, circle.size);
}
