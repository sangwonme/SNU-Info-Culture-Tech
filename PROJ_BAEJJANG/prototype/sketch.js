// immages
let player_imgs = [];
let backgorund_img;
let gamefont;
let gameController;
let player;
let test;

// song
let bgm;

function preload(){
  for(let i = 1; i <= 5; i++){
    player_imgs.push(loadImage('./assets/' + i + '.png'));
    print(player_imgs[i]);
  }
  backgorund_img = loadImage('./assets/background.png');
  print(backgorund_img);
  gamefont = loadFont('./assets/KOTRAHOPE_TTF.ttf');
  bgm = loadSound('./assets/bgm.mp3');
}

function setup() {
  createCanvas(843, 596);
  bgm.play();
  gameController = new GameController(gamefont, player_imgs);
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
  image(backgorund_img, 0, 0);
  gameController.display();
}