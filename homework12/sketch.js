let angle = 0;
let myFont;

function preload() {
  myFont = loadFont('NotoSans-VariableFont_wdth,wght.ttf'); // add a font file to your project
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(20);

  // Lighting
  ambientLight(100);
  pointLight(255, 255, 255, mouseX - width/2, mouseY - height/2, 200);

  angle += 0.01;

  // --- BOX ---
  push();
  translate(-200, -100, 0);
  rotateX(angle);
  rotateY(angle);
  ambientMaterial(255, 0, 0);
  box(80);
  pop();

  // --- SPHERE ---
  push();
  translate(200, -100, 0);
  rotateY(angle * 1.5);
  specularMaterial(0, 0, 255);
  sphere(50);
  pop();

  // --- CONE ---
  push();
  translate(-200, 150, 0);
  rotateZ(angle);
  ambientMaterial(0, 255, 0);
  cone(50, 100);
  pop();

  // --- CYLINDER ---
  push();
  translate(200, 150, 0);
  rotateX(angle * 1.2);
  specularMaterial(255, 255, 0);
  cylinder(40, 100);
  pop();

  // --- TORUS ---
  push();
  translate(0, 0, -150);
  rotateX(angle);
  rotateY(angle);
  normalMaterial();
  torus(60, 20);
  pop();

  // --- ELLIPSOID ---
  push();
  translate(0, 200, 100);
  rotateY(angle);
  ambientMaterial(255, 100, 200);
  ellipsoid(40, 60, 40);
  pop();

  // --- TEXT ---
  push();
  rotateY(angle * 0.5);
  fill(255);
  textFont(myFont);
  textSize(32);
  textAlign(CENTER);
  text("3D Dreamscape", 0, -250);
  textSize(18);
  text("Sophie Guilliams", 0, -220);
  pop();
}