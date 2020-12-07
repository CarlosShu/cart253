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
let titlemenubackgroundimage;

// Game Visuals variables.
let gamebackgroundimage;
let gamedistanceshadowimage;
let gamegroundimage;

// Game Shapes varaiables;
let gamecubeimage;
let gamecubewideimage;
let gamerectangleimage;
let gameplatformimage;
let gamemovingplatformimage;
let gametrianglewideimage;

// Game Elements.
let gamebuttonimage;
let gamebuttonactivatedimage;
let gametrampolineimage;
let gameboostplatformimage;

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

// Moving platform timer.
let movingplatformtimer = 0;
let movingplatformverticaltimer = 0;

// Gravity variable.
let gravityForce = 0.025;

// Level variable.
var level = 0;

// Ground variable.
let ground;

// Shapes variables.
let cube;
let cubewide;
let rectangle;
let platform;
let movingplatform;
let movingplatformvertical;
let trianglewide;

// Game Elements.
let button;
let trampoline;
let boostplatform;

// Avatar variables.
let avatars = [];
let numavatars = 1;

// Preload Function.
function preload() {
  // Fonts.
  blockfont = loadFont("assets/block.otf"); // Practically the Nintendo Logo Font.

  // Global Visuals.
  headerimage = loadImage("assets/images/global/header.png");
  lightoverlayimage = loadImage("assets/images/global/overlay.png");

  // Title Menu Visuals.
  titlemenulogoimage = loadImage("assets/images/titlemenu/titlemenulogo.png");
  titlemenubackgroundimage = loadImage(
    "assets/images/titlemenu/titlemenubackground.png"
  );

  // Game Visuals.
  gamebackgroundimage = loadImage("assets/images/game/gamebackground.png");
  gamedistanceshadowimage = loadImage(
    "assets/images/game/gamedistanceshadow.png"
  );
  gamegroundimage = loadImage("assets/images/game/gameground.png");

  // Game Shapes.
  gamecubeimage = loadImage("assets/images/shapes3d/gamecube.png");
  gamecubewideimage = loadImage("assets/images/shapes3d/gamecubewide.png");
  gamerectangleimage = loadImage("assets/images/shapes3d/gamerectangle.png");
  gameplatformimage = loadImage(
    "assets/images/shapes3d/gamemovingplatform.png"
  );
  gametrianglewideimage = loadImage(
    "assets/images/shapes3d/gametrianglewide.png"
  );

  // Game elements.
  gamebuttonimage = loadImage("assets/images/elements/gamebutton.png");
  gamebuttonactivatedimage = loadImage(
    "assets/images/elements/gamebuttonactivated.png"
  );
  gametrampolineimage = loadImage("assets/images/elements/gametrampoline.png");
  gameboostplatformimage = loadImage("assets/images/elements/gamebelt.gif");

  // Avatar Visuals.
  avataridlerightimage = loadImage(
    "assets/images/avatar3d/avataridleright.gif"
  );
  avataridleleftimage = loadImage("assets/images/avatar3d/avataridleleft.gif");
  avatarrunningrightimage = loadImage(
    "assets/images/avatar3d/avatarrunright.gif"
  );
  avatarrunningleftimage = loadImage(
    "assets/images/avatar3d/avatarrunleft.gif"
  );
  avatarcrouchedrightimage = loadImage(
    "assets/images/avatar3d/avatarcrouchright.png"
  );
  avatarcrouchedleftimage = loadImage(
    "assets/images/avatar3d/avatarcrouchleft.png"
  );
  avatarjumpright1image = loadImage(
    "assets/images/avatar3d/avatarjumpright.png"
  );
  avatarjumpright2image = loadImage(
    "assets/images/avatar3d/avatarjumpright.png"
  );
  avatarjumpleft1image = loadImage("assets/images/avatar3d/avatarjumpleft.png");
  avatarjumpleft2image = loadImage("assets/images/avatar3d/avatarjumpleft.png");
}

