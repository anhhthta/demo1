var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// -------------------------------------------------------------------
// fillStyle: PHẢI ĐẶT Ở TRÊN CÙNG
c.fillStyle = 'rgba(255,0,0,0.2)';
c.fillRect(100, 150, 100, 100);

c.fillStyle = 'rgba(255,0,0,0.5)';
c.fillRect(150, 20, 100, 100);

c.fillStyle = 'rgba(255,0,0,0.8)';
c.fillRect(250, 300, 100, 100);

// ------------------------------------------------------------------
// LINE: 
// LẤY GIÁ TRỊ CỦA ĐIỂM TRƯỚC NÓ LÀM ĐIỂM GÓC
// beginPath: BẮT ĐẦU 1 ĐIỂM MỚI
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(500, 300);
c.lineTo(400, 200);
c.moveTo(400,300);
c.lineTo(500, 200);

c.strokeStyle = '#fa34a3';
c.stroke();

// ----------------------------------------------------------------
// ARC/ CICRCLE


c.beginPath();
c.arc(300,600, 50, 0, Math.PI * 2, false);
c.arc(500,400, 50, 2 ,Math.PI*2, true);
c.arc(500, 250, 50, 2, Math.PI*2, false);
c.strokeStyle = "blue";
c.stroke()

// KẾT HỢP VỚI VONG FOR

for(var i = 0; i < 100; i++){
    var x = Math.floor(Math.random()*(window.innerWidth));
    var y = Math.floor(Math.random()*window.innerHeight);
    var size =  Math.floor(Math.random()*40)+30;
    var red = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    console.log(x);
    c.beginPath();
    c.arc(x, y ,size , 0,Math.PI*2, false);
    c.strokeStyle = `rgb(${red},${blue},${green})`;
    c.stroke();
}

// ------------------------------------------------------------------