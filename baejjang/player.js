class Player{
    constructor(imgs){
        this.playerImgs = imgs;
        this.size = 220;
        this.playerStatus = 1;
        this.idx = this.playerStatus * 2;
        this.posX = 0;
        this.posY = 0;
    }

    playerCorrect(inputAction){
        this.playerStatus = inputAction;
        this.idx = this.playerStatus * 2;
    }

    playerWrong(){
        this.playerStatus = 0;
        this.idx = 0;
    }

    moveLeft(){
        if(this.playerStatus != 8){
            this.setStatus(8);
        }
        this.posX -= 5;
    }
    moveRight(){
        if(this.playerStatus != 7){
            this.setStatus(7);
        }
        this.posX += 5;
    }
    setStatus(status){
        this.playerStatus = status;
        this.idx = status * 2;
    }
    
    initPos(){
        this.posX = 0;
        this.posY = 0;
    }

    getBasketPos(){
        let offset;
        if(this.playerStatus == 7){
            offset = 30;
        }
        else if(this.playerStatus == 8){
            offset = -15;
        }
        let x = this.posX + width/2 + offset;
        let y = this.posY + 160;
        return [x, y];
    }

    display(){
        if(frameCount % 8 == 0){
            if(this.idx % 2 == 0){
                this.idx += 1;
            }else{
                this.idx -= 1;
            }
        }
        image(this.playerImgs[this.idx], width/2 - 110 + this.posX, height/2 - 160 + this.posY, this.size, this.size);
    }
}