// scene
let currentScene = 'START_TOON';

// tutorial Scene
let tutorial;

// game controller
let gameController;
let gameScore;
let difficulty = 30000;

// immages
let graphicAssets = {};

// font
let gamefont;

// song
let soundEffects = {};

// toons
let introToonImgs = [];
let endToonAImgs = [];
let endToonBImgs = [];
let endToonCImgs = [];
let endToonFImgs = [];
let rankImgs = [];
let introToon;
let endToon;

// gameplay time
let startTime;

// scene transition
let blackOpacity = 0;
let inTransition = false;

function preload(){
  // load images
  let playerImgs = [];
  for(let i = 0; i <= 8; i++){
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
  let antImgs = [];
  for(let i = 1; i <= 3; i++){
    antImgs.push(loadImage('./assets/graphic/ant' + i + '.png'));
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
  graphicAssets['ant'] = antImgs;
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
  // load toons
  for(let i = 1; i <= 17; i++){
    introToonImgs.push(loadImage('./assets/toon/intro/intro' + i + '.png'));
  }
  for(let i = 1; i <= 8; i++){
    endToonAImgs.push(loadImage('./assets/toon/A/a' + i + '.png'));
  }
  for(let i = 1; i <= 11; i++){
    endToonBImgs.push(loadImage('./assets/toon/B/b' + i + '.png'));
  }
  for(let i = 1; i <= 7; i++){
    endToonCImgs.push(loadImage('./assets/toon/C/c' + i + '.png'));
  }
  for(let i = 1; i <= 10; i++){
    endToonFImgs.push(loadImage('./assets/toon/F/f' + i + '.png'));
  }
  for(let i = 1; i <= 4; i++){
    rankImgs.push(loadImage('./assets/graphic/rank' + i + '.jpg'));
  }
}

function setup() {
  createCanvas(843, 596);
  introToon = new Toon(gamefont, rankImgs);
  introToon.setToon(introToonImgs, rankImgs[0], -999, 'INTRO');
  endToon = new Toon(gamefont, rankImgs);
}

function keyPressed(){
  if(currentScene == 'TUTORIAL'){
    tutorial.judgeInput('KEY', keyCode);
  }
  else if(currentScene == 'GAME' && gameController.getPhase() != 3 && (49 <= keyCode && keyCode <= 52 || keyCode == 55)){
    gameController.judgeInput('KEY', keyCode);
  }
}

function mousePressed(){
  if(currentScene == 'START_TOON'){
    introToon.increaseIdx();
  }
  else if(currentScene == 'TUTORIAL'){
    if(dist(mouseX, mouseY, width-60, height-50) < 30){
      tutorial.goNextPage();
    }
    else if(dist(mouseX, mouseY, 60, height-50) < 30){
      tutorial.goPrevPage();
    }
    else{
      tutorial.updateMousePos(mouseX, mouseY, 'PRESS');
    }
  }
  else if(currentScene == 'GAME' && gameController.getPhase() != 3){
    gameController.updateMousePos(mouseX, mouseY, 'PRESS');
  }
  else if(currentScene == 'END_TOON'){
    endToon.increaseIdx();
    if(endToon.getReadyToStart()){
      onTransition();
    }
  }
}

function mouseReleased(){
  if(currentScene == 'TUTORIAL'){
    if(dist(mouseX, mouseY, width-60, height-50) > 30 && dist(mouseX, mouseY, 60, height-50) > 30){
      tutorial.updateMousePos(mouseX, mouseY, 'RELEASE');
      tutorial.judgeInput('MOUSE', 0);
    }
  }
  else if(currentScene == 'GAME' && gameController.getPhase() != 3){
    gameController.updateMousePos(mouseX, mouseY, 'RELEASE');
    gameController.judgeInput('MOUSE', 0);
  }
}

function changeScene(){
  switch(currentScene){
    case 'START_TOON' :
      currentScene = 'END_TOON';
      endToon.setToon(endToonFImgs, rankImgs[0], 0, 'F');
      // currentScene = 'TUTORIAL'; 
      // tutorial = new Tutorial(gamefont, graphicAssets, soundEffects);
      break;
    case 'TUTORIAL' :
      currentScene = 'GAME';
      gameController = new GameController(gamefont, graphicAssets, soundEffects);
      startTime = [minute(), second()];
      break;
    case 'GAME' :
      gameScore = gameController.getFinalScore();
      if(gameScore > difficulty * 3){
        endToon.setToon(endToonAImgs, rankImgs[0], gameScore, 'A');
      }
      else if(gameScore > difficulty * 2){
        endToon.setToon(endToonBImgs, rankImgs[1], gameScore, 'B');
      }
      else if(gameScore > difficulty){
        endToon.setToon(endToonCImgs, rankImgs[2], gameScore, 'C');
      }
      else{
        endToon.setToon(endToonFImgs, rankImgs[3], gameScore, 'F');
      }
      currentScene = 'END_TOON';
      break;
    case 'END_TOON' :
      gameController.initClassVar();
      startTime[0] = minute();
      startTime[1] = second();
      currentScene = 'GAME';
      break;
  }
}

function onTransition(){
  inTransition = true;
}
function offTransition(){
  inTransition = false;
}

function draw() {
  // draw scene
  switch(currentScene){
    case 'START_TOON' :
      background(255);
      introToon.display();
      if(introToon.getReadyToStart()){
        onTransition();
      }
      break;
    case 'TUTORIAL' :
      background(255);
      tutorial.display();
      if(tutorial.getEnd()){
        onTransition();
      }
      break;
    case 'GAME' : 
      gameController.display();
      // end timing
      if(minute() == (startTime[0] + 1) % 60 && second() == startTime[1]){
        gameController.readyEndGame();
      }
      // if gameController is ended
      if(gameController.getFinalEnd() && !inTransition){
        onTransition();
      }
      break;
    case 'END_TOON' :
      background(255);
      endToon.display();
      break;
  }
  // transition : go black and when black change the scene.
  if(inTransition){
    blackOpacity += 3;
    if(blackOpacity > 300){
      offTransition();
      changeScene();
    }
  }else{
    if(blackOpacity > 0){
      blackOpacity -= 3;
    }
  }
  fill(0, 0, 0, blackOpacity);
  rect(0, 0, width, height);
}