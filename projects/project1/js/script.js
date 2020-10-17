/**************************************************
Project 01: Simulation
Carlos-Enrique Salazar Aguilar

A cummulation of everything that I have learned so far.

Received helped from Etienne, Paola, Cassandra, Dana (TA) and Samuel (TA)
**************************************************/

// Font variable.
let gametext = {
  fill: 255,
};

// User pipe variable.
let pipe = {
  x: 0,
  y: 0,
  position: undefined,
  angle: 0,
  xmouse: 0,
  ymouse: 0,
};

// Grid variable.
let grid = {
  position: undefined,
};

let counter = 0; // Samuel (TA) helped me out with this.

let timecounter = 0; // Samuel (TA) helped me out with this. Time counter.

let state = `title`; // Can be title, instructions, simulation, ending.

// Preload Function.
function preload() {
  // Font.
  gamefont = loadFont("assets/Opeln2001-5Aj.ttf");

  // Sounds.
  music = loadSound("assets/sounds/earthboundfileselect.wav");
  pipeswitch = loadSound("assets/sounds/switchpipes.wav");
  piperotate = loadSound("assets/sounds/rotatepipes.wav");
  proceed = loadSound("assets/sounds/proceed.wav");
  denied = loadSound("assets/sounds/denied.wav");
  next = loadSound("assets/sounds/next.mp3");
  win = loadSound("assets/sounds/win.mp3");

  // Visuals.
  bgimage = loadImage("assets/images/background.png");
  titlescreen = loadImage("assets/images/title.png");
  keystart = loadImage("assets/images/keystart.png");
  keycontinue = loadImage("assets/images/keycontinue.png");
  keybegin = loadImage("assets/images/keybegin.png");
  keyplayagain = loadImage("assets/images/playagain.png");
  instructionsscreen = loadImage("assets/images/instructions.png");
  keyboardinstruction = loadImage("assets/images/instruction1.png");
  mouseinstruction = loadImage("assets/images/instruction2.png");
  keyboard = loadImage("assets/images/wasd.png");
  objectivetext = loadImage("assets/images/objective.png");
  totalscore = loadImage("assets/images/totalscore.png");
  levelonebackground = loadImage("assets/images/level1.png");
  leveltwobackground = loadImage("assets/images/level2.png");
  levelthreebackground = loadImage("assets/images/level3.png");
  levelfourbackground = loadImage("assets/images/level4.png");
  levelfivebackground = loadImage("assets/images/level5.png");
  levelsixbackground = loadImage("assets/images/level6.png");
  levelsevenbackground = loadImage("assets/images/level7.png");
  leveleightbackground = loadImage("assets/images/level8.png");
  levelninebackground = loadImage("assets/images/level9.png");
  leveltenbackground = loadImage("assets/images/level10.png");
  levelelevenbackground = loadImage("assets/images/level11.png");
  leveltwelvebackground = loadImage("assets/images/level12.png");
  levelthirteenbackground = loadImage("assets/images/level13.png");
  levelfourteenbackground = loadImage("assets/images/level14.png");
  levelfifteenbackground = loadImage("assets/images/level15.png");
  levelsixteenbackground = loadImage("assets/images/level16.png");
  levelseventeenbackground = loadImage("assets/images/level17.png");
  leveleighteenbackground = loadImage("assets/images/level18.png");
  levelnineteenbackground = loadImage("assets/images/level19.png");
  leveltwentybackground = loadImage("assets/images/level20.png");
  leveltwentyonebackground = loadImage("assets/images/level21.png");
  leveltwentytwobackground = loadImage("assets/images/level22.png");
  images[0] = loadImage("assets/images/onewaypipe.png");
  images[1] = loadImage("assets/images/twowaypipe.png");
  images[2] = loadImage("assets/images/threewaypipe.png");
  images[3] = loadImage("assets/images/fourwaypipe.png");
}

// Score variable. Found online: https://end3r.github.io/Gamedev-Canvas-Content-Kit/tutorial/article08.html
var score = 0;

// Time left variable.
var timeleft = 60;

// 0: Pipe Rotation 0%.
// 1: Pipe Rotation 90%.
// 2: Pipe Rotation 180%.
// 3: Pipe Rotation 270%.
var angle = 0;

