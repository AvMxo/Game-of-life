class Elephant extends LivingCreature {



    // getNewCoordinates() {
    //     this.directions = [
    //         [this.x - 1, this.y - 1],
    //         [this.x, this.y - 1],
    //         [this.x + 1, this.y - 1],
    //         [this.x - 1, this.y],
    //         [this.x + 1, this.y],
    //         [this.x - 1, this.y + 1],
    //         [this.x, this.y + 1],
    //         [this.x + 1, this.y + 1]
    //     ];
    // }
    
    // chooseCell(character) {
    //     this.getNewCoordinates();
    //     var found = [];

    //     for (var i in this.directions) {
    //         var x = this.directions[i][0];
    //         var y = this.directions[i][1];

    //         if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
    //             if (matrix[y][x] == character) {
    //                 found.push(this.directions[i])
    //             }
    //         }
    //     }
    //     return found;
    // }


    constructor(x, y, id) {
        // this.x = x;
        // this.y = y;
        // this.id = id;
        super(x, y, id);
        this.energy = 8;
        this.eaten = 0;
        // this.getNewCoordinates();
    }
    getEatNewCoordinates() {
        this.directions = [];
        for (let i = this.y; i > 0; i--) {
            this.directions.push([this.x - i, this.y - i]);
            this.directions.push([this.x + i, this.y - i]);
        }
        for (let i = this.y; i < matrix.length; i++) {
            this.directions.push([this.x + i, this.y + i]);
            this.directions.push([this.x - i, this.y + i]);
        }
    }

    chooseEatCell(character) {
        this.getEatNewCoordinates();
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (this.eaten % 3 == 0 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            var newElephant = new Elephant(newX, newY, this.id);
            elephantArr.push(newElephant);

            matrix[newY][newX] = this.id;

            this.energy = 8;
            this.eaten = 0;
        }
    }

    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (this.energy > 0 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.id;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.energy--;
        }
        this.die();
    }

    eat() {
        var emptyCells = this.chooseEatCell(4);
        var newCell = random(emptyCells);

        if (this.energy > 0 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.id;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            for (var i in horseArr) {
                if (horseArr[i].x == newX && horseArr[i].y == newY) {
                    horseArr.splice(i, 1);
                    break;
                }
            }
            this.eaten++;
            this.energy++;

            this.mul();
        } else {
            this.move();
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in elephantArr) {
                if (elephantArr[i].x == this.x && elephantArr[i].y == this.y) {
                    elephantArr.splice(i, 1);
                    break;
                }
            }
        }
    }


}