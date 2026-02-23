class Food {
  constructor(x, y, size, colorValue) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = colorValue;
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);

    rectMode(CENTER);
    rect(this.x, this.y - this.size / 2, this.size / 2, this.size / 4);
  }
}
let idleFrames = [];
let walkFrames = [];

let currentAnimation = [];
let frameIndex = 0;
let frameDelay = 10; // controls animation speed
let frameCounter = 0;

let x = 100;
let y = 300;
let speed = 2;

let foods = [];

function preload() {
  // Idle animation
  idleFrames[0] = loadImage("idle1.png");
  idleFrames[1] = loadImage("idle2.png");

  // Walk animation
  walkFrames[0] = loadImage("walk1.png");
  walkFrames[1] = loadImage("walk2.png");
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);

  currentAnimation = idleFrames;

  // Create 5 food objects
  foods.push(new Food(100, 100, 40, color(255, 0, 0)));
  foods.push(new Food(250, 200, 60, color(0, 255, 0)));
  foods.push(new Food(400, 150, 50, color(0, 0, 255)));
  foods.push(new Food(550, 300, 70, color(255, 255, 0)));
  foods.push(new Food(700, 400, 45, color(255, 0, 255)));
}

function draw() {
  background(220);

  // Display all food objects
  for (let i = 0; i < foods.length; i++) {
    foods[i].display();
  }

  handleMovement();
  animateCharacter();
}

function handleMovement() {
  let moving = false;

  if (keyIsDown(RIGHT_ARROW)) {
    x += speed;
    moving = true;
  }
  if (keyIsDown(LEFT_ARROW)) {
    x -= speed;
    moving = true;
  }

  // Smooth animation switching
  if (moving) {
    if (currentAnimation !== walkFrames) {
      currentAnimation = walkFrames;
      frameIndex = 0;
    }
  } else {
    if (currentAnimation !== idleFrames) {
      currentAnimation = idleFrames;
      frameIndex = 0;
    }
  }
}

function animateCharacter() {
  frameCounter++;

  if (frameCounter >= frameDelay) {
    frameCounter = 0;
    frameIndex++;

    if (frameIndex >= currentAnimation.length) {
      frameIndex = 0; // Loop animation
    }
  }

  image(currentAnimation[frameIndex], x, y);
}
