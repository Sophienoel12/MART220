class Food {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  display() {
    fill(this.color);
    
    // Shape 1: base
    ellipse(this.x, this.y, this.size);

    // Shape 2: topping
    rect(this.x - this.size/4, this.y - this.size/2, this.size/2, this.size/4);
  }
}