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

// Game backround image.
let gamebackgroundimage;

// Game distance shadow image.
let gamedistanceshadowimage;

// Game green blend image.
let gamegreenblendimage;

// Game foreground image.
let gameforegroundlightimage;

// Game ground image.
let gamegroundimage;

// Game Shapes visuals;
let gamecubeimage;
let gamecube02image;
let gamecube03image;
let gamecube04image;

let gamecubewideimage;

let gamerectangleimage;
let gamerectangle02image;
let gamerectangle03image;
let gamerectangle04image;

let gamerectangletallimage;

let gamerectanglewideimage;

// Game platform images.
let gameplatformyellowimage;
let gameplatformblueimage;
let gameplatformgreenimage;
let gameplatformredimage;

// Disappearing Game platform images.
let gamedisppearingplatformblueimage;
let gamedisappearingplatformredimage;

let gamemovingplatformimage;

let gametrianglewideimage;
let gamebigblockimage;
let gamebigblock02image;
let gamegiantblockimage;
let gamegiantcubeblockimage;
let gamegiantrectangleblockimage;

// Ground blocks visuals.
let gamegroundblock1image;
let gamegroundblock2image;
let gamegroundblock3image;
let gamegroundblock04image;

// Game Elements.
let gamebuttonimage;
let gamebuttonactivatedimage;

let gametrampolineimage;

let gameboostplatformimage;
let gameboostplatformleftimage;

let gamerollerimage;

let gamecanonimage;
let gamecanonrightimage;

let gamecanonballimage;

let gamepipeimage;

let gamedoorimage;
let gamedoorlockedimage;

let gamekeyimage;

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

// Door lock.
let doorlock = false;

// Key number.
let keynumber = 0;

// Timer.
let timer = 0;

// Time left variable.
let timeleft = 5;

// Disppearing platform counter.
let disappearingplatformcounter = 0;

// Disappering platform.
let disappearingplatformblue01timer = undefined;
let disappearingplatformyellow01timer = undefined;
let disappearingplatformgreen01timer = undefined;
let disappearingplatformred01timer = undefined;
let disappearingplatformblue02timer = undefined;
let disappearingplatformyellow02timer = undefined;
let disappearingplatformgreen02timer = undefined;
let disappearingplatformred02timer = undefined;

// Reset notice.
let reset = false;

// Button activation.
let buttonactivated = false;

// Level variable.
var level = 0;

// Ground variable.
let ground;

// Shapes variables.
let cube;
let cube02;
let cube03;
let cube04;
let cube05;
let cube06;
let cube07;
let cube08;
let cube09;

let cubewide;
let cubewide02;

let rectangle;
let rectangle02;
let rectangle03;
let rectangle04;

let rectangletall;
let rectangletall02;

let rectanglewide;
let rectanglewide02;

let platform;
let platform02;
let platform03;
let platform04;

let disappearingplatformblue01;
let disappearingplatformyellow01;
let disappearingplatformgreen01;
let disappearingplatformred01;
let disappearingplatformblue02;
let disappearingplatformyellow02;
let disappearingplatformgreen02;
let disappearingplatformred02;

let movingplatform;
let movingplatform02;
let movingplatform03;

let movingplatformvertical;
let movingplatformvertical02;
let movingplatformvertical03;
let movingplatformvertical04;

let trianglewide;

let bigblock;
let bigblock02;

let giantblock;
let giantblock02;

let giantcubeblock;
let giantcubeblock02;

let giantrectangleblock;
let giantrectangleblock02;
let giantrectangleblock03;
let giantrectangleblock04;
let giantrectangleblock05;
let giantrectangleblock06;
let giantrectangleblock07;
let giantrectangleblock08;

// Ground blocks.
let groundblock01;
let groundblock02;
let groundblock03;
let groundblock04;
let groundblock05;

// Game Elements.
let button;

let trampoline;
let trampoline02;
let trampoline03;
let trampoline04;

let boostplatform;
let boostplatform02;

let roller;
let roller02;
let roller03;
let roller04;

let pipe;

let canon;
let canonright;

let canonball;
let canonball02;
let canonball03;
let canonball04;

let door;

