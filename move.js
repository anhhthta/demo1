var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 30  ;
canvas.height = window.innerHeight - 30;

var c = canvas.getContext('2d');

const colors = [
    '#2185c5',
    '#7ecefd',
    '#ff7f66',
]

var mouse = {
    x: canvas.width/2,
    y: canvas.height/2
}

addEventListener('mousemove', (e) =>{
    mouse.x = e.x;
    mouse.y = e.y
})

function randomDoubleFromRenge(min, max){
    return Math.random()*(max - min + 1) - min
}

function randomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)]
}

function Ball(x,y,vx,vy,radius, color){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
    this.radian = 1;
    this.v = 0.05;
    this.distance = {
        x: randomDoubleFromRenge(170,250),
        y: randomDoubleFromRenge(170,250),
    }
    
    this.update = ()=>{
        this.pastPoint = {
            x: this.x,
            x: this.y
        }
        this.pastPoint.x = (this.pastPoint.x  + mouse.x);
        this.pastPoint.y = (this.pastPoint.y  + mouse.y);
        this.radian += this.v;
        this.x = mouse.x + Math.cos(this.radian)*this.distance.x;
        this.y = mouse.y + Math.sin(this.radian)*this.distance.y;
        this.draw();
    }

    this.draw = () => {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0, Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
    }
}


let balls = [];

function init(){
    balls = []
    for(let i = 0; i < 100; i++){
        var x = randomDoubleFromRenge(100, canvas.width);
        var y = randomDoubleFromRenge(100, canvas.height);
        var color = randomColor(colors)
        balls.push(new Ball(mouse.x,mouse.y,2,1,1, color))
    }
}

function animate(){
    requestAnimationFrame(animate);
    
    c.fillStyle = ("rgba(255,255,255,0.05");
    c.fillRect(0,0,canvas.width,canvas.height);
    balls.forEach(e =>{
        e.update();
    })
}

animate();
init()
