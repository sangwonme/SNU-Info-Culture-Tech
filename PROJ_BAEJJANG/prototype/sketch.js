// game controller
let gameController;

// immages
let graphicAssets = {};
let backgroundImg;

// font
let gamefont;

// song
let bgm;
let soundEffects = {};

function preload(){
  // load images
  backgroundImg = loadImage('./assets/background.png');
  let playerImgs = [];
  for(let i = 1; i <= 5; i++){
    playerImgs.push(loadImage('./assets/' + i + '.png'));
  }
  let garbageImgs = [];
  for(let i = 0; i <= 3; i++){
    garbageImgs.push(loadImage('./assets/graphic/garbage' + i + '.png'));
  }
  let moneyImgs = [];
  for(let i = 1; i <= 2; i++){
    moneyImgs.push(loadImage('./assets/graphic/money' + i + '.png'));
  }
  graphicAssets['player'] = playerImgs;
  graphicAssets['garbage'] = garbageImgs;
  graphicAssets['money'] = moneyImgs;
  // load font
  gamefont = loadFont('./assets/KOTRAHOPE_TTF.ttf');
  // load audio
  bgm = loadSound('./assets/audio/bgm.mp3');
  let notes = [];
  let chords = [];
  for(let i = 1; i <=6; i++){
    notes.push(loadSound('./assets/audio/N' + i + '.mp3'));
  }
  for(let i = 1; i <= 3; i++){
    chords.push(loadSound('./assets/audio/C' + i + '.mp3'));
  }
  soundEffects['notes'] = notes;
  soundEffects['chords'] = chords;
  soundEffects['noise'] = loadSound('./assets/audio/amp_noise.mp3');
}

function setup() {
  createCanvas(843, 596);
  bgm.setVolume(0.5);
  bgm.play();
  gameController = new GameController(gamefont, graphicAssets, soundEffects);
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