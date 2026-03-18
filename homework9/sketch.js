let gameState = "start";

let player, playerImg;
let food, foodType, foodImg, badFoodImg;
let obstacles = [];

let score = 0;
let health = 3;

let startTime = 0;
let timeLeft = 60;

// ==================================
// PRELOAD
// ==================================
function preload() {
  playerImg = loadImage('idle1.png');
  foodImg = loadImage('food.png');
  badFoodImg = loadImage('badfood.png');
}

// ==================================
// SETUP
// ==================================
function setup() {
  createCanvas(800, 600);

  // Player
  player = createSprite(width / 2, height / 2, 64, 64);
  player.addImage(playerImg);

  // Food
  food = createSprite(200, 200, 50, 50);

  // Obstacles
  for (let i = 0; i < 3; i++) {
    let obs = createSprite(random(100, 700), random(100, 500), 80, 80);
    obs.shapeColor = color(120);
    obs.immovable = true;
    obstacles.push(obs);
  }

  resetFood();
}

// ==================================
// DRAW LOOP
// ==================================
function draw() {
  background(30, 40, 60);

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "play") {
    runGame();
  } else if (gameState === "gameover") {
    drawGameOver();
  }
}

// ==================================
// START SCREEN
// ==================================
function drawStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(42);
  text("CAT FOOD DASH", width / 2, height / 2 - 40);

  textSize(24);
  text("Press ENTER to Start", width / 2, height / 2 + 20);
  text("Use Arrow Keys or WASD", width / 2, height / 2 + 60);
}

// ==================================
// GAME LOOP
// ==================================
function runGame() {
  updateTimer();
  movePlayer();

  // Collisions with obstacles
  for (let obs of obstacles) {
    player.collide(obs);
  }

  // Food collision
  if (player.overlap(food)) {
    if (foodType === "good") {
      score++;
    } else {
      health--;
    }
    resetFood();
  }

  drawSprites();

  // UI
  fill(255);
  textSize(20);

  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
  text("Health: " + health, 20, 50);

  textAlign(RIGHT, TOP);
  text("Time: " + timeLeft, width - 20, 20);

  // End game conditions
  if (score >= 10 || health <= 0 || timeLeft <= 0) {
    gameState = "gameover";
  }
}

// ==================================
// PLAYER MOVEMENT
// ==================================
function movePlayer() {
  let speed = 5;

  player.velocity.x = 0;
  player.velocity.y = 0;

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.velocity.x = -speed;
    player.mirrorX(-1);
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.velocity.x = speed;
    player.mirrorX(1);
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player.velocity.y = -speed;
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    player.velocity.y = speed;
  }
}

// ==================================
// FOOD RESET
// ==================================
function resetFood() {
  let valid = false;
  let tries = 0;

  while (!valid && tries < 50) {
    food.x = random(50, width - 50);
    food.y = random(50, height - 50);

    valid = true;
    for (let obs of obstacles) {
      if (food.overlap(obs)) {
        valid = false;
        break;
      }
    }
    tries++;
  }

  if (random(1) < 0.7) {
    foodType = "good";
    food.addImage(foodImg);
  } else {
    foodType = "bad";
    food.addImage(badFoodImg);
  }
}

// ==================================
// TIMER
// ==================================
function updateTimer() {
  timeLeft = 60 - floor((millis() - startTime) / 1000);
  if (timeLeft < 0) timeLeft = 0;
}

// ==================================
// GAME OVER
// ==================================
function drawGameOver() {
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(40);
  if (score >= 10) {
    text("YOU WIN!", width / 2, height / 2 - 20);
  } else {
    text("GAME OVER", width / 2, height / 2 - 20);
  }

  textSize(25);
  text("Score: " + score, width / 2, height / 2 + 20);

  textSize(18);
  text("Press R to Restart", width / 2, height / 2 + 60);
}

// ==================================
// INPUT
// ==================================
function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    startGame();
  }

  if (gameState === "gameover" && (key === "r" || key === "R")) {
    startGame();
  }
}

// ==================================
// START GAME
// ==================================
function startGame() {
  score = 0;
  health = 3;

  startTime = millis();

  player.x = width / 2;
  player.y = height / 2;

  resetFood();

  gameState = "play";
}