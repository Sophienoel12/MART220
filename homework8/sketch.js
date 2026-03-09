// Game state
let gameState = "start";

// Player
let playerX = 400;
let playerY = 300;
let playerSpeed = 5;

// Images
let playerImg;
let goodFoodImg;
let badFoodImg;

// Food
let foodX;
let foodY;
let foodType;
let foodSize = 50;

// Score and health
let score = 0;
let health = 3;

// Timer
let timeLeft = 60;
let startTime = 0;

// Sounds
let bgm;
let eatGoodSound;
let eatBadSound;
let bgmStarted = false;

// PRELOAD
function preload() {
  playerImg = loadImage("idle1.png");
  goodFoodImg = loadImage("food.png");
  badFoodImg = loadImage("badfood.png");

  soundFormats("mp3");

  bgm = loadSound("bgm.mp3");
  eatGoodSound = loadSound("eatgood.mp3");
  eatBadSound = loadSound("eatbad.mp3");
}

// SETUP
function setup() {
  createCanvas(800, 600);
  resetFood();
}

// DRAW LOOP
function draw() {
  background(30, 40, 60);

  if (gameState === "start") {
    drawStartScreen();
  }

  else if (gameState === "play") {
    runGame();
  }

  else if (gameState === "gameover") {
    drawGameOver();
  }
}

// START SCREEN
function drawStartScreen() {
  fill(255);
  textAlign(CENTER);

  textSize(40);
  text("CAT FOOD DASH", width / 2, height / 2 - 40);

  textSize(20);
  text("Press ENTER to Start", width / 2, height / 2 + 20);
  text("Use Arrow Keys to Move", width / 2, height / 2 + 50);
  text("Eat good food, avoid bad food!", width / 2, height / 2 + 80);
}

// MAIN GAME
function runGame() {

  updateTimer();
  movePlayer();
  checkCollision();

  // Draw food
  if (foodType === "good") {
    image(goodFoodImg, foodX, foodY, foodSize, foodSize);
  } else {
    image(badFoodImg, foodX, foodY, foodSize, foodSize);
  }

  // Draw player
  image(playerImg, playerX, playerY, 64, 64);

  // UI
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("Score: " + score, 20, 30);
  text("Health: " + health, 20, 60);

  textAlign(RIGHT);
  text("Time: " + timeLeft, width - 20, 30);

  // Game over condition
  if (health <= 0) {
    gameState = "gameover";
    bgm.stop();
    bgmStarted = false;
  }
}

// PLAYER MOVEMENT
function movePlayer() {

  if (keyIsDown(LEFT_ARROW)) {
    playerX -= playerSpeed;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    playerX += playerSpeed;
  }

  if (keyIsDown(UP_ARROW)) {
    playerY -= playerSpeed;
  }

  if (keyIsDown(DOWN_ARROW)) {
    playerY += playerSpeed;
  }

  playerX = constrain(playerX, 0, width - 64);
  playerY = constrain(playerY, 0, height - 64);
}

// FOOD RESET
function resetFood() {

  foodX = random(width - foodSize);
  foodY = random(height - foodSize);

  // 70% good, 30% bad
  if (random(1) < 0.7) {
    foodType = "good";
  } else {
    foodType = "bad";
  }
}

// COLLISION
function checkCollision() {

  let d = dist(playerX + 32, playerY + 32, foodX + 25, foodY + 25);

  if (d < 40) {

    if (foodType === "good") {
      score++;
      eatGoodSound.play();
    }

    else {
      health--;
      eatBadSound.play();
    }

    resetFood();
  }
}

// TIMER
function updateTimer() {

  timeLeft = 60 - floor((millis() - startTime) / 1000);

  if (timeLeft <= 0) {
    timeLeft = 0;
    gameState = "gameover";
    bgm.stop();
    bgmStarted = false;
  }
}

// GAME OVER SCREEN
function drawGameOver() {

  fill(255);
  textAlign(CENTER);

  textSize(40);
  text("GAME OVER", width / 2, height / 2 - 20);

  textSize(25);
  text("Final Score: " + score, width / 2, height / 2 + 20);

  textSize(18);
  text("Press R to Restart", width / 2, height / 2 + 60);
}

// KEY PRESSED
function keyPressed() {

  if (gameState === "start" && keyCode === ENTER) {

    startGame();

    if (!bgmStarted) {
      bgm.loop();
      bgm.setVolume(0.5);
      bgmStarted = true;
    }
  }

  if (gameState === "gameover" && (key === "r" || key === "R")) {

    startGame();

    if (!bgmStarted) {
      bgm.loop();
      bgm.setVolume(0.5);
      bgmStarted = true;
    }
  }
}

// MOUSE CLICK TO START MUSIC
function mousePressed() {

  if (!bgmStarted && (gameState === "play" || gameState === "start")) {
    bgm.loop();
    bgm.setVolume(0.5);
    bgmStarted = true;
  }
}

// START GAME
function startGame() {

  score = 0;
  health = 3;
  startTime = millis();

  playerX = width / 2;
  playerY = height / 2;

  resetFood();

  gameState = "play";
}