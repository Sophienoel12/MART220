function setup() {
createCanvas(500, 500);
noLoop();
}

function draw() {
background(230);

// Plate
fill(245);
ellipse(250, 300, 350, 350);

// Sandwich - bottom bread
fill(210, 170, 120);
rect(170, 260, 160, 40, 10);

// Lettuce
fill(100, 180, 100);
rect(170, 250, 160, 20);

// Meat
fill(170, 80, 80);
rect(170, 235, 160, 15);

// Sandwich - top bread
fill(210, 170, 120);
rect(170, 210, 160, 35, 10);

// Chips
fill(240, 200, 100);
ellipse(150, 330, 40, 25);
ellipse(180, 350, 45, 30);
ellipse(140, 360, 35, 20);

// Simple garnish
fill(80, 160, 90);
ellipse(300, 230, 15, 15);
ellipse(320, 240, 12, 12);
}