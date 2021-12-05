// mode
let mode = 'GAME';

// game controller
let gameController;

// immages
let graphicAssets = {};

// font
let gamefont;

// song
let soundEffects = {};

function preload(){
  // load images
  let playerImgs = [];
  for(let i = 0; i <= 6; i++){
    playerImgs.push(loadImage('./assets/graphic/p' + i + '_1.png'));
    playerImgs.push(loadImage('./assets/graphic/p' + i + '_2.png'));
  }
  let garbageImgs = [];
  for(let i = 0; i <= 3; i++){
    garbageImgs.push(loadImage('./assets/graphic/garbage' + i + '.png'));
  }
  let moneyImgs = [];
  for(let i = 1; i <= 2; i++){
    moneyImgs.push(loadImage('./assets/graphic/money' + i + '.png'));
  }
  let speakerImgs = [];
  for(let i = 1; i <= 3; i++){
    speakerImgs.push(loadImage('./assets/graphic/speaker' + i + '.png'));
  }
  let smallfireImgs = [];
  for(let i = 1; i <= 4; i++){
    smallfireImgs.push(loadImage('./assets/graphic/smallfire' + i + '.png'));
  }
  let combofireImgs = [];
  for(let i = 1; i <= 4; i++){
    combofireImgs.push(loadImage('./assets/graphic/combofire' + i + '.png'));
  }  
  graphicAssets['player'] = playerImgs;
  graphicAssets['garbage'] = garbageImgs;
  graphicAssets['money'] = moneyImgs;
  graphicAssets['speaker'] = speakerImgs;
  graphicAssets['smallfire'] = smallfireImgs;
  graphicAssets['combofire'] = combofireImgs;
  graphicAssets['queuebar'] = loadImage('./assets/graphic/queuebar.png');
  graphicAssets['combobox'] = loadImage('./assets/graphic/combobox.png');
  graphicAssets['stage'] = loadImage('./assets/graphic/stage.png');
  // load font
  gamefont = loadFont('./assets/BMKIRANGHAERANG-TTF.ttf');
  // load audio
  let notes = [];
  let chords = [];
  for(let i = 1; i <=6; i++){
    notes.push(loadSound('./assets/audio/N' + i + '.mp3'));
  }
  for(let i = 1; i <= 3; i++){
    chords.push(loadSound('./assets/audio/C' + i + '.mp3'));
  }
  soundEffects['bgm'] = loadSound('./assets/audio/bgm.mp3');
  soundEffects['notes'] = notes;
  soundEffects['chords'] = chords;
  soundEffects['noise'] = loadSound('./assets/audio/amp_noise.mp3');
}

function setup() {
  createCanvas(843, 596);
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
  switch(mode){
    case 'GAME' : 
      gameController.display();
  }
}