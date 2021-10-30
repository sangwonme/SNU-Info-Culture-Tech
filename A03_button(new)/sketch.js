// global variables
let title;
let colorCode;
let currentHue;

// objects
let buttons = [];
let shooters = [];

// emoji arrs
let redEmoji;
let greenEmoji;
let blueEmoji;
let tealEmoji;
let purpleEmoji;
let yelloEmoji;
let whiteEmoji;
let blackEmoji;

// declare colors
let black;
let white;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  // global var init
  title = true;
  colorCode = 111;
  currentHue = 0;
  // emoji set init
  redEmoji = ['🤬', '👹', '💋', '👠', '🦞', '🌹', '🍓', '🍎', '🥊', '🚗'];
  blueEmoji = ['🥶', '👖', '🧢', '🅿️', '🐳', '💧', '🔵', '🎽', '💎', '📘'];
  greenEmoji = ['🤢', '🐸', '🐢', '🐍', '🦎', '🌵', '🌲', '🍀', '🥦', '🔋'];
  tealEmoji = ['🧼', '💶', '⚗️', '🗽', '🧼', '💶', '⚗️', '🗽', '🗽'];
  purpleEmoji = ['👾', '☂️', '🍆', '🍇', '🔮', '💜', '🆔', '🟣', '🟪', '☔️'];
  yelloEmoji = ['👍', '🐥', '🐱', '🌝', '⭐️', '⚡️', '⚱️', '🍌', '🧀', '🔑'];
  whiteEmoji = ['👻', '🦷', '🧻', '🦢', '🐇', '✉️', '☁️', '🥚', '🥛', '🏐'];
  blackEmoji = ['🦨', '🌚', '🎱', '🎮', '🎥', '💣', '🔌', '📼', '🖤', '🌑'];
  // declare colors
  blacks = color(0, 0, 0);
  white = color(255, 255, 255);
  // colorMode HSB when title
  colorMode(HSB);
  // button objects
  buttons.push(new Button(width*0.3, height*0.8, 211));
  buttons.push(new Button(width*0.5, height*0.8, 121));
  buttons.push(new Button(width*0.7, height*0.8, 112));
  // shooters init for title
  let colorCodes = [111, 211, 121, 112, 221, 212, 122, 222];
  shooters.push(new EmojiShooter(random(0, width), random(0, height), colorCodes[int(random(0, 8))]));
  // hide cursor
  noCursor();
}

// decode color state to color and emoji arr
function decodeColor(color) {
  switch(color){
    case 111:
      return [blackEmoji, [0, 0, 0]];
    case 211:
      return [redEmoji, [255, 0, 0]];
    case 121:
      return [greenEmoji, [0, 255, 0]];
    case 112:
      return [blueEmoji, [0, 0, 255]];
    case 221:
      return [yelloEmoji, [255, 255, 0]];
    case 212:
      return [purpleEmoji, [255, 0, 255]];
    case 122:
      return [tealEmoji, [0, 255, 255]];
    case 222:
      return [whiteEmoji, [255, 255, 255]];
  }
}

class Button{
  constructor(posx, posy, colorCode){
    this.posx = posx;
    this.posy = posy;
    this.rgbValue = decodeColor(colorCode)[1];
    this.buttonWidth = width/10;
    this.buttonHeight = this.buttonWidth*0.6;
    this.isPressed = false;
    this.isMouseOn = false;
    this.illuminance = 80;
    this.goBright = true;
  }

  // return button press available region : (x1, x2, y1, y2)
  getButtonArea(){
    if(this.isPressed){
      return([
        this.posx - this.buttonWidth/2,
        this.posx + this.buttonWidth/2,
        this.posy - this.buttonHeight/2,
        this.posy + this.buttonHeight/2
      ]);
    }else{
      return([
        this.posx - this.buttonWidth/2, 
        this.posx + this.buttonWidth/2,
        this.posy - this.buttonHeight,
        this.posy + this.buttonHeight/2
      ]);
    }
  }

  getIsPressed(){
    return int(this.isPressed) + 1;
  }

  // toggle button
  toggle(){
    this.isPressed = !this.isPressed;
  }

