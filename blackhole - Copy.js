var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var resx,resy;
let particleArray = [];
var mouse = {
    x: undefined,
    y: undefined,
    radius: 0
};
var flag = 1;
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('click', (event) => {
    if(flag==1)
    {
        mouse.radius = 100;
        flag=0;
    }
    else
    {
        mouse.radius = 0;
        flag=1;
    }
});
window.addEventListener('dblclick',()=>{mouse.radius = 2700;flag=0});
ctx.fillStyle = 'white';
ctx.font = '100 verdana';
//ctx.fillText('S A R T H A K  K A T I Y A A R',0,40);
ctx.fillText('S H I V A N K  S H A R M A',0,40);

const textCordinate = ctx.getImageData(0,0,1000,1000);
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

        if(distance<mouse.radius)
        {
            this.x +=forceDirectionX*3;
            this.y +=forceDirectionY*3;
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
// for(let i=0;i<1500;i++)
// {
//     let x = Math.random()*canvas.width;
//     let y = Math.random()*canvas.height;
//     particleArray.push(new particle(x,y));
// }

for(let y=0,y2=textCordinate.height;y<y2;y++)
{
    for(let x=0,x2=textCordinate.width;x<x2;x++){
        if(textCordinate.data[(y*4*textCordinate.width)+(x*4)+3]>128)
        {
            let positionx = x + 4;
            let positiony = y ;
            particleArray.push(new particle(positionx*10,positiony*10));
        }
    }
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
