/**************************************************
Exercise 6: Musical Notes
Carlos-Enrique Salazar Aguilar

Exercise that makes use of the p5 sound library in order to further the bigger project.
**************************************************/
// Strict command.
"use strict";
// Fonts variables.
let blockfont;

// Global Visuals variables.
let headerimage;
let overlayimage;

// Game Visuals variables.
let gamebackgroundimage;
let gamebackgroundkey1image;
let gamebackgroundkey2image;
let gamebackgroundkey3image;
let gamebackgroundkey4image;
let gamebackgroundkey5image;
let gamebackgroundkey6image;
let gamebackgroundkey7image;
let gamebackgroundkey8image;

// Avatar Visuals variables.
let avataridlerightimage;
let avataridleleftimage;
let avatarrunningrightimage;
let avatarrunningleftimage;
let avatarcrouchedrightimage;
let avatarcrouchedleftimage;
let avatarjumpright1image;
let avatarjumpright2image;
let avatarjumpleft1image;
let avatarjumpleft2image;

// State Variables.
let state = "game";

let gravityForce = 0.015;
let ground;
let avatars = [];
let numavatars = 1;

// Piano Keys.
let key = 0;

// F-minor.
let notes = ["F3", "G3", "Ab4", " Bb4", "C4", "Db4", "Eb4", "F4"];

// Preload Function.
function preload() {
  // Fonts.
  blockfont = loadFont("assets/block.ttf"); // Practically the Nintendo Logo Font.

  // Global Visuals.
  headerimage = loadImage("assets/images/global/header.png");
  overlayimage = loadImage("assets/images/global/overlay.png");

  // Game Visuals.
  gamebackgroundimage = loadImage("assets/images/game/gamebackground.png");
  gamebackgroundkey1image = loadImage(
    "assets/images/game/gamebackgroundkey1.png"
  );
  gamebackgroundkey2image = loadImage(
    "assets/images/game/gamebackgroundkey2.png"
  );
  gamebackgroundkey3image = loadImage(
    "assets/images/game/gamebackgroundkey3.png"
  );
  gamebackgroundkey4image = loadImage(
    "assets/images/game/gamebackgroundkey4.png"
  );
  gamebackgroundkey5image = loadImage(
    "assets/images/game/gamebackgroundkey5.png"
  );
  gamebackgroundkey6image = loadImage(
    "assets/images/game/gamebackgroundkey6.png"
  );
  gamebackgroundkey7image = loadImage(
    "assets/images/game/gamebackgroundkey7.png"
  );
  gamebackgroundkey8image = loadImage(
    "assets/images/game/gamebackgroundkey8.png"
  );

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
  avatarjumpright1image = loadImage(
    "assets/images/avatar/avatarjumpright1.png"
  );
  avatarjumpright2image = loadImage(
    "assets/images/avatar/avatarjumpright2.png"
  );
  avatarjumpleft1image = loadImage("assets/images/avatar/avatarjumpleft1.png");
  avatarjumpleft2image = loadImage("assets/images/avatar/avatarjumpleft2.png");
}

function setup() {
  userStartAudio();

  ground = new Ground(1300, 0);

  for (let i = 0; i < numavatars; i++) {
    // Avatar X and Y spawn.
    let x = 650;
    let y = -100;

    let avatar = new Avatar(x, y);
    avatars.push(avatar);
  }
}

function windowResized() {
  resizeCanvas(width, height);
}

function draw() {
  createCanvas(1300, 650);
  background(0);

  // States.
  if (state === "game") {
    game();
    avatar();
    global();
  }
}

// Global function.
function global() {
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

// Game function.
function game() {
  // Game Background.
  push();
  imageMode(CENTER);
  if (key == 0) {
    image(gamebackgroundimage, width / 2, height / 2, 1300, 650);
  } else if (key == 1) {
    image(gamebackgroundkey1image, width / 2, height / 2, 1300, 650);
  } else if (key == 2) {
    image(gamebackgroundkey2image, width / 2, height / 2, 1300, 650);
  } else if (key == 3) {
    image(gamebackgroundkey3image, width / 2, height / 2, 1300, 650);
  } else if (key == 4) {
    image(gamebackgroundkey4image, width / 2, height / 2, 1300, 650);
  } else if (key == 5) {
    image(gamebackgroundkey5image, width / 2, height / 2, 1300, 650);
  } else if (key == 6) {
    image(gamebackgroundkey6image, width / 2, height / 2, 1300, 650);
  } else if (key == 7) {
    image(gamebackgroundkey7image, width / 2, height / 2, 1300, 650);
  } else if (key == 8) {
    image(gamebackgroundkey8image, width / 2, height / 2, 1300, 650);
  }
  pop();
}

// Avatar function.
function avatar() {
  ground.display();

  for (let i = 0; i < avatars.length; i++) {
    let avatar = avatars[i];

    if (avatar.active) {
      avatar.gravity(gravityForce);
      avatar.move();
      avatar.bounce(ground);
      avatar.display();
    }
  }
}
