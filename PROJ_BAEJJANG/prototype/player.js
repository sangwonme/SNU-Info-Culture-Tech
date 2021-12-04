class Player{
    constructor(imgs){
        this.playerImgs = imgs;
        this.size = 220;
        this.playerStatus = 1;
        this.idx = this.playerStatus * 2;
    }

    playerCorrect(inputAction){
        this.playerStatus = inputAction;
        this.idx = this.playerStatus * 2;
    }

    playerWrong(){
        this.playerStatus = 0;
        this.idx = 0;
    }

    display(){
        if(frameCount % 8 == 0){
            if(this.idx % 2 == 0){
                this.idx += 1;
            }else{
                this.idx -= 1;
            }
        }
        image(this.playerImgs[this.idx], width/2 - 110, height/2 - 160, this.size, this.size);
    }
}