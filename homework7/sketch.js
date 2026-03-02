let gameState = "start";

let playerX = 400;
let playerY = 300;
let playerSpeed = 5;

let idleImg;
let walkImg;
let foodImg;

let foodX;
let foodY;
let foodSize = 50;

let score = 0;
let timeLeft = 60;
let startTime = 0;

// ==================
// PRELOAD (required for images)
// ==================
function preload() {
  idleImg = loadImage("idle1.png");
  walkImg = loadImage("walk1.png");
  foodImg = loadImage("food.png");
}

// ==================
function setup() {
  createCanvas(800, 600);
  resetFood();
}

// ==================
function draw() {
  background(30, 40, 60);

  if (gameState === "start") {
    drawStart();
  } 
  else if (gameState === "play") {
    runGame();
  } 
  else if (gameState === "gameover") {
    drawGameOver();
  }
}

// ==================
function drawStart() {
  fill(255);
  textAlign(CENTER);
  textSize(40);
  text("CAT FOOD DASH", width/2, height/2 - 40);
  textSize(20);
  text("Press ENTER to Start", width/2, height/2 + 20);
}

// ==================
function runGame() {

  // SAFETY CHECK
  if (!idleImg || !foodImg) {
    fill(255);
    textSize(20);
    text("Images not loaded correctly", 200, 300);
    return;
  }

  updateTimer();
  movePlayer();
  checkCollision();

  image(foodImg, foodX, foodY, foodSize, foodSize);
  image(idleImg, playerX, playerY, 64, 64);

  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("Score: " + score, 20, 30);

  textAlign(RIGHT);
  text("Time: " + timeLeft, width - 20, 30);
}

// ==================
function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) playerX -= playerSpeed;
  if (keyIsDown(RIGHT_ARROW)) playerX += playerSpeed;
  if (keyIsDown(UP_ARROW)) playerY -= playerSpeed;
  if (keyIsDown(DOWN_ARROW)) playerY += playerSpeed;

  playerX = constrain(playerX, 0, width - 64);
  playerY = constrain(playerY, 0, height - 64);
}

// ==================
function resetFood() {
  foodX = random(width - foodSize);
  foodY = random(height - foodSize);
}

// ==================
function checkCollision() {
  let d = dist(playerX + 32, playerY + 32, foodX + 25, foodY + 25);

  if (d < 40) {
    score++;
    resetFood();
  }
}

// ==================
function updateTimer() {
  timeLeft = 60 - floor((millis() - startTime) / 1000);

  if (timeLeft <= 0) {
    timeLeft = 0;
    gameState = "gameover";
  }
}

// ==================
function drawGameOver() {
  fill(255);
  textAlign(CENTER);
  textSize(40);
  text("GAME OVER", width/2, height/2 - 20);
  textSize(25);
  text("Final Score: " + score, width/2, height/2 + 20);
  textSize(18);
  text("Press R to Restart", width/2, height/2 + 60);
}

// ==================
function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    startGame();
  }

  if (gameState === "gameover" && key === 'r') {
    startGame();
  }
}

// ==================
function startGame() {
  score = 0;
  startTime = millis();
  gameState = "play";
  resetFood();
}