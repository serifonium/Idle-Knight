map[10][5].build = "town"
map[10][6].build = "farm"
map[12][7].build = "farm"
map[7][3].build = "farm"
map[2][4].build = "farm"

class Item {
    constructor(name, amount) {
        this.name = name
        this.amount = amount
    }
}


var tileSelected = undefined
var buildSelected = 0

var currency = {
    coins: 0,
    food: 0
}


setInterval(() => {
    update()
}, 20);

setInterval(() => {
    for(let town of towns) {
        currency.coins += town.income.base + Math.floor(Math.random()*(town.income.range.pos + town.income.range.neg)) + town.income.range.neg
    } for(let farm of farms) {
        currency.food += farm.income.base + Math.floor(Math.random()*(farm.income.range.pos + farm.income.range.neg)) + farm.income.range.neg
    }
    
}, 1000);

var vx = 0
var vy = 0
addEventListener("keydown", (e) => {
    if(e.key === "w") {
        vy = 5
    } if(e.key === "a") {
        vx = 5
    } if(e.key === "s") {
        vy = -5
    } if(e.key === "d") {
        vx = -5
    }
    if(e.key === "1") {}
}) 
addEventListener("keyup", (e) => {
    if(e.key === "w") {
        vy = 0
    } if(e.key === "a") {
        vx = 0
    } if(e.key === "s") {
        vy = 0
    } if(e.key === "d") {
        vx = 0
    }
})