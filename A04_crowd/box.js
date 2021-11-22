class Box{
    constructor(px, py, scale){
        this.px = px;
        this.py = py;
        this.scale = scale;
        this.wl = 20 * this.scale;
        this.ws = 7 * this.scale;
        this.h = 10 * this.scale;
        this.bubbles = [];
        this.brightness = 100;
        this.maxbright = 200;
        this.minbright = 100;
    }

    display(){
        // top
        stroke(255);
        fill(this.brightness);
        ellipse(this.px+this.wl+this.ws, this.py-this.h/2, this.h, this.h);
        fill(this.brightness * 0.75);
        rect(this.px+this.ws, this.py-this.h, this.wl, this.h);
        // bubble
        if(this.bubbles.length > 0){
            for(let i = 0; i < this.bubbles.length; i++){
                this.bubbles[i].display();
            }
        }
        // front
        stroke(255);
        fill(this.brightness);
        rect(this.px, this.py, this.wl, this.h);
        rect(this.px+this.wl, this.py, this.ws, this.h);
        fill(this.brightness*0.4);
        stroke(this.brightness*0.4);
        ellipse(this.px+this.wl/2, this.py+this.h/2, this.wl/10, this.wl/10);
        // bubble in 0.2 prob
        if(frameCount % int(random(8, 11)) == 0 && random(0, 1) < 0.2){
            this.bubbles.push(new Bubble(this.px+this.wl/2, this.py+this.h/2));
            this.brightness = min(this.brightness + 20, this.maxbright);
        }
        else{
            this.brightness = max(this.brightness - 1, this.minbright);
        }
        // Mouse Event
        if(mouseIsPressed){
            if(
                (this.px < mouseX && mouseX < this.px+this.wl+this.ws && this.py < mouseY && mouseY < this.py + this.h) ||
                (this.px+this.ws < mouseX && mouseX < this.px+this.ws+this.wl && this.py-this.h < mouseY && mouseY < this.py) ||
                (dist(mouseX, mouseY, this.px+this.ws+this.wl, this.py-this.h/2) < this.h/2)
            ){
                this.bubbles.push(new Bubble(this.px+this.wl/2, this.py+this.h/2));
                this.brightness = min(this.brightness + 10, this.maxbright);
            }
        }

    }
}