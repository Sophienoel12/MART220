// MART 220 Homework 3 (AI Generated)
// Midnight Aquarium

let fishes = [];
let scareMode = false;

function setup() {
  createCanvas(600, 400);

  // Create initial fish
  for (let i = 0; i < 6; i++) {
    fishes.push(new Fish(random(width), random(height)));
  }
}

function draw() {
  background(10, 20, 40);

  // ----- Title -----
  fill(200);
  textSize(16);
  text("Midnight Aquarium", 10, 25);

  // ----- Water glow -----
  noStroke();
  fill(30, 60, 120, 40);
  rect(0, 0, width, height);

  // ----- Fish behavior -----
  for (let fish of fishes) {
    fish.update();
    fish.display();
  }

  // ----- Instructions -----
  textSize(12);
  text("Click: add fish | Space: scare fish", 10, height - 10);

  // ----- Name -----
  textAlign(RIGHT, BOTTOM);
  text("Your Name", width - 10, height - 10);
}

// ----- Mouse Event -----
function mousePressed() {
  fishes.push(new Fish(mouseX, mouseY));
}

// ----- Keyboard Event -----
function keyPressed() {
  if (key === ' ') {
    scareMode = !scareMode;
  }
}

// ===== Fish Class =====
class Fish {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.noiseOffset = random(1000);
    this.speed = random(0.5, 1.5);
    this.size = random(20, 35);
    this.col = color(
      random(100, 255),
      random(100, 255),
      random(150, 255)
    );
  }

  update() {
    // Perlin noise movement
    let angle = noise(this.noiseOffset) * TWO_PI * 2;
    let velocity = p5.Vector.fromAngle(angle);

    // Control statement
    if (scareMode) {
      velocity.mult(this.speed * 3);
    } else {
      velocity.mult(this.speed);
    }

    this.pos.add(velocity);
    this.noiseOffset += 0.01;

    // Screen wrapping
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);

    // Glow
    noStroke();
    fill(red(this.col), green(this.col), blue(this.col), 80);
    ellipse(0, 0, this.size + 10);

    // Body
    fill(this.col);
    ellipse(0, 0, this.size, this.size * 0.6);

    // Tail
    triangle(
      -this.size / 2, 0,
      -this.size, -this.size / 4,
      -this.size, this.size / 4
    );
    pop();
  }
}
