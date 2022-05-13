var colors = [
    "#FF0000",
    "#500000",
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#0000FF",
    "#FF00FF",
    "#500050",
]

class Player {
    constructor(name="unamed", gameScene, options) {
        options = {
            color:colors[randInt(0,colors.length)],
            Id:Math.random(),

            ...options
        }

        this.name = name

        this.Id = options.Id


        this.color = options.color

        this.capital = null

        this.money = 10

        this.placeStart(gameScene)
    }

    placeStart(gameScene) {
        console.log(gameScene)
        var placePos = v(randInt(0, gameScene.width-1), randInt(0, gameScene.height-1))

        for (let i = 0; i < 50 && (gameScene.tileGrid[placePos.x][placePos.y].value != "land" || gameScene.tileGrid[placePos.x][placePos.y].owner != null); i++) {
            placePos = v(randInt(0, gameScene.width-1), randInt(0, gameScene.height-1))
            
        }
        this.capital = placePos
        this.claimTile(gameScene, placePos, true)
    }

    claimTile(gameScene, pos, capital=false) {
        if (gameScene.testForTile(pos)) {
            console.log(this.color, this.value)
            gameScene.tileGrid[pos.x][pos.y].color = pSBC(0.5, this.color, gameColors[gameScene.tileGrid[pos.x][pos.y].value])
            console.log(gameScene.tileGrid[pos.x][pos.y].color)
            gameScene.tileGrid[pos.x][pos.y].owner = {Id:this.Id}
            if (capital) gameScene.tileGrid[pos.x][pos.y].object = "c"
        }
    }
}


var players = new Array(),
    player = undefined