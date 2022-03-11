var matrix = [];

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var horseArr = [];
var elephantArr = [];

var side = 20;

function setup() {
    matrix = generateMatrix(30);
    createObject();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('grey');
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("blue");
            } else if (matrix[y][x] == 5) {
                fill("#00ff7b");
            } else {
                fill('grey');
            }

            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }

    for (var i in predatorArr) {
        predatorArr[i].eat();
    }

    for (var i in horseArr) {
        horseArr[i].eat();
    }

    for (var i in elephantArr) {
        elephantArr[i].eat();
    }
}

function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var newGrass = new Grass(x, y, 1);
                grassArr.push(newGrass);
            } else if (matrix[y][x] == 2) {
                var newGrassEater = new GrassEater(x, y, 2);
                grassEaterArr.push(newGrassEater);
            } else if (matrix[y][x] == 3) {
                var newPredator = new Predator(x, y, 3);
                predatorArr.push(newPredator);
            } else if (matrix[y][x] == 4) {
                var newHorse = new Horse(x, y, 4);
                horseArr.push(newHorse);
            } else if (matrix[y][x] == 5) {
                var newElephant = new Elephant(x, y, 5);
                elephantArr.push(newElephant);
            }
        }
    }
}


function generateMatrix(size) {
    var newMatrix = [];
    for (var y = 0; y < size; y++) {
        newMatrix[y] = [];
        for (var x = 0; x < size; x++) {
            var randomId = random(100);
            if (randomId < 30) {
                newMatrix[y][x] = 1;
            } else if (randomId < 35) {
                newMatrix[y][x] = 2;
            } else if (randomId < 50) {
                newMatrix[y][x] = 3;
            } else if (randomId < 65) {
                newMatrix[y][x] = 4;
            }
            else if (randomId < 68) {
                newMatrix[y][x] = 5;
            }
            else {
                newMatrix[y][x] = 0;
            }
        }
    }
    return newMatrix;
}

