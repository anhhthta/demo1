var canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');

let mouse = {
    x: 0,
    y: 0
}

let mouseClick = {
    x: undefined,
    y: undefined
}

const colors = [
    '#2185c5',
    '#7ecefd',
    '#ff7f66',
]

// ----------------------------------------------------------------------------------

// XEM PHƯƠNG TRÌNH VA CHẠM ĐÀN HỒI: (ELASTIC COLLISION)

// ----------------------------------------------------------------------------------

addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})




addEventListener('click',(e) =>{
    mouseClick.x = e.x;
    mouseClick.y = e.y;
    init(mouseClick.x, mouseClick.y)
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

function rotate(velocity, angle){
    const rotateVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    }
    return rotateVelocities;
}


function resolveCollison(particle, otherParticle){
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particle
    // Ngặn chặn sự chồng chéo của các hạt
    if( xVelocityDiff * xDist + yVelocityDiff * yDist >= 0){

        // Grab angle between the two colliding particles
        // Góc hút của các hạt va chạm
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        // Lưu mass vào var để dễ đọc hơn trong phương trình va chạm
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        // Vận tóc trước phướng trình
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        // Vận tóc sau khi phương trình chạm 1d
        const v1 = {x: u1.x * (m1-m2) / (m1+m2) + u2.x * 2 * m2 / (m1+m2), y: u1.y};
        const v2 = {x: u2.x * (m1-m2) / (m1+m2) + u1.x * 2 * m2 / (m1+m2), y: u2.y};

        // Final velocities after rotating axis to original location
        // Vận tóc cuối cùng sau khi quay trục về vị trí bạn đầu
        const vFinal1 = rotate(v1,-angle);
        const vFinal2 = rotate(v2,-angle);

        // Swap particle velocitis for realistic bounce effect
        // Hoán đổi vận tóc hạt để có hiệu ứng nảy thực tế
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}



function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
    this.velocity = {
        x: randomIntFromRange(-2,2),
        y: randomIntFromRange(-2,2)
    }

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
    }

    this.update = particles => {
        this.draw();

        for(let i = 0; i < particles.length; i++){
            if(this === particles[i]) continue;

            if(getDistance(this.x, this.y, particles[i].x, particles[i].y) - (this.radius+particles[i].radius)< 0){
                resolveCollison(this, particles[i]);
            }
            
        }
        
        if(this.x + this.radius > innerWidth || this.x - this.radius <= 0){
            this.velocity.x = -this.velocity.x;
        }

        if(this.y + this.radius >= innerHeight || this.y - this.radius < 0){
            this.velocity.y = -this.velocity.y;
        }

        if(getDistance(mouse.x, mouse.y, this.x, this.y) + this.radius < 60  && this.opacity <0.2){
            this.opacity +=0.02;
        } else if (this.opacity >0){
            this.opacity -=0.02;

            this.opacity = Math.max(0, this.opacity);
        }


        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

}


let particles = [];

let n = 0;
function init(x, y){
    if(n==0){
        for(let i = 0; i < 5; i++){
            const radius = 15;
            let x = randomIntFromRange(radius, canvas.width - radius);
            let y = randomIntFromRange(radius, canvas.height - radius);
            const color = randomColor(colors);
            
            if(i != 0){
                for(let j = 0; j < particles.length ; j++) {
                    if(getDistance(x, y, particles[j].x, particles[j].y) - (radius+particles[j].radius)< 0){
                        x = randomIntFromRange(radius, canvas.width - radius);
                        y = randomIntFromRange(radius, canvas.height - radius);
                        j = -1;
                    } 
                }
            }
            particles.push(new Particle(x, y, radius, color));
        }
        n++;
    } else {
        const radius = 15;
        const color = randomColor(colors);
        particles.push(new Particle(x, y, radius, color));
    }
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);
    
    
    particles.forEach(particle =>{
        particle.update(particles);
    })
}

init();
animate();