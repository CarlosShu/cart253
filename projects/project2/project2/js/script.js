/**************************************************
Project 2: Block Mania.
Carlos-Enrique Salazar Aguilar

Project 2.
**************************************************/

// Strict command.
"use strict";

// Fonts variables.
let blockfont;

// Global Visuals variables.
let headerimage;
let lightoverlayimage;

// Title Menu Visuals variables.
let titlemenulogoimage;

// Game Visuals variables.
let gamebackgroundimage;
let gamedistanceshadowimage;
let gamegroundimage;

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

// Starting State Variable.
let state = "titlemenu";

// FPS variable.
let fr = 60;

// Number Variables.
let counter = 0;

// Gravity variable.
let gravityForce = 0.025;

// Ground variable.
let ground;
let ground2;

// Avatar variables.
let avatars = [];
let numavatars = 1;

// Preload Function.
function preload() {
  // Fonts.
  blockfont = loadFont("assets/block.ttf"); // Practically the Nintendo Logo Font.

  // Global Visuals.
  headerimage = loadImage("assets/images/global/header.png");
  lightoverlayimage = loadImage("assets/images/global/overlay.png");

  // Title Menu Visuals.
  titlemenulogoimage = loadImage("assets/images/titlemenu/titlemenulogo.png");

  // Game Visuals.
  gamebackgroundimage = loadImage("assets/images/game/gamebackground.png");
  gamedistanceshadowimage = loadImage(
    "assets/images/game/gamedistanceshadow.png"
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
  avatarjumpright1image = loadImage(
    "assets/images/avatar/avatarjumpright1.png"
  );
  avatarjumpright2image = loadImage(
    "assets/images/avatar/avatarjumpright2.png"
  );
  avatarjumpleft1image = loadImage("assets/images/avatar/avatarjumpleft1.png");
  avatarjumpleft2image = loadImage("assets/images/avatar/avatarjumpleft2.png");
}

// Setup function.
function setup() {
  // FPS.
  frameRate(fr);
  // Audio.
  userStartAudio();
  ground = new Ground(650, 425, 1300, 0);
  ground2 = new Ground(400, 375, 100, 100);

  for (let i = 0; i < numavatars; i++) {
    // Avatar X and Y spawn.
    let x = 800;
    let y = -100;

    let avatar = new Avatar(x, y);
    avatars.push(avatar);
  }
}

// Canvas Resize function.
function windowResized() {
  resizeCanvas(width, height);
}

// Draw function.
function draw() {
  createCanvas(1300, 650);
  background(0);

  if (state === "titlemenu") {
    titlemenu();
    global();
  } else if (state === "game") {
    game();
    avatar();
    global();
  }
}

// Global function.
function global() {
  // Light Overlay.
  push();
  imageMode(CENTER);
  image(lightoverlayimage, width / 2, height / 2, 1300, 650);
  pop();

  // Global Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, 1300, 650);
  pop();

  if (state === "titlemenu") {
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
  } else if (state === "game") {
    // Instructions.
    push();
    textAlign(CENTER, CENTER);
    textFont(blockfont);
    textSize(15);
    fill(255, 255, 255);
    text("USE THE WASD KEYS TO MOVE, JUMP, AND CROUCH.", 650, 600);
    pop();
  }
}

function titlemenu() {
  // Game Background.
  push();
  imageMode(CENTER);
  image(gamebackgroundimage, width / 2, height / 2, 2600, 1300);
  pop();

  // Title Menu Logo.
  push();
  imageMode(CENTER);
  image(titlemenulogoimage, width / 2, height / 2, 1300, 650);
  pop();
}

// Game function.
function game() {
  // Game Background.
  push();
  imageMode(CENTER);
  image(gamebackgroundimage, width / 2, height / 2, 2600, 1300);
  pop();

  // Game Ground.
  push();
  imageMode(CENTER);
  image(gamegroundimage, width / 2, height / 2, 2600, 1300);
  pop();

  // Game Distance Shadow.
  push();
  imageMode(CENTER);
  image(gamedistanceshadowimage, width / 2, height / 2, 1300, 650);
  pop();
}

// Avatar function.
function avatar() {
  ground.display();
  ground2.display();

  for (let i = 0; i < avatars.length; i++) {
    let avatar = avatars[i];

    if (avatar.active) {
      avatar.gravity(gravityForce);
      avatar.move();
      avatar.collide(ground);
      avatar.display();
    }
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
}
