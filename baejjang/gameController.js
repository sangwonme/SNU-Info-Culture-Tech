class GameController{
    constructor(gamefont, graphicAssets, soundEffects){
        // score
        this.score = 0;
        this.combo = 0;
        this.phase = 0;
        // timer
        this.timer = 100;
        this.freeze = true;
        // end game
        this.readyEnd = false;
        this.actionEnd = false;
        this.finalEnd = false;
        // light opacity
        this.lightOpacity = 0;
        this.lightColor = [0, 0, 0];
        // init actionQueue
        this.actionQueue = [];
        this.initQueue();
        // mouse event
        this.mouseDownX = 0;
        this.mouseDownY = 0;
        this.mouseUpX = 0;
        this.mouseUpY = 0; 
        // font
        this.gamefont = gamefont;
        // graphic assets
        this.garbageImgs = graphicAssets['garbage'];
        this.moneyImgs = graphicAssets['money'];
        this.antImgs = graphicAssets['ant'];
        this.stageImg = graphicAssets['stage'];
        this.queueImg = graphicAssets['queuebar'];
        this.comboboxImg = graphicAssets['combobox'];
        // player
        this.player = new Player(graphicAssets['player']);
        // objects
        this.garbages = [];
        this.moneys = [];
        this.ant = [];
        this.stoppedAnts = 0;
        this.speaker = new Speaker(graphicAssets['speaker']);
        this.fire = new Fire(graphicAssets['smallfire'], graphicAssets['combofire'], 0);
        // bgm
        this.bgm = soundEffects['bgm'];
        this.bgmVolume = 0.5;
        // sound assets
        this.notes = soundEffects['notes'];
        this.chords = soundEffects['chords'];
        this.noise = soundEffects['noise'];
        this.coins = soundEffects['coins'];
        this.initVolume();
        // play bgm
        this.bgm.play();
    }

    // reset class var for replay
    initClassVar(){
        // score
        this.score = 0;
        this.combo = 0;
        this.phase = 0;
        // timer
        this.timer = 100;
        this.freeze = true;
        // end game
        this.readyEnd = false;
        this.actionEnd = false;
        this.finalEnd = false;
        // objects
        this.ant = [];
        this.stoppedAnts = 0;
        // light opacity
        this.lightOpacity = 0;
        this.lightColor = [0, 0, 0];
        // init actionQueue
        this.initQueue();
        // play bgm
        this.bgmVolume = 0.5;
        // audio mixing
        this.initVolume();
        // play bgm
        this.bgm.play();
    }

    // end game
    readyEndGame(){
        this.readyEnd = true;
    }
    endMusic(){
        this.actionEnd = true;
    }
    getFinalEnd(){
        return this.finalEnd;
    }
    getFinalScore(){
        return this.score;
    }

    // generate random action
    generateAction(){
        let actionNum = int(random(1,7));
        if(this.actionQueue.length > 0){
            let lastActionNum = this.actionQueue[this.actionQueue.length - 1];
            if(lastActionNum == 5 && actionNum == 5){
                actionNum = 6;
            }
            else if(lastActionNum == 6 && actionNum == 6){
                actionNum = 5;
            }
        }
        return actionNum;
    }

    // init action queue
    initQueue(){
        for(let i = 0; i < 11; i++){
            this.actionQueue.push(this.generateAction());
        }
    }

    // shift action queue
    shiftQueue(){
        if(!this.readyEnd){
            this.actionQueue.push(this.generateAction());
        }
        this.actionQueue.shift();
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

    // Audio Mixing
    initVolume(){
        this.bgm.setVolume(this.bgmVolume);
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
        for(let i = 0; i < this.chords.length; i++){
            this.chords[i].stop();
        }
        this.noise.stop();
    }

    setLightColor(){
        this.lightColor = [random(80,256), random(80,256), random(80,256)];
    }

    // Judge user input if it's correct or not
    judgeInput(inputType, inputKey){
        // if it's playing phase i.e. 0~2
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
        if(this.actionQueue[0] == inputAction || inputAction == 7){
            if(inputAction == 7){
                inputAction = 1;
            }
            this.setLightColor();
            this.lightOpacity = 100;
            this.notes[inputAction-1].play();
            this.player.playerCorrect(inputAction);
            this.combo += 1;
            this.setPhase();
            this.score += (parseInt(this.combo/25)*3 + this.phase + 1) * 100;
        }
        // wrong
        else{
            this.fail();
        }
        // shift queue
        this.shiftQueue();
        if(this.actionQueue.length == 0){
            this.endMusic();
        }
        // reset timer
        this.timer = 100;
        this.freeze = false;
    }

    // play timer
    playTimer(){
        // set timer speed depend on current phase
        let timerSpeed;
        if(this.phase == 3){
            timerSpeed = 0.2;
        }else{
            timerSpeed = 1 + 0.5 * this.phase;
        }
        // if end just stop timer
        if(this.actionEnd){
            timerSpeed = 0;
        }
        // if freeze stop timer
        if(this.freeze){
            timerSpeed = 0;
        }
        this.timer -= timerSpeed;
        // when time is over
        if(this.timer < 0){
            if(this.phase < 3){
                this.fail();
            }else{
                this.combo += 1;
                this.setPhase();
                this.moneys = [];
                this.player.setStatus(1);
                this.player.initPos();
                this.timer = 100;
                this.freeze = true;
            }
        }
    }

    // success or fail
    fail(){
        this.combo = 0;
        this.setPhase();
        this.noise.play();
        this.player.playerWrong();
        this.garbage = [];
        for(let i = 0; i < 3; i++){
            this.garbages.push(new Garbage(this.garbageImgs[int(random(0, 4))]));
        }
        if(this.score > 0){
            this.score -= 50;
        }
        this.timer = 100;
    }

    // change phase
    setPhase(){
        if(this.combo == 0 || (0 < this.combo % 25  && this.combo % 25 <= 4)){
            this.phase = 0;
        }
        else if(4 < this.combo % 25 && this.combo % 25 <= 14){
            this.phase = 1;
        }
        else if(14 < this.combo % 25 && this.combo % 25 <= 25){
            this.phase = 2;
        }
        else if(this.readyEnd){
            this.phase = this.phase;
        }
        else{
            this.player.setStatus(7);
            this.phase = 3;
        }
    }

    // get phase
    getPhase(){
        return this.phase;
    }

    // add new money to list
    addMoney(){
        if(frameCount % 50 == 0){
            let tmp = int(random(1, 3));
            this.moneys.push(new Money(this.moneyImgs[tmp-1], 0.5*tmp, 1000*tmp));
        }
    }

    // sort ant
    sortAnt(a, b){
        if(a.getPosY() < b.getPosY()){
            return -1;
        }
        if(a.getPosY() > b.getPosY()){
            return 1;
        }
        return 0;
    }


    // display assets
    display(){
        // imageMode
        imageMode(CORNER);
        // when end(action queue is empty), fadeout music
        if(this.actionEnd && !this.finalEnd){
            if(frameCount % 20 == 0){
                this.bgmVolume -= 0.03;
            }
            this.bgm.setVolume(this.bgmVolume);
        }
        if(this.bgmVolume < 0.01){
            this.bgmVolume = 0;
            this.bgm.stop();
            this.finalEnd = true;
        }

        // stage img
        image(this.stageImg, 0, 0, 843, 596);
        this.speaker.display();
        
        // light
        noStroke();
        fill(this.lightColor[0], this.lightColor[1], this.lightColor[2], this.lightOpacity);
        rect(0, 0, width, height);
        this.lightOpacity -= 5;

        // show fire
        let firePhase;
        if(this.combo > 50){
            firePhase = 2;
        }else{
            firePhase = this.phase;
        }
        this.fire.setPhase(firePhase);
        this.fire.display();

        // show player
        if(this.phase == 3){
            if(keyIsDown(65)){
                this.player.moveLeft();
            }
            if(keyIsDown(68)){
                this.player.moveRight();
            }
        }
        this.player.display();

        // throw garbages
        for(let i = 0; i < this.garbages.length; i++){
            this.garbages[i].display();
        }

        // ants
        if(frameCount % 100 == 0){
            this.ant.push(new Ant(this.antImgs, pow(-1, int(random(1, 3)))));
            this.ant.sort(this.sortAnt);
        }
        for(let i = 0; i < this.ant.length; i++){
            if(parseInt(this.score/2500) > this.stoppedAnts){
                if(!this.ant[i].getStop()){
                    this.ant[i].stopAnt();
                    this.stoppedAnts += 1;
                }
            }
            // display ant
            this.ant[i].display();
            // delete ant
            if(this.ant[i].checkOutofScreen()){
                this.ant.splice(i, 1);
                i -= 1;
            }
        }
        
        imageMode(CORNER);
        if(this.phase < 3){            
            // queue img
            image(this.queueImg, 0, -20, 843, 190);
            // show actions queue
            for(let i = 0; i < this.actionQueue.length; i++){
                if(i == 0){
                    fill(255, 0,0);
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
                text(action, 60+width*(i/12), height*0.1);
            }
        }
        else{
            // show money
            this.addMoney();
            for(let i = 0; i < this.moneys.length; i++){
                this.moneys[i].display();
                let touched = this.moneys[i].checkTouch(this.player.getBasketPos()[0], this.player.getBasketPos()[1]);
                if(touched){
                    this.score += this.moneys[i].getScore(); 
                    this.coins[int(random(0, 3))].play();
                    this.moneys.splice(i, 1);
                    i -= 1;
                }
            }
            // this.moneys = this.moneys.splice(touchedIdx, 1);
            if(this.moneys.length > 1){
                if(this.moneys[0].checkOutofScreen()){
                    this.moneys.shift();
                }
            }
            // light
            noStroke();
            if(frameCount % 30 == 0){
                this.setLightColor();
                this.lightOpacity = 100;
            }
            fill(this.lightColor[0], this.lightColor[1], this.lightColor[2], this.lightOpacity);
            rect(0, 0, width, height);
            this.lightOpacity -= 0.03;
        }

        // show timer
        noStroke();
        fill(182,64,62);
        rect(40, 15, this.timer*7.7, 10);
        this.playTimer();

        // show combo & score
        image(this.comboboxImg, 15, 480, 150, 100);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(30);
        textFont(this.gamefont);
        text('콤보 : ' + this.combo, 85, 515);
        textSize(25);
        text(this.score, 85, 550);
    }
}
