/**************************************************
Project 2: Block Mania Prototype.
Carlos-Enrique Salazar Aguilar

The prototype for my project.
**************************************************/
// Strict command.
"use strict";

// Fonts variables.
let blockfont;

// Global Visuals variables.
let headerimage;
let overlayimage;

// Title Menu Visuals variables.
let titlemenubgimage;
let titlemenulogoimage;

// Game Visuals variables.
let gamebackgroundimage;
let gamebackgroundelementsimage;
let gamegroundimage;

// Avatar Visuals variables.
let avataridlerightimage;
let avataridleleftimage;
let avatarrunningrightimage;
let avatarrunningleftimage;
let avatarcrouchedrightimage;
let avatarcrouchedleftimage;
let avatarjumprightimage;
let avatarjumpleftimage;

// State Variables.
let state = "titlemenu";

// Number Variables.
let counter = 0;

// avatar Variable
let avatar = {
  x: undefined,
  y: undefined,
  size: 70,
  vx: 0,
  vy: 0,
  speed: 4,
  ay: 0,
  maxHeight: 15,
  face: 0,
  crouched: 0,
  jump: 0,
};

// Preload Function.
function preload() {
  // Fonts.
  blockfont = loadFont("assets/block.ttf"); // Practically the Nintendo Logo Font.

  // Global Visuals.
  headerimage = loadImage("assets/images/global/header.png");
  overlayimage = loadImage("assets/images/global/overlay.png");

  // Title Menu Visuals.
  titlemenubgimage = loadImage("assets/images/titlemenu/titlemenubg.png");
  titlemenulogoimage = loadImage("assets/images/titlemenu/titlemenulogo.png");

  // Game Visuals.
  gamebackgroundimage = loadImage("assets/images/game/gamebackground.png");
  gamebackgroundelementsimage = loadImage(
    "assets/images/game/gamebackgroundelments.png"
  );
  gamegroundimage = loadImage("assets/images/game/gameground.png");

  // Avatar Visuals.
  avataridlerightimage = loadImage("assets/images/avatar/avataridle.gif");
  avataridleleftimage = loadImage("assets/images/avatar/avataridleleft.gif");
  avatarrunningrightimage = loadImage("assets/images/avatar/avatarrunning.gif");
  avatarrunningleftimage = loadImage(
    "assets/images/avatar/avatarrunningleft.gif"
  );
  avatarcrouchedrightimage = loadImage(
    "assets/images/avatar/avatarcrouchedright.png"
  );
  avatarcrouchedleftimage = loadImage(
    "assets/images/avatar/avatarcrouchedleft.png"
  );
  avatarjumprightimage = loadImage("assets/images/avatar/avatarjumpright.png");
  avatarjumpleftimage = loadImage("assets/images/avatar/avatarjumpleft.png");
}

// Setup Function.
function setup() {
  // Avatar starts in this position.
  avatar.x = 650;
  avatar.y = 400;
}

// Re-sizes the canvas to stretch along the window.
function windowResized() {
  resizeCanvas(width, height);
}

// Draw function.
function draw() {
  createCanvas(1300, 650);
  background(0);

  // States.
  if (state === "titlemenu") {
    titlemenu();
  } else if (state === "game") {
    game();
    player();
  }
}

function titlemenu() {
  // Title Menu Background.
  push();
  imageMode(CENTER);
  image(titlemenubgimage, width / 2, height / 2, 1300, 650);
  pop();

  // Title Menu Logo.
  push();
  imageMode(CENTER);
  image(titlemenulogoimage, width / 2, height / 2, 1300, 650);
  pop();

  // Global Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, 1300, 650);
  pop();

  if (counter >= 30) {
    // Press Enter.
    push();
    textAlign(CENTER, CENTER);
    textFont(blockfont);
    textSize(15);
    fill(255, 255, 255);
    text("PRESS ENTER TO PLAY", 650, 600);
    pop();
  }
  if (counter == 60) {
    // This only happens every second.
    counter = 0;
  }
  counter++;
}

