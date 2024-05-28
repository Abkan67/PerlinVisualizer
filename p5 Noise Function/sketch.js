var perlinScale = 0.02;
var start = 0;
function setup() {
  createCanvas(400,400);
  angleMode(RADIANS);

}

function draw() {
  perlinGraph();
}

function perlinGraph(){
  
  background(0);
  stroke(255);
  var xOff1 = start;
  beginShape();
  noFill();
  for(var x = 0; x<width; x+=1){
    vertex(x, noise(xOff1)*height);
    xOff1 += perlinScale;
  }
  endShape();
  start+=perlinScale*5;
}