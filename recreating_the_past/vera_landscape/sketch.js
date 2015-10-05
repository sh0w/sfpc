var lastMousePosition;
var currentlyDrawing = false;
var startedDrawing = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(210);
  fill(color("black"));
  textSize(50);
  text("draw something! :)",100, height/2);
  noFill();
}

function mousePressed() {
  if(!startedDrawing) {
    background(210);
    startedDrawing = true;
  }
  currentlyDrawing = true;
  lastMousePosition = {x: mouseX, y: mouseY};
}
 
function mouseDragged() {
  if(currentlyDrawing) {
    beginShape();
    vertex(lastMousePosition.x, lastMousePosition.y);
    
    for(var numVertices = random(0, 4); numVertices > 0; numVertices--) {
      vertex( random(lastMousePosition.x - 100, lastMousePosition.x + 100),
              random(lastMousePosition.y + 100, lastMousePosition.y + height/2) );
    }
    vertex(mouseX, mouseY);
    endShape(CLOSE);
    lastMousePosition = {x: mouseX, y: mouseY};
  }
}

function mouseReleased() {
  currentlyDrawing = false;
}