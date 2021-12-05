class Toon{
  constructor(){
		this.toonImgs;
    this.score;
    this.idx = 0;
    this.viewScore = false;
    this.restartReady = false;
	}

  setToon(toonImgs, score){
    this.toonImgs = toonImgs;
    this.score = score;
    this.idx = 0;
    this.viewScore = false;
    this.restartReady = false;
  }

  increaseIdx(){
    if(this.idx == 3){
      this.viewScore = true;
    }else{
      this.idx += 1;
    }
  }

  getRestartReady(){
    return this.restartReady;
  }

  display(){
    // show cartoon
    imageMode(CENTER);
    image(this.toonImgs[this.idx], width/2, height/2, 810, 540);
    if(this.viewScore){
      // replay button
      fill(0);
      rect(width-100, height-100, 60, 60);
      fill(255);
      textSize(30);
      text('다시', width-70, height-70);
      // when mouse is on button get ready sign else non-ready
      if(width-100 < mouseX && mouseX < width-40 && height-100 < mouseY && mouseY < height-40){
        this.restartReady = true;
      }else{
        this.restartReady = false;
      }
    }
  }
}