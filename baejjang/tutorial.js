class Tutorial{
  constructor(gamefont, graphicAssets, soundEffects){
		// size factor
		this.size = 0.75;
		// page
		this.page = 1;
		// init actionQueue
		this.actionQueue = [];
		this.initQueueNumber();
		// mouse event
		this.mouseDownX = 0;
		this.mouseDownY = 0;
		this.mouseUpX = 0;
		this.mouseUpY = 0; 
		// font
		this.gamefont = gamefont;
		// graphic assets
		this.moneyImgs = graphicAssets['money'];
		this.stageImg = graphicAssets['stage'];
		this.queueImg = graphicAssets['queuebar'];
		// player
		this.player = new Player(graphicAssets['player'], this.size);
		// objects
		this.speaker = new Speaker(graphicAssets['speaker']);
		// sound assets
		this.notes = soundEffects['notes'];
		this.noise = soundEffects['noise'];
		this.coins = soundEffects['coins'];
		this.initVolume();
	}

	// generate action
	generateActionNum(){
		return int(random(1,5));
	}
	generateActionArr(){
		return int(random(6, 8));
	}

	initQueueNumber(){
		for(let i = 0; i < 4; i++){
			this.actionQueue.push(this.generateActionNum());
		}
	}

	// shift action queue
	shiftQueueNum(){
		if(!this.readyEnd){
				this.actionQueue.push(this.generateActionNum());
		}
		this.actionQueue.shift();
	}
	shiftQueueArr(){
		if(!this.readyEnd){
				this.actionQueue.push(this.generateActionArr());
		}
		this.actionQueue.shift();
	}

	// Audio Mixing
	initVolume(){
			for(let i = 0; i < this.notes.length; i++){
					this.notes[i].setVolume(0.5);
			}
			this.noise.setVolume(7);
			for(let i = 0; i < this.coins.length; i++){
					this.coins[i].setVolume(8);
			}
	}

	// Stop all prev sounds
	stopAllSounds(){
		for(let i = 0; i < this.notes.length; i++){
				this.notes[i].stop();
		}
		this.noise.stop();
	}

	// judge user input
	judgeInput(inputType, inputKey){
		let inputAction;
		this.stopAllSounds();
		if(inputType == 'MOUSE'){
			if(this.mouseUpY - this.mouseDownY < -50){
					inputAction = 5;
			}
			else if(this.mouseDownY - this.mouseUpY < -50){
					inputAction = 6;
			}
		}
		else if(inputType == 'KEY'){
			inputAction = inputKey - 48;
			if(inputAction == 5 || inputAction == 6){
					inputAction = 0;
			}
		}
		// correct
		if(this.actionQueue[0] == inputAction){
			this.notes[inputAction-1].play();
			this.player.playerCorrect(inputAction);
		}
		// wrong
		else{
			this.noise.play();
			this.player.playerWrong();
		}
		// shift queue
		if(this.page == 1){
			this.shiftQueueNum();
		}
		else if(this.page == 2){
			this.shiftQueueArr();
		}
	}


	// display
	display(){
		// draw stage
		imageMode(CENTER);
		image(this.stageImg, width/2, height/2, 843*this.size, 596*this.size);

		// player
		imageMode(CORNER);
		push();
		translate(20, 30);
		this.player.display();
		pop();

		// action queue
		if(this.page <= 2){
			// queue img
			imageMode(CENTER);
			image(this.queueImg, width/2, 140, 335*this.size, 95*this.size);
			// show actions
			for(let i = 0; i < this.actionQueue.length; i++){
				if(i == 0){
					fill(255, 0, 0);
				}
				else{
					fill(0);
				}
				noStroke();
				textAlign(CENTER, CENTER);
				textSize(30);
				textFont(this.gamefont);
				let action = this.actionQueue[i];
				if(action == 5){
						action = '↑';
				}
				else if(action ==6){
						action = '↓';
				}
				text(action, 330+740*(i/12), height*0.1+78);
			}
		}

		// Next, Prev button
		if(this.page == 1){
			if(dist(mouseX, mouseY, width-60, height-50) < 30){
				textSize(45);
			}
			else{
				textSize(30);
			}
			text('다음', width-60, height - 50);
		}

	}
}