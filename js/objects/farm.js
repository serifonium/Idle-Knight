var farms = new Array()

class Farm {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.income = {base: 8*map[x][y].tags.farmMulti, range: {pos: 1, neg: 1}}
        this.level = 0

    }
}

farms.push(new Farm(10, 6))
farms.push(new Farm(12, 7))
farms.push(new Farm(7, 3))
farms.push(new Farm(2, 4))