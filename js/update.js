function update() {
    if((vx > 0 && cx < 0) || (vx < 0 && cx < mapWidth*64 - window.innerWidth)) {
        cx += vx
    }
    if((vy > 0 && cy < 0) || (vy < 0 && cy < mapHeight*64 - window.innerHeight)) {
        cy += vy
    }
    
    render()
}