// I got this ImageSwitcher and Rotating Function from StackOverflow. https://stackoverflow.com/questions/63331653/how-could-i-make-a-rotating-image-alternate-in-p5-js
var images = [];

// 0: One-Way Pipe.
// 1: Two-Way Pipe.
// 2: Three-Way Pipe.
// 3: Four-Way Pipe.
var imageSwitcher = 0;

// Setup Function.
function setup() {
  createCanvas(windowHeight, windowHeight);
  angleMode(DEGREES);
}

// Re-sizes the canvas to stretch along the window.
function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
}

// Draw Function.
function draw() {
  background(bgimage);

  if (state === `title`) {
    title();
  } else if (state === `instructions`) {
    instructions();
  } else if (state === `objective`) {
    objective();
  } else if (state === `simulation1`) {
    simulation();
    level1();
  } else if (state === `simulation2`) {
    simulation();
    level2();
  } else if (state === `simulation3`) {
    simulation();
    level3();
  } else if (state === "simulation4") {
    simulation();
    level4();
  } else if (state === "simulation5") {
    simulation();
    level5();
  } else if (state === "simulation6") {
    simulation();
    level6();
  } else if (state === "simulation7") {
    simulation();
    level7();
  } else if (state === "simulation8") {
    simulation();
    level8();
  } else if (state === "simulation9") {
    simulation();
    level9();
  } else if (state === "simulation10") {
    simulation();
    level10();
  } else if (state === "simulation11") {
    simulation();
    level11();
  } else if (state === "simulation12") {
    simulation();
    level12();
  } else if (state === "simulation13") {
    simulation();
    level13();
  } else if (state === "simulation14") {
    simulation();
    level14();
  } else if (state === "simulation15") {
    simulation();
    level15();
  } else if (state === "simulation16") {
    simulation();
    level16();
  } else if (state === "simulation17") {
    simulation();
    level17();
  } else if (state === "simulation18") {
    simulation();
    level18();
  } else if (state === "simulation19") {
    simulation();
    level19();
  } else if (state === "simulation20") {
    simulation();
    level20();
  } else if (state === "simulation21") {
    simulation();
    level21();
  } else if (state === "simulation22") {
    simulation();
    level22();
  } else if (state === `ending`) {
    ending();
  }
}

// Title Function.
function title() {
  // Title Image.
  if (counter >= 60) {
    push();
    imageMode(CENTER);
    image(
      titlescreen,
      windowHeight / 2,
      windowHeight / 2.05,
      windowHeight / 1.1,
      windowHeight / 2.1
    );
    pop();
  } else if (counter < 60) {
    push();
    imageMode(CENTER);
    image(
      titlescreen,
      windowHeight / 2,
      windowHeight / 2,
      windowHeight / 1.1,
      windowHeight / 2.1
    );
    pop();
  }

  if (counter == 120) {
    // This only happens every second.
    counter = 0;
  }
  counter++;

  // Key Start Image.
  // Samuel (TA) helped me out with this.
  if (counter >= 30) {
    push();
    imageMode(CENTER);
    image(
      keystart,
      windowHeight / 2,
      windowHeight / 1.1,
      windowHeight / 1.7,
      windowHeight / 3.5
    );
    pop();
  }

  if (counter == 60) {
    // This only happens every second.
    counter = 0;
  }
  counter++;

  // Music Loop.
  if (!music.isPlaying()) {
    music.loop();
  }
}

// Instructions function.
function instructions() {
  // Instructions Title.
  push();
  imageMode(CENTER);
  image(
    instructionsscreen,
    windowHeight / 2,
    windowHeight / 10,
    windowHeight / 2,
    windowHeight / 4
  );
  pop();

  // Keyboard Instruction.
  push();
  imageMode(CENTER);
  image(
    keyboardinstruction,
    windowHeight / 2,
    windowHeight / 1.75,
    windowHeight / 1.4,
    windowHeight / 2.8
  );
  pop();

  // Mouse Instruction.
  push();
  imageMode(CENTER);
  image(
    mouseinstruction,
    windowHeight / 2,
    windowHeight / 1.5,
    windowHeight / 1.4,
    windowHeight / 2.8
  );
  pop();

  // Keyboard image.
  push();
  imageMode(CENTER);
  image(
    keyboard,
    windowHeight / 2,
    windowHeight / 2.5,
    windowHeight / 2,
    windowHeight / 3.8
  );
  pop();

  if (counter == 120) {
    // This only happens every second.
    counter = 0;
  }
  counter++;

  // Key Cotinue Image.
  // Samuel (TA) helped me out with this.
  if (counter >= 30) {
    push();
    imageMode(CENTER);
    image(
      keycontinue,
      windowHeight / 2,
      windowHeight / 1.1,
      windowHeight / 1.7,
      windowHeight / 3.5
    );
    pop();
  }
  if (counter == 60) {
    // This only happens every second.
    counter = 0;
  }
  counter++;
}

