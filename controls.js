var c = {
    mouse:{
        pos:v(),
        down:false,
    },
    keys:{}
}

var pc = {...c}

document.addEventListener("mousemove", function(e){
    c.mouse.pos = v(e.offsetX, e.offsetY)
})
document.addEventListener("mousedown", function(e){
    c.mouse.down = true
})
document.addEventListener("mouseup", function(e){
    c.mouse.down = false
})
document.addEventListener("keydown", function(e) {
    if (e.key.toLowerCase() == "escape") {
        gameScene.ui.mouseHolding = undefined
        gameScene.mouseCallback = false
    }
})


function updateC() {
    pc = {
        mouse:{
            ...c.mouse
        },
        keys:{...c.keys}
    }
}