var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;

var c = canvas.getContext('2d');

var colors = [
    '#00bdff',
    '#4d39ce',
    '#088eff',

]

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    xc: canvas.height / 2,
    yc: canvas.height / 2,
}


addEventListener('click', (e) =>{
    addPoint(e.x, e.y)
})

addEventListener('mousemove', e =>{
    mouse.x = e.x;
    mouse.y = e.y;
})

function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFloatFromRange(min,max){
    return Math.random() * (max - min + 1) + min;
}

function randomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)];
}


function Paticle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = randomFloatFromRange(0, Math.PI*2);
    this.velocity = Math.random()*(0.03-0.02)+0.02;
    this.distanceFromCenter = {
        x: randomIntFromRange(60, 150),
        y: randomIntFromRange(60, 150)
    }

    this.lastMouse = {x: x, y: y}
    this.update = () => {
        const lastPoint = {
            x: this.x,
            y: this.y
        }
    
        // Move points over time
        this.radians += this.velocity;

        // Drag effect      
        // làm cho hiệu ứng mượt hơn không bị gắp khúc

        this.lastMouse.x +=(mouse.x - this.lastMouse.x) *0.05;
        this.lastMouse.y +=(mouse.y - this.lastMouse.y) *0.05;

        // 
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;

        this.draw(lastPoint);
    }

    this.draw = lastPoint =>{
        // c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        // c.fillStyle = this.color;
        // c.fill();
        // c.closePath();

        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }

}

let paticles = [];
function init(){
    for(let i = 0; i < 10; i++){
        const radius = randomIntFromRange(1,2)
        const color = randomColor(colors)
        paticles.push(new Paticle(mouse.x, mouse.y, radius, color))
    }
}

function addPoint(x, y) {
    const radius = randomIntFromRange(1,2)
    const color = randomColor(colors)
    paticles.push(new Paticle(mouse.x, mouse.y, radius, color))
}

function animate(){
    requestAnimationFrame(animate);

    c.fillStyle = 'rgba(255,255,255,0.05)';
    c.fillRect(0,0,canvas.width, canvas.height);

    paticles.forEach(e =>{
        e.update();
    })

}

init();
animate();