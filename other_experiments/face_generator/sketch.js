/** 
 * face generator
 * 
 * generates faces with random facial features at random positions
 * 
 * a work in progress
 * by sarah howorka / www.sarahhoworka.com
 */

var drawDebug = 0;
  
var CANVAS_WIDTH = 1650;
var CANVAS_HEIGHT = 900;
var BG_COLOR = 250;

var probabilityLidFold = 0.7;
var probabilityTired = 0.5;
var probabilityEyebrows = 0.9;
var averageEyeSize = 100;
var averageNoseWidth = 150;
var averageMouthWidth = 400;
var distanceEyeNose = 100;
var distanceNoseMouth = 50;
var featurePositions = { leftEye:  { x: CANVAS_WIDTH/2 - CANVAS_WIDTH/8, y: CANVAS_HEIGHT/4 }, 
                         rightEye: { x: CANVAS_WIDTH/2 + CANVAS_WIDTH/8, y: CANVAS_HEIGHT/4 },
                         nose:     { x: CANVAS_WIDTH/2, y: CANVAS_HEIGHT/2 },
                         mouth:     { x: CANVAS_WIDTH/2, y: CANVAS_HEIGHT/2 },
  
};

var leftEyeData;
var rightEyeData;
var nosePos;
var mouthPos;
var drawLidFold;
var drawBelowEye;
var pupilSize;
var eyeColor;
var drawEyebrow;
var excitedness;
var eyebrowColor;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  drawFace();
}

function mousePressed() {
  drawFace();
}

function drawFace() {
  recalcFeaturePositions();
  
  // draw face!
  background(BG_COLOR);
  push();
  translate(0,50);
  noFill();
  stroke(5);
  
  drawEye(leftEyeData, leftEyeData.size, drawLidFold, drawBelowEye, drawEyebrow, true);
  drawEye(rightEyeData, rightEyeData.size, drawLidFold, drawBelowEye, drawEyebrow, false);
  
  drawNose(randomGaussian(averageNoseWidth, 30));
  drawMouth(randomGaussian(averageMouthWidth, 100));
  pop();
}

function recalcFeaturePositions() {
  leftEyeData =  { x: randomGaussian(featurePositions.leftEye.x,30),
                  y: randomGaussian(featurePositions.leftEye.y,30),
                  size: randomGaussian(averageEyeSize,20) };
  rightEyeData = { x: randomGaussian(featurePositions.rightEye.x,30),
                  y: randomGaussian(featurePositions.rightEye.y,30),
                  size: randomGaussian(averageEyeSize,20) };
  
  do {
    nosePos = { x: randomGaussian(featurePositions.nose.x,100), y: randomGaussian(featurePositions.nose.y,50)}
  } while (nosePos.y < rightEyeData.y + distanceEyeNose || nosePos.y < leftEyeData.y + distanceEyeNose);
  
  do {
    mouthPos = { x: randomGaussian((nosePos.x + rightEyeData.x + leftEyeData.x)/3,100), 
                 y: randomGaussian(height*0.66,50)};
  } while (mouthPos.y < nosePos.y + distanceNoseMouth);
  
  drawLidFold = random() < probabilityLidFold;
  drawBelowEye = random() < probabilityTired;
  drawEyebrow = random() < probabilityEyebrows;
  excitedness = max(0.3,randomGaussian(1.4,0.35));
  eyebrowColor = random(50,150);
  
  eyeColor = color(random(200),random(255),random(255),30);
}

