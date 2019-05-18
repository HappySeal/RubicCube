function unitStep(i) {
    if (i < 0) return 0;
    return 1;
}

function sgn(i) {
    if (i < 0) return -1;
    if (i > 0) return 1;
    return 0;
}


class Face {
    constructor(x, y, z, xi, yi, zi, icolor, w) {
        this.pos = createVector(x, y, z);
        this.offset = createVector(xi, yi, zi);
        this.vertexArray = this.setVertexes();
        this.c = this.setColor(icolor);
        this.w = w;
    }

    setVertexes() {
        let arr = [];
        if (abs(this.pos.x) == 1) {
            arr.push(createVector(unitStep(this.pos.x), 0, 0));
            arr.push(createVector(unitStep(this.pos.x), 1, 0));
            arr.push(createVector(unitStep(this.pos.x), 1, 1));
            arr.push(createVector(unitStep(this.pos.x), 0, 1));
        }

        if (abs(this.pos.y) == 1) {
            arr.push(createVector(0, unitStep(this.pos.y), 0));
            arr.push(createVector(1, unitStep(this.pos.y), 0));
            arr.push(createVector(1, unitStep(this.pos.y), 1));
            arr.push(createVector(0, unitStep(this.pos.y), 1));
        }

        if (abs(this.pos.z) == 1) {
            arr.push(createVector(0, 0, unitStep(this.pos.z)));
            arr.push(createVector(1, 0, unitStep(this.pos.z)));
            arr.push(createVector(1, 1, unitStep(this.pos.z)));
            arr.push(createVector(0, 1, unitStep(this.pos.z)));
        }

        return arr;
    }

    setColor(i) {
        let colors = [
            color(255, 255, 255),
            color(255, 125, 0),
            color(255, 0, 0),
            color(0, 255, 0),
            color(0, 0, 255),
            color(255, 255, 0)
        ];
        return colors[i];
    }

    show() {
        //noStroke();
        push();
        translate((this.offset.x - 0.5) * this.w, (this.offset.y - 0.5) * this.w, (this.offset.z - 0.5) * this.w);
        fill(this.c);
        stroke(0);
        beginShape();
        vertex(this.vertexArray[0].x * this.w, this.vertexArray[0].y * this.w, this.vertexArray[0].z * this.w);
        vertex(this.vertexArray[1].x * this.w, this.vertexArray[1].y * this.w, this.vertexArray[1].z * this.w);
        vertex(this.vertexArray[2].x * this.w, this.vertexArray[2].y * this.w, this.vertexArray[2].z * this.w);
        vertex(this.vertexArray[3].x * this.w, this.vertexArray[3].y * this.w, this.vertexArray[3].z * this.w);
        endShape(CLOSE);
        pop();
    }
}

class Cube {
    constructor(ni) {
        this.n = ni;
        this.faces = this.defFace();
    }

    defFace() {
        let f = [];
        for (var i = -(this.n - 1) / 2; i < (this.n - 1) / 2 + 1; i++) {
            for (var j = -(this.n - 1) / 2; j < (this.n - 1) / 2 + 1; j++) {
                f.push(new Face(0, 0, -1, i, j, -(this.n - 1) / 2, 0, 50));
                f.push(new Face(0, 0, 1, i, j, (this.n - 1) / 2, 1, 50));
                f.push(new Face(1, 0, 0, (this.n - 1) / 2, i, j, 2, 50));
                f.push(new Face(-1, 0, 0, -(this.n - 1) / 2, i, j, 3, 50));
                f.push(new Face(0, 1, 0, i, (this.n - 1) / 2, j, 4, 50));
                f.push(new Face(0, -1, 0, i, -(this.n - 1) / 2, j, 5, 50));
            }
        }
        return f;
    }

    show() {
        this.faces.forEach(function (element) {
            element.show();
        })
    }

    rY(l, sign) {
        this.faces.forEach(function (element) {
            if (element.offset.y == l) {
                let a = element.offset.x;
                let b = element.offset.z;
                element.offset.x = round(a * cos(sign * PI / 2) - b * sin(sign * PI / 2));
                element.offset.z = round(b * cos(sign * PI / 2) + a * sin(sign * PI / 2));

                a = element.pos.x;
                b = element.pos.z;

                element.pos.x = round(a * cos(sign * PI / 2) - b * sin(sign * PI / 2));
                element.pos.z = round(b * cos(sign * PI / 2) + a * sin(sign * PI / 2));
                element.vertexArray = element.setVertexes();
            }
        })
    }

    rX(l, sign) {
        this.faces.forEach(function (element) {
            if (element.offset.x == l) {
                let a = element.offset.z;
                let b = element.offset.y;
                element.offset.z = round(a * cos(sign * PI / 2) - b * sin(sign * PI / 2));
                element.offset.y = round(b * cos(sign * PI / 2) + a * sin(sign * PI / 2));

                a = element.pos.z;
                b = element.pos.y;

                element.pos.z = round(a * cos(sign * PI / 2) - b * sin(sign * PI / 2));
                element.pos.y = round(b * cos(sign * PI / 2) + a * sin(sign * PI / 2));
                element.vertexArray = element.setVertexes();
            }
        })
    }

    rZ(l, sign) {
        this.faces.forEach(function (element) {
            if (element.offset.z == l) {
                let a = element.offset.x;
                let b = element.offset.y;
                element.offset.x = round(a * cos(sign * PI / 2) - b * sin(sign * PI / 2));
                element.offset.y = round(b * cos(sign * PI / 2) + a * sin(sign * PI / 2));

                a = element.pos.x;
                b = element.pos.y;

                element.pos.x = round(a * cos(sign * PI / 2) - b * sin(sign * PI / 2));
                element.pos.y = round(b * cos(sign * PI / 2) + a * sin(sign * PI / 2));
                element.vertexArray = element.setVertexes();
            }
        })
    }
}