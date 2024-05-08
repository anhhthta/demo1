var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;

var c = canvas.getContext('2d');

c.beginPath();
// c.lineWidth = 10;
c.moveTo(0, canvas.height/2);

for (let i = 0; i < canvas.width; i++) {
    c.lineTo(i, (canvas.height/2 + Math.sin(i*0.01)*100));
}
c.stroke();