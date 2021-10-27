// color definition
let fillDarkBlue;
let fillLightBlue;
let strokeDarkBlue;
let white;

// font definition
let cookieBold;
let cookieRegular;

// stage variable
const INIT = 0;
const CHARGE = 1;
const LOVE = 2;
let stage;

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
  // color setting
  fillDarkBlue = color(60, 78, 248);
  fillLightBlue = color(194, 199, 254);
  strokeDarkBlue = color(52, 59, 78);
  white = color(255, 255, 255);
  // stage setting
  stage = INIT;
}

//--------------------------------------------------------
// class Robot
class Robot {
  constructor(posX, posY, isHeart) {
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
// draw stage INIT
function drawStageInit(){
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

//--------------------------------------------------------
// initialize when key is pressed
function keyPressed(){
  stage = INIT;
}

// mouse click event handler
function mouseClicked() {
  switch(stage){
    case INIT:
      stage = CHARGE;
      break;
    default:

  }
}
  
//--------------------------------------------------------
// draw main
function draw() {
  switch(stage){
    case INIT:
      drawStageInit();
      break;
    default:
  }
}