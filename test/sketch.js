let antImgs = [];
let ant;

function preload(){
  for(let i = 1; i <= 3; i++){
    antImgs.push(loadImage('../baejjang/assets/graphic/ant' + i + '.png'));
  }
}


class Ant{
  constructor(imgs, direction){
    this.antImgs = imgs;
    this.idx;
    this.direction = direction;
    this.stop = false;
    this.velX = direction * 0.5;
    this.velY = 0;
    this.posX;
    if(direction == 1){
      this.posX = -10;
      this.idx = 2;
    }
    else if(direction == -1){
      this.posX = width + 10;
      this.idx = 1;
    }
    this.posY = height*0.8;
  }

  // stop
  stopAnt(){
    this.stop = true;
    this.idx = 0;
  }
  
  // get posY
  getPosY(){
    return this.posY;
  }

  // move
  move(){
    this.posX += this.velX;
    this.posY += this.velY;
    this.velY = 0.5*sin(frameCount / 10);
  }

  // display
  display(){
    if(!this.stop){
      this.move();
      imageMode(CENTER);
    }
    image(this.antImgs[this.idx], this.posX, this.posY, 140, 96);
  }
}

function mousePressed(){
  ant.stopAnt();
}

function setup() {
  createCanvas(400, 400);
  ant = new Ant(antImgs, -1);
}

function draw() {
  background(220);
  ant.display();
}