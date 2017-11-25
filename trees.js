var canvas = document.getElementById("trees");
if(!canvas) exit(0);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ang2rad = 3.14159265359/180;
var context = canvas.getContext("2d");

var drawing = false;

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generate(itr, pos, length, contraction, theta, dtheta) {
    if(itr == 0) {
        drawing = false;
        return;
    }
    var x0 = pos.x, y0 = pos.y;
    var x = x0 + length * Math.cos(theta), y = y0 - length * Math.sin(theta);
    context.moveTo(x0, y0);
    context.lineTo(x, y);
    context.stroke();
    var npos = {x:x, y:y};
    generate(itr-1, npos, length*contraction, contraction, theta + dtheta, dtheta);
    generate(itr-1, npos, length*contraction, contraction, theta - dtheta, dtheta);
}

function createTree(x) {
    drawing = true;    
    var itr, pos, length, contraction, theta, dtheta;
    itr = random(7, 12);
    pos = {x:x, y:canvas.height };
    length = random(80, 300);
    contraction = 0.7;
    theta = random(80, 100) * ang2rad;//90.0 * ang2rad;
    dtheta = random(16, 20) * ang2rad;//18.0 * ang2rad;
    generate(itr, pos, length, contraction, theta, dtheta);
}

canvas.addEventListener('click', function(event) {
    if(drawing) return;
    var x;
    if(event.pageX) x = event.pageX;
    else x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    createTree(x);
}, false);