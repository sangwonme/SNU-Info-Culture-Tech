class Garbage{
    constructor(img){
        this.img = img;
        this.ang = 0
        this.posX = int(random(0, 2)) * width;
        this.posY = random(height/2, height);
        this.omega = random(-0.15, 0.15);
        this.velX;
        this.size = 50;
        if(this.posX == 0){
            this.velX = random(0, 15);
        }
        else{
            this.velX = random(-15, 0);
        }
        this.velY = random(-10, -5);
        this.gravity = 0.15;
    }

    checkOutofScreen(){
        return (this.posX < 0 || this.posX > width);
    }

    display(){
        // show image
        push();
        translate(this.posX, this.posY);
        rotate(this.ang);
        imageMode(CENTER);
        image(this.img, 0, 0, 50, 50);
        // translate(-this.posX, -this.posY);
        pop();
        // dynamic update
        this.velY += this.gravity;
        this.posX += this.velX;
        this.posY += this.velY;
        this.ang += this.omega;
    }
}