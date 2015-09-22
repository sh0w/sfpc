
function setup() {
  noFill();
  createCanvas(850, 850);
  stroke(60,49,43,200);
  drawShapes();
}

function drawShapes() {
  fill(244,243,241,250);
  rect(0,0,width,height);
  noFill();
  
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      var numShapes =0;
      switch(j) {
        case 0:
          numShapes = 5;
          break;
        case 1:
          numShapes = 25;
          break;
        case 2:
          numShapes = 10;
          break;
        case 3:
          numShapes = 6;
          break;
        case 4:
          numShapes = 3;
          break;
        case 5:
          numShapes = 2;
          break;
      }
      
      for(var k = 0; k < numShapes; k++) {
        beginShape();
        var topLeftX = 100 + i*110;
        var topLeftY = 100 + j*110;
        vertex(random(topLeftX-30,topLeftX+45), random(topLeftY-30,topLeftY+45));
        vertex(random(topLeftX+45,topLeftX+130), random(topLeftY-30,topLeftY+45));
        vertex(random(topLeftX+45,topLeftX+130), random(topLeftY+45,topLeftY+130));
        vertex(random(topLeftX-30,topLeftX+45), random(topLeftY+45,topLeftY+130));
        endShape(CLOSE);
      }
    }
  } 
  
}

function mouseReleased() {
  drawShapes();
}
