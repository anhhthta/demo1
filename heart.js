var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;

var c = canvas.getContext('2d');

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min +1) + min);
}


c.beginPath();
c.moveTo(270, canvas.height/2);

for(var i = 270; i < canvas.width-270; i++){
    c.lineTo(i, canvas.height/2 + (Math.cos(0.04+i*0.01))*100);
}
c.stroke();

// function Particle(x, y, radius, color) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = color;
//     this.radians = 0;
//     this.velocity = 0.05; 
//     this.last = {
//         x: x,
//         y: y
//     }

//     this.distanceFromCenter = {
//         x: 150,
//         y: 150
//     }

//     this.update = () =>{

//         this.draw();

//     }

//     this.draw = () =>{
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
//         c.fill()
//         c.closePath();
//     }
// }

// var y = 100;
// var x = 100;

// var a = new Particle()

// let particles;
// function init(){
//     particles = [];
//     for(let i = 0; i<1; i++){
//         const x = 100;
//         const y = 100;
//         const radius = 5;
//         const color = 'blue';
//         particles.push(new Particle(canvas.width/2, canvas.height/2, radius, color));
//     }
// }

// function animate(){
//     requestAnimationFrame(animate);
//     // c.fillStyle = 'rgba(255,255,255,0.05)';
//     // c.fillRect(0,0,canvas.width, canvas.height);
//     c.clearRect(0,0,canvas.width, canvas.height);
//     particles.forEach(e =>{
//         e.update();
//     })
// }

// init();
// animate();