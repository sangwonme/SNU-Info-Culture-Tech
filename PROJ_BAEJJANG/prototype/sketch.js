// immages
let plyaerImgs = [];
let backgroundImg;
let gamefont;
let gameController;
let player;
let test;

// song
let bgm;
let notes = [];
let chords = [];

function preload(){
  // load images
  for(let i = 1; i <= 5; i++){
    plyaerImgs.push(loadImage('./assets/' + i + '.png'));
  }
  backgroundImg = loadImage('./assets/background.png');
  // load font
  gamefont = loadFont('./assets/KOTRAHOPE_TTF.ttf');
  // load audio
  bgm = loadSound('./assets/audio/bgm.mp3');
  for(let i = 1; i <=6; i++){
    notes.push(loadSound('./assets/audio/N' + i + '.mp3'));
  }
  for(let i = 1; i <= 3; i++){
    chords.push(loadSound('./assets/audio/C' + i + '.mp3'));
  }
}

function setup() {
  createCanvas(843, 596);
  bgm.setVolume(0.5);
  bgm.play();
  gameController = new GameController(gamefont, plyaerImgs, notes, chords);
}

function keyPressed(){
  gameController.judgeInput('KEY', keyCode);
}

function mousePressed(){
  gameController.updateMousePos(mouseX, mouseY, 'PRESS');
}

function mouseReleased(){
  gameController.updateMousePos(mouseX, mouseY, 'RELEASE');
  gameController.judgeInput('MOUSE', 0);
}

function draw() {
  image(backgroundImg, 0, 0);
  gameController.display();
}