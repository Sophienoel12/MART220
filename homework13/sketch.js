let angle = 0;
let myFont;


let myModel;


let textures = [];


let objects = [];

function preload() {
  myFont = loadFont('NotoSans-VariableFont_wdth,wght.ttf');

  
  myModel = loadModel('blackcat.fbx.obj', true);

  
  textures[0] = loadImage('text1.png');
  textures[1] = loadImage('text2.png');
  textures[2] = loadImage('text3.png');
  textures[3] = loadImage('text4.png');
  textures[4] = loadImage('text5.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

 
  for (let i = 0; i < 5; i++) {
    objects.push({
      radius: random(100, 400),
      speed: random(0.01, 0.03),
      size: random(30, 120),
      type: i,
      offset: random(TWO_PI)
    });
  }
}

function draw() {
  background(20);

 
  rotateY(frameCount * 0.002);

 
  ambientLight(60);
  pointLight(255, 200, 200, 200, -200, 300);
  pointLight(200, 200, 255, -200, 200, 300);

  angle += 0.01;


  push();
  rotateY(angle * 0.5);


  rotateX(PI); 

  scale(2);
  specularMaterial(255);
  shininess(80);
  model(myModel);
  pop();


  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];

    let x = cos(angle * obj.speed * 50 + obj.offset) * obj.radius;
    let y = sin(angle * obj.speed * 50 + obj.offset) * obj.radius;
    let z = sin(angle * obj.speed * 30 + obj.offset) * 250;

    push();
    translate(x, y, z);

    rotateX(angle * obj.speed * 100);
    rotateY(angle * obj.speed * 100);

    if (textures[i]) {
      texture(textures[i]);
    }

  
    if (obj.type === 0) box(obj.size);
    if (obj.type === 1) sphere(obj.size / 2);
    if (obj.type === 2) cone(obj.size / 2, obj.size);
    if (obj.type === 3) cylinder(obj.size / 2, obj.size);
    if (obj.type === 4) torus(obj.size / 2, obj.size / 4);

    pop();
  }


  push();
  fill(255);
  textFont(myFont);
  textAlign(CENTER);

  textSize(32);
  text("3D Dreamscape", 0, -height / 2 + 60);

  textSize(18);
  text("Sophie Guilliams", 0, -height / 2 + 90);
  pop();
}


function mousePressed() {
  // move ALL objects for stronger effect
  for (let i = 0; i < objects.length; i++) {
    objects[i].radius = random(100, 400);
    objects[i].offset = random(TWO_PI);
  }
}