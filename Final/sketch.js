// --------------------
// GAME STATE
// --------------------
let gameState = "start";

// --------------------
// PLAYER
// --------------------
let playerX = 400;
let playerY = 300;
let playerSize = 70;
let playerSpeed = 5;
let health = 100;

// --------------------
// SCORE + TIMER
// --------------------
let score = 0;
let goalScore = 150;
let timeLeft = 60;

// --------------------
// IMAGES
// --------------------
let playerImg;
let foodImg;
let enemyImg;
let bonusImg;

// --------------------
// SOUNDS
// --------------------
let collectSound;
let attackSound;
let winSound;
let loseSound;
let bonusSound;

// sound control
let attackCooldown = 0;
let gameEnded = false;

// --------------------
// ARRAYS
// --------------------
let foods = [];
let enemies = [];
let particles = [];
let stars = [];

let bonusFood;

// --------------------
// PRELOAD
// --------------------
function preload() {
  playerImg = loadImage("idle1.png");
  foodImg = loadImage("food.png");
  enemyImg = loadImage("enemy.png");
  bonusImg = loadImage("goldfish.png");

  collectSound = loadSound("collect.wav");
  attackSound = loadSound("attack.flac");
  winSound = loadSound("win.wav");
  loseSound = loadSound("lose.flac");
  bonusSound = loadSound("meow.mp3");
}

// --------------------
// SETUP
// --------------------
function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < 5; i++) {
    foods.push({
      x: random(width),
      y: random(height),
      size: 40
    });
  }

  for (let i = 0; i < 4; i++) {
    enemies.push({
      x: random(width),
      y: random(height),
      size: 60,
      health: 40,
      speed: random(1, 2)
    });
  }

  for (let i = 0; i < 75; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 4)
    });
  }

  bonusFood = {
    x: random(width),
    y: random(height),
    size: 50,
    active: false
  };
}

// --------------------
// DRAW LOOP
// --------------------
function draw() {
  background(20, 30, 60);

  drawStars();

  if (gameState === "start") {
    drawStartScreen();
  }
  else if (gameState === "play") {
    playGame();
  }
  else if (gameState === "win") {
    drawWinScreen();
  }
  else if (gameState === "lose") {
    drawLoseScreen();
  }
}

// --------------------
// STARS
// --------------------
function drawStars() {
  fill(255);
  noStroke();

  for (let star of stars) {
    circle(star.x, star.y, star.size);

    star.y += 0.5;

    if (star.y > height) {
      star.y = 0;
      star.x = random(width);
    }
  }
}

// --------------------
// START SCREEN
// --------------------
function drawStartScreen() {
  fill(255);
  textAlign(CENTER);

  textSize(42);
  text("CAT FOOD DASH", width/2, 200);

  textSize(20);
  text("Collect food, defeat enemies,", width/2, 280);
  text("and survive before time runs out.", width/2, 310);

  text("Arrow Keys = Move", width/2, 380);
  text("X = Attack", width/2, 410);

  text("Press ENTER to Start", width/2, 500);
}

// --------------------
// GAMEPLAY
// --------------------
function playGame() {
  movePlayer();

  timeLeft -= 1/60;

  if (attackCooldown > 0) {
    attackCooldown--;
  }

  // FOOD
  for (let food of foods) {
    image(foodImg, food.x, food.y, food.size, food.size);

    if (dist(playerX, playerY, food.x, food.y) < 40) {
      score += 10;

      if (!collectSound.isPlaying()) {
        collectSound.play();
      }

      food.x = random(width);
      food.y = random(height);
    }
  }

  // BONUS FOOD
  if (frameCount % 600 === 0) {
    bonusFood.active = true;
    bonusFood.x = random(width);
    bonusFood.y = random(height);
  }

  if (bonusFood.active) {
    image(
      bonusImg,
      bonusFood.x,
      bonusFood.y,
      bonusFood.size,
      bonusFood.size
    );

    if (dist(playerX, playerY, bonusFood.x, bonusFood.y) < 50) {
      score += 30;
      health += 20;

      if (!bonusSound.isPlaying()) {
        bonusSound.play();
      }

      bonusFood.active = false;
    }
  }

  // ENEMIES
  for (let i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];

    if (enemy.x < playerX) enemy.x += enemy.speed;
    if (enemy.x > playerX) enemy.x -= enemy.speed;
    if (enemy.y < playerY) enemy.y += enemy.speed;
    if (enemy.y > playerY) enemy.y -= enemy.speed;

    image(enemyImg, enemy.x, enemy.y, enemy.size, enemy.size);

    let d = dist(playerX, playerY, enemy.x, enemy.y);

    if (d < 50) {
      health -= 0.2;
    }

    if (keyIsDown(88) && d < 80 && attackCooldown <= 0) {
      attackSound.play();
      attackCooldown = 20;

      enemy.health -= 10;

      createParticles(enemy.x, enemy.y);

      if (enemy.health <= 0) {
        enemies.splice(i, 1);
        score += 20;
      }
    }
  }

  // PARTICLES
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();

    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }

  // PLAYER
  image(playerImg, playerX, playerY, playerSize, playerSize);

  drawUI();

  // WIN
  if (score >= goalScore && enemies.length === 0 && !gameEnded) {
    winSound.play();
    gameState = "win";
    gameEnded = true;
  }

  // LOSE
  if ((health <= 0 || timeLeft <= 0) && !gameEnded) {
    loseSound.play();
    gameState = "lose";
    gameEnded = true;
  }
}

// --------------------
// PLAYER MOVEMENT
// --------------------
function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) playerX -= playerSpeed;
  if (keyIsDown(RIGHT_ARROW)) playerX += playerSpeed;
  if (keyIsDown(UP_ARROW)) playerY -= playerSpeed;
  if (keyIsDown(DOWN_ARROW)) playerY += playerSpeed;

  playerX = constrain(playerX, 0, width - playerSize);
  playerY = constrain(playerY, 0, height - playerSize);
}

// --------------------
// UI
// --------------------
function drawUI() {
  fill(255);
  textSize(20);
  textAlign(LEFT);

  text("Score: " + score, 20, 30);
  text("Time: " + ceil(timeLeft), 20, 60);
  text("Enemies: " + enemies.length, 20, 90);

  fill(255, 0, 0);
  rect(20, 110, health * 2, 20);

  fill(255);
  text("Health", 20, 150);
}

// --------------------
// PARTICLES
// --------------------
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 8;
  }

  show() {
    noStroke();
    fill(255, 100, 100, this.alpha);
    circle(this.x, this.y, 10);
  }

  finished() {
    return this.alpha <= 0;
  }
}

function createParticles(x, y) {
  for (let i = 0; i < 8; i++) {
    particles.push(new Particle(x, y));
  }
}

// --------------------
// WIN SCREEN
// --------------------
function drawWinScreen() {
  background(50, 180, 100);

  fill(255);
  textAlign(CENTER);

  textSize(45);
  text("YOU SAVED THE CAT KINGDOM!", width/2, 300);

  textSize(25);
  text("Final Score: " + score, width/2, 350);
}

// --------------------
// LOSE SCREEN
// --------------------
function drawLoseScreen() {
  background(180, 50, 50);

  fill(255);
  textAlign(CENTER);

  textSize(45);
  text("GAME OVER", width/2, 300);

  textSize(25);
  text("Final Score: " + score, width/2, 350);
}

// --------------------
// KEY PRESSED
// --------------------
function keyPressed() {
  userStartAudio();

  if (gameState === "start" && keyCode === ENTER) {
    gameState = "play";
  }
} 