let key;

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
  gamegreenblendimage = loadImage("assets/images/game/gamegreenblend.png");
  gameforegroundlightimage = loadImage(
    "assets/images/game/gameforegroundlight.png"
  );
  gamegroundimage = loadImage("assets/images/game/gameground.png");

  // Game Shapes.
  gamecubeimage = loadImage("assets/images/shapes3d/gamecube.png");
  gamecube02image = loadImage("assets/images/shapes3d/gamecube02.png");
  gamecube03image = loadImage("assets/images/shapes3d/gamecube03.png");
  gamecube04image = loadImage("assets/images/shapes3d/gamecube04.png");

  gamecubewideimage = loadImage("assets/images/shapes3d/gamecubewide.png");

  gamerectangleimage = loadImage("assets/images/shapes3d/gamerectangle.png");
  gamerectangle02image = loadImage(
    "assets/images/shapes3d/gamerectangle02.png"
  );
  gamerectangle03image = loadImage(
    "assets/images/shapes3d/gamerectangle03.png"
  );
  gamerectangle04image = loadImage(
    "assets/images/shapes3d/gamerectangle04.png"
  );

  gamerectangletallimage = loadImage(
    "assets/images/shapes3d/gamerectangletall.png"
  );

  gamerectanglewideimage = loadImage(
    "assets/images/shapes3d/gamerectanglewide.png"
  );
  gameplatformyellowimage = loadImage(
    "assets/images/shapes3d/gameplatformyellow.png"
  );
  gameplatformblueimage = loadImage(
    "assets/images/shapes3d/gameplatformblue.png"
  );
  gameplatformgreenimage = loadImage(
    "assets/images/shapes3d/gameplatformgreen.png"
  );
  gameplatformredimage = loadImage(
    "assets/images/shapes3d/gameplatformred.png"
  );
  gametrianglewideimage = loadImage(
    "assets/images/shapes3d/gametrianglewide.png"
  );
  gamebigblockimage = loadImage("assets/images/shapes3d/gamebigblock.png");
  gamebigblock02image = loadImage("assets/images/shapes3d/gamebigblock02.png");

  gamegiantblockimage = loadImage("assets/images/shapes3d/gamegiantblock.png");

  gamegiantcubeblockimage = loadImage(
    "assets/images/shapes3d/gamegiantcubeblock.png"
  );

  gamegiantrectangleblockimage = loadImage(
    "assets/images/shapes3d/gamegiantrectangleblock.png"
  );

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
  gameboostplatformleftimage = loadImage(
    "assets/images/elements/gamebeltleft.gif"
  );

  gamerollerimage = loadImage("assets/images/elements/gameroller.gif");

  gamepipeimage = loadImage("assets/images/elements/gamepipe.png");

  gamecanonimage = loadImage("assets/images/elements/gamecanon.png");
  gamecanonrightimage = loadImage("assets/images/elements/gamecanonright.png");

  gamecanonballimage = loadImage("assets/images/elements/gamecanonball.png");

  gamedoorimage = loadImage("assets/images/elements/gamedoor.png");
  gamedoorlockedimage = loadImage("assets/images/elements/gamedoorlocked.png");

  gamekeyimage = loadImage("assets/images/elements/gamekey.png");

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
    let y = 500;
    let xspawn = 150;
    let yspawn = 500;

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

  // Level 04.

  roller = new Roller(1700, 380, 60, 120, 0, 6, -100, 1700);
  roller02 = new Roller02(1250, 380, 60, 120, 0, 6, -100, 1700);
  roller03 = new Roller02(800, 380, 60, 120, 0, 6, -100, 1700);
  roller04 = new Roller02(350, 380, 60, 120, 0, 6, -100, 1700);

  // Level 05.

  movingplatformvertical = new Movingplatformvertical(
    325,
    250,
    100,
    55,
    0,
    2,
    250
  );

  movingplatform03 = new Movingplatformhorizontal03(
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

  // Level 07.

  movingplatformvertical03 = new Movingplatformvertical02(
    1400,
    450,
    100,
    55,
    0,
    2,
    450
  );

  // Level 08.
  button = new Button(150, 266, 75, 50, false);

  // Level 09.
  movingplatformvertical04 = new Movingplatformvertical02(
    1150,
    560,
    100,
    55,
    0,
    2,
    560
  );

  canonball = new Canonball(1400, 480, 50, 50, 0, 10, -100, 1400);
  canonball02 = new CanonballRight(200, 280, 50, 50, 0, 10, 1700, 200);

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
  } else if (state === "level05") {
    game();
    overlays();
    level05();
    avatar();
    global();
  } else if (state === "level06") {
    game();
    overlays();
    level06();
    avatar();
    global();
  } else if (state === "level07") {
    game();
    overlays();
    level07();
    avatar();
    global();
  } else if (state === "level08") {
    game();
    overlays();
    level08();
    avatar();
    global();
  } else if (state === "level09") {
    game();
    overlays();
    level09();
    avatar();
    global();
  } else if (state === "level10") {
    game();
    overlays();
    level10();
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
  } else if (
    state === "level01" ||
    state === "level02" ||
    state === "level03" ||
    state === "level04" ||
    state === "level05" ||
    state === "level06" ||
    state === "level07" ||
    state === "level08" ||
    state === "level09" ||
    state === "level09" ||
    state === "level10"
  ) {
    // Level indicator.
    push();
    textAlign(CENTER, CENTER);
    textFont(blockfont);
    textSize(15);
    fill(255, 255, 255);
    text("LEVEL: " + level, 1550, 20);
    pop();
  }

  // Time.
  if (buttonactivated == true) {
    push();
    textAlign(CENTER, CENTER);
    textFont(blockfont);
    textSize(15);
    fill(255, 255, 255);
    text("Time: " + timeleft, width / 2, 20);
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

  // Game Distance Shadow.
  push();
  imageMode(CENTER);
  image(gamedistanceshadowimage, width / 2, height / 2, 1800, 650);
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

  ground = new Ground(800, 625, 2000, 0);

  // Game Ground.
  push();
  imageMode(CENTER);
  image(gamegroundimage, width / 2, height / 2, 2600, 1300);
  pop();

  // Game Distance Shadow.
  push();
  imageMode(CENTER);
  image(gamedistanceshadowimage, width / 2, height / 2, 1800, 650);
  pop();

  rectanglewide = new Rectanglewide(150, 531, 150, 220);
  rectanglewide.display();

  rectangle02 = new Rectangle02(950, 531, 100, 220);
  rectangle02.display();

  rectangle04 = new Rectangle04(550, 531, 100, 220);
  rectangle04.display();

  rectangletall = new RectangleTall(350, 477, 100, 330);
  rectangletall.display();

  rectangletall02 = new RectangleTall(1150, 477, 100, 330);
  rectangletall02.display();

  cube03 = new Cube03(750, 579, 100, 125);
  cube03.display();

  cubewide = new Cubewide(1400, 349, 200, 75);
  cubewide.display();

  door = new Door(1400, 240, 150, 155);
  door.display();
}

