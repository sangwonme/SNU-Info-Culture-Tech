// global variables
let title;

// emoji arrs
let redEmoji;
let greenEmoji;
let blueEmoji;

function setup() {
  createCanvas(900, 500);
  background(220);
  // global var init
  title = true;
  redEmoji = ['🤬', '👹', '💋', '👠', '🦞', '🌹', '🍓', '🍎', '🥊', '🚗'];
  test = new EmojiShooter(width/2, height/2, 0);
}

// EmojiShooter
class EmojiShooter{
  constructor(posx, posy, color){
    this.posx = posx;
    this.posy = posy;
    this.color = color;
    this.size = 10;
    this.emojis = [];
    for(let i = 0; i < 10; i ++){
      this.emojis.push(new Emoji(posx, posy, random(-2, 2), random(-3.5, 0.5), redEmoji[i]));
    }
  }

  // display
  display(){
    for(let i = 0; i < 10; i++){
      this.emojis[i].display();
    }
  };


}

// Emoji
class Emoji{
  constructor(offx, offy, velx, vely, emoji){
    this.reset(offx, offy, velx, vely, emoji);
  }

  // setup new dynamic
  reset(offx, offy, velx, vely, emoji){
    this.posx = offx;
    this.posy = offy;
    this.velx = velx;
    this.vely = vely;
    this.omega = random(-0.15, 0.15);
    this.ang = 0;
    this.emoji = emoji;
    this.gravity = 0.15;
  }

  // display
  display(){
    // print emoji
    push();
    translate(this.posx, this.posy);
    rotate(this.ang);
    textAlign(CENTER, CENTER);
    textSize(30);
    text(this.emoji, 0, 0);
    pop();
    // dynamic update
    this.vely += this.gravity;
    this.posx += this.velx;
    this.posy += this.vely;
    this.ang += this.omega;    
  }
}

// Event handler
function mouseClicked(){

}


function draw() {
  background(255);
  test.display();
}