// Objective function. Informs the player on their objective.
function objective() {
  push();
  imageMode(CENTER);
  image(
    objectivetext,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1.1,
    windowHeight / 14
  );
  pop();

  if (counter == 120) {
    // This only happens every second.
    counter = 0;
  }
  counter++;

  // Key Begin Image.
  // Samuel (TA) helped me out with this.
  if (counter >= 30) {
    push();
    imageMode(CENTER);
    image(
      keybegin,
      windowHeight / 2,
      windowHeight / 1.1,
      windowHeight / 1.7,
      windowHeight / 3.5
    );
    pop();
  }

  if (counter == 60) {
    // This only happens every second.
    counter = 0;
  }
  counter++;
}

// Global simulation function.
function simulation() {
  display();
  move();
}

// Displays global simulation elements.
function display() {
  // User pipe.
  push();
  imageMode(CENTER);
  translate(pipe.x, pipe.y);
  rotate(angle);
  image(
    images[abs(imageSwitcher)],
    pipe.position,
    pipe.position,
    windowHeight / 3,
    windowHeight / 3
  );
  angle;
  pop();

  // User score.
  push();
  textAlign(CENTER, CENTER);
  textFont(gamefont);
  textSize(windowHeight / 32);
  fill(gametext.fill);
  text("SCORE: " + score, windowHeight / 1.07, windowHeight / 27);
  pop();

  // Time.
  push();
  textAlign(CENTER, CENTER);
  textFont(gamefont);
  textSize(windowHeight / 30);
  fill(gametext.fill);
  text("Time: " + timeleft, windowHeight / 14, windowHeight / 25);
  pop();

  // 60 second timer.
  if (timecounter == 120) {
    // This only happens every second.
    timecounter = 60;
    timeleft--;
  }
  timecounter++;

  if (timeleft === 0) {
    state = "ending";
    win.play(); // Victory sound.
    music.stop(); // Stops the music.
  }
}