// Setup function.
function setup() {
  // FPS.
  frameRate(fr);
  // Audio.
  userStartAudio();
  ground = new Ground(800, 425, 2000, 0);

  for (let i = 0; i < numavatars; i++) {
    // Avatar X and Y spawn.
    let x = 400;
    let y = -100;

    let avatar = new Avatar(x, y);
    avatars.push(avatar);
  }

  // Shapes.
  cube = new Cube(400, 379, 100, 125);
  cubewide = new Cubewide(200, 404, 200, 75);
  rectangle = new Rectangle(600, 331, 100, 220);
  platform = new Platform(800, 250, 100, 55);
  movingplatform = new Movingplatform(1000, 250, 100, 55, 0, 2);
  movingplatformvertical = new Movingplatformvertical(200, 250, 100, 55, 0, 2);

  // Elements.
  button = new Button(50, 410, 75, 50, false);
  trampoline = new Trampoline(1000, 404, 150, 75);
  boostplatform = new Boostplatform(1300, 404, 400, 40);
}

// Canvas Resize function.
function windowResized() {
  resizeCanvas(width, height);
}

// Draw function.
function draw() {
  createCanvas(1600, 800);
  background(0);

  if (state === "titlemenu") {
    titlemenu();
    global();
  } else if (state === "level01") {
    game();
    shapes();
    elements();
    avatar();
    global();
    level01();
  }
}

// Global function.
function global() {
  // Light Overlay.
  push();
  imageMode(CENTER);
  image(lightoverlayimage, width / 2, height / 2, 1600, 650);
  pop();

  if (state === "titlemenu") {
    if (counter >= 30) {
      // Press Enter.
      push();
      textAlign(CENTER, CENTER);
      textFont(blockfont);
      textSize(15);
      fill(255, 255, 255);
      text("PRESS ENTER TO PLAY", width / 2, 600);
      pop();
    }
    if (counter == 60) {
      // This only happens every second.
      counter = 0;
    }
    counter++;

    // Title Menu Logo.
    push();
    imageMode(CENTER);
    image(titlemenulogoimage, width / 2, height / 2, 1300, 650);
    pop();
  } else if (state === "level01") {
    // Instructions.
    push();
    textAlign(CENTER, CENTER);
    textFont(blockfont);
    textSize(15);
    fill(255, 255, 255);
    text("USE THE WASD KEYS TO MOVE, JUMP, AND CROUCH.", width / 2, 600);
    pop();

    // Level indicator.
    push();
    textAlign(CENTER, CENTER);
    textFont(blockfont);
    textSize(15);
    fill(255, 255, 255);
    text("LEVEL: " + level, 1550, 20);
    pop();
  }
}

function titlemenu() {
  // Game Background.
  push();
  imageMode(CENTER);
  image(titlemenubackgroundimage, width / 2, height / 2, 2600, 1300);
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
  image(gamedistanceshadowimage, width / 2, height / 2, 1800, 800);
  pop();
}

function level01() {
  level = 1;
}

// Avatar function.
function avatar() {
  ground.display();

  for (let i = 0; i < avatars.length; i++) {
    let avatar = avatars[i];

    if (avatar.active) {
      avatar.gravity(gravityForce);
      avatar.move();
      avatar.collide(ground);
      avatar.display();
      avatar.keyReleased();
    }
  }
}

function shapes() {
  cube.display();
  cubewide.display();
  rectangle.display();
  platform.display();
  movingplatform.display();
  movingplatform.move();
  movingplatformvertical.display();
  movingplatformvertical.move();
}

function elements() {
  button.display(Avatar);
  trampoline.display();
  boostplatform.display();
}

// Keypress function.
function keyPressed() {
  // Switch from titlemenu to game.
  if (state === "titlemenu") {
    if (keyCode == 13) {
      state = "level01";
    }
  }
}
