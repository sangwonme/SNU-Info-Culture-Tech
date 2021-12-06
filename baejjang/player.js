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
        this.playerStatus = 8;
        this.posX -= 5;
        this.idx = 15;
    }
    moveRight(){
        this.playerStatus = 7;
        this.posX += 5;
        this.idx = 14;
    }
    setStatus(status){
        this.playerStatus = status;
        this.idx = status * 2;
        if(status == 7){
            this.idx = 14;
        }
        else if(status == 8){
            this.idx = 15;
        }
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
        if(this.playerStatus <= 6 && frameCount % 8 == 0){
            if(this.idx % 2 == 0){
                this.idx += 1;
            }else{
                this.idx -= 1;
            }
        }
        image(this.playerImgs[this.idx], width/2 - 110 + this.posX, height/2 - 160 + this.posY, this.size, this.size);
    }
}