function drawEye(eyePos, eyeSize, drawLidFold, drawBelowEye, drawEyebrow, isLeftEye) {
  push();
  translate(eyePos.x, eyePos.y);
  rotate(randomGaussian(0,0.1));
  
  if( drawDebug ) { 
    ellipse(0, 0, eyeSize, eyeSize);
    ellipse(0, 0, 10, 10); 
  }
  
  // draw iris:
  fill(eyeColor);
  ellipse(0, 0, eyeSize*0.7, eyeSize*0.7);
  
  // draw pupil:
  fill(0);
  pupilSize = eyeSize/max(3,randomGaussian(5.5,2));
  ellipse(0, 0, pupilSize, pupilSize);
  
  // draw eye highlight:
  fill(255);
  noStroke();
  ellipse(random(-eyeSize/10,-5), random(-eyeSize/10,-5), pupilSize * 0.8, pupilSize * 0.8);
  
  stroke(5);
  noFill();
  
  if(drawLidFold) {
    push();
    if(! isLeftEye) {
      scale(-1,1);
    }
    bezier(- eyeSize*4/3, - eyeSize/3,
           - eyeSize/3, - eyeSize/2 - eyeSize/4,
           + eyeSize/3, - eyeSize/2 - eyeSize/4,
           + eyeSize, - eyeSize/4);
    pop();
  } 
  
  if(drawEyebrow) {
    push();
    
    if(! isLeftEye) {
      scale(-1,1);
    }
    noStroke();
    fill(0,0,0,eyebrowColor);
    
    beginShape();
    vertex(eyeSize, -eyeSize);
    bezierVertex(  eyeSize/3, -eyeSize*excitedness, - eyeSize/3, -eyeSize*excitedness, - eyeSize*1.3, -eyeSize);
    vertex(- eyeSize*1.3, -eyeSize - random(7));
    bezierVertex(- eyeSize/3, -eyeSize*excitedness*1.1,   eyeSize/3, -eyeSize*excitedness*1.1,   eyeSize,     -eyeSize * 1.3);
    endShape();
    pop();
  } 
  
  // TODO: mirror if other eye instead of duplicating this code...
  if(isLeftEye) {
    bezier(- eyeSize,  - eyeSize/6,
           - eyeSize/3,  - eyeSize/2.5,
           + eyeSize/3,  - eyeSize/2,
           + eyeSize - eyeSize/5,  + eyeSize/6);
    bezier(- eyeSize,  - eyeSize/6,
           - eyeSize/3,  + eyeSize/2.5,
           + eyeSize/3,  + eyeSize/2,
           + eyeSize - eyeSize/5,  + eyeSize/6);
    
    if(drawBelowEye) {
      bezier(eyeSize/3*2, eyeSize / 3,
             eyeSize/3, eyeSize * 0.8,
             0, eyeSize * 0.8,
            - eyeSize/2, eyeSize * 0.7);
    }
  } else {
    bezier(- eyeSize + eyeSize/5, + eyeSize/6,
           - eyeSize/3,  - eyeSize/2,
           + eyeSize/3,  - eyeSize/2.5,
           + eyeSize,  - eyeSize/6);
    bezier(- eyeSize + eyeSize/5,  + eyeSize/6,
           - eyeSize/3,  + eyeSize/2.5,
           + eyeSize/3,  + eyeSize/2,
           + eyeSize,  - eyeSize/6);
           
    if(drawBelowEye) {
      bezier(-eyeSize/3*2, eyeSize / 3,
             -eyeSize/3, eyeSize * 0.8,
             0, eyeSize * 0.8,
             eyeSize/2, eyeSize * 0.7);
    }
  }
  pop();
}

