function draw_triangles() {
    let canvas = document.getElementById("tri");
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
    ctx.beginPath();
    let w = canvas.width;
    let h = canvas.height;
    for(let t = 0.0; t < 300.0; t += 0.1)
    {
        x = Math.cos(t) * t;
        y = Math.sin(t) * t;
        ctx.lineTo(x + w/2.0, y + h/2.0);
    }
    ctx.stroke();
}