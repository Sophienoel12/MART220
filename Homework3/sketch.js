// MART 220 Homework 3
// Interactive Sandwich Plate

let chipX = [];
let chipY = [];
let animateChips = true;

// Sandwich position
let sandwichX = 170;
let sandwichY = 210;
let hoverLift = 0;

function setup() {
  createCanvas(500, 500);

  // Initial random chip positions
  for (let i = 0; i < 3; i++) {
    chipX[i] = random(120, 200);
    chipY[i] = random(320, 380);
  }
}

function draw() {
  background(230);

  // ----- Title (upper-left) -----
  fill(0);
  textSize(16);
  text("Lunch Plate Study", 10, 25);

  // ----- Plate -----
  fill(245);
  ellipse(250, 300, 350, 350);

  // ----- Mouse hover detection -----
  if (
    mouseX > sandwichX &&
    mouseX < sandwichX + 160 &&
    mouseY > sandwichY &&
    mouseY < sandwichY + 90
  ) {
    hoverLift = -10; // lift sandwich
  } else {
    hoverLift = 0;
  }

  // ----- Sandwich -----
  // Bottom bread
  fill(210, 170, 120);
  rect(sandwichX, sandwichY + 50 + hoverLift, 160, 40, 10);

  // Lettuce
  fill(100, 180, 100);
  rect(sandwichX, sandwichY + 40 + hoverLift, 160, 20);

  // Meat
  fill(170, 80, 80);
  rect(sandwichX, sandwichY + 25 + hoverLift, 160, 15);

  // Top bread
  fill(210, 170, 120);
  rect(sandwichX, sandwichY + hoverLift, 160, 35, 10);

  // ----- Chips (random movement) -----
  fill(240, 200, 100);
  for (let i = 0; i < chipX.length; i++) {
    ellipse(chipX[i], chipY[i], 40, 25);

    if (animateChips) {
      chipX[i] += random(-1, 1);
      chipY[i] += random(-1, 1);
    }
  }

  // ----- Garnish -----
  fill(80, 160, 90);
  ellipse(300, 230, 15, 15);
  ellipse(320, 240, 12, 12);

  // ----- Name (lower-right) -----
  textSize(12);
  textAlign(RIGHT, BOTTOM);
  fill(0);
  text("", width - 10, height - 10);
}

// ----- Mouse Event -----
function mousePressed() {
  // Randomize chip positions
  for (let i = 0; i < chipX.length; i++) {
    chipX[i] = random(120, 200);
    chipY[i] = random(320, 380);
  }
}

// ----- Keyboard Controls -----
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    sandwichX -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    sandwichX += 10;
  } else if (keyCode === UP_ARROW) {
    sandwichY -= 10;
  } else if (keyCode === DOWN_ARROW) {
    sandwichY += 10;
  } else {
    animateChips = !animateChips; // toggle animation with any other key
  }
}
