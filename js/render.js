var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.textAlign = "center";

function render() {
    document.getElementById("myCanvas").width = window.innerWidth
    document.getElementById("myCanvas").height = window.innerHeight

    ctx.fillStyle = "#222222"
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

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
    ctx.font = "80px Arial"
    ctx.fillText("Idle Knight", window.innerWidth/2, 80)
}