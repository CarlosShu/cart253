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
let gameforegroundlightimage;
let gamegroundimage;

// Game Shapes visuals;
let gamecubeimage;
let gamecube02image;
let gamecubewideimage;
let gamerectangleimage;
let gamerectangle02image;
let gamerectangle03image;
let gamerectanglewideimage;
let gameplatformimage;
let gamemovingplatformimage;
let gametrianglewideimage;
let gamebigblockimage;
let gamebigblock02image;
let gamegiantblockimage;

// Ground blocks visuals.
let gamegroundblock1image;
let gamegroundblock2image;
let gamegroundblock3image;

// Game Elements.
let gamebuttonimage;
let gamebuttonactivatedimage;
let gametrampolineimage;
let gameboostplatformimage;
let gamerollerimage;
let gamecanonimage;
let gamepipeimage;
let gamecanonballimage;
let gamedoorimage;
let gamespawnimage;

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
let movingplatform02timer = 0;
let movingplatformverticaltimer = 0;
let movingplatformvertical02timer = 0;

// Gravity variable.
let gravityForce = 0.025;

// Exiting the level.
let exit = false;

// Reset notice.
let reset = false;

// Level variable.
var level = 0;

// Ground variable.
let ground;

// Shapes variables.
let cube;
let cube02;
let cubewide;
let rectangle;
let rectangle02;
let rectangle03;
let rectangle04;
let rectanglewide;
let platform;
let platform02;
let platform03;
let platform04;
let movingplatform;
let movingplatform02;
let movingplatform03;
let movingplatformvertical;
let movingplatformvertical02;
let trianglewide;
let bigblock;
let bigblock02;
let giantblock;

// Ground blocks.
let groundblock01;
let groundblock02;
let groundblock03;

