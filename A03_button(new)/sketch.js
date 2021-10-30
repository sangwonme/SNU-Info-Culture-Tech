// global variables
let title;
let shooters = [];
let colorCode;

// emoji arrs
let redEmoji;
let greenEmoji;
let blueEmoji;
let tealEmoji;
let purpleEmoji;
let yelloEmoji;
let whiteEmoji;
let blackEmoji;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  // global var init
  title = true;
  colorCode = 100;
  // emoji set init
  redEmoji = ['🤬', '👹', '💋', '👠', '🦞', '🌹', '🍓', '🍎', '🥊', '🚗'];
  blueEmoji = ['🥶', '👖', '🧢', '🅿️', '🐳', '💧', '🔵', '🎽', '💎', '📘'];
  greenEmoji = ['🤢', '🐸', '🐢', '🐍', '🦎', '🌵', '🌲', '🍀', '🥦', '🔋'];
  tealEmoji = ['🧼', '💶', '⚗️', '🗽', '🧼', '💶', '⚗️', '🗽', '🗽'];
  purpleEmoji = ['👾', '☂️', '🍆', '🍇', '🔮', '💜', '🆔', '🟣', '🟪', '☔️'];
  yelloEmoji = ['👍', '🐥', '🐱', '🌝', '⭐️', '⚡️', '⚱️', '🍌', '🧀', '🔑'];
  whiteEmoji = ['👻', '🦷', '🧻', '🦢', '🐇', '✉️', '☁️', '🥚', '🥛', '🏐'];
  blackEmoji = ['🦨', '🌚', '🎱', '🎮', '🎥', '💣', '🔌', '📼', '🖤', '🌑'];
  // hide cursor
  noCursor();
}

// decode color state to color and emoji arr
function decodeColor(color) {
  switch(color){
    case 000:
      return [blackEmoji, [0, 0, 0]];
    case 100:
      return [redEmoji, [255, 0, 0]];
    case 010:
      return [greenEmoji, [0, 255, 0]];
    case 001:
      return [blueEmoji, [0, 0, 255]];
    case 110:
      return [yelloEmoji, [255, 255, 0]];
    case 101:
      return [purpleEmoji, [255, 0, 255]];
    case 011:
      return [tealEmoji, [0, 255, 255]];
    case 111:
      return [whiteEmoji, [255, 255, 255]];
  }
}

// EmojiShooter
class EmojiShooter{
  constructor(posx, posy, color){
    this.posx = posx;
    this.posy = posy;
    this.emojiSet = decodeColor(color)[0];
    this.size = 10;
    this.emojis = [];
    for(let i = 0; i < 10; i ++){
      this.emojis.push(new Emoji(posx, posy, this.emojiSet[i]));
    }
  }

  // display
  display(){
    for(let i = 0; i < 10; i++){
      this.emojis[i].display();
    }
  }
}

// Emoji
class Emoji{
  constructor(offx, offy, emoji){
    this.reset(offx, offy, emoji);
  }

  // setup new dynamic
  reset(offx, offy, emoji){
    this.posx = offx;
    this.posy = offy;
    this.velx = random(-3, 3);
    this.vely = random(-3.5, 0.5);
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
    textSize(55);
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
function mousePressed(){
  shooters.push([new EmojiShooter(mouseX, mouseY, colorCode), frameCount]);
}

// main
function draw() {
  background(255);
  // show mouse
  let rgbValue = decodeColor(colorCode)[1];
  fill(color(rgbValue));
  ellipse(mouseX, mouseY, 10, 10);
  for(let i = 0; i < shooters.length; i++){
    shooters[i][0].display();
    // performance : delete shooter
    if(frameCount > shooters[i][1] + 150){
      shooters.shift();
    }
  }
  print(shooters.length);
}
