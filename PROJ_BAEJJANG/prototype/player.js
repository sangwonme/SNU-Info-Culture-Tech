class Player{
    constructor(imgs){
        this.playerImgs = imgs;
        this.size = 220;
        this.playerStatus = 0;
    }

    playerCorrect(){
        this.playerStatus = int(random(1, 4));
    }

    playerWrong(){
        this.playerStatus = 4;
    }

    display(){
        image(this.playerImgs[this.playerStatus], width/2 - 110, height/2 - 160, this.size, this.size);
    }
}