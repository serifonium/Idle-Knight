var towns = new Array()


dataCache.townRanks = [
    "Settlement",
    "Village",
    "Rural Land",
    "Town",
    "Urban Land",
    "Urban Sprawl",
    "Metropolis"
]

class Town {
    constructor(name, x, y) {
        this.name = name
        this.x = x
        this.y = y
        this.rank = 0
        this.income = {base: 8, range: {pos: 2, neg: 2}}
        this.level = 0

    }
    levelUp() {
        this.level += 1
        if(this.level >= 100) {
            this.rank++;
            this.level = 0;
        }
        this.income.base += this.rank * this.level/100 + 1
    }
}

towns.push(new Town("uwu town", 10, 5))