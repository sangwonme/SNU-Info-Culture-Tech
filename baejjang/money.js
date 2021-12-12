class Money{
  constructor(img, ratio, score, size){
		this.img = img;
		this.score = score;
		this.ratio = ratio;
		this.posX = random(130, 680);
		this.posY = -10;
		this.velX = 0;
		this.velY = 2.3;
		this.size = 60 * size;
	}

	move(){
		this.velX = sin(frameCount / 10);
		this.posX += this.velX;
		this.posY += this.velY;
	}

	checkTouch(x, y){
		let d = dist(x, y, this.posX, this.posY)
		if(d < 30){
			print(d);
		}
		return (dist(x, y, this.posX, this.posY) < 40);
	}
	
	checkOutofScreen(){
		return (this.posY > height);
	}

	getScore(){
		return this.score;
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