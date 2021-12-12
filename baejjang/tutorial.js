class Tutorial{
  constructor(gamefont, graphicAssets, soundEffects){
		// size factor
		this.size = 0.75;
		// page
		this.page = 1;
		// init actionQueue
		this.actionQueue = [];
		this.initQueueNum();
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
		// comment
		this.comment = '1,2,3,4 자판 상단의 해당 숫자 키보드를 누르세요.'
		// end
		this.end = false;
	}

	getEnd(){
		return this.end;
	}

	// generate action
	generateActionNum(){
		return int(random(1,5));
	}
	generateActionArr(){
		let actionNum;
		if(this.actionQueue.length > 0){
				let lastActionNum = this.actionQueue[this.actionQueue.length - 1];
				if(lastActionNum == 5){
						actionNum = 6;
				}
				else if(lastActionNum == 6){
						actionNum = 5;
				}
		}
		else{
			actionNum = 5;
		}
		return actionNum;
	}

	// init queue
	initQueueNum(){
		this.actionQueue = [];
		for(let i = 0; i < 4; i++){
			this.actionQueue.push(this.generateActionNum());
		}
	}
	initQueueArr(){
		this.actionQueue = [];
		for(let i = 0; i < 4; i++){
			this.actionQueue.push(this.generateActionArr());
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

	// update class var : mouseXY
	updateMousePos(x, y, mode){
		if(mode == 'PRESS'){
				this.mouseDownX = x;
				this.mouseDownY = y;
		}
		else if(mode == 'RELEASE'){
				this.mouseUpX = x;
				this.mouseUpY = y;
		}
	}

	// judge user input
	judgeInput(inputType, inputKey){
		if(this.page > 2){
			return;
		}
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

	// page move
	changePage(){
		this.stopAllSounds();
		this.player.initPos();
		if(this.page == 1){
			if(this.player.getStatus() == 7 || this.player.getStatus() == 8){
				this.player.setStatus(int(random(1, 7)));
			}
			this.initQueueNum();
			this.comment = '1,2,3,4 자판 상단의 해당 숫자 키보드를 누르세요.';
		}
		else if(this.page == 2){
			if(this.player.getStatus() == 7 || this.player.getStatus() == 8){
				this.player.setStatus(int(random(1, 7)));
			}
			this.initQueueArr();
			this.comment = '무대 위쪽에서 마우스 좌클릭을 한 상태로 \n마우스를 위/아래로 움직이고 떼세요.';
		}
		else if(this.page == 3){
			this.moneys = [];
			this.player.setStatus(7);
			this.comment = '피버타임에는 a/d키로 베짱이를 좌우로 움직여\n하늘에서 떨어지는 돈을 받으세요.';
		}
		else{
			this.player.setStatus(int(random(1, 7)));
			this.comment = '연주는 1분간 이어집니다. \n게임이 시작되면 음악이 나옵니다. 볼륨을 미리 조절해주세요. \n마우스 사용을 권장합니다.';
		}
	}
	goNextPage(){
		if(this.page < 4){
			this.page += 1;
			this.changePage();
		}
		else if(this.page == 4){
			this.end = true;
		}
	}
	goPrevPage(){
		if(this.page > 1){
			this.page -= 1;
			this.changePage();
		}
	}

	// money
	addMoney(){
		if(frameCount % 50 == 0){
			let tmp = int(random(1, 3));
			this.moneys.push(new Money(this.moneyImgs[tmp-1], 0.5*tmp, 1000*tmp, 0.7));
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
			image(this.queueImg, width/2, 145, 335*0.8, 95*0.8);
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
				text(action, 325+740*(i/12), height*0.1+85);
			}
		}
		// money page
		else if(this.page == 3){
			if(keyIsDown(65)){
				this.player.moveLeft();
			}
			if(keyIsDown(68)){
				this.player.moveRight();
			}
			// moeny
			this.addMoney();
			for(let i = 0; i < this.moneys.length; i++){
				this.moneys[i].display();
				let touched = this.moneys[i].checkTouch(this.player.getBasketPos()[0], this.player.getBasketPos()[1]);
				if(touched){
					this.coins[int(random(0, 3))].play();
					this.moneys.splice(i, 1);
					i -= 1;
				}
			}
			if(this.moneys.length > 1){
				if(this.moneys[0].checkOutofScreen()){
						this.moneys.shift();
				}
			}
		}
		else if(this.page == 4){
			if(frameCount % 30 == 0){
				let action = int(random(1,7));
				this.player.setStatus(action);
				this.stopAllSounds();
				this.notes[action - 1].play();
			}
		}
		// white blocks
		fill(255);
		rect(0, 0, width, 100);
		rect(0, height-150, width, 150);
		rect(0, 0, 110, height);
		rect(width-110, 0, 110, height);


		// Next, Prev button
		fill(0);
		if(this.page == 1){
			if(dist(mouseX, mouseY, width-60, height-50) < 30){
				textSize(45);
			}
			else{
				textSize(30);
			}
			text('다음', width-60, height - 50);
		}
		else if(this.page == 2 || this.page == 3){
			if(dist(mouseX, mouseY, width-60, height-50) < 30){
				textSize(45);
			}
			else{
				textSize(30);
			}
			text('다음', width-60, height - 50);
			if(dist(mouseX, mouseY, 60, height-50) < 30){
				textSize(45);
			}
			else{
				textSize(30);
			}
			text('이전', 60, height - 50);
		}
		else{
			if(dist(mouseX, mouseY, width-60, height-50) < 30){
				textSize(45);
			}
			else{
				textSize(30);
			}
			text('시작', width-60, height - 50);
			if(dist(mouseX, mouseY, 60, height-50) < 30){
				textSize(45);
			}
			else{
				textSize(30);
			}
			text('이전', 60, height - 50);
		}

		// comment
		textSize(30);
		text(this.comment, width/2, height-100);
	}
}