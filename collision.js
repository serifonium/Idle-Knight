class CollisionHandler {
    constructor(gameScene, ctx) {
        this.gameScene = gameScene
        this.ctx = ctx
    }

    testCollisions() {
        var collisions = new Array()

        var size = this.gameScene.config.hexSize,
            width = size,
            height = size*0.8660254326

        
        for (let x = 0; x < this.gameScene.tileGrid.length; x++) {
            var xRow = this.gameScene.tileGrid[x];
            for (let y = 0; y < xRow.length; y++) {
                var tile = xRow[y];

                var pos = v((tile.pos.x*width)+((y%2==0)?width/2:0), tile.pos.y*height)

                
                var hexPath = new Path2D()


                renderMethods.drawPolygon(hexPath, {
                    pos:v(pos.x+(width/2), pos.y+(size/2)+5),
                    size:size*0.55
                })

                var coll = this.ctx.isPointInPath(hexPath, c.mouse.pos.x, c.mouse.pos.y)
                if (coll) {

                    collisions.push({
                        pos:v(x, y)
                    })
                }
                
            }
            
        }

        return collisions
    }
}