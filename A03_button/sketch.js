// color definition
let fillDarkBlue;
let fillLightBlue;
let strokeDarkBlue;
let white;
let strokeW;

// font definition
let cookieBold;
let cookieRegular;

// stage variable
const INIT = 0;
const ROBOT = 1;
let stage;

// position variable
let dashBoardY;
let buttonY;

// declare objects : buttons, robots
let btnElectric;
let btnLove;
let btnLight;
let btnGravity;

//--------------------------------------------------------
// font load
function preload() {
  cookieBold = loadFont('./assets/CookieRunBlack.ttf');
  cookieRegular = loadFont('./assets/CookieRunRegular.ttf');
}

//--------------------------------------------------------
// setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  // color, strokeWeight setting
  fillDarkBlue = color(60, 78, 248);
  fillLightBlue = color(194, 199, 254);
  strokeDarkBlue = color(52, 59, 78);
  white = color(255, 255, 255);
  strokeW = 3;
  // position setting
  dashBoardY = height*0.7;
  buttonY = height*0.85;
  // stage setting
  stage = INIT;
  // make buttons
  btnElectric = new Button(width/2, buttonY, 'electric');
  btnLove = new Button(width/2, buttonY, 'love');
  btnLight = new Button(width/2, buttonY, 'light');
  btnGravity = new Button(width/2, buttonY, 'gravity');
}

//--------------------------------------------------------
// class Button
class Button {
  constructor(posX, posY, type){
    this.x = posX;
    this.y = posY;
    this.w = width*0.1;
    this.h = width*0.05;
    this.z = width*0.03;
    this.type = type;
    this.isSelected = false;
    this.isPressed = false;
    this.isExplosion = false;
    this.glowing = 0;
  }

  setIsSelected(isSelected){
    this.isSelected = isSelected;
    if(isSelected){
      this.glowing += (this.glowing >= 100) ? -1 : 1;
    }else{
      this.glowing = 0
    }
  }

  setIsPressed(isPressed){
    this.isPressed = isPressed;
    if(isPressed && this.z > 10){
      this.z -= 1;
    }
  }

  drawMark(){
    switch(this.type){
      case 'electric':
        
        break;
      case 'love':
        break;
      case 'light':
        break;
      case 'gravity':
        break;
      default:
    }
  }

  display(){
    fill(fillLightBlue);
    stroke(strokeDarkBlue);
    strokeWeight(strokeW);
    push();
    translate(this.x, this.y);
    ellipse(0, 0, this.w, this.h);
    noStroke();
    rect(-this.w/2, -this.z, this.w, this.z);
    stroke(strokeDarkBlue);
    strokeWeight(strokeW);
    line(-this.w/2, -this.z, -this.w/2, 0);
    line(this.w/2, -this.z, this.w/2, 0);
    fill(white);
    ellipse(0, -this.z, this.w, this.h);
    pop();
  }
}

//--------------------------------------------------------
// class Robot
class Robot {
  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.damping = 1;
  }

  drawHead() {

  }

  drawBody() {

  }

  drawArms() {

  }

  drawLegs() {

  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

//--------------------------------------------------------
// draw things
function drawTitle(){
  // background
  background(fillDarkBlue);

  // text
  textFont(cookieBold);
  noStroke();
  fill(white);
  textSize(200);
  textAlign(CENTER, CENTER);
  text('로봇', width/2, height/2 - 120);
  textFont(cookieRegular);
  textSize(30);
  text('아무 곳이나 클릭해서 시작하세요', width/2, height/2 + 80);
  
}

function drawDashBoard(){
  stroke(strokeDarkBlue);
  strokeWeight(strokeW);
  line(0, dashBoardY, width, dashBoardY);
  btnElectric.display();
}

//--------------------------------------------------------
// initialize when key is pressed
function keyPressed(){
  // stage = INIT;
}

// mouse click event handler
function mouseClicked() {
  switch(stage){
    case INIT:
      stage = ROBOT;
      break;
    case ROBOT:
      break;
    default:

  }
}
  
//--------------------------------------------------------
// draw main
function draw() {
  switch(stage){
    case INIT:
      drawTitle();
      break;
    case ROBOT:
      background(white);
      drawDashBoard();
      break;
    default:
  }
}