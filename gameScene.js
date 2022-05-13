var gameColors = {
    land:"#050",
    sea:"#005",
    mountains:"#222",
}

var gameEconomy = {
    soilderCost:5,
    townCost:15,
    earnings:{
        s1:-10,
        c:11,
        t:5,
        b:-2,
        empty:3,
    }
}


class GameScene {
    constructor(config) {
        this.config = {
            width:8,
            height:8,

            hexSize:50,

            ...config,
        }

        this.collisionHandler = new CollisionHandler(this, gameCtx)

        this.width = this.config.width
        this.height = this.config.height

        this.tileGrid = array2d(this.width, this.height, function(x, y){
            return new gridTile(v(x, y))
        })

        this.ui = {
            selectedTile:undefined,
            mouseHolding:null,

            mouseStatus:undefined,

            preMousePos:undefined,

        }

        this.mouseCallback = undefined


        document.addEventListener("mousedown", ()=>{this.mousedown()})

        this.clickCallbacks = {
            s:()=>{
                if (!this.tileGrid[this.ui.selectedTile.x][this.ui.selectedTile.y].placed) {
                    this.ui.mouseHolding = "s1"
                    this.tileGrid[this.ui.selectedTile.x][this.ui.selectedTile.y].objectHidden = true
                    this.ui.preMousePos = this.ui.selectedTile
                    gameScene.mouseCallback = gameScene.reClickCallbacks["soilder"]
                    this.ui.mouseStatus = "moving"
                    console.log(this.tileGrid[this.ui.selectedTile.x][this.ui.selectedTile.y].objectHidden, this.ui.selectedTile)
                }

            },
            capital:function(){
                console.log(this)
            },
            t:function(){
                console.log("se")
            },
            empty:function(){
                console.log("se")
            }
        }

        this.reClickCallbacks = {
            soilder:(colls) => {
                if (colls.length > 0) {
                    var tilePos = colls[0].pos,
                        tile = this.tileGrid[tilePos.x][tilePos.y]


                    var adjacents  = getAdajcentHexes(tilePos),
                        adjacentTile = (()=>{
                            for (let i = 0; i < adjacents.length; i++) {
                                var tilePos = adjacents[i]
                                if (this.testForTile(tilePos)) {
                                    var tile = this.tileGrid[tilePos.x][tilePos.y]
            
                                    if (tile.owner != null){
                                        if (tile.owner.Id == player.Id) {
                                            return true
                                        }
                                    }
                                }                
                            }
                            return false
                        })()


                    if ((this.ui.mouseStatus=="buying"?player.money >= gameEconomy.soilderCost:true) && adjacentTile && ((tile.owner!=null)?(tile.owner.Id==player.Id)?(tile.object == "empty" || tile.object == "b"):(true):(true)) && tile.value == "land") {
                        if (this.ui.mouseStatus=="buying") {
                            player.money -= gameEconomy.soilderCost
                            console.log("yisdsh")
                        }
                        tile.object = "s1"
                        this.ui.mouseHolding = null
                        this.mouseCallback = undefined
                        player.claimTile(gameScene, tile.pos)
                        this.ui.mouseStatus = undefined
                        if (this.ui.preMousePos != undefined) {
                            console.log(this.tileGrid[this.ui.preMousePos.x][this.ui.preMousePos.y], this.ui.preMousePos)
                            this.tileGrid[this.ui.preMousePos.x][this.ui.preMousePos.y].objectHidden = false
                            this.tileGrid[this.ui.preMousePos.x][this.ui.preMousePos.y].object = "empty"
                        }
                        tile.placed = true

                        if (!hosting) {
                            let mockPlayer = {...player}
                            mockPlayer.gameScene = undefined
                            if (false) channel.publish("gameMoves", JSON.stringify({
                                player:mockPlayer,
                                moves:[
                                    {
                                        type:"claim",
                                        player:mockPlayer,
                                        pos:tile.pos,
                                    },
                                    {
                                        type:"placeObject",
                                        pos:tile.pos,
                                        object:"soilder",
                                    },
                                    {
                                        type:"placeObject",
                                        pos:this.ui.preMousePos,
                                        object:"empty",
                                    }

                                ]
                            }))
                        }
                        this.ui.preMousePos = undefined

                    }

                    
                }
            },
            town(colls){
                if (colls.length > 0) {
                    var tilePos = colls[0].pos,
                        tile = this.tileGrid[tilePos.x][tilePos.y]




                    if ((this.ui.mouseStatus=="buying"?player.money >= gameEconomy.townCost:true) && ((tile.owner!=null)?(tile.owner.Id==player.Id)?(tile.object == "empty"):(true):(false)) && tile.value == "land") {
                        if (this.ui.mouseStatus=="buying") {
                            player.money -= gameEconomy.townCost
                            console.log("yisdsh")
                        }
                        tile.object = "t"
                        this.ui.mouseHolding = null
                        this.mouseCallback = undefined
                        player.claimTile(gameScene, tile.pos)
                        this.ui.mouseStatus = undefined
                        if (this.ui.preMousePos != undefined) {
                            console.log(this.tileGrid[this.ui.preMousePos.x][this.ui.preMousePos.y], this.ui.preMousePos)
                            this.tileGrid[this.ui.preMousePos.x][this.ui.preMousePos.y].objectHidden = false
                            this.tileGrid[this.ui.preMousePos.x][this.ui.preMousePos.y].object = "empty"
                        }

                        if (!hosting) {
                            let mockPlayer = {...player}
                            mockPlayer.gameScene = undefined
                            
                        }
                        this.ui.preMousePos = undefined

                    }

                    
                }
            }
        }
    }

