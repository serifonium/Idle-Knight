
map[10][5].build = "town"

class Item {
    constructor(name, amount) {
        this.name = name
        this.amount = amount
    }
}
var tileSelected = undefined



setInterval(() => {
    update()
}, 20);

setInterval(() => {
    
    
}, 1000);

var vx = 0
var vy = 0
addEventListener("keydown", (e) => {
    if(e.key === "w") {
        vy = 3
    } if(e.key === "a") {
        vx = 3
    } if(e.key === "s") {
        vy = -3
    } if(e.key === "d") {
        vx = -3
    }
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