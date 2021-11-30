class GameController{
    constructor(gamefont, playerImgs, notes, chords){
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
        this.notes = notes;
        this.chords = chords;
        this.noteSequence;
        this.noteIdx = 0;
        this.initNoteSequence();
    }

    generateAction(){
        let actionNum = int(random(1,7));
        let nextAction;
        if(actionNum <= 4){
            nextAction = String(actionNum);
        }
        else if(actionNum == 5){
            nextAction = '↑';
        }
        else if(actionNum == 6){
            nextAction = '↓';
        }
        return nextAction;
    }

    initQueue(){
        for(let i = 0; i < 11; i++){
            this.actionQueue.push(this.generateAction());
        }
    }

    shiftQueue(){
        this.actionQueue.push(this.generateAction());
        this.actionQueue.shift();
    }

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
    
    stopAllSounds(){
        for(let i = 0; i < this.notes.length; i++){
            this.notes[i].stop();
        }
        for(let i = 0; i < this.chords.length; i++){
            this.chords[i].stop();
        }
    }

    initNoteSequence(){
        this.noteSequence = [];
        let ns1 = [5, 3, 4, 2, 3, 4, 1, 2, 3, 0];
        let ns2 = [2, 2, 3, 1, 4, 2, 3];
        let ns3 = [0, 2, 0, 0, 1];
        let patterns = 2;
        let r = random(0, 1);
        if(r < 1/patterns){
            this.noteSequence = ns1;
        }
        else if(1/patterns < r < 2/patterns){
            this.noteSequence = ns2;
        }else{
            this.noteSequence = ns3;
        }
        print(r);
        print(this.noteSequence);
    }

    judgeInput(inputType, inputKey){
        let inputAction;
        this.stopAllSounds();
        if(inputType == 'MOUSE'){
            if(this.mouseUpY - this.mouseDownY < -50){
                inputAction = '↑';
            }
            else if(this.mouseDownY - this.mouseUpY < -50){
                inputAction = '↓';
            }
        }
        else if(inputType == 'KEY'){
            inputAction = inputKey - 48;
        }
        if(this.actionQueue[0] == inputAction){
            this.notes[this.noteSequence[this.noteIdx]].play();
            this.noteIdx ++;
            if(this.noteIdx == this.noteSequence.length){
                this.noteIdx = 0;
                this.initNoteSequence();
            }
            this.player.playerCorrect();
            this.shiftQueue();
        }else{
            this.initNoteSequence();
            this.player.playerWrong();
        }
    }

    display(){
        // show actions queue
        for(let i = 0; i < this.actionQueue.length; i++){
            if(i == this.actionQueue.length - 1){
                fill(255, 0,0);
            }
            else{
                fill(0);
            }
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(30);
            textFont(this.gamefont);
            text(this.actionQueue[this.actionQueue.length - i - 1], 80+width*(i/12), height*0.11);
        }
        // player
        this.player.display();
    }
}