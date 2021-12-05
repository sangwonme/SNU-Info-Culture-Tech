class Money{
  constructor(img, ratio, score){
		this.img = img;
		this.score = score;
		this.ratio = ratio;
		this.posX = random(130, 680);
		this.posY = -10;
		this.velX = 0;
		this.velY = 2.3;
		this.size = 60
	}

	move(){
		this.velX = sin(frameCount / 10);
		this.posX += this.velX;
		this.posY += this.velY;
	}

	checkTouch(x, y){
		return (dist(x, this.posX, y, this.posY) < 10);
	}

	display(){
		push();
		translate(this.posX, this.posY);
		imageMode(CENTER);
		image(this.img, 0, 0, this.size, this.size*this.ratio);
		pop();
		this.move();
	}
}