// Game Elements.
let button;
let trampoline;
let boostplatform;
let roller;
let roller02;
let roller03;
let roller04;
let pipe;
let canon;
let canonball;
let door;
let spawn;

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
  gameforegroundlightimage = loadImage(
    "assets/images/game/gameforegroundlight.png"
  );
  gamegroundimage = loadImage("assets/images/game/gameground.png");

  // Game Shapes.
  gamecubeimage = loadImage("assets/images/shapes3d/gamecube.png");
  gamecube02image = loadImage("assets/images/shapes3d/gamecube02.png");
  gamecubewideimage = loadImage("assets/images/shapes3d/gamecubewide.png");
  gamerectangleimage = loadImage("assets/images/shapes3d/gamerectangle.png");
  gamerectangle02image = loadImage(
    "assets/images/shapes3d/gamerectangle02.png"
  );
  gamerectangle03image = loadImage(
    "assets/images/shapes3d/gamerectangle03.png"
  );
  gamerectanglewideimage = loadImage(
    "assets/images/shapes3d/gamerectanglewide.png"
  );
  gameplatformimage = loadImage(
    "assets/images/shapes3d/gamemovingplatform.png"
  );
  gametrianglewideimage = loadImage(
    "assets/images/shapes3d/gametrianglewide.png"
  );
  gamebigblockimage = loadImage("assets/images/shapes3d/gamebigblock.png");
  gamebigblock02image = loadImage("assets/images/shapes3d/gamebigblock02.png");
  gamegiantblockimage = loadImage("assets/images/shapes3d/gamegiantblock.png");

  // Ground blocks.
  gamegroundblock1image = loadImage(
    "assets/images/shapes3d/gamegroundblock1.png"
  );
  gamegroundblock2image = loadImage(
    "assets/images/shapes3d/gamegroundblock2.png"
  );
  gamegroundblock3image = loadImage(
    "assets/images/shapes3d/gamegroundblock3.png"
  );

  // Game elements.
  gamebuttonimage = loadImage("assets/images/elements/gamebutton.png");
  gamebuttonactivatedimage = loadImage(
    "assets/images/elements/gamebuttonactivated.png"
  );
  gametrampolineimage = loadImage("assets/images/elements/gametrampoline.png");
  gameboostplatformimage = loadImage("assets/images/elements/gamebelt.gif");
  gamerollerimage = loadImage("assets/images/elements/gameroller.gif");
  gamepipeimage = loadImage("assets/images/elements/gamepipe.png");
  gamecanonimage = loadImage("assets/images/elements/gamecanon.png");
  gamecanonballimage = loadImage("assets/images/elements/gamecanonball.png");
  gamedoorimage = loadImage("assets/images/elements/gamedoor.png");
  gamespawnimage = loadImage("assets/images/elements/gamespawn.png");

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
  // No cursor.
  noCursor();

  for (let i = 0; i < numavatars; i++) {
    // Avatar X and Y spawn.
    let x = 150;
    let y = -100;
    let xspawn = 150;
    let yspawn = -100;

    let avatar = new Avatar(x, y, xspawn, yspawn);
    avatars.push(avatar);
  }

  movingplatform = new Movingplatformhorizontal(
    550,
    350,
    100,
    55,
    0,
    1.75,
    550
  );
  movingplatform02 = new Movingplatformhorizontal02(
    1150,
    350,
    100,
    55,
    0,
    1.75,
    1150
  );

  // Level 03.

  roller = new Roller(1700, 380, 60, 120, 0, 6, -100, 1700);
  roller02 = new Roller02(1250, 380, 60, 120, 0, 6, -100, 1700);
  roller03 = new Roller02(800, 380, 60, 120, 0, 6, -100, 1700);
  roller04 = new Roller02(350, 380, 60, 120, 0, 6, -100, 1700);

  // Level 04.

  movingplatformvertical = new Movingplatformvertical(
    325,
    250,
    100,
    55,
    0,
    2,
    250
  );

  movingplatform03 = new Movingplatformhorizontal(
    650,
    250,
    100,
    55,
    0,
    1.75,
    650
  );

  movingplatformvertical02 = new Movingplatformvertical02(
    1175,
    500,
    100,
    55,
    0,
    2,
    500
  );

  // Ground blocks.
  // groundblock01 = new Groundblock01(1300, 500, 400, 125);
  // groundblock02 = new Groundblock02(1000, 500, 150, 125);

  // Shapes.
  // cube = new Cube(400, 579, 100, 125);
  // cubewide = new Cubewide(200, 604, 200, 75);
  // rectangle = new Rectangle(600, 531, 100, 220);
  // platform = new Platform(800, 250, 100, 55);
  // movingplatform = new Movingplatformhorizontal(1000, 450, 100, 55, 0, 2);
  // movingplatformvertical = new Movingplatformvertical(200, 250, 100, 55, 0, 2);

  // Elements.
  // button = new Button(50, 610, 75, 50, false);
  // trampoline = new Trampoline(100, 604, 150, 75);
  // boostplatform = new Boostplatform(100, 620, 400, 40);
  // roller = new Roller(1000, 600, 60, 120, 0, 4, 0, 1800);
  // pipe = new Pipe(1133, 850, 60, 360);
  // canon = new Canon(1100, 620, 140, 140);
  //  canonball = new Canonball(1060, 590, 50, 50, 0, 12, 0, 1060);
  // door = new Door(1300, 390, 150, 150);
  //  spawn = new Spawn(400, 300, 75, 25);
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
    overlays();
    level01();
    avatar();
    global();
  } else if (state === "level02") {
    game();
    overlays();
    level02();
    avatar();
    global();
  } else if (state === "level03") {
    game();
    overlays();
    level03();
    avatar();
    global();
  } else if (state === "level04") {
    game();
    overlays();
    level04();
    avatar();
    global();
  }
}

