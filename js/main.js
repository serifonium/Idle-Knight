map[10][5].build = "Town"
map[10][5].buildClass = towns[0]
map[10][6].build = "Farm"
map[10][6].buildClass = farms[0]
map[12][7].build = "Farm"
map[12][7].buildClass = farms[1]
map[7][9].build = "Farm"
map[7][9].buildClass = farms[2]
map[2][4].build = "Farm"
map[2][4].buildClass = farms[3]

class Item {
    constructor(name, amount) {
        this.name = name
        this.amount = amount
    }
}


var tileSelected = undefined
var selectionType = 0


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
    if(e.key === "1") {selectionType = 0}
    if(e.key === "2") {selectionType = 1}
    if(e.key === "3") {selectionType = 2}
    if(e.key === "4") {selectionType = 3}
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


addEventListener("mousedown", (e) => {
    let clickX = e.clientX
    let clickY = e.clientY

    for(let x in map) {
        for(let y in map[x]) {
            if(overlapping(x*64+cx, y*64+cy, 63, 63, clickX, clickY, 1, 1)) {
                console.log(map[x][y])
                tileSelected = map[x][y]
            }
        }
    }
})