var canvas = document.querySelector('.canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var dx = 5;
var dy = 5;


var l = 0;

function CharMain(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        c.fill();
        c.fillStyle = "#007369";
    }

    this.update = function(){
        this.draw();

        if(!(this.x + this.radius + v.ix> innerWidth && v.ix > 0) && !(this.x - this.radius + v.ix < 0 && v.ix < 0)){
            this.x += v.ix;
        }

        if(!(this.y + this.radius > innerHeight && v.iy > 0) && !(this.y - this.radius + v.iy< 0 && v.iy < 0)){
            this.y += v.iy;
        }
            
    }
}

var v = {
    ix: 0,
    iy: 0,
}

addEventListener('keypress', function(event){
    switch (event.key) {
        case 'd': {
            v.ix = dx;
            v.iy = 0;
            l++;
            break;
        }
        case 'a':{
            v.ix = -dx;
            v.iy = 0;
            l++;
            break;
        } 
        case 'w':{
            v.ix = 0;
            v.iy = -dy;
            l++;
            break;
        } 
        case 's':{
            v.ix = 0;
            v.iy = dy;
            l++;
            break;
        } 

        case 'q':{
            v.ix = 0;
            v.iy = 0;
        }

    }
})


var radius = 30
var x = radius;
var y = radius;

var charMain = new CharMain(radius+2, radius, radius);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    charMain.update();
}

animate();