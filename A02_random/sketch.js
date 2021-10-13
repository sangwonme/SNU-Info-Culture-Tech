function setup() {
  createCanvas(2000, 900);
  colorMode(HSB);
}

function drawBackground(){
  background(205);
  noStroke();
  fill(0);
  ellipse(width/2, height, width*2, height*0.5);
}

function drawSingleEye(eyeSize, eyeFill){
  // pos to center
  let posX = width/2;
  let posY = height/2;
  // set color
  strokeWeight(3);
  stroke(eyeFill);
  fill(255);
  // draw eye (big ellipse)
  let eyeWidth = eyeSize;
  let eyeHeight = eyeSize*1.4286;
  ellipse(posX, posY, eyeWidth, eyeHeight);
  // draw eye (small ellipse)
  fill(eyeFill);
  let ratio = 0.45;
  ellipse(posX, posY, eyeWidth*ratio, eyeHeight*ratio);
}

function drawBody(bodyFill, bodyShape, bodyWidth, bodyHeight){
  // pos to center
  let posX = width/2;
  let posY = height/2;
  // set color
  noStroke();
  fill(bodyFill);
  // draw Body
  if (bodyShape == 1) {
    // ellipse
    ellipse(posX, posY, bodyWidth, bodyHeight);
  }
  else if (bodyShape == 2) {
    // rect
    rectMode(CENTER);
    rect(posX, posY, bodyWidth, bodyHeight);
  }
  else if (bodyShape == 3) {
    // triangle
    let vx1 = posX - bodyWidth/2;
    let vx2 = posX + bodyWidth/2;
    let vx3 = random(vx1, vx2);
    let vy1 = posY + bodyHeight/2;
    let vy2 = posY + bodyHeight/2;
    let vy3 = posY - bodyHeight/2;
    triangle(vx1, vy1, vx2, vy2, vx3, vy3);
  }
  // draw legs
  strokeWeight(7);
  stroke(bodyFill);
  line(posX+10, posY, posX+20, height*0.8);
  line(posX-10, posY, posX-20, height*0.8);
  line(posX+20, height*0.8, posX+50, height*0.8);
  line(posX-20, height*0.8, posX-50, height*0.8);
}

function drawRandomMonster() {
  // make random color (only change hue)
  let colorHue = random(1, 360);
  let bodyFill = color(colorHue, 80, 80);
  let eyeFill = color(colorHue, 100, 51);
  // make random shape index : circle, rect, triangle
  let bodyShape = int(random(1, 4));
  // make random size
  let bodyWidth = random(100, 700);
  let bodyHeight = random(70, 450);
  let eyeSize = random(30, min(bodyWidth, bodyHeight)/2);
  // make random eyeNumber : 1 or 2
  let eyeNumber = int(random(1, 3));
  console.log(eyeNumber);
  // make random rotateAngle
  let bodyRotate = radians(random(1, 360));
  // make random eye offset
  let eyeX = random(-30, 30);
  let eyeY = random(-30, 30);
  let eyeDistance = random(0, 30);
  // draw body
  drawBody(bodyFill, bodyShape, bodyWidth, bodyHeight, bodyRotate);
  console.log('drawn');
  // draw eyes
  push();
  translate(eyeX, eyeY);
  if (eyeNumber == 1){
    drawSingleEye(eyeSize,eyeFill);
  }
  else if (eyeNumber == 2){
    push();
    translate(-eyeSize/2, 0);
    drawSingleEye(eyeSize, eyeFill);
    translate(eyeSize+eyeDistance, 0);
    drawSingleEye(eyeSize, eyeFill);
    pop();
  }
  pop();
}

function mousePressed() {
  drawBackground();
  drawRandomMonster();
}

function draw() {
  // background(0);
  // eyeSize = 30;
  // drawSingleEye(eyeSize, color(60, 100, 51));
  // push();
  // translate(eyeSize, 0);
  // drawSingleEye(eyeSize, color(60, 100, 51));
  // pop();
}