function drawNose(noseWidth) {
  push();
  translate(nosePos.x, nosePos.y);
  
  if( drawDebug ) {
    ellipse(0, 0, noseWidth, noseWidth);
    ellipse(0, 0, 10, 10); 
  }
  
  // TODO: mirror instead of duplicating nose code:
  if (nosePos.x - leftEyeData.x - 35 > rightEyeData.x - nosePos.x) {
    // looking this way: ->
    
    if (random() < 0.5 ) {
      fill(BG_COLOR);
      beginShape();
      vertex((rightEyeData.x + leftEyeData.x) / 2 - nosePos.x, (leftEyeData.y+rightEyeData.y)/2 - nosePos.y);
      vertex(noseWidth/2, 0);
      vertex(-noseWidth/2, 0);
      endShape();
      
    } else {
      noFill();
      bezier(-noseWidth/2 + noseWidth/8, noseWidth/5,
             0, 0,
             0, noseWidth/2,
             noseWidth/2, 0);
           
      bezier(-noseWidth/2, -noseWidth/5,
             -noseWidth/2 - noseWidth/5, -noseWidth/10,
             -noseWidth/2 - noseWidth/5, noseWidth/5,
             -noseWidth/2 + noseWidth/8, noseWidth/5);
             
      curve(0, noseWidth/2,
            noseWidth/2, 0,
            rightEyeData.x-nosePos.x - 100, rightEyeData.y-nosePos.y,
            rightEyeData.x-nosePos.x, rightEyeData.y-nosePos.y - 120);
    }
  } else if (nosePos.x - leftEyeData.x < rightEyeData.x - nosePos.x - 35) {
    // looking this way: <-
    if (random() < 0.5) {
      fill(BG_COLOR);
      beginShape();
      vertex((rightEyeData.x + leftEyeData.x) / 2 - nosePos.x, (leftEyeData.y+rightEyeData.y)/2 - nosePos.y);
      vertex(-noseWidth/2, 0);
      vertex(noseWidth/2, 0);
      endShape();
    } else {
      noFill();
      bezier(noseWidth/2 - noseWidth/8, noseWidth/5,
             0, 0,
             0, noseWidth/2,
             -noseWidth/2, 0);
           
      bezier(noseWidth/2, -noseWidth/5,
             noseWidth/2 + noseWidth/5, -noseWidth/10,
             noseWidth/2 + noseWidth/5, noseWidth/5,
             noseWidth/2 - noseWidth/8, noseWidth/5);
             
      curve(0, noseWidth/2,
            -noseWidth/2, 0,
            leftEyeData.x-nosePos.x + 100, leftEyeData.y-nosePos.y,
            leftEyeData.x-nosePos.x, leftEyeData.y-nosePos.y - 120);
    }
  } else {
    // frontal nose
    curve(-noseWidth/4, -noseWidth/5,
           -noseWidth/2, -noseWidth/10,
           -noseWidth/3, noseWidth/5,
           noseWidth/2, noseWidth/10);
      
    curve(noseWidth/4, -noseWidth/5,
           noseWidth/2, -noseWidth/10,
           noseWidth/3, noseWidth/5,
           -noseWidth/2, noseWidth/10);
    
    curve(-noseWidth/2 - noseWidth/5, noseWidth/6,
          -noseWidth/3, noseWidth/5,
          -noseWidth/5, noseWidth/6,
          0, noseWidth/5);
    bezier(-noseWidth/5, noseWidth/6,
           0, noseWidth/4,
           0, noseWidth/4,
           noseWidth/5, noseWidth/6)
    curve(0, noseWidth/5,
          noseWidth/5, noseWidth/6,
          noseWidth/3, noseWidth/5,
          noseWidth/2 + noseWidth/5, noseWidth/6);
  }
  pop();
}

function drawMouth(mouthWidth) {
  push();
  translate(mouthPos.x, mouthPos.y);
  rotate(randomGaussian(0,0.1));
  
  if( drawDebug ) { 
    ellipse(0, 0, mouthWidth, mouthWidth);
    ellipse(0, 0, 10, 10); 
  }
  
  var mouthType = random();
  
  if(mouthType > 0.6) {
    // draw "polygon" mouth:
    // TODO: randomize lip thickness
    translate(0, mouthWidth/12);
    
    line(- mouthWidth/2, 0,
         + mouthWidth/2, 0);
         
    line(- mouthWidth/2, 0,
         0, mouthWidth/12);
    line(0, mouthWidth/12,
         + mouthWidth/2, 0);
    
    line(- mouthWidth/2, 0,
         -mouthWidth/4, -mouthWidth/12);
    line(-mouthWidth/4, -mouthWidth/12,
         0,  -mouthWidth/20);
    line(0,  -mouthWidth/20,
         mouthWidth/4, -mouthWidth/12);
    line(mouthWidth/4, -mouthWidth/12,
         + mouthWidth/2, 0);
  } else if(mouthType > 0.4) {
    // draw smile mouth:
    curve(leftEyeData.x - mouthPos.x, leftEyeData.y - mouthPos.y,
          -mouthWidth/2, 0,
          mouthWidth/2, 0,
          rightEyeData.x - mouthPos.x, rightEyeData.y - mouthPos.y);
  } else if(mouthType > 0.2) {
    translate(0, mouthWidth/12);
    // draw sad mouth:
    curve(0 - mouthPos.x, height - mouthPos.y,
          -mouthWidth/2, 0,
          mouthWidth/2, 0,
          width - mouthPos.x, height - mouthPos.y);
  } else {
    // draw straight line:
    line(- mouthWidth/2, 0,
         + mouthWidth/2, 0);
  }
  pop();
}