    stepRound() {
        for (let x = 0; x < this.tileGrid.length; x++) {
            const row = this.tileGrid[x];
            for (let y = 0; y < row.length; y++) {
                const tile = row[y];
                tile.placed = false

            }
        }


        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            this.payPlayer(player)
            if (player.money < 0) {
                player.money = 0
                this.findDeadSoilders(player)
            }
        }

        this.spreadTrees()
    }
    findDeadSoilders(player){
        for (let x = 0; x < this.tileGrid.length; x++) {
            const row = this.tileGrid[x];
            for (let y = 0; y < row.length; y++) {
                const tile = row[y];
                if (tile.owner != null) if (tile.owner.Id == player.Id && tile.object[0] == "s") {
                    tile.object = "empty"
                }
            }
        }
    }
    spreadTrees() {
        for (let x = 0; x < this.tileGrid.length; x++) {
            const row = this.tileGrid[x];
            for (let y = 0; y < row.length; y++) {
                const tile = row[y];
                if (tile.object[0] == "b") {
                    if (Math.random()>0.8) {
                        var adjacentTile  = getAdajcentHexes(tile.pos)[randInt(0, 5)]
                        if (adjacentTile != undefined) if (this.testForTile(adjacentTile)) {
                            var adjacentTile = this.tileGrid[adjacentTile.x][adjacentTile.y] 
                            if (adjacentTile.value == "land" && adjacentTile.object == "empty") adjacentTile.object = "b"
                        }
                            
                    }
                }
            }
        }
        
    }

    payPlayer(player) {
        var pay = 0
        for (let x = 0; x < this.tileGrid.length; x++) {
            const row = this.tileGrid[x];
            for (let y = 0; y < row.length; y++) {
                const tile = row[y];
                if (tile.owner != null) if (tile.owner.Id == player.Id) {
                    console.log(gameEconomy.earnings[tile.object], tile.object)
                    pay += gameEconomy.earnings[tile.object]
                }
            }
        }
        player.money += pay
    }


    mousedown(e) {
        var colls = this.collisionHandler.testCollisions()

        if (this.mouseCallback != undefined) {
            console.log(this.mouseCallback)
            this.mouseCallback(colls)
            this.ui.selectedTile = undefined
        } else {


            if (c.mouse.down && !pc.mouse.down) {
                if (colls.length > 0) {
                    //gameScene.tileGrid[colls[0].pos.x][colls[0].pos.y].color = "#f00"
                    this.ui.selectedTile = colls[0].pos
                    var tile = this.tileGrid[colls[0].pos.x][colls[0].pos.y]

                    if (tile.owner != null) {

                        if (tile.owner.Id == player.Id) {
                            this.clickCallbacks[tile.object[0]]()
                        }
                    }
                }

            }
        }
    }

    testForTile(pos) {
        return (this.tileGrid[pos.x] != undefined && this.tileGrid[pos.x][pos.y] != undefined)
    }
}



var noise = new SimplexNoise()

class gridTile {
    constructor(pos) {
        this.pos = pos
        let scale = 0.075,
            height = noise.noise2D(pos.x*scale, pos.y*scale)

        this.owner = null
        this.objectHidden = false


        this.value = (height > 0)?(height > 0.75)?"mountains":"land":"sea"
        this.color = gameColors[this.value]

        this.object = (Math.random()>0.9 && this.value == "land")?"b":"empty"

    }
}