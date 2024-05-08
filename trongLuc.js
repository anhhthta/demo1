var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;

var c = canvas.getContext('2d');

var colors = [
    '#2185c5',
    '#7ecefd',
    '#fff6e5',
    '#ff7f66'
];

var gravity = 1 //TRỌNG LỰC;
var friction = 0.4//LỰC MA SÁT, giá trị mất đi mỗi lần chạm đất

function randomIntFromRange(max,min){
    return Math.floor(Math.random()*(max-min+1) + min)
}

function randomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)]
}


function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.color = color; 

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }

    this.update = function(){
        if(this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.dy * friction;
        } else{
            this.dy += gravity;
        }

        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0){
            this.dx = -this.dx;
        }


        this.y += this.dy;        
        this.x += this.dx; 
        this.draw();
    }
}

// IMPLEMENTATION (THỰC HIỆN)
var ballArr = [];

function init(){
    for(var i = 0; i <= 1; i++){
        var x = randomIntFromRange(0, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        var dx = randomIntFromRange(2,-2);
        var radius = randomIntFromRange(10,30);
        var color = randomColor(colors)
        ballArr.push(new Ball(x, y, dx, 1, radius, color))
    }
}

function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    ballArr.forEach(e =>{
        e.update();
    })
}

init();
animate();