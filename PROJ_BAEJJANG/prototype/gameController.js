class GameController{
    constructor(gamefont, graphicAssets, soundEffects){
        // init actionQueue
        this.actionQueue = [];
        this.initQueue();
        // font
        this.gamefont = gamefont;
        // mouse event
        this.mouseDownX = 0;
        this.mouseDownY = 0;
        this.mouseUpX = 0;
        this.mouseUpY = 0;
        // player
        this.player = new Player(graphicAssets['player']);
        // graphic assets
        this.garbageImgs = graphicAssets['garbage'];
        this.moneyImgs = graphicAssets['money'];
        this.stageImg = graphicAssets['stage'];
        this.queueImg = graphicAssets['queuebar'];
        // objects
        this.garbages = [];
        this.moneys = [];
        this.speaker = new Speaker(graphicAssets['speaker']);
        this.fire = new Fire(graphicAssets['smallfire'], graphicAssets['combofire'], 0);
        // bgm
        this.bgm = soundEffects['bgm'];
        // sound assets
        this.notes = soundEffects['notes'];
        this.chords = soundEffects['chords'];
        this.noise = soundEffects['noise'];
        this.initVolume();
        // timer
        this.timer = 100;
        // light opacity
        this.lightOpacity = 0;
        this.lightColor = [0, 0, 0];
        // play bgm
        this.bgm.play();
        // score
        this.score = 0;
        this.combo = 0;
        this.phase = 0;
    }

    // generate random action
    generateAction(){
        return int(random(1,7));
    }

    // init action queue
    initQueue(){
        for(let i = 0; i < 11; i++){
            this.actionQueue.push(this.generateAction());
        }
    }

    // shift action queue
    shiftQueue(){
        this.actionQueue.push(this.generateAction());
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
        this.bgm.setVolume(0.5);
        for(let i = 0; i < this.notes.length; i++){
            this.notes[i].setVolume(0.5);
        }
        this.noise.setVolume(7);
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
        // break if it's money phase
        if(this.phase == 3){
            return;
        }
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
            this.combo += 1;
            this.setPhase();
            this.setLightColor();
            this.lightOpacity = 100;
            this.notes[inputAction-1].play();
            this.player.playerCorrect(inputAction);
            this.shiftQueue();
        }
        // wrong
        else{
            this.fail();
        }
        this.timer = 100;
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
        this.timer -= timerSpeed;
        // when time is over
        if(this.timer < 0){
            if(this.phase < 3){
                this.fail();
            }else{
                this.combo = 0;
                this.setPhase();
                this.player.playerCorrect(1);
                this.timer = 100;
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
        this.timer = 100;
    }

    // change phase
    setPhase(){
        if(this.combo < 10){
            this.phase = 0;
        }
        else if(9 < this.combo && this.combo <= 29){
            this.phase = 1;
        }
        else if(29 < this.combo && this.combo <= 50){
            this.phase = 2;
        }
        else{
            this.phase = 3;
        }
    }

    addMoney(){
        if(frameCount % 50 == 0){
            let tmp = int(random(1, 3));
            this.moneys.push(new Money(this.moneyImgs[tmp-1], 0.5*tmp, 100*tmp));
        }
    }

    // display assets
    display(){
        // stage img
        image(this.stageImg, 0, 0, 843, 596);
        this.speaker.display();
        
        // light
        noStroke();
        fill(this.lightColor[0], this.lightColor[1], this.lightColor[2], this.lightOpacity);
        rect(0, 0, width, height);
        this.lightOpacity -= 5;

        // show fire
        this.fire.setPhase(this.phase);
        this.fire.display();
        // show player
        this.player.display();

        // throw garbages
        for(let i = 0; i < this.garbages.length; i++){
            this.garbages[i].display();
        }
        
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
    }
}
