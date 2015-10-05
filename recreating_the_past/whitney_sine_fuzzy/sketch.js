var inc = 4;
var speed = 1/5;
var colors = [];

function setup() {

  createCanvas(window.innerWidth, window.innerHeight);
  
  for(var i = 0; i < 10; i++) {
    colors[i] = color(random(50,255), random(50,255), random(50,255), 255-18*(10-i));
  }
  w = width/10*9;
  background(0);
  noFill();
}

function draw() {
  var amp = height/3;
  fill(color(0,0,0,50.0));
  rect(0,0,width,height);
  
  for (var i = 0; i < width/10*9; i+=inc) {
    for (var j = 10; j > 0; j--) {
      stroke(colors[j-1]);
      line(width/10*0.5 + i,   
           height/2 + sin(2*PI * (i) / w * j) * amp * sin(frameCount * speed / j) / j * random(0.99,1.05),
           width/10*0.5 + i+inc, 
           height/2 + sin(2*PI * (i+inc) / w * j) * amp * sin(frameCount * speed / j) / j * random(0.99,1.05));
    }
  }
}