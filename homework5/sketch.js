// Arrays for food positions
let foodX = [];
let foodY = [];

let numFood = 8;   // how many food items

// Animation variable
let pulseSize = 40;
let growing = true;

function setup() {
  createCanvas(600, 400);

  // Fill arrays with random positions
  for (let i = 0; i < numFood; i++) {
    foodX[i] = random(50, width - 50);
    foodY[i] = random(50, height - 50);
  }
}

function draw() {
  background(220);

  // ----- Draw Food Using Loop -----
  for (let i = 0; i < numFood; i++) {
    fill(255, 150, 0);
    ellipse(foodX[i], foodY[i], 30, 30);
  }

  // ----- Animation (Pulsing Circle) -----
  // Update animation
  if (growing) {
    pulseSize += 0.5;
    if (pulseSize > 70) {
      growing = false;
    }
  } else {
    pulseSize -= 0.5;
    if (pulseSize < 40) {
      growing = true;
    }
  }

  // Draw animation using a loop
  for (let i = 0; i < 1; i++) {
    fill(0, 150, 255);
    ellipse(width / 2, height / 2, pulseSize, pulseSize);
  }
}
