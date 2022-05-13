var renderImgs = {
    empty:"",
    c:"🏠",
    t:"🛖",
    b:"🌲",
    "s1":"🐥",
    "s2":"🦜",
    "s3":"🦅",
}

class SceneRenderer {
    constructor(gameScene, ctx) {
        this.gameScene = gameScene
        this.ctx = ctx

        this.buttons = new Array()

    }

    renderTiles() {
        this.ctx.save()


        var size = this.gameScene.config.hexSize,
            width = size,
            height = size*0.8660254326

        this.ctx.translate(width/2, (size/2)+5)
        for (let x = 0; x < this.gameScene.tileGrid.length; x++) {
            var xRow = this.gameScene.tileGrid[x];
            for (let y = 0; y < xRow.length; y++) {
                var tile = xRow[y];
                this.ctx.beginPath()

                

                var pos = v((tile.pos.x*width)+((y%2==0)?width/2:0), tile.pos.y*height)



                renderMethods.drawPolygon(gameCtx, {
                    pos:pos,
                    size:size*0.565
                })
                this.ctx.fillStyle = (this.gameScene.ui.selectedTile != undefined && (this.gameScene.ui.selectedTile.x == x && this.gameScene.ui.selectedTile.y == y))?pSBC(0.1, tile.color):tile.color
                this.ctx.fill()
                this.ctx.closePath()
                if (!tile.objectHidden) {
                    this.ctx.fillStyle = "#000"
                    this.ctx.textBaseline = "middle"
                    this.ctx.font = "30px Arial"
                    let text = renderImgs[tile.object],
                        textWidth = this.ctx.measureText(text).width
                    this.ctx.fillText(text,pos.x-(textWidth/2), pos.y)
                }
                
                
            }
            
        }


        this.ctx.restore()
    }

    renderButtons() {
        for (let i = 0; i < this.buttons.length; i++) {
            const button = this.buttons[i];
            button.render(this.ctx)
        }
    }

    renderMouse() {
        if (this.gameScene.ui.mouseHolding != null) {
            this.ctx.fillStyle = "#000"
            this.ctx.textBaseline = "middle"
            this.ctx.font = "30px Arial"
            let text = renderImgs[this.gameScene.ui.mouseHolding],
                textWidth = this.ctx.measureText(text).width
            this.ctx.fillText(text,c.mouse.pos.x-(textWidth/2), c.mouse.pos.y)
        }
    }

    renderGUI() {
        this.ctx.fillStyle = "#000"
        this.ctx.textBaseline = "middle"
        this.ctx.font = "30px Arial"
        let text = player.money,
            textWidth = this.ctx.measureText(text).width
        this.ctx.fillText(text,50+(this.gameScene.width*this.gameScene.config.hexSize)-(textWidth/2), 50)
    }
}


var renderMethods = {
    drawPolygon:function(ctx, options){


        options = {
            sides:6,
            size:20,
            pos:v(100,100),

            rotation:Math.PI*0.5,

            ...options
        }

      


        ctx.moveTo (options.pos.x +  options.size * Math.cos(0+options.rotation), options.pos.y +  options.size *  Math.sin(0+options.rotation));          

        for (var i = 1; i <= options.sides;i += 1) {
            ctx.lineTo (options.pos.x + options.size * Math.cos((i * 2 * Math.PI / options.sides)+options.rotation), options.pos.y + options.size * Math.sin((i * 2 * Math.PI / options.sides)+options.rotation));
        }


    }
}