// Global function.
function global() {
  // Light Overlay.
  push();
  imageMode(CENTER);
  image(lightoverlayimage, width / 2, height / 2, 1600, 800);
  pop();

  if (state === "titlemenu") {
    if (counter >= 30) {
      // Press Enter.
      push();
      textAlign(CENTER, CENTER);
      textFont(blockfont);
      textSize(15);
      fill(255, 255, 255);
      text("PRESS SHIFT TO PLAY", width / 2, 750);
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
  } else if (state === "level01" || state === "level02") {
    // Level indicator.
    push();
    textAlign(CENTER, CENTER);
    textFont(blockfont);
    textSize(15);
    fill(255, 255, 255);
    text("LEVEL: " + level, 1550, 20);
    pop();
  }

  if (exit == true) {
    push();
    textAlign(CENTER, CENTER);
    textFont(blockfont);
    textSize(15);
    fill(255, 255, 255);
    text("PRESS SHIFT TO ENTER", width / 2, 750);
    pop();
  }

  if (reset == true) {
    push();
    textAlign(CENTER, CENTER);
    textFont(blockfont);
    textSize(15);
    fill(255, 255, 255);
    text("PRESS R TO RESET", width / 2, 750);
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
}

function level01() {
  level = 1;

  ground = new Ground(800, 625, 2000, 0);

  // Game Ground.
  push();
  imageMode(CENTER);
  image(gamegroundimage, width / 2, height / 2, 2600, 1300);
  pop();

  cube = new Cube(150, 579, 100, 125);
  cube.display();

  rectangle = new Rectangle(350, 531, 100, 220);
  rectangle.display();

  bigblock = new Bigblock(650, 531, 300, 220);
  bigblock.display();

  rectanglewide = new Rectanglewide(1000, 531, 150, 220);
  rectanglewide.display();

  bigblock02 = new Bigblock02(1350, 531, 300, 220);
  bigblock02.display();

  door = new Door(1350, 350, 150, 155);
  door.display();

  // spawn = new Spawn(200, 300, 75, 25);
  // spawn.display();
}

function level02() {
  level = 2;

  movingplatform.display();
  movingplatform.move();

  movingplatform02.display();
  movingplatform02.move();

  ground = new Ground(800, 625, 2000, 0);

  // Game Ground.
  push();
  imageMode(CENTER);
  image(gamegroundimage, width / 2, height / 2, 2600, 1300);
  pop();

  rectangle = new Rectangle(150, 531, 100, 220);
  rectangle.display();

  rectangle03 = new Rectangle03(350, 531, 100, 220);
  rectangle03.display();

  cube02 = new Cube02(350, 384, 100, 125);
  cube02.display();

  cubewide = new Cubewide(1400, 359, 200, 75);
  cubewide.display();

  door = new Door(1400, 250, 150, 155);
  door.display();
}

function level03() {
  level = 3;

  ground = new Ground(800, 625, 2000, 0);

  // Game Ground.
  push();
  imageMode(CENTER);
  image(gamegroundimage, width / 2, height / 2, 2600, 1300);
  pop();

  giantblock = new Giantblock(800, 480, 1750, 322);
  giantblock.display();

  door = new Door(1400, 267, 150, 155);
  door.display();

  roller.display();
  roller.move();

  roller02.display();
  roller02.move();

  roller03.display();
  roller03.move();

  roller04.display();
  roller04.move();
}

function level04() {
  level = 4;

  platform = new Platform(150, 500, 100, 55);
  platform.display();

  platform02 = new Platform(500, 250, 100, 55);
  platform02.display();

  platform03 = new Platform(1000, 500, 100, 55);
  platform03.display();

  platform04 = new Platform(150, 500, 100, 55);
  platform04.display();

  movingplatformvertical.display();
  movingplatformvertical.move();

  movingplatformvertical02.display();
  movingplatformvertical02.move();

  movingplatform03.display();
  movingplatform03.move();

  groundblock03 = new Groundblock03(1400, 275, 150, 80);
  groundblock03.display();

  door = new Door(1400, 165, 150, 155);
  door.display();
}

function overlays() {
  // Game Distance Shadow.
  push();
  imageMode(CENTER);
  image(gamedistanceshadowimage, width / 2, height / 2, 1800, 650);
  pop();

  // Game Ground.
  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(gameforegroundlightimage, width / 2, height / 2, 2600, 1300);
  pop();
}

// Avatar function.
function avatar() {
  for (let i = 0; i < avatars.length; i++) {
    let avatar = avatars[i];

    if (avatar.active) {
      avatar.gravity(gravityForce);
      avatar.move();
      avatar.collide(ground);
      avatar.display();
      avatar.keyReleased();
      avatar.keyPressed();
    }
  }
}

// function groundblocks() {
//   groundblock01.display();
//   groundblock02.display();
// }

// function shapes() {
//   cube.display();
//   cubewide.display();
//   rectangle.display();
//   platform.display();
//   movingplatform.display();
//   movingplatform.move();
//   movingplatformvertical.display();
//   movingplatformvertical.move();
// }

// function elements() {
//   button.display(Avatar);
//   trampoline.display();
//   boostplatform.display();
//   roller.display();
//   roller.move();
//   pipe.display();
//   canonball.display();
//   canonball.move();
//   canon.display();
//   door.display();
//   spawn.display();
// }

// Keypress function.
function keyPressed() {
  // Switch from titlemenu to game.
  if (state === "titlemenu") {
    if (keyCode == 16) {
      state = "level04";
    }
  }
}
