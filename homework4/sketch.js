// MART 220 Homework 4
// Interactive Sandwich Plate

let sandwichImg, chipsImg, aiSandwichImg;
let titleFont;

let chipX = 200;
let chipY = 340;

function preload() {
  sandwichImg = loadImage("images/sandwhich.png");
  chipsImg = loadImage("images/chips.png");
  aiSandwichImg = loadImage("images/ai-sandwich.png");
  titleFont = loadFont("assets/RemalosRegular-aYj1m.ttf");
}

function setup() {
  createCanvas(500, 500);
  textFont(titleFont);

  // Timer-based movement every 2 seconds
  setInterval(moveChips, 2000);
}

function draw() {
  background(230);

  // ----- Title -----
  textSize(20);
  fill(0);
  text("Lunch Plate Study", 15, 30);

  // ----- Plate -----
  fill(245);
  ellipse(250, 300, 350, 350);

  // ----- Images -----
  image(sandwichImg, 170, 200, 160, 100);
  image(chipsImg, chipX, chipY, 80, 50);

  // AI image (background accent)
  tint(255, 180);
  image(aiSandwichImg, 320, 80, 120, 120);
  noTint();

  // ----- Name -----
  textSize(14);
  textAlign(RIGHT, BOTTOM);
  text("Sophie Guilliams", width - 10, height - 10);
}

// Timer-controlled motion
function moveChips() {
  chipX = random(150, 260);
  chipY = random(320, 380);
}