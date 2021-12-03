class Speaker{
  constructor(imgs){
    this.imgs = imgs;
    this.idx = 0;
  }

  display(){
    // show image
    image(this.imgs[this.idx], 0, -40, 843, 596);
    // update image
    if(frameCount % 7 == 0){
      this.idx += 1;
      if(this.idx == 3){
        this.idx = 0;
      }
    }
  }
}