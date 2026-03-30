// GAME STATE
let gameState = "start";

// PLAYER
let playerX = 400;
let playerY = 300;
let playerSpeed = 5;

// IMAGES
let playerImg;
let goodFoodImg;
let enemyImg;

// ARRAYS
let foods = [];
let enemies = [];
let particles = [];

// SCORE
let score = 0;

// PRELOAD
function preload() {
  playerImg = loadImage("idle1.png");
  goodFoodImg = loadImage("food.png");
  enemyImg = loadImage("enemy.png");
}

// SETUP
function setup() {
  createCanvas(800, 600);

  // CREATE FOOD (5)
  for (let i = 0; i < 5; i++) {
    foods.push({
      x: random(width),
      y: random(height),
      size: 40
    });
  }

  // CREATE ENEMIES (3)
  for (let i = 0; i < 3; i++) {
    enemies.push({
      x: random(width),
      y: random(height),
      size: 60,
      health: 50
    });
  }
}

// DRAW LOOP
function draw() {
  background(30, 40, 60);

  if (gameState === "start") {
    drawStart();
  } else if (gameState === "play") {
    runGame();
  } else if (gameState === "win") {
    drawWin();
  }
}

// START SCREEN
function drawStart() {
  fill(255);
  textAlign(CENTER);

  textSize(40);
  text("CAT FOOD DASH", width / 2, height / 2 - 40);

  textSize(20);
  text("Press ENTER to Start", width / 2, height / 2 + 20);
  text("Arrow Keys = Move | X = Attack", width / 2, height / 2 + 50);
}

// MAIN GAME
function runGame() {

  movePlayer();

  // DRAW FOOD
  for (let i = foods.length - 1; i >= 0; i--) {
    image(goodFoodImg, foods[i].x, foods[i].y, foods[i].size, foods[i].size);

    let d = dist(playerX, playerY, foods[i].x, foods[i].y);
    if (d < 40) {
      score += 10;

      // reposition food
      foods[i].x = random(width);
      foods[i].y = random(height);
    }
  }

  // DRAW ENEMIES
  for (let i = enemies.length - 1; i >= 0; i--) {
    image(enemyImg, enemies[i].x, enemies[i].y, enemies[i].size, enemies[i].size);
  }

  // ATTACK (X KEY)
  if (keyIsDown(88)) {
    for (let i = enemies.length - 1; i >= 0; i--) {

      let d = dist(playerX, playerY, enemies[i].x, enemies[i].y);

      if (d < 80) {
        enemies[i].health -= 2;

        // PARTICLES
        createParticles(enemies[i].x, enemies[i].y);

        if (enemies[i].health <= 0) {
          enemies.splice(i, 1);
        }
      }
    }
  }

  // UPDATE PARTICLES
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();

    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }

  // DRAW PLAYER
  image(playerImg, playerX, playerY, 64, 64);

  // UI
  fill(255);
  textSize(20);
  text("Score: " + score, 20, 30);
  text("Enemies Left: " + enemies.length, 20, 60);

  // WIN CONDITION
  if (enemies.length === 0) {
    gameState = "win";
  }
}

// PLAYER MOVEMENT
function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) playerX -= playerSpeed;
  if (keyIsDown(RIGHT_ARROW)) playerX += playerSpeed;
  if (keyIsDown(UP_ARROW)) playerY -= playerSpeed;
  if (keyIsDown(DOWN_ARROW)) playerY += playerSpeed;

  playerX = constrain(playerX, 0, width - 64);
  playerY = constrain(playerY, 0, height - 64);
}

// PARTICLE CLASS
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-3, -1);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  show() {
    noStroke();
    fill(255, 0, 0, this.alpha);
    ellipse(this.x, this.y, 10);
  }

  finished() {
    return this.alpha < 0;
  }
}

// CREATE PARTICLES
function createParticles(x, y) {
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(x, y));
  }
}

// WIN SCREEN
function drawWin() {
  fill(255);
  textAlign(CENTER);

  textSize(40);
  text("YOU WIN!", width / 2, height / 2 - 20);

  textSize(25);
  text("Final Score: " + score, width / 2, height / 2 + 20);
}

// START GAME
function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    gameState = "play";
  }
}  