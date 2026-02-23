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