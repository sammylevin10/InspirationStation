let img;

function preload() {
  img = loadImage('https://collectionapi.metmuseum.org/api/collection/v1/iiif/436159/795941/main-image');
}

class Bubble {
  constructor(x, y, info, img) {
    this.x = x;
    this.y = y;
    this.info = info;
    this.img = img;
    this.speedX = random(1, 2);
    this.yNoiseOffset = random(1000,2000);
    this.size = random(70, 150);
    this.targetSize = this.size;
    this.circleMask = createGraphics(this.size, this.size);
    this.vanishing = false;
    this.appearing = false;
  }
  display() {
    fill(0);
    imageMode(CENTER);
    textAlign(CENTER);

    if (this.vanishing) {
      if (this.size <= this.targetSize) {
        this.size = 0;
        this.vanishing = false;
      } else {
        this.size *= 0.95;
      }
    }

    if (this.appearing) {
      if (this.size >= this.targetSize) {
        this.size = this.targetSize;
        this.appearing = false;
      } else {
        this.size *= 1.05
      }
    }

    // Handle movement
    let yMovement = map( noise(this.yNoiseOffset), 0, 1, -0.5, 0.5 );
    this.x += this.speedX;
    this.y += yMovement;

    this.circleMask.fill('rgba(0, 0, 0, 1)');
    this.circleMask.circle(this.size/2, this.size/2, this.size);
    this.img.mask(this.circleMask);
    fill(0);
    stroke(0);
    strokeWeight(5);
    image(this.img, this.x, this.y, this.size, this.size);

  }
  isUnderMouse() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.size/2) return true;
    return false;
  }
  isOffScreen() {
    if (this.size == 0) { 
      return true;
    }
    if (this.x > width + 100) return true;
    return false;
  }
  reset() {
    this.x = random(-300, -150);
    this.y = height/2+random(-100, 100);
    this.size = random(70, 150);
  }
  vanish() {
    if (this.targetSize >= 0) {
      this.vanishing=true;
      this.targetSize = 0;
      this.apeparing = false;
    }
    
  }
  appear() {
    if (this.targetSize <= 0) {
      this.appearing=true;
    this.targetSize = random(70, 150);
    this.vanishing = false;
    }
  }
}
