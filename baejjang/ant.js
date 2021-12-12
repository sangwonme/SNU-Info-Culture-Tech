class Ant{
  constructor(imgs, direction){
    this.antImgs = imgs;
    this.idx;
    this.direction = direction;
    this.stop = false;
    this.velX = direction * 0.8;
    this.velY = 0;
    this.posX;
    if(direction == 1){
      this.posX = -random(10, 50);
      this.idx = 2;
    }
    else if(direction == -1){
      this.posX = width + random(10, 50);
      this.idx = 1;
    }
    this.initPosY = height*0.8 - 80*random(0, 1);
    this.posY = this.initPosY;
    this.offset = random(0, 3.14);
  }

  getStop(){
    return (this.stop || this.posX < 100 || this.posX > width-100);
  }

  // stop
  stopAnt(){
    this.stop = true;
    this.velX = 0;
    this.idx = 0;
  }
  
  // get posY
  getPosY(){
    return this.initPosY;
  }

  // move
  move(){
    this.posX += this.velX;
    this.posY += this.velY;
    if(this.stop){
      this.velY = 2*sin(frameCount / 10 + this.offset);
    }
    else{
      this.velY = 0.5*sin(frameCount / 10 + this.offset);
    }
  }

  // out of screen
  checkOutofScreen(){
    return ((this.direction == 1 && this.posX > width + 50) || (this.direction == -1 && this.posX < -50));
  }

  // display
  display(){
    this.move();
    imageMode(CENTER);
    image(this.antImgs[this.idx], this.posX, this.posY, 700, 480);
  }
}