  // display
  display(){
    // when button is not pressed, mouse is on button
    if(
      this.posx - this.buttonWidth/2 < mouseX &&
      mouseX < this.posx + this.buttonWidth/2 &&
      this.posy - this.buttonHeight < mouseY &&
      mouseY < this.posy + this.buttonHeight/2 &&
      !this.isPressed
      ){
        this.isMouseOn = true;
    }else{
      this.isMouseOn = false;
    }
    // draw button
    push();
    translate(this.posx, this.posy);
    stroke(0);
    strokeWeight(3);
    rectMode(CENTER);
    // draw button when it is pressed
    if(this.isPressed){
      this.illuminance = 250;
      fill(concat(this.rgbValue, this.illuminance));
      rect(0, 0, this.buttonWidth, this.buttonHeight);
      fill(0, 0, 0, 50);
      noStroke();
      rect(0, -this.buttonHeight*0.45, this.buttonWidth, this.buttonHeight*0.1);
    }
    // draw button when it is not pressed
    else{
      fill(255, 255, 255);
      rect(0, 0, this.buttonWidth, this.buttonHeight);
      rect(0, -this.buttonHeight/2, this.buttonWidth, this.buttonHeight);
      // if mouse is on -> make it glow
      if(this.isMouseOn){
        if(this.goBright){
          this.illuminance += 6;
          if(this.illuminance > 220){
            this.goBright = false;
          }
        }else{
          this.illuminance -= 6;
          if(this.illuminance < 80){
            this.goBright = true;
          }
        }
      }else{
        this.illuminance = 80;
      }
      fill(concat(this.rgbValue, this.illuminance));
      rect(0, -this.buttonHeight/2, this.buttonWidth, this.buttonHeight);
    }
    pop();
  }
}

// EmojiShooter
class EmojiShooter{
  constructor(posx, posy, colorCode){
    this.posx = posx;
    this.posy = posy;
    this.emojiSet = decodeColor(colorCode)[0];
    this.size = 10;
    this.emojis = [];
    for(let i = 0; i < 10; i ++){
      this.emojis.push(new Emoji(posx, posy, this.emojiSet[i]));
    }
  }

  // reset
  reset(){
    for(let i = 0; i < 10; i++){
      this.emojis[i].reset();
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
    noStroke();
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
  // title stage
  if(title){
    title = false;
    colorMode(RGB);
    shooters = [];
  }
  // not title stage
  else{
    // when mouse is in emoji area
    if(mouseY < height * 0.7){
      shooters.push([new EmojiShooter(mouseX, mouseY, colorCode), frameCount]);
    }
    // when mouse is in button area
    else{
      for(let i = 0; i < buttons.length; i++){
        areaRegion = buttons[i].getButtonArea();
        if(
          areaRegion[0] < mouseX &&
          mouseX < areaRegion[1] &&
          areaRegion[2] < mouseY &&
          mouseY < areaRegion[3]
        ){
          buttons[i].toggle(); // toggle
          // update color code
          colorCode = 100*buttons[0].getIsPressed() + 10*buttons[1].getIsPressed() + buttons[2].getIsPressed();
        }
      }
    }
  }
}

function keyPressed(){
  if(!title){
    title = true;
    colorMode(HSB);
    shooters = [];
    let colorCodes = [111, 211, 121, 112, 221, 212, 122, 222];
    shooters.push(new EmojiShooter(random(0, width), random(0, height), colorCodes[int(random(0, 8))]));
  }
}

// main
function draw() {
  // title stage
  print(title);
  if(title){
    // background : changing rainbow
    background(currentHue, 20, 255);
    if(currentHue <= 360){
      currentHue += 1;
    }else{
      currentHue = 0;
    }
    // reset emoji shooter
    if(frameCount % 120 == 0){
      shooters = [];
      let colorCodes = [111, 211, 121, 112, 221, 212, 122, 222];
      shooters.push(new EmojiShooter(random(0, width), random(0, height/2), colorCodes[int(random(0, 8))]));
    }
    // draw falling emojis
    shooters[0].display();
    // text
    let textTitle = 'COLOR OF EMOJI';
    let textDescription = `
    1. Press the buttons to set emoji's color.
    2. Click anywhere to shoot your emojis.
    3. Enjoy!
    `;
    textAlign(CENTER, CENTER);
    textSize(100);
    text(textTitle, width/2, height*0.2);
    textAlign(CENTER, CENTER);
    textSize(30);
    text(textDescription, width/2, height*0.5);
  }
  // main stage
  else{
    background(255);
    // draw falling emojis
    for(let i = 0; i < shooters.length; i++){
      shooters[i][0].display();
      // performance : delete shooter
      if(frameCount > shooters[i][1] + 120){
        shooters.shift();
      }
    }
    // draw table
    noStroke();
    rectMode(CORNER);
    fill(255);
    rect(0, height*0.7, width, height);
    stroke(0);
    strokeWeight(3);
    line(0, height*0.7, width, height*0.7);
    // draw buttons
    for(let i = 0; i < buttons.length; i++){
      buttons[i].display();
    }
    // show mouse
    let rgbValue = decodeColor(colorCode)[1];
    stroke(0);
    strokeWeight(1);
    fill(color(rgbValue));
    ellipse(mouseX, mouseY, 10, 10);
  }
}
