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
        this.speaker = new Speaker(graphicAssets['speaker']);
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

    // Judge user input if it's correct or not
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
            this.lightColor = [random(80,256), random(80,256), random(80,256)];
            this.lightOpacity = 100;
            this.notes[inputAction-1].play();
            this.player.playerCorrect();
            this.shiftQueue();
        }
        // wrong
        else{
            this.noise.play();
            this.player.playerWrong();
            this.garbages = [];
            for(let i = 0; i < 3; i++){
                this.garbages.push(new Garbage(this.garbageImgs[int(random(0, 4))]));
            }
        }
        this.timer = 100;
    }

    // play timer
    playTimer(){
        this.timer -= 1;
        if(this.timer < 0){
            this.noise.play();
            this.player.playerWrong();
            this.garbage = [];
            for(let i = 0; i < 3; i++){
                this.garbages.push(new Garbage(this.garbageImgs[int(random(0, 4))]));
            }
            this.timer = 100;
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
        // show player
        this.player.display();
        // throw garbages
        for(let i = 0; i < this.garbages.length; i++){
            this.garbages[i].display();
        }
        // show timer
        noStroke();
        fill(182,64,62);
        rect(40, 15, this.timer*7.7, 10);
        this.playTimer();
    }
}
