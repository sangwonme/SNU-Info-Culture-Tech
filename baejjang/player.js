class Player{
    constructor(imgs, size){
        this.playerImgs = imgs;
        this.factor = size;
        this.size = 220 * size;
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
        if(this.posX > -width/2 && this.factor == 1){
            this.posX -= 5;
        }
        if(this.posX > -width/2 + 160 && this.factor < 1){
            this.posX -= 5*this.factor;
        }
    }
    moveRight(){
        if(this.playerStatus != 7){
            this.setStatus(7);
        }
        if(this.posX < width/2 && this.factor == 1){
            this.posX += 5;
        }
        if(this.posX < width/2 - 160 && this.factor < 1){
            this.posX += 5*this.factor;
        }
    }
    setStatus(status){
        this.playerStatus = status;
        this.idx = status * 2;
    }
    getStatus(){
        return this.playerStatus;
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
        if(this.factor < 1){
            x -= 20;
            y += 20;
        }
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