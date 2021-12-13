class Toon{
  constructor(gamefont){
		this.toonImgs;
    this.rankImg;
    this.pages;
    this.score;
    this.idx = 0;
    this.readyToStart = false;
    this.bubble = [];
    this.story = '';
    this.commentEnd = false;
    this.viewScore = false;
    this.gamefont = gamefont;
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
          this.readyToStart = true;
        }
        break;
    }
  }

  playA(){
    switch(this.idx){
      case 0:
        this.bubble.push(4);
        this.commentEnd = true;
        break;
      case 1:
        this.bubble.push(5);
        this.commentEnd = true;
        break;
      case 2:
        if(this.bubble.length == 0){
          this.bubble.push(6);
        }else{
          this.bubble.push(7);
          this.commentEnd = true;
        }
        break;
      case 3:
        this.commentEnd = true;
        this.viewScore = true;
        break;
    }
  }

  playB(){
    switch(this.idx){
      case 0:
        this.bubble.push(4);
        this.commentEnd = true;
        break;
      case 1:
        this.bubble.push(5);
        this.commentEnd = true;
        break;
      case 2:
        switch(this.bubble.length){
          case 0:
            this.bubble.push(6);
            break;
          case 1:
            this.bubble.push(7);
            break;
          case 2:
            this.bubble.push(8);
            break;
          case 3:
            this.bubble.push(9);
            this.commentEnd = true;
            break;
        }
        break;
      case 3:
        if(this.bubble.length == 0){
          this.bubble.push(10);
        }else{
          this.commentEnd = true; 
          this.viewScore = true;
        }
        break;
    }
  }

  playC(){
    switch(this.idx){
      case 0:
        this.bubble.push(4);
        this.commentEnd = true;
        break;
      case 1:
        this.bubble.push(5);
        this.commentEnd = true;
        break;
      case 2:
        this.idx += 1;
        break;
      case 3:
        if(this.bubble.length == 0){
          this.bubble.push(6);
        }else{
          this.commentEnd = true;
          this.viewScore =true;
        }
        break;
    }
  }

  playF(){
    switch(this.idx){
      case 0:
        this.bubble.push(4);
        this.commentEnd = true;
        break;
      case 1:
        switch(this.bubble.length){
          case 0:
            this.bubble.push(5);
            break;
          case 1:
            this.bubble.push(6);
            break;
          case 2:
            this.bubble.push(7);
            this.commentEnd = true;
            break;
        }
        break;
      case 2:
        this.bubble.push(8);
        this.commentEnd = true;
        break;
      case 3:
        if(this.bubble.length == 0){
          this.bubble.push(9);
        }else{
          this.commentEnd = true;
          this.viewScore = true;
        }
        break;
    }
  }

  setToon(toonImgs, rankImg, score, story){
    this.viewScore = false;
    this.readyToStart = false;
    this.commentEnd = false;
    this.bubble = [];
    this.toonImgs = toonImgs;
    this.rankImg = rankImg;
    this.score = score;
    this.idx = 0;
    this.story = story;
    if(this.story == 'INTRO'){
      this.pages = 8;
    }else{
      this.pages = 4;
    }
  }

  increaseIdx(){
    if(this.commentEnd && this.idx != this.pages - 1){
      this.commentEnd = false;
      this.bubble = [];
      this.idx += 1;
    }
    else{
      switch(this.story){
        case 'INTRO':
          this.playIntro();
          break;
        case 'A':
          this.playA();
          break;
        case 'B':
          this.playB();
          break;
        case 'C':
          this.playC();
          break;
        case 'F':
          this.playF();
          break;
      }
    }
  }

  getReadyToStart(){
    return this.readyToStart;
  }

  display(){
    noStroke();
    if(!this.viewScore){
      imageMode(CENTER);
      image(this.toonImgs[this.idx], width/2, height/2, 810, 540);
      for(let i = 0; i < this.bubble.length; i ++){
        image(this.toonImgs[this.bubble[i]], width/2, height/2, 810, 540);
      }
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(30);
      textFont(this.gamefont);
      text('Click!', width-50, height-50);
      textSize(45);
    }
    // when end toon ends.
    else{
      background(255);
      // rank
      imageMode(CENTER);
      image(this.rankImg, width/2, 160, 300, 300);
      // score
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(30);
      textFont(this.gamefont);
      text('당신의 점수는', width/2, height/2 + 50);
      textSize(45);
      text(this.score + '점', width/2, height/2 + 100);
      // replay button
      let buttonPos = [width/2, height/2 + 200];
      let buttonSize = [200, 70];
      if(!this.readyToStart){
        textSize(30);
      }else{
        textSize(45);
      }
      rectMode(CENTER);
      rect(buttonPos[0], buttonPos[1], buttonSize[0], buttonSize[1]);
      rectMode(CORNER);
      fill(255);
      text('다시 하기', buttonPos[0], buttonPos[1]);
      if(
        (buttonPos[0] - buttonSize[0]/2 < mouseX && mouseX < buttonPos[0] + buttonSize[0]/2) &&
        (buttonPos[1] - buttonSize[1]/2 < mouseY && mouseY < buttonPos[1] + buttonSize[1]/2)
      ){
        this.readyToStart = true;
      }
      else{
        this.readyToStart = false;
      }
    }
  }
}