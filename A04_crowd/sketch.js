// objects
let bubbles = [];
let box;

function setup() {
  createCanvas(windowWidth * 0.4, windowHeight);
  box = new Box(width/2 - 40, height * 0.88, 3);
}

function drawOcean(){
  noFill();
  let c1 = color('#1c2028');
  let c2 = color('#0e3858');
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(c2, c1, inter);
    stroke(c);
    line(0, i, width, i);
  }
  fill(c2);
  noStroke();
  ellipse(width/2, height, 1000, height*0.2);
}

function draw() {
  drawOcean();

  box.display();

  if(bubbles.length > 0){
    for(let i = 0; i < bubbles.length; i++){
      bubbles[i].display();
    }
  }

}