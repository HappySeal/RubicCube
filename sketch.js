var c;
var lastPos;
function setup() {
    createCanvas(500, 500, WEBGL);
    c = new Cube(3);
    lastPos = createVector(0, 0);
}
function draw() {
    background(255);

    stroke(0);
    rotateY(map(lastPos.x, 0, width, 0, TWO_PI));
    rotateX(map(lastPos.y, 0, height, 0, TWO_PI));
    if (mouseIsPressed) {
        lastPos.x = mouseX;
        lastPos.y = mouseY;
    }

    c.show();
}
function keyPressed() {
    if (keyCode == 74) {
        c.rY(1, -1);
    }
    if (keyCode == 75) {
        c.rY(0, -1);
    }
    if (keyCode == 76) {
        c.rY(-1, -1);
    }
    if (keyCode == 85) {
        c.rX(1, -1);
    }
    if (keyCode == 73) {
        c.rX(0, -1);
    }
    if (keyCode == 79) {
        c.rX(-1, -1);
    }

    if (keyCode == 77) {
        c.rZ(1, -1);
    }
    if (keyCode == 191) {
        c.rZ(0, -1);
    }
    if (keyCode == 220) {
        c.rZ(-1, -1);
    }
}
