window.onload = function() {
    wave_sequence();
    setInterval(() => {
        createTree(random(0, canvast.width));
    }, 1000);
    createMandel(1.0, xOffset, yOffset);
    draw_triangles();
}

function squareY(x, p, o) {
    return((x%p)<o?o:0);
}

function sawY(x, p) {
    return(x%p);
}

function triY(x, p, o){
    return( Math.abs((x%p)-o));
}

var offset = 0;

function wave_sequence() {
    let canvas = document.getElementById("wave");
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    let fps = 10;
    let n = 0;
    animate_waves();
    function animate_waves() {
        offset += 0.1;
        requestAnimationFrame(animate_waves);
        n += 1.5;
        if (n > 300) {
            n = 0;
        }
        
        ctx.beginPath();
        for(let x = 0; x < n; x++) {
            ctx.lineTo(x, triY(x, 40, 10) + offset);
        }
        ctx.stroke();

        ctx.beginPath();
        for(let x = 0; x < n; x++) {
            ctx.lineTo(x, sawY(x, 50) + 45 + offset);
        }
        ctx.stroke();

        ctx.beginPath();
        for(let x = 0; x < n; x++) {
            ctx.lineTo(x, squareY(x, 30, 15) + 100 + offset);
        }
        ctx.stroke();
        if(offset > 10) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            offset = -1.0;
        }
    };
}