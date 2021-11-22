class Bubble{
    constructor(startX, startY){
      this.posX = startX;
      this.posY = startY;
      this.maxS = random(20, 30);
      this.curS = 0;
      this.growingFactor = 0.7;
      this.velX = random(-0.7, 0.7);
      this.velY = -2.3;
      this.oscillate = 0;
      this.offset = random(0, PI/2);
    }
  
    move(){
      this.oscillate = random(0.3, 1) * sin(this.offset + frameCount/10);
      this.posX += this.velX + this.oscillate;
      this.posY += this.velY; 
    }
  
    blow(){
      if(this.curS < this.maxS){
        if(this.growingFactor > 0.1){
          this.growingFactor -= random(0.01, 0.05);
        }
        this.curS += this.growingFactor;
      }
    }
  
    display(){
      stroke(255, 255, 255, 180);
      strokeWeight(1);
      fill(255, 255, 255, 50);
      ellipse(this.posX, this.posY, this.curS, this.curS);
      this.blow();
      this.move();
    }
  }