var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;

var c = canvas.getContext('2d');

// TẠO HIỆU ỨNG CHO HÌNH TRÒN

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

// CANVAS SẼ TỰ THAY ĐỔI KÍCH THƯỚC KHI KÉO DÀI HAY THU NHỎ CỬA SỔ
// cái này thú vị nha

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 30;

})


var maxRadius = 40;
var dRadius = 1;

var color = [
    '#593e67',
    '#84495f',
    '#b85b56',
    '#fea837',
    '#de741c'
]

// console.log(color[1]);

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color[Math.floor(Math.random()*5)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        // c.strokeStyle = this.color;
        c.fill();
        c.fillStyle = this.color;
        // c.stroke(); 
    }

    this.update = function(){
        this.draw();

        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        // INTERACTIVITY (SỰ TƯƠNG TÁC)
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50){
                if(this.radius < maxRadius){
                    this.radius += dRadius;
                }
            } else if(this.radius >this.minRadius){
                this.radius -= dRadius;
            }

        this.x += this.dx;
        this.y += this.dy
    }
}

var circleArr = [];

for(var i = 0; i < 500; i++){
    var radius = Math.floor(Math.random()*10)+2;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    var x = Math.random()* (innerWidth - radius*2) + radius; // NGĂN CHẠN BỊ KẸT: Math.random()* (innerWidth - radius*2) + radius
    var y = Math.random()* (innerHeight - radius*2) + radius; // NGĂN CHẠN BỊ KẸT: Math.random()* (innerHeight - radius*2) + radius

    circleArr.push(new Circle(x, y, dx, dy, radius));
}

function animate(){
    requestAnimationFrame(animate);        
        c.clearRect(0,0,innerWidth, innerHeight);
        circleArr.forEach(a => {
            a.update();
        });
}

animate();