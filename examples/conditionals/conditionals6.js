let angle = 0;
let rectScale = 1;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(127);

  push(); // push function
  fill(255,0,0)
  rectMode(CENTER);
  translate(width/2, height/2); //Translate
  rotate(angle); //Rotate
  scale(rectScale); //Scale
  rect(0, 0, 100, 100);
  pop(); // pop function

  angle = angle + .01; //angle rotation rate
}
