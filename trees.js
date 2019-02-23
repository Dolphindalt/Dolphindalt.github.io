var canvast = document.getElementById("trees");

canvast.width = window.innerWidth;
canvast.height = window.innerHeight;

var ang2rad = 3.14159265359/180;
var context = canvast.getContext("2d");

var drawing = false;

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomnf(min, max) {
    return Math.random() * (max - min) + min;
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
    var newLength = length * contraction;
    generate(itr-1, npos, newLength * randomnf(0.8, 1.3), contraction, theta + dtheta, randomnf(16.0, 40.0) * ang2rad);
    generate(itr-1, npos, newLength * randomnf(0.8, 1.3), contraction, theta - dtheta, randomnf(16.0, 40.0) * ang2rad);
}

function createTree(x) {
    drawing = true;    
    var itr, pos, length, contraction, theta, dtheta;
    itr = random(7, 12);
    pos = {x:x, y:canvast.height };
    length = random(80, 300);
    contraction = 0.7;
    theta = randomnf(75.0, 105.0) * ang2rad;//90.0 * ang2rad;
    dtheta = randomnf(15.0, 25.0) * ang2rad;//18.0 * ang2rad;
    context.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
    context.beginPath();
    generate(itr, pos, length, contraction, theta, dtheta);
}