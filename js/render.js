var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.textAlign = "center";

var cx = 0
var cy = 0

function render() {
    document.getElementById("myCanvas").width = window.innerWidth
    document.getElementById("myCanvas").height = window.innerHeight

    ctx.fillStyle = "#222222"
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    for(let x in map) {
        for(let y in map[x]) {
            if(map[x][y].type === "grass") {ctx.fillStyle = "#50ad4c"}
            else if(map[x][y].type === "water") {ctx.fillStyle = "#395985"}
            ctx.fillRect(x*64+cx, y*64+cy, 64, 64)
            if(map[x][y].build === "town") {
                ctx.drawImage(imgCache.townTile, x*64+cx, y*64+cy)
            } if(map[x][y].build === "farm") {
                ctx.drawImage(imgCache.farmTile, x*64+cx, y*64+cy)
            }
        }
    }

    ctx.fillStyle = "#000000"
    ctx.globalAlpha = 0.2
    for(let x in map) {
        for(let y in map[x]) {
            ctx.fillRect(x*64+cx, y*64+cy, 64, 2)
            ctx.fillRect(x*64+cx, y*64+cy, 2, 64)
            ctx.fillRect(x*64+cx, y*64+62+cy, 64, 2)
            ctx.fillRect(x*64+62+cx, y*64+cy, 2, 64)
        }
    }
    ctx.globalAlpha = 1

    renderUI()
}

function renderUI() {
    ctx.fillStyle = "#999999"
    ctx.beginPath()
    ctx.moveTo(window.innerWidth/2 - 600, 0)
    ctx.lineTo(window.innerWidth/2 - 550, 100)
    ctx.lineTo(window.innerWidth/2 + 550, 100)
    ctx.lineTo(window.innerWidth/2 + 600, 0)
    ctx.fill()

    ctx.moveTo(window.innerWidth/2 - 600, window.innerHeight)
    ctx.lineTo(window.innerWidth/2 - 550, window.innerHeight - 100)
    ctx.lineTo(window.innerWidth/2 + 550, window.innerHeight - 100)
    ctx.lineTo(window.innerWidth/2 + 600, window.innerHeight)
    ctx.fill()

    ctx.fillStyle = "#000000"
    ctx.textAlign = "center"
    ctx.font = "60px Arial"
    ctx.fillText(currency.coins+" gold", window.innerWidth/2, 70)
    ctx.fillText(currency.food+" food", window.innerWidth/2, window.innerHeight - 20)

    ctx.fillStyle = "#333333"
    /*
    for(let i = 0; i < 10; i++) {
        ctx.fillRect(i*64+window.innerWidth/2 - 320, window.innerHeight - 64, 64, 2)
        ctx.fillRect(i*64+window.innerWidth/2 - 320, window.innerHeight - 64, 2, 64)
        ctx.fillRect(i*64+window.innerWidth/2 - 320, window.innerHeight - 64+62, 64, 2)
        ctx.fillRect(i*64+62+window.innerWidth/2 - 320, window.innerHeight - 64, 2, 64)
    }
    */
}