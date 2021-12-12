class Toon{
  constructor(){
		this.toonImgs;
    this.pages;
    this.score;
    this.idx = 0;
    this.endCut = false;
    this.readyToStart = false;
    this.bubble = [];
    this.story = '';
    this.commentEnd = false;
	}

  playIntro(){
    switch(this.idx){
      case 0:
        this.idx += 1;
        break;
      case 1:
        if(this.bubble.length == 0){
          this.bubble.push(8);
        }else{
          this.commentEnd = true;
          this.bubble.push(9);
        }
        break;
      case 2:
        this.bubble.push(10);
        this.commentEnd = true;
        break;
      case 3:
        this.idx += 1;
        break;
      case 4:
        this.bubble.push(11);
        this.commentEnd = true;
        break;
      case 5:
        this.bubble.push(12);
        this.commentEnd = true;
        break;
      case 6:
        if(this.bubble.length == 0){
          this.bubble.push(13);
        }else{
          this.bubble.push(14);
          this.commentEnd = true;
        }
        break;
      case 7:
        if(this.bubble.length == 0){
          this.bubble.push(15);
        }else{
          this.bubble.push(16);
          this.commentEnd = true;
          this.endCut = true;
          this.readyToStart = true;
        }
        break;
    }
  }

  setToon(toonImgs, score){
    this.toonImgs = toonImgs;
    this.score = score;
    this.idx = 0;
    this.endCut = false;
    this.readyToStart = false;
    if(this.score == -999){
      this.story = 'INTRO';
      this.pages = 8;
    }
  }

  increaseIdx(){
    if(this.commentEnd && !this.endCut){
      this.commentEnd = false;
      this.bubble = [];
      this.idx += 1;
    }
    else{
      switch(this.story){
        case 'INTRO':
          this.playIntro();
      }
    }
  }

  getReadyToStart(){
    return this.readyToStart;
  }

  display(){
    noStroke();
    imageMode(CENTER);
    image(this.toonImgs[this.idx], width/2, height/2, 810, 540);
    for(let i = 0; i < this.bubble.length; i ++){
      image(this.toonImgs[this.bubble[i]], width/2, height/2, 810, 540);
    }
  }

  // display(){
  //   // show cartoon
  //   noStroke();
  //   imageMode(CENTER);
  //   image(this.toonImgs[this.idx], width/2, height/2, 810, 540);
  //   // only for test play
  //   if(this.idx == 6){
  //     image(this.toonImgs[this.idx], width/2, height/2, width, height);
  //   }
  //   // when end cut
  //   if(this.endCut){
  //     // intro toon
  //     if(this.score == -999){
  //       this.readyToStart = true;
  //     }
  //     // end toon
  //     else{
  //       // replay button
  //       fill(0);
  //       rect(width-100, height-100, 60, 60);
  //       fill(255);
  //       textSize(30);
  //       text('다시', width-70, height-70);
  //       // show score
  //       fill(0);
  //       text('당신의 점수는 ' + this.score + '점', width/2, height-50);
  //       // when mouse is on button get ready sign else non-ready
  //       if(width-100 < mouseX && mouseX < width-40 && height-100 < mouseY && mouseY < height-40){
  //         this.readyToStart = true;
  //       }else{
  //         this.readyToStart = false;
  //       }
  //     }
  //   }
  // }
}