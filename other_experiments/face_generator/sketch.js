var leftEyePos;
var rightEyePos;
var nosePos;
var mouthPos;

function setup() {
  createCanvas(1650,900);
  drawFace();
}

function mousePressed() {
  drawFace();
}

function drawFace() {
  background(250);
  noFill();
  stroke(5);
  leftEyePos =  { x: randomGaussian(width/2-width/8,30), y: randomGaussian(height/4,30) };
  rightEyePos = { x: randomGaussian(width/2+width/8,30), y: randomGaussian(height/4,30) };
  do{
    nosePos =     { x: randomGaussian(width/2,100), y: randomGaussian(height/2,50)}
  } while(nosePos.y < rightEyePos.y + 50 || nosePos.y < leftEyePos.y + 50);
  do {
    mouthPos =    { x: randomGaussian(nosePos.x,100), y: randomGaussian(height*0.66,50)};
  } while(mouthPos.y < nosePos.y + 50);
  
  
  var drawLidFold = random() > 0.3;
  var drawBelowEye = random() > 0.3;
  drawEye(leftEyePos, randomGaussian(100,20), drawLidFold, drawBelowEye, true);
  drawEye(rightEyePos, randomGaussian(100,20), drawLidFold, drawBelowEye, false);
  
  drawNose(randomGaussian(150,30));
  drawMouth(randomGaussian(400,100));
}

function drawEye(eyePos, eyeSize, drawLidFold, drawBelowEye, isLeftEye) {
  push();
  translate(eyePos.x, eyePos.y);
  rotate(randomGaussian(0,0.1));
  noFill();
  ellipse(0, 0, eyeSize*0.7, eyeSize*0.7);
  fill(0);
  var pupilSize = max(3,randomGaussian(5.5,2));
  ellipse(0, 0, eyeSize/pupilSize, eyeSize/pupilSize);
  fill(255);
  noStroke();
  ellipse(random(-eyeSize/10,-5), random(-eyeSize/10,-5), eyeSize/pupilSize * 0.8, eyeSize/pupilSize * 0.8);
  stroke(5);
  noFill();
  if(drawLidFold) {
    if(isLeftEye) {
      bezier(- eyeSize - 30, - 30,
             - eyeSize/3, - eyeSize/2 - 20,
             + eyeSize/3, - eyeSize/2 - 20,
             + eyeSize, - 20);
    } else {
      bezier(- eyeSize, - 20,
             - eyeSize/3, - eyeSize/2 - 20,
             + eyeSize/3, - eyeSize/2 - 20,
             + eyeSize + 30, - 30);
    }
  } 
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
  //ellipse(nosePos.x, nosePos.y, 10, 10);
  if(random() < 0.5) {
    line(nosePos.x+noseWidth/2, nosePos.y, (rightEyePos.x + leftEyePos.x) / 2, (leftEyePos.y+rightEyePos.y)/2);
    line(nosePos.x-noseWidth/2, nosePos.y, (rightEyePos.x + leftEyePos.x) / 2, (leftEyePos.y+rightEyePos.y)/2);
    line(nosePos.x+noseWidth/2, nosePos.y, nosePos.x-noseWidth/2, nosePos.y);
  } else {
    push();
    translate(nosePos.x, nosePos.y);
    if(nosePos.x - leftEyePos.x - 100 > rightEyePos.x - nosePos.x) {
      bezier(-noseWidth/2, -noseWidth/5,
             -noseWidth/2 - noseWidth/5, -noseWidth/10,
             -noseWidth/2 - noseWidth/5, noseWidth/5,
             -noseWidth/2 + noseWidth/8, noseWidth/5
        );
         
      bezier(-noseWidth/2 + noseWidth/8, noseWidth/5,
             0, 0,
             0, noseWidth/2,
             noseWidth/2, 0);
      
      curve(0, noseWidth/2,
             noseWidth/2, 0,
             rightEyePos.x-nosePos.x - 100, rightEyePos.y-nosePos.y,
             rightEyePos.x-nosePos.x, rightEyePos.y-nosePos.y - 120);
             
    } else if (nosePos.x - leftEyePos.x < rightEyePos.x - nosePos.x - 100) {
           
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
            leftEyePos.x-nosePos.x + 100, leftEyePos.y-nosePos.y,
            leftEyePos.x-nosePos.x, leftEyePos.y-nosePos.y - 120);
            
    } else {
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
}

function drawMouth(mouthWidth) {
  //ellipse(mouthPos.x, mouthPos.y, 10, 10);
  // draw straight mouth:
  push();
  translate(mouthPos.x, mouthPos.y);
  rotate(randomGaussian(0,0.1));
  
  
  if(random() < 0.5) {
    // draw polygon mouth:
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
  } else {
    // draw curve mouth:
    curve(leftEyePos.x - mouthPos.x, leftEyePos.y - mouthPos.y,
          -mouthWidth/2, 0,
          mouthWidth/2, 0,
          rightEyePos.x - mouthPos.x, rightEyePos.y - mouthPos.y);
  }
  pop();
}