function level03() {
  level = 3;

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

  // Game Distance Shadow.
  push();
  imageMode(CENTER);
  image(gamedistanceshadowimage, width / 2, height / 2, 1800, 650);
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

function level04() {
  level = 4;

  ground = new Ground(800, 625, 2000, 0);

  // Game Ground.
  push();
  imageMode(CENTER);
  image(gamegroundimage, width / 2, height / 2, 2600, 1300);
  pop();

  // Game Distance Shadow.
  push();
  imageMode(CENTER);
  image(gamedistanceshadowimage, width / 2, height / 2, 1800, 650);
  pop();

  giantblock02 = new Giantblock(800, 441, 1750, 322);
  giantblock02.display();

  giantblock = new Giantblock(800, 480, 1750, 322);
  giantblock.display();

  // Game Green Blend.
  push();
  imageMode(CENTER);
  image(gamegreenblendimage, width / 2, height / 2, 1800, 650);
  pop();

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

  platform = new PlatformGreen(150, 200, 100, 55);
  platform.display();
}

function level05() {
  level = 5;

  ground = new Ground(800, 1000, 2000, 0);

  platform = new PlatformRed(150, 500, 100, 55);
  platform.display();

  platform02 = new PlatformBlue(500, 250, 100, 55);
  platform02.display();

  platform03 = new PlatformGreen(1000, 500, 100, 55);
  platform03.display();

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

function level06() {
  level = 6;

  ground = new Ground(800, 1000, 2000, 0);

  cube = new Cube(150, 579, 100, 125);
  cube.display();

  cubewide = new Cubewide(400, 554, 200, 75);
  cubewide.display();

  cubewide02 = new Cubewide(1400, 229, 200, 75);
  cubewide02.display();

  trampoline = new Trampoline(650, 554, 150, 75);
  trampoline.display();

  trampoline02 = new Trampoline(400, 354, 150, 75);
  trampoline02.display();

  trampoline03 = new Trampoline(900, 554, 150, 75);
  trampoline03.display();

  trampoline04 = new Trampoline(1150, 354, 150, 75);
  trampoline04.display();

  platform = new PlatformRed(150, 250, 100, 55);
  platform.display();

  key = new Key(150, 185, 20, 40);
  key.display();

  door = new Door(1400, 127, 150, 155);
  door.display();
}

function level07() {
  level = 7;

  ground = new Ground(800, 625, 2000, 0);

  // Game Ground.
  push();
  imageMode(CENTER);
  image(gamegroundimage, width / 2, height / 2, 2600, 1300);
  pop();

  // Game Distance Shadow.
  push();
  imageMode(CENTER);
  image(gamedistanceshadowimage, width / 2, height / 2, 1800, 650);
  pop();

  key = new Key(1025, 300, 20, 40);
  key.display();

  boostplatform = new Boostplatform(700, 442, 400, 40);
  boostplatform.display();

  boostplatform02 = new Boostplatform02(850, 212, 400, 40);
  boostplatform02.display();

  rectangle = new Rectangle03(150, 531, 100, 220);
  rectangle.display();

  rectangle02 = new Rectangle03(1200, 531, 100, 220);
  rectangle02.display();

  movingplatformvertical03.display();
  movingplatformvertical03.move();

  platform = new PlatformBlue(1200, 220, 100, 55);
  platform.display();

  platform02 = new PlatformYellow(350, 445, 100, 55);
  platform02.display();

  groundblock03 = new Groundblock03(300, 218, 150, 80);
  groundblock03.display();

  door = new Door(300, 127, 150, 155);
  door.display();
}

function level08() {
  level = 8;

  ground = new Ground(800, 625, 2000, 0);

  // Game Ground.
  push();
  imageMode(CENTER);
  image(gamegroundimage, width / 2, height / 2, 2600, 1300);
  pop();

  // Game Distance Shadow.
  push();
  imageMode(CENTER);
  image(gamedistanceshadowimage, width / 2, height / 2, 1800, 650);
  pop();

  giantrectangleblock = new Giantrectangleblock(400, 480, 150, 322);
  if (buttonactivated == true) {
    giantrectangleblock.display();
  }

  giantrectangleblock02 = new Giantrectangleblock(650, 480, 150, 322);
  if (buttonactivated == true) {
    giantrectangleblock02.display();
  }

  giantrectangleblock03 = new Giantrectangleblock(900, 480, 150, 322);
  if (buttonactivated == true) {
    giantrectangleblock03.display();
  }

  giantrectangleblock04 = new Giantrectangleblock(1150, 480, 150, 322);
  if (buttonactivated == true) {
    giantrectangleblock04.display();
  }

  giantrectangleblock05 = new Giantrectangleblock(1400, 480, 150, 322);
  giantrectangleblock05.display();

  giantrectangleblock06 = new Giantrectangleblock(1400, 380, 150, 322);
  giantrectangleblock06.display();

  giantrectangleblock07 = new Giantrectangleblock(150, 480, 150, 322);
  giantrectangleblock07.display();

  giantrectangleblock08 = new Giantrectangleblock(150, 380, 150, 322);
  giantrectangleblock08.display();

  button.display();

  door = new Door(1400, 182, 150, 155);
  door.display();
}

function level09() {
  level = 9;

  ground = new Ground(800, 625, 2000, 0);

  // Game Ground.
  push();
  imageMode(CENTER);
  image(gamegroundimage, width / 2, height / 2, 2600, 1300);
  pop();

  // Game Distance Shadow.
  push();
  imageMode(CENTER);
  image(gamedistanceshadowimage, width / 2, height / 2, 1800, 650);
  pop();

  cube = new Cube(150, 579, 100, 125);
  cube.display();

  cube02 = new Cube03(350, 579, 100, 125);
  cube02.display();

  cube03 = new Cube04(550, 579, 100, 125);
  cube03.display();

  cube04 = new Cube02(750, 579, 100, 125);
  cube04.display();

  cube05 = new Cube(950, 579, 100, 125);
  cube05.display();

  cube06 = new Cube03(950, 379, 100, 125);
  cube06.display();

  cube07 = new Cube(750, 379, 100, 125);
  cube07.display();

  cube08 = new Cube03(550, 379, 100, 125);
  cube08.display();

  cube09 = new Cube03(350, 379, 100, 125);
  cube09.display();

  movingplatformvertical04.display();
  movingplatformvertical04.move();

  groundblock04 = new Groundblock03(1375, 328, 150, 80);
  groundblock04.display();

  groundblock05 = new Groundblock03(1525, 328, 150, 80);
  groundblock05.display();

  door = new Door(1450, 225, 150, 155);
  door.display();

  key = new Key(150, 175, 20, 40);
  key.display();

  canonball.display();
  canonball.move();

  canonball02.display();
  canonball02.move();

  canon = new Canon(1525, 480, 450, 90);
  canon.display();

  canonright = new CanonRight(0, 280, 450, 90);
  canonright.display();
}

function level10() {
  level = 10;

  ground = new Ground(800, 1000, 2000, 0);

  cube = new Cube03(150, 479, 100, 125);
  cube.display();

  if (disappearingplatformcounter >= 0 && disappearingplatformcounter < 60) {
    disappearingplatformblue01 = new PlatformBlue(300, 442, 100, 55);
    disappearingplatformblue01.display();
    disappearingplatformblue01timer = true;
    disappearingplatformyellow01timer = false;
    disappearingplatformgreen01timer = false;
    disappearingplatformred01timer = false;
    disappearingplatformblue02timer = false;
    disappearingplatformyellow02timer = false;
    disappearingplatformgreen02timer = false;
    disappearingplatformred02timer = false;
  }
  if (disappearingplatformcounter >= 60 && disappearingplatformcounter < 120) {
    disappearingplatformyellow01 = new PlatformYellow(450, 442, 100, 55);
    disappearingplatformyellow01.display();
    disappearingplatformblue01timer = false;
    disappearingplatformyellow01timer = true;
    disappearingplatformgreen01timer = false;
    disappearingplatformred01timer = false;
    disappearingplatformblue02timer = false;
    disappearingplatformyellow02timer = false;
    disappearingplatformgreen02timer = false;
    disappearingplatformred02timer = false;
  }
  if (disappearingplatformcounter >= 120 && disappearingplatformcounter < 180) {
    disappearingplatformgreen01 = new PlatformGreen(600, 442, 100, 55);
    disappearingplatformgreen01.display();
    disappearingplatformblue01timer = false;
    disappearingplatformyellow01timer = false;
    disappearingplatformgreen01timer = true;
    disappearingplatformred01timer = false;
    disappearingplatformblue02timer = false;
    disappearingplatformyellow02timer = false;
    disappearingplatformgreen02timer = false;
    disappearingplatformred02timer = false;
  }
  if (disappearingplatformcounter >= 180 && disappearingplatformcounter < 240) {
    disappearingplatformred01 = new PlatformRed(750, 442, 100, 55);
    disappearingplatformred01.display();
    disappearingplatformblue01timer = false;
    disappearingplatformyellow01timer = false;
    disappearingplatformgreen01timer = false;
    disappearingplatformred01timer = true;
    disappearingplatformblue02timer = false;
    disappearingplatformyellow02timer = false;
    disappearingplatformgreen02timer = false;
    disappearingplatformred02timer = false;
  }
  if (disappearingplatformcounter >= 240 && disappearingplatformcounter < 300) {
    disappearingplatformblue02 = new PlatformBlue(900, 442, 100, 55);
    disappearingplatformblue02.display();
    disappearingplatformblue01timer = false;
    disappearingplatformyellow01timer = false;
    disappearingplatformgreen01timer = false;
    disappearingplatformred01timer = false;
    disappearingplatformblue02timer = true;
    disappearingplatformyellow02timer = false;
    disappearingplatformgreen02timer = false;
    disappearingplatformred02timer = false;
  }
  if (disappearingplatformcounter >= 300 && disappearingplatformcounter < 360) {
    disappearingplatformyellow02 = new PlatformYellow(1050, 442, 100, 55);
    disappearingplatformyellow02.display();
    disappearingplatformblue01timer = false;
    disappearingplatformyellow01timer = false;
    disappearingplatformgreen01timer = false;
    disappearingplatformred01timer = false;
    disappearingplatformblue02timer = false;
    disappearingplatformyellow02timer = true;
    disappearingplatformgreen02timer = false;
    disappearingplatformred02timer = false;
  }
  if (disappearingplatformcounter >= 360) {
    disappearingplatformgreen02 = new PlatformGreen(1200, 442, 100, 55);
    disappearingplatformgreen02.display();
    disappearingplatformblue01timer = false;
    disappearingplatformyellow01timer = false;
    disappearingplatformgreen01timer = false;
    disappearingplatformred01timer = false;
    disappearingplatformblue02timer = false;
    disappearingplatformyellow02timer = false;
    disappearingplatformgreen02timer = true;
    disappearingplatformred02timer = false;
  }
  if (disappearingplatformcounter == 419) {
    disappearingplatformcounter = 0;
  }
  disappearingplatformcounter++;

  groundblock03 = new Groundblock03(1400, 428, 150, 80);
  groundblock03.display();

  door = new Door(1400, 325, 150, 155);
  door.display();
}

function overlays() {
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

// Keypress function.
function keyPressed() {
  // Switch from titlemenu to game.
  if (state === "titlemenu") {
    if (keyCode == 16) {
      state = "level01";
    }
  }
}
