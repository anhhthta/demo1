var canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');

let mouse = {
    x: innerWidth/2,
    y: innerHeight/2
}

const color = [
    '#003840',
    '#005A5B',
    '#007369',
    '#008C72',
    '#02A676'
]

addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

addEventListener('resize', function(){
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;
})

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max-min+1) + min);
}

function randomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)];
}

function getDistance(x1, y1, x2, y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function Circle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        this.draw();
    }
}

let circle1;
let circle2;
function init(){
    circle1 = new Circle(300, 300, 100, 'black');
    circle2 = new Circle(undefined, undefined, 30, 'red');
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);

    circle1.update();
    circle2.update();
    circle2.y = mouse.y;
    circle2.x = mouse.x;
    
    if(getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius){
        circle1.color = 'blue';
    } else {
        circle1.color = 'black';
    }
}

init();
animate();