// Level 1.
function level1() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelonebackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 5 && imageSwitcher === 0 && angle === 0) ||
    (grid.position === 5 && imageSwitcher === 0 && angle === 180)
  ) {
    state = "simulation2";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 2.
function level2() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    leveltwobackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (grid.position === 5 && imageSwitcher === 1 && angle === 270) {
    state = "simulation3";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 3.
function level3() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelthreebackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (grid.position === 4 && imageSwitcher === 1 && angle === 90) {
    state = "simulation4";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 4.
function level4() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelfourbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 2 && imageSwitcher === 0 && angle === 90) ||
    (grid.position === 2 && imageSwitcher === 0 && angle === 270)
  ) {
    state = "simulation5";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 5.
function level5() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelfivebackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 6 && imageSwitcher === 0 && angle === 0) ||
    (grid.position === 6 && imageSwitcher === 0 && angle === 180)
  ) {
    state = "simulation6";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 6.
function level6() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelsixbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (grid.position === 4 && imageSwitcher === 2 && angle === 90) {
    state = "simulation7";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 7.
function level7() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelsevenbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 6 && imageSwitcher === 0 && angle === 0) ||
    (grid.position === 6 && imageSwitcher === 0 && angle === 180)
  ) {
    state = "simulation8";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 8.
function level8() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    leveleightbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 4 && imageSwitcher === 0 && angle === 0) ||
    (grid.position === 4 && imageSwitcher === 0 && angle === 180)
  ) {
    state = "simulation9";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 9.
function level9() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelninebackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 6 && imageSwitcher === 0 && angle === 0) ||
    (grid.position === 6 && imageSwitcher === 0 && angle === 180)
  ) {
    state = "simulation10";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 10.
function level10() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    leveltenbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 5 && imageSwitcher === 3 && angle === 0) ||
    (grid.position === 5 && imageSwitcher === 3 && angle === 90) ||
    (grid.position === 5 && imageSwitcher === 3 && angle === 180) ||
    (grid.position === 5 && imageSwitcher === 3 && angle === 270)
  ) {
    state = "simulation11";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 11.
function level11() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelelevenbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 2 && imageSwitcher === 0 && angle === 90) ||
    (grid.position === 2 && imageSwitcher === 0 && angle === 270)
  ) {
    state = "simulation12";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 12.
function level12() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    leveltwelvebackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 5 && imageSwitcher === 3 && angle === 0) ||
    (grid.position === 5 && imageSwitcher === 3 && angle === 90) ||
    (grid.position === 5 && imageSwitcher === 3 && angle === 180) ||
    (grid.position === 5 && imageSwitcher === 3 && angle === 270)
  ) {
    state = "simulation13";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 13.
function level13() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelthirteenbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (grid.position === 4 && imageSwitcher === 2 && angle === 90) {
    state = "simulation14";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 14.
function level14() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelfourteenbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 6 && imageSwitcher === 0 && angle === 0) ||
    (grid.position === 6 && imageSwitcher === 0 && angle === 180)
  ) {
    state = "simulation15";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 15.
function level15() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelfifteenbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (grid.position === 2 && imageSwitcher === 1 && angle === 180) {
    state = "simulation16";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 16.
function level16() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelsixteenbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (grid.position === 8 && imageSwitcher === 2 && angle === 0) {
    state = "simulation17";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 17.
function level17() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelseventeenbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 6 && imageSwitcher === 0 && angle === 0) ||
    (grid.position === 6 && imageSwitcher === 0 && angle === 180)
  ) {
    state = "simulation18";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 18.
function level18() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    leveleighteenbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (grid.position === 8 && imageSwitcher === 2 && angle === 0) {
    state = "simulation19";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 19.
function level19() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    levelnineteenbackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (grid.position === 5 && imageSwitcher === 2 && angle === 270) {
    state = "simulation20";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 20.
function level20() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    leveltwentybackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (
    (grid.position === 2 && imageSwitcher === 0 && angle === 90) ||
    (grid.position === 2 && imageSwitcher === 0 && angle === 270)
  ) {
    state = "simulation21";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 21.
function level21() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    leveltwentyonebackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (grid.position === 8 && imageSwitcher === 2 && angle === 0) {
    state = "simulation22";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Level 22.
function level22() {
  // Level background.
  push();
  imageMode(CENTER);
  image(
    leveltwentytwobackground,
    windowHeight / 2,
    windowHeight / 2,
    windowHeight / 1,
    windowHeight / 1
  );
  pop();

  // If the right conditions are met then it proceeds to the next level.
  if (grid.position === 4 && imageSwitcher === 1 && angle === 90) {
    state = "simulation1";
    proceed.play(); // Plays a sound indicating success.
    score++;
  }
}

// Ending Function.
function ending() {
  // Total Score image.
  push();
  imageMode(CENTER);
  image(
    totalscore,
    windowHeight / 2,
    windowHeight / 3,
    windowHeight / 1.1,
    windowHeight / 2.2
  );
  pop();

  // Total Score.
  push();
  textAlign(CENTER, CENTER);
  textFont(gamefont);
  textSize(windowHeight / 8);
  fill(gametext.fill);
  text(score + " POINTS", windowHeight / 2, windowHeight / 2);
  pop();

  if (counter == 120) {
    // This only happens every second.
    counter = 0;
  }
  counter++;

  // Key Play Again.
  // Samuel (TA) helped me out with this.
  if (counter >= 30) {
    push();
    imageMode(CENTER);
    image(
      keyplayagain,
      windowHeight / 2,
      windowHeight / 1.1,
      windowHeight / 1.7,
      windowHeight / 3.5
    );
    pop();
  }

  if (counter == 60) {
    // This only happens every second.
    counter = 0;
  }
  counter++;
}

// Moves the user's pipe along the grid.
function move() {
  // Center Middle Square.
  if (mouseX <= windowHeight / 1.5) {
    if (mouseY <= windowHeight / 1.5) {
      if (mouseX >= windowHeight / 3) {
        if (mouseY >= windowHeight / 3) {
          if (
            state === "simulation1" ||
            state === "simulation2" ||
            state === "simulation9" ||
            state === "simulation10" ||
            state === "simulation11" ||
            state === "simulation12" ||
            state === "simulation19" ||
            state === "simulation20"
          ) {
            pipe.x = windowHeight / 2;
            pipe.y = windowHeight / 2;
            pipe.position = 0;
          }
          if (mouseIsPressed) {
            if (
              (state === "simulation1",
              "simulation2",
              "simulation3",
              "simulation4",
              "simulation5",
              "simulation6",
              "simulation7",
              "simulation8",
              "simulation9",
              "simulation10",
              "simulation11",
              "simulation12",
              "simulation13",
              "simulation14",
              "simulation15",
              "simulation16",
              "simulation17",
              "simulation18",
              "simulation19",
              "simulation20",
              "simulation21",
              "simulation22")
            ) {
              pipe.x = windowHeight / 2;
              pipe.y = windowHeight / 2;
              grid.position = 5;
            }
          }
        }
      }
    }
  }

  // Center left Square.
  if (mouseX < windowHeight / 3) {
    if (mouseY <= windowHeight / 1.5) {
      if (mouseY >= windowHeight / 3) {
        if (
          state === "simulation1" ||
          state === "simulation3" ||
          state === "simulation6" ||
          state === "simulation8" ||
          state === "simulation13" ||
          state === "simulation17" ||
          state === "simulation22"
        ) {
          pipe.x = windowHeight / 6;
          pipe.y = windowHeight / 2;
          pipe.position = 0;
        }
        if (mouseIsPressed) {
          if (
            (state === "simulation1",
            "simulation2",
            "simulation3",
            "simulation4",
            "simulation5",
            "simulation6",
            "simulation7",
            "simulation8",
            "simulation9",
            "simulation10",
            "simulation11",
            "simulation12",
            "simulation13",
            "simulation14",
            "simulation15",
            "simulation16",
            "simulation17",
            "simulation18",
            "simulation19",
            "simulation20",
            "simulation21",
            "simulation22")
          ) {
            pipe.x = windowHeight / 6;
            pipe.y = windowHeight / 2;
            grid.position = 4;
          }
        }
      }
    }
  }

  // Center Right Square.
  if (mouseX > windowHeight / 1.5) {
    if (mouseY <= windowHeight / 1.5) {
      if (mouseY >= windowHeight / 3) {
        if (
          state === "simulation1" ||
          state === "simulation5" ||
          state === "simulation7" ||
          state === "simulation8" ||
          state === "simulation9" ||
          state === "simulation14" ||
          state === "simulation15" ||
          state === "simulation17" ||
          state === "simulation20" ||
          state === "simulation21"
        ) {
          pipe.x = windowHeight / 1.2;
          pipe.y = windowHeight / 2;
          pipe.position = 0;
        }
        if (mouseIsPressed) {
          if (
            (state === "simulation1",
            "simulation2",
            "simulation3",
            "simulation4",
            "simulation5",
            "simulation6",
            "simulation7",
            "simulation8",
            "simulation9",
            "simulation10",
            "simulation11",
            "simulation12",
            "simulation13",
            "simulation14",
            "simulation15",
            "simulation16",
            "simulation17",
            "simulation18",
            "simulation19",
            "simulation20",
            "simulation21",
            "simulation22")
          ) {
            pipe.x = windowHeight / 1.2;
            pipe.y = windowHeight / 2;
            grid.position = 6;
          }
        }
      }
    }
  }

  // Top Middle Square.
  if (mouseX <= windowHeight / 1.5) {
    if (mouseX >= windowHeight / 3) {
      if (mouseY <= windowHeight / 3) {
        if (
          state === "simulation4" ||
          state === "simulation11" ||
          state === "simulation15" ||
          state === "simulation18" ||
          state === "simulation20"
        ) {
          pipe.x = windowHeight / 2;
          pipe.y = windowHeight / 6;
          pipe.position = 0;
        }
        if (mouseIsPressed) {
          if (
            (state === "simulation1",
            "simulation2",
            "simulation3",
            "simulation4",
            "simulation5",
            "simulation6",
            "simulation7",
            "simulation8",
            "simulation9",
            "simulation10",
            "simulation11",
            "simulation12",
            "simulation13",
            "simulation14",
            "simulation15",
            "simulation16",
            "simulation17",
            "simulation18",
            "simulation19",
            "simulation20",
            "simulation21",
            "simulation22")
          ) {
            pipe.x = windowHeight / 2;
            pipe.y = windowHeight / 6;
            grid.position = 2;
          }
        }
      }
    }
  }

  // Top Left Square.
  if (mouseX < windowHeight / 3) {
    if (mouseY <= windowHeight / 1.5) {
      if (mouseY <= windowHeight / 3) {
        if (
          state === "simulation1" ||
          state === "simulation4" ||
          state === "simulation5" ||
          state === "simulation12" ||
          state === "simulation17" ||
          state === "simulation18" ||
          state === "simulation19"
        ) {
          pipe.x = windowHeight / 6;
          pipe.y = windowHeight / 6;
          pipe.position = 0;
        }
        if (mouseIsPressed) {
          if (
            (state === "simulation1",
            "simulation2",
            "simulation3",
            "simulation4",
            "simulation5",
            "simulation6",
            "simulation7",
            "simulation8",
            "simulation9",
            "simulation10",
            "simulation11",
            "simulation12",
            "simulation13",
            "simulation14",
            "simulation15",
            "simulation16",
            "simulation17",
            "simulation18",
            "simulation19",
            "simulation20",
            "simulation21",
            "simulation22")
          ) {
            pipe.x = windowHeight / 6;
            pipe.y = windowHeight / 6;
            grid.position = 1;
          }
        }
      }
    }
  }

  // Top Right Square.
  if (mouseX > windowHeight / 1.5) {
    if (mouseY <= windowHeight / 1.5) {
      if (mouseY <= windowHeight / 3) {
        if (
          state === "simulation1" ||
          state === "simulation8" ||
          state === "simulation13" ||
          state === "simulation18" ||
          state === "simulation22"
        ) {
          pipe.x = windowHeight / 1.2;
          pipe.y = windowHeight / 6;
          pipe.position = 0;
        }
        if (mouseIsPressed) {
          if (
            (state === "simulation1",
            "simulation2",
            "simulation3",
            "simulation4",
            "simulation5",
            "simulation6",
            "simulation7",
            "simulation8",
            "simulation9",
            "simulation10",
            "simulation11",
            "simulation12",
            "simulation13",
            "simulation14",
            "simulation15",
            "simulation16",
            "simulation17",
            "simulation18",
            "simulation19",
            "simulation20",
            "simulation21",
            "simulation22")
          ) {
            pipe.x = windowHeight / 1.2;
            pipe.y = windowHeight / 6;
            grid.position = 3;
          }
        }
      }
    }
  }

  // Bottom Middle Square.
  if (mouseX <= windowHeight / 1.5) {
    if (mouseY >= windowHeight / 1.5) {
      if (mouseX >= windowHeight / 3) {
        if (
          state === "simulation4" ||
          state === "simulation16" ||
          state === "simulation18" ||
          state === "simulation20" ||
          state === "simulation21"
        ) {
          pipe.x = windowHeight / 2;
          pipe.y = windowHeight / 1.2;
          pipe.position = 0;
        }
        if (mouseIsPressed) {
          if (
            (state === "simulation1",
            "simulation2",
            "simulation3",
            "simulation4",
            "simulation5",
            "simulation6",
            "simulation7",
            "simulation8",
            "simulation9",
            "simulation10",
            "simulation11",
            "simulation12",
            "simulation13",
            "simulation14",
            "simulation15",
            "simulation16",
            "simulation17",
            "simulation18",
            "simulation19",
            "simulation20",
            "simulation21",
            "simulation22")
          ) {
            pipe.x = windowHeight / 2;
            pipe.y = windowHeight / 1.2;
            grid.position = 8;
          }
        }
      }
    }
  }

  // Bottom Left Square.
  if (mouseX < windowHeight / 3) {
    if (mouseY >= windowHeight / 1.5) {
      if (mouseY >= windowHeight / 3) {
        if (
          state === "simulation2" ||
          state === "simulation3" ||
          state === "simulation4" ||
          state === "simulation5" ||
          state === "simulation7" ||
          state === "simulation12" ||
          state === "simulation17"
        ) {
          pipe.x = windowHeight / 6;
          pipe.y = windowHeight / 1.2;
          pipe.position = 0;
        }
        if (mouseIsPressed) {
          if (
            (state === "simulation1",
            "simulation2",
            "simulation3",
            "simulation4",
            "simulation5",
            "simulation6",
            "simulation7",
            "simulation8",
            "simulation9",
            "simulation10",
            "simulation11",
            "simulation12",
            "simulation13",
            "simulation14",
            "simulation15",
            "simulation16",
            "simulation17",
            "simulation18",
            "simulation19",
            "simulation20",
            "simulation21",
            "simulation22")
          ) {
            pipe.x = windowHeight / 6;
            pipe.y = windowHeight / 1.2;
            grid.position = 7;
          }
        }
      }
    }
  }

  // Bottom Right Square.
  if (mouseX > windowHeight / 1.5) {
    if (mouseY >= windowHeight / 1.5) {
      if (mouseY >= windowHeight / 3) {
        if (
          state === "simulation1" ||
          state === "simulation2" ||
          state === "simulation3" ||
          state === "simulation13" ||
          state === "simulation20"
        ) {
          pipe.x = windowHeight / 1.2;
          pipe.y = windowHeight / 1.2;
          pipe.position = 0;
        }
        if (mouseIsPressed) {
          if (
            (state === "simulation1",
            "simulation2",
            "simulation3",
            "simulation4",
            "simulation5",
            "simulation6",
            "simulation7",
            "simulation8",
            "simulation9",
            "simulation10",
            "simulation11",
            "simulation12",
            "simulation13",
            "simulation14",
            "simulation15",
            "simulation16",
            "simulation17",
            "simulation18",
            "simulation19",
            "simulation20",
            "simulation21",
            "simulation22")
          ) {
            pipe.x = windowHeight / 1.2;
            pipe.y = windowHeight / 1.2;
            grid.position = 9;
          }
        }
      }
    }
  }
}

// Resets the pipe and grid position every time the mouse button is released.
function mouseReleased() {
  pipe.position = undefined;
  grid.position = undefined;
}

// Key press function.
function keyPressed() {
  // Switch from title to instruction and then simulation.
  if (state === `title`) {
    state = `instructions`;
    next.play(); // Plays a sound that indicates going to the next screen.
  } else if (state === "instructions") {
    state = "objective";
    next.play(); // Plays a sound that indicates going to the next screen.
  } else if (state === "objective") {
    state = "simulation1";
    next.play(); // Plays a sound that indicates going to the next screen.
  } else if (state === "ending") {
    // Play again feature.
    if (keyCode == 27) {
      // Hitting "ESC" goes back to the title page and resets everything.
      state = "title";
      counter = 0;
      counter = 0;
      pipe.position = undefined;
      grid.position = undefined;
      score = 0;
      timeleft = 60;
      imageSwitcher = 0;
      angle = 0;
    }
  }

  // Switching and rorating pipes is only allowed if the user is within the simulations.
  else if (
    (state === "simulation1",
    "simulation2",
    "simulation3",
    "simulation4",
    "simulation5")
  ) {
    if (keyCode == 65) {
      // Hitting "A" goes to the previous pipe.
      imageSwitcher--;
      pipeswitch.play(); // Switch sound.
      if (imageSwitcher < 0) {
        // If the switcher is less than 0 than the number resets to 3.
        imageSwitcher = 3;
      }
    } else if (keyCode == 68) {
      // Hitting "D" goes to the next pipe.
      imageSwitcher++;
      pipeswitch.play(); // Switch sound.
      if (imageSwitcher > 3) {
        // If the switcher is more than 3 than the number resets to 0.
        imageSwitcher = 0;
      }
    } else if (keyCode == 69) {
      // Hitting "E" rotates the pipe to the right.
      angle += 90;
      piperotate.play(); // Rotate sound.
      if (angle >= 360) {
        // Pipe angle goes back to 0 if it is more or equal to 360 degrees.
        angle = 0;
      }
    } else if (keyCode == 81) {
      // Hitting "D" rotates the pipe to the left.
      angle -= 90;
      piperotate.play(); // Rotate sound.
      if (angle < 0) {
        // Pipe angle jumps to 270 if it is less than 0 degrees.
        angle = 270;
      }
    }
  }
}
