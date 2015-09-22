var lastMousePosition;
var currentlyDrawing = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(210);
  noFill();
}

function mousePressed() {
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