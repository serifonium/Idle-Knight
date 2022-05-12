

class Tile {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.type = ""
        this.build = ""
        this.tags = {}
        this.renderMenu = undefined
    }
}
var mapHeight = 200
var mapWidth = 200
var map = []
for(let x = 0; x < mapWidth; x++) {
    map[x] = []
    for(let y = 0; y < mapHeight; y++) {
        map[x][y] = new Tile(x, y)
    }
}

for(let x in map) {
    for(let y in map[x]) {
        map[x][y].type = "Grass"
        map[x][y].renderMenu = function() {
            tile = map[x][y]
            let XOff = x*64+cx - 128 + 32
            let YOff = y*64+cy - 160 - 16
            drawBox(XOff, YOff, 256, 160)
            ctx.fillStyle = "#ffffff"
            ctx.textAlign = "center"
            ctx.font = "30px Arial"
            if(tile.build === "") {
                ctx.fillText(tile.type, XOff+128, YOff+32)
            } else {
                if(tile.build === "Town") {
                    ctx.fillText(tile.buildClass.name, XOff+128, YOff+32)
                } else {
                    ctx.fillText(tile.build, XOff+128, YOff+32)
                }
                ctx.font = "15px Arial"
                if(tile.build === "Farm") {
                    ctx.fillText("Produces ~" +Math.floor(tile.buildClass.income.base)+ " Food", XOff+128, YOff+48)
                } if(tile.build === "Town") {
                    ctx.fillText("Produces ~" +Math.floor(tile.buildClass.income.base)+ " Gold", XOff+128, YOff+48)
                }
                if(tile.build === "Town") {
                    
                    ctx.fillText(dataCache.townRanks[tile.buildClass.rank], XOff+128, YOff+64)
                    drawBox(XOff+128-72, YOff+160-48, 128+16, 32)
                    ctx.fillStyle = "#ffffff"
                    ctx.fillText("Level Up: " + Math.floor(Math.pow(tile.buildClass.level + 1, 1.5) * 5 ) + " gold", XOff+128, YOff+160-24)
                } 
            }
            
        }
    }
}



/*
for(let x in map) {
    for(let y in map[x]) {
        if(Math.random() < 0.5) {
            map[x][y].type = "grass"
        } else {
            map[x][y].type = "water"
        }
    }
} 

function getSurroundingTiles(x, y) {
    let tiles = []
    if(x-1 >= 0) {
        if(y-1 >= 0) {
            tiles.push(map[x-1][y-1])
        }
        tiles.push(map[x-1][y])
        if(y+1 < mapHeight) {
            tiles.push(map[x-1][y+1])
        } 
    } if(y-1 >= 0) {
        tiles.push(map[x][y-1])
    } if(y+1 < mapHeight) {
        tiles.push(map[x][y+1])
    }
    if(x+1 < mapWidth) {
        if(y-1 >= 0) {
            tiles.push(map[x+1][y-1])
        }
        tiles.push(map[x+1][y])
        if(y+1 < mapHeight) {
            tiles.push(map[x+1][y+1])
        }
    }
    return tiles
}
for(let i = 0; i < 4; i++) {
    for(let x in map) {
        for(let y in map[x]) {
            if(map[x][y].type === "water") {
                let tilesSurrounding = getSurroundingTiles(Number(x), Number(y))
                for(let t in tilesSurrounding) {
                    if(tilesSurrounding[t].type === "grass") {tilesSurrounding.splice(t, 1)}
                }
                if(tilesSurrounding.length > 5) {
                    map[x][y].type = "grass"
                }
            } 
        }
    }
}
for(let i = 0; i < 2; i++) {
    for(let x in map) {
        for(let y in map[x]) {
            if(map[x][y].type === "grass") {
                let tilesSurrounding = getSurroundingTiles(Number(x), Number(y))
                for(let t in tilesSurrounding) {
                    if(tilesSurrounding[t].type === "water") {tilesSurrounding.splice(t, 1)}
                }
                if(tilesSurrounding.length < 2 && tilesSurrounding.length > 5) {
                    map[x][y].type = "water"
                }
            }
        }
    }
}
*/