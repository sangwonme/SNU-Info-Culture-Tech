class Fire{
  constructor(smallfireImgs, combofireImgs, phase){
		this.smallfireImgs = smallfireImgs;
		this.combofireImgs = combofireImgs;
		this.frameIdx = 0;
		this.phase = phase;
		this.posx = 15;
		this.posy = -55;
	}

	setPhase(phase){
		this.phase = phase;
	}

	display(){
		if(frameCount % 3 == 0){
			this.frameIdx = (this.frameIdx + 1) % 4;
		}
		if(this.phase == 1){
			image(this.smallfireImgs[this.frameIdx], this.posx, this.posy, 843, 596);
		}
		else if(this.phase >= 2){
			image(this.combofireImgs[this.frameIdx], this.posx, this.posy, 843, 596);
		}
	}
}