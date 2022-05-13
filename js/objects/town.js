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
        this.population = Math.round(Math.random()*20)
        this.income = {base: Math.round(8 * (this.population / 10)), range: {pos: 2, neg: 2}}
        this.level = 0
        
    }
    levelUp() {
        this.level += 1
        if(this.level >= 100) {
            this.rank++;
            this.level = 0;
        }
        this.income.base += Math.round((this.rank * this.level/100 + 1)*(this.population / 10))
        this.population += this.level
    }
    update() {
        if(this.population/2 < currency.food) {
            currency.food += -this.population/2
        } else {
            this.population = Math.round(this.population/2)
        }
    }
}

towns.push(new Town("owo town", 10, 5))