// mode
let mode;
let nextScene;

// game controller
let gameController;

// immages
let graphicAssets = {};

// font
let gamefont;

// song
let soundEffects = {};

// gameplay time
let startTime;

// scene transition
let blackOpacity = 0;
let inTransition = false;
let transitionStartTime;

function preload(){
  // load images
  let playerImgs = [];
  for(let i = 0; i <= 7; i++){
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
  for(let i = 1; i <=6; i++){
    notes.push(loadSound('./assets/audio/N' + i + '.mp3'));
  }
  let chords = [];
  for(let i = 1; i <= 3; i++){
    chords.push(loadSound('./assets/audio/C' + i + '.mp3'));
  }
  let coins = [];
  for(let i = 1; i <= 3; i++){
    coins.push(loadSound('./assets/audio/coin' + i + '.mp3'));
  }
  soundEffects['notes'] = notes;
  soundEffects['chords'] = chords;
  soundEffects['coins'] = coins;
  soundEffects['bgm'] = loadSound('./assets/audio/bgm.mp3');
  soundEffects['noise'] = loadSound('./assets/audio/amp_noise.mp3');
}

function setup() {
  createCanvas(843, 596);
  gameController = new GameController(gamefont, graphicAssets, soundEffects);
  changeMode('GAME');
}

function keyPressed(){
  if(gameController.getPhase() != 3 && (49 <= keyCode && keyCode <= 52 || keyCode == 55)){
    gameController.judgeInput('KEY', keyCode);
  }
}

function mousePressed(){
  if(gameController.getPhase() != 3){
    gameController.updateMousePos(mouseX, mouseY, 'PRESS');
  }
}

function mouseReleased(){
  if(gameController.getPhase() != 3){
    gameController.updateMousePos(mouseX, mouseY, 'RELEASE');
    gameController.judgeInput('MOUSE', 0);
  }
}

function changeMode(m){
  mode = m;
  startTime = [minute(), second()];
}

function onTransition(){
  inTransition = true;
  transitionStartTime = second();
  print(transitionStartTime);
}
function offTransition(){
  inTransition = false;
}

function draw() {
  // draw scene
  switch(mode){
    case 'GAME' : 
      gameController.display();
      // end timing
      if(minute() == (startTime[0] + 1) % 60 && second() == startTime[1]){
        gameController.readyEndGame();
      }
      // if gameController is ended, transition to nextScene
      if(gameController.getFinalEnd() && !inTransition){
        onTransition();
        nextScene = 'END_TOON';
      }
      break;
    case 'END_TOON' :
      fill(255, 0, 0);
      rect(0, 0, width, height);
      break;
  }
  // transition
  if(inTransition){
    blackOpacity += 3;
    if(second() == (transitionStartTime + 3) % 60){
      offTransition();
      changeMode(nextScene);
    }
  }else{
    if(blackOpacity > 0){
      blackOpacity -= 3;
    }
  }
  print(blackOpacity, inTransition);
  fill(0, 0, 0, blackOpacity);
  rect(0, 0, width, height);
}