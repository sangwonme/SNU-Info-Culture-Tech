class Toon{
  constructor(){
		this.toonImgs;
    this.score;
    this.idx = 0;
    this.viewScore = false;
	}

  setToon(toonImgs, score){
    this.toonImgs = toonImgs;
    this.score = score;
  }

  increaseIdx(){
    if(this.idx == 3){
      this.viewScore = true;
    }else{
      this.idx += 1;
    }
  }

  display(){
    // show cartoon
    imageMode(CENTER);
    image(this.toonImgs[this.idx], width/2, height/2, 810, 540);
  }
}