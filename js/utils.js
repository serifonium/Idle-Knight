function overlapping(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
        return false;
    }
    return true;
}
function drawBox(x, y, w, h) {
    ctx.fillStyle = "#bbbbbb"
    ctx.fillRect(x, y, w + 8, h + 8)
    ctx.fillStyle = "#6b6b6b"
    ctx.fillRect(x + 4, y + 4, w, h)
}
