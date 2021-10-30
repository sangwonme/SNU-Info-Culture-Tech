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
  red1 = new Emoji(width/2, height/2, 2, -2, redEmoji[1]);
  red2 = new Emoji(width/2, height/2, -1, -2, redEmoji[2]);
}

// EmojiShooter
class EmojiShooter{
  constructor(){

  }
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

function draw() {
  background(255);
  red1.display();
  red2.display();
}
