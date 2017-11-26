var drawing = false;

var zoom = 1.0;
var xOffset = 0.0, yOffset = 0.0;
var speed = 0.08;

function createMandel(zoom, yOffset, xOffset) {
    if(drawing) return;
    drawing = true;
    var canvas = document.getElementById("mandel");

    var context = canvas.getContext("2d");
    var imageData = context.createImageData(canvas.width, canvas.height);
    var data = imageData.data;

    var itr = 100;

    var minRe = -2.0;
    var maxRe = 0.0;
    var minIm = -1.2;
    var maxIm = (minIm+(maxRe-minRe)*canvas.height/canvas.width);
    var ref = (maxRe-minRe)/(canvas.width-1)/zoom;
    var imf = (maxIm-minIm)/(canvas.height-1)/zoom;

    var dptr = 0;

    for(var y = 0; y < canvas.height; y++)
    {
        var cim = ((maxIm + y * imf)) + yOffset;
        for(var x = 0; x < canvas.width; x++)
        {
            var cre = ((minRe + x * ref)) + xOffset;
            var zre = cre, zim = cim;
            var isInside = true;
            for(var n = 0; n < itr; n++)
            {
                var zre2 = zre*zre, zim2 = zim*zim;
                if(zre2 + zim2 > 4)
                {
                    isInside = false;
                    data[dptr] = n;
                    data[dptr + 1] = n*8;
                    data[dptr + 2] = 100;
                    data[dptr + 3] = 255;
                    dptr += 4;
                    break;
                }
                zim = 2*zre*zim+cim;
                zre = zre2 - zim2 + cre;
            }
            if(isInside == true)
            {
                data[dptr] = 0;
                data[dptr + 1] = 0;
                data[dptr + 2] = 0;
                data[dptr + 3] = 255;
                dptr += 4;
            }
        }
    }
    context.putImageData(imageData, 0, 0);
    drawing = false;
}

var button = document.getElementById("redraw");
button.onclick = function() {
    createMandel(zoom, xOffset, yOffset);
}

document.addEventListener("keydown", function(event) {
    switch(event.code)
    {
        case "KeyA":
        {
            xOffset -= speed;
            break;
        }
        case "KeyD":
        {
            xOffset += speed;
            break;
        }
        case "KeyW":
        {
            yOffset += speed;
            break;
        }
        case "KeyS":
        {
            yOffset -= speed;
            break;
        }
        case "KeyQ":
        {
            zoom += speed;
            break;
        }
        case "KeyE":
        {
            zoom -= speed;
            break;
        }
        default: break;
    }
});

window.onload = function() {
    createMandel(1.0, 0.0, 0.0);
}