function createMandel() {
    var canvas = document.getElementById("mandel");

    var context = canvas.getContext("2d");

    var itr = 10000;
    var zoom = 0.6;
    var yOffset = 0.01;
    var xOffset = 0;

    var minRe = -2.0;
    var maxRe = 0.0;
    var minIm = -1.2;
    var maxIm = (minIm+(maxRe-minRe)*canvas.height/canvas.width);
    var ref = (maxRe-minRe)/(canvas.width-1)/zoom;
    var imf = (maxIm-minIm)/(canvas.height-1)/zoom;

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
                    context.fillStyle = 'rgb(' + n + ',' + n*8 + ',100)';
                    context.fillRect(x, y, 1, 1);
                    break;
                }
                zim = 2*zre*zim+cim;
                zre = zre2 - zim2 + cre;
            }
            if(isInside == true)
            {
                context.fillStyle = 'black';
                context.fillRect(x, y, 1, 1);
                console.log(x + " " + y);
            }
        }
    }
}

window.onload = function() {
    createMandel();
}