function game() {
  // Game Background.
  push();
  imageMode(CENTER);
  image(gamebackgroundimage, width / 2, height / 2, 1300, 650);
  pop();

  // Game Ground.
  push();
  imageMode(CENTER);
  image(gamegroundimage, width / 2, height / 2, 1300, 650);
  pop();

  // Global Overlay.
  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(overlayimage, width / 2, height / 2, 1300, 650);
  pop();

  // Global Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, 1300, 650);
  pop();

  // Instructions.
  push();
  textAlign(CENTER, CENTER);
  textFont(blockfont);
  textSize(15);
  fill(255, 255, 255);
  text("USE THE WASD KEYS TO MOVE, JUMP, AND CROUCH.", 650, 600);
  pop();
}

function player() {
  // Avatar Idle Animation.
  push();
  imageMode(CENTER);

  // Position constraints.
  avatar.x = constrain(avatar.x, 0, 1300);
  avatar.y = constrain(avatar.y, 300, 400);

  if (avatar.vx < 0 && avatar.jump == 0) {
    image(avatarrunningleftimage, avatar.x, avatar.y, avatar.size, avatar.size);
  } else if (avatar.vx > 0 && avatar.jump == 0) {
    image(
      avatarrunningrightimage,
      avatar.x,
      avatar.y,
      avatar.size,
      avatar.size
    );
  } else if (
    avatar.vx == 0 &&
    avatar.face == 0 &&
    avatar.crouched == 0 &&
    avatar.jump == 0
  ) {
    image(avataridlerightimage, avatar.x, avatar.y, avatar.size, avatar.size);
  } else if (
    avatar.vx == 0 &&
    avatar.face == 1 &&
    avatar.crouched == 0 &&
    avatar.jump == 0
  ) {
    image(avataridleleftimage, avatar.x, avatar.y, avatar.size, avatar.size);
  } else if (avatar.vx == 0 && avatar.face == 0 && avatar.crouched == 1) {
    image(
      avatarcrouchedrightimage,
      avatar.x,
      avatar.y,
      avatar.size,
      avatar.size
    );
  } else if (avatar.vx == 0 && avatar.face == 1 && avatar.crouched == 1) {
    image(
      avatarcrouchedleftimage,
      avatar.x,
      avatar.y,
      avatar.size,
      avatar.size
    );
  } else if (avatar.face == 0 && avatar.crouched == 0 && avatar.jump == 1) {
    image(avatarjumprightimage, avatar.x, avatar.y, avatar.size, avatar.size);
  } else if (avatar.face == 1 && avatar.crouched == 0 && avatar.jump == 1) {
    image(avatarjumpleftimage, avatar.x, avatar.y, avatar.size, avatar.size);
  }
  pop();

  // Avatar moves.
  if (keyIsDown(65)) {
    avatar.vx = -avatar.speed;
    avatar.face = 1;
  } else if (keyIsDown(68)) {
    avatar.vx = avatar.speed;
    avatar.face = 0;
  } else if (keyIsDown(83)) {
    avatar.vx = 0;
    avatar.crouched = 1;
  } else {
    avatar.vx = 0;
    avatar.crouched = 0;
    avatar.jump = 0;
  }

  // Avatar Running Velocity.
  avatar.x = avatar.x + avatar.vx;
  // Avatar Jump Velocity.
  avatar.y = avatar.y + avatar.vy;

  if (avatar.y < 305) {
    avatar.vy = avatar.vy + avatar.ay;
  }
  if (avatar.y >= 400) {
    avatar.vy = 0;
    avatar.y = 400;
  }
  if (avatar.y < 400) {
    avatar.jump = 1;
  }
  if (avatar.y == 400) {
    avatar.jump = 0;
  }
}

// Keypress function.
function keyPressed() {
  // Switch from titlemenu to game.
  if (state === "titlemenu") {
    if (keyCode == 13) {
      state = "game";
    }
  }
  if (state === "game") {
    if (keyCode == 87) {
      if (avatar.y == 400) {
        avatar.ay = 7;
        avatar.vy = avatar.vy - avatar.ay;
      }
    }
  }
}
