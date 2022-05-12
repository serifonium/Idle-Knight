function update() {
    if((vx < 0 && cx > 2) || (vx > 0 && cx < mapWidth*64)) {
        cx += vx
    }
    if((vy < 0 && cy <= 0) || (vy > 0 && cy >= mapHeight*64)) {
        cy += vy
    }
    if(cx < 0) {
        cx = 0
    } else if(cx > mapWidth*64) {
        cx = mapWidth*64
    }
    render()
}