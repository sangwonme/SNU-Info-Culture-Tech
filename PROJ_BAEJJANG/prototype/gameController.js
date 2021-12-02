class GameController{
    constructor(gamefont, playerImgs, soundEffects){
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
        this.player = new Player(playerImgs);
        // sounds
        this.notes = soundEffects['notes'];
        this.chords = soundEffects['chords'];
        this.noise = soundEffects['noise'];
        this.initVolume();
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
        this.noise.setVolume(3);
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
        if(this.actionQueue[0] == inputAction){
            this.notes[inputAction-1].play();
            this.player.playerCorrect();
            this.shiftQueue();
        }else{
            this.noise.play();
            this.player.playerWrong();
        }
    }

    // display assets
    display(){
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
            text(action, 80+width*(i/12), height*0.1);
        }
        // show player
        this.player.display();
    }
}
