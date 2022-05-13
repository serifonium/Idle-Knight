class Button {
    constructor(gameScene, x, y, width, height, text, color, callback) {

        this.gameScene = gameScene

        this.pos = v(x,y)
        this.width = width
        this.height = height

        this.text = text
        this.color = color
          

        this.id = `${Math.random()}`
        this.callback = callback
            
        

        document.addEventListener("click", (e) => {
            if (
                e.offsetX > this.pos.x &&
                e.offsetX < this.pos.x+this.width && 
                e.offsetY > this.pos.y &&
                e.offsetY < this.pos.y+this.height 
                ) {
                    this.callback()
            }
        })
    }
    render(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
        ctx.fillStyle = "#000"

        ctx.font = `${this.height*0.35}px Arial`


        let text = this.text,
            textWidth = ctx.measureText(text).width


        ctx.textBaseline = "middle"

        ctx.fillText(text,(this.pos.x+(this.width/2))-(textWidth/2), (this.pos.y+(this.height/2)))
    }
    
}



function initButtons(gameScene) {
    sceneRenderer.buttons.push(new Button(gameScene, 50, (gameScene.height*gameScene.config.hexSize)*0.9, 150, 50, "Buy soilder", "#ab0c00", function(){
        gameScene.ui.mouseHolding = "s1"
        gameScene.mouseCallback = gameScene.reClickCallbacks["soilder"]
        gameScene.ui.mouseStatus = "buying"
        
        if (false) {
        /*var st = this.gameScene.ui.selectedTile
        if (st != undefined && gameScene.tileGrid[this.gameScene.ui.selectedTile.x][this.gameScene.ui.selectedTile.y].value == "land") {
            var adjacents  = getAdajcentHexes(st)

            if ((()=>{
                for (let i = 0; i < adjacents.length; i++) {
                    var tilePos = adjacents[i]
                    if (gameScene.testForTile(tilePos)) {
                        var tile = gameScene.tileGrid[tilePos.x][tilePos.y]

                        if (tile.owner != null){
                            if (tile.owner.Id == player.Id) {
                                return true
                            }
                        }
                    }                
                }
                return false
            })()) {
                console.log("yaysa")
                landClaimHandler(gameScene, gameScene.tileGrid[this.gameScene.ui.selectedTile.x][this.gameScene.ui.selectedTile.y])

            }
        
        }*/
    }
        
    }))
    sceneRenderer.buttons.push(new Button(gameScene, 50, ((gameScene.height*gameScene.config.hexSize)*0.9)+60, 150, 50, "Upgrade Soilder", "#ab0c00", function(){
        if (gameScene.ui.selectedTile != undefined) {
            var tile = gameScene.tileGrid[gameScene.ui.selectedTile.x][gameScene.ui.selectedTile.y]
            if (tile.object[0] == "s") {
                var level = parseInt(tile.object[1])
                tile.object = `s${level+1}`
            }
        }   
        
    }))
    sceneRenderer.buttons.push(new Button(gameScene, 220, (gameScene.height*gameScene.config.hexSize)*0.9, 150, 50, "Buy town", "#ab0c00", function(){
        gameScene.ui.mouseHolding = "t"
        gameScene.mouseCallback = gameScene.reClickCallbacks["town"]
        gameScene.ui.mouseStatus = "buying"

        
    }))
    sceneRenderer.buttons.push(new Button(gameScene, 390, (gameScene.height*gameScene.config.hexSize)*0.9, 150, 50, "End round", "#0cab00", function(){
        gameScene.stepRound(player)


        
    }))
}