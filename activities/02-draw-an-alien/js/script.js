/**************************************************
Activity 2: Draw an Alien
Carlos-Enrique Salazar Aguilar

Draws an alien on the canvas.
**************************************************/

// setup()
//
// Draws an alien.
function setup() {
    createCanvas(640, 760);

    background(0, 50, 10);
    noStroke();
    rectMode(CENTER);

    // Draw the body.
    fill(0, 30, 225);
    ellipse(320, 680, 300, 200);
    rect(320, 840, 300, 300);

    // Draw a collar.
    fill(225, 170, 0);
    ellipse(320, 640, 160, 140);
    rect(320, 800, 50, 300);

    // Draw the head.
    fill(155, 255, 0);
    ellipse(320, 370, 280, 320);
    ellipse(320, 440, 280, 320);
    rect(320, 580, 100, 100);
    ellipse(320, 630, 100, 100);

    // Draw the antenna.
    fill(155, 255, 0);
    rect(320, 200, 30, 200);
    ellipse(320, 80, 70, 70);

    // Draw the eye.
    fill(255);
    ellipse(320, 380, 180, 180);

    // Draw the ears.
    fill(155, 255, 0);
    ellipse(470, 380, 50, 180);
    ellipse(170, 380, 50, 180);

    // Draw the pupil.
    fill(0);
    stroke(155, 255, 0);
    strokeWeight(20);
    ellipse(320, 380, 80, 80);

    // Draw the mouth.
    noFill();
    stroke(0, 0, 0);
    strokeWeight(20);
    bezier(400, 520, 360, 560, 280, 560, 240, 520);

    // Draw the eyebrow.
    noFill();
    stroke(0, 0, 0);
    strokeWeight(20);
    bezier(380, 280, 360, 240, 280, 240, 260, 280);

    // Draw freckles.
    strokeWeight(10);
    point(210, 480);
    point(225, 465);
    point(240, 480);
    point(430, 480);
    point(415, 465);
    point(400, 480);

  }

// draw()
//
// Does nothing.
function draw() {

}
