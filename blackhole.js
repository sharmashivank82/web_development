var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var resx,resy;
let particleArray = [];
var mouse = {
    x: undefined,
    y: undefined,
    radius: 50
};
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});
class particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.basex = this.x;
        this.basey = this.y;
        this.radius = 3;
    }
    update()
    {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx*dx+dy*dy);

        let forceDirectionX = dx/distance;
        let forceDirectionY = dy/distance;

        if(distance<100)
        {
            this.x -=forceDirectionX*3;
            this.y -=forceDirectionY*3;
        }
        else
        {
            if(this.x!==this.basex)
            {
                let dx = this.x-this.basex;
                this.x -=dx/10;
            }
            if(this.y!==this.basey)
            {
                let dy = this.y-this.basey;
                this.y -= dy/10;
            }
        }
    }
    draw()
    {
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2,false);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}
for(let i=0;i<1500;i++)
{
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height;
    particleArray.push(new particle(x,y));
}

function animate()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);    
}
animate();