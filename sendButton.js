const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("button");

button.innerText = "SEND";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

button.addEventListener("click", function () {
  button.style.backgroundColor = "rgb(114, 180, 158)";
  setTimeout(function () {
    button.style.backgroundColor = "aquamarine";
    animate()
  }, 200);
  
});

var truck = new Image();
truck.src = "Truck_3.png";

var box = new Image()
box.src = "Box_1.png"

var completed = new Image()
completed.src = "completed.png"

function drawBox(x){
    ctx.drawImage(box ,x,140,50,50)
}

var truckPos = 300
function drawTruck(){
    ctx.drawImage(truck, truckPos, 100, 192, 150);
}

const truckPosUpdate = ()=>{
  truckPos+=2
  drawTruck()
}

var roadXpos = 240
var roadYpos = 120
var roadWidth = 300

const drawBack = ()=>{
  ctx.beginPath()
  ctx.fillStyle="#222"
  ctx.rect(roadXpos+300,roadYpos,400,100)
  ctx.fill()
}

const drawRoad = (x, y, w) => {
  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.rect(x, y, w, 100);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x, y + 8);
  ctx.lineTo(x + w, y + 8);
  ctx.moveTo(x, y + 92);
  ctx.lineTo(x + w, y + 92);
  ctx.stroke();
};

class roadBlock {
  constructor(x, y, speed,maxSize) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = 0
    this.maxSize =maxSize
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.lineTo(this.x - this.size, this.y);
    ctx.stroke();
  }
  update() {
    if(this.x <roadXpos)
    return
    if(this.size <= this.maxSize && this.x >=roadXpos+5*this.maxSize){
        this.size += this.speed
    }else if(this.x <=roadXpos+this.maxSize && this.size>=0){
        this.size -= this.speed
        this.x -= this.speed;
    }else
    this.x -= this.speed;
    this.draw();
  }
}

var boxXpos = 230
const boxUpdate = ()=>{
    if(boxXpos > 400)
    return
    else
    drawBox(boxXpos++)
}

const drawLine = (x,y)=>{
    ctx.beginPath()
    ctx.lineWidth=8
    ctx.strokeStyle="white"
    ctx.moveTo(x,y+8)
    ctx.lineTo(x,y+92)
    ctx.moveTo(x-15,y+8)
    ctx.lineTo(x-15,y+92)
    ctx.moveTo(x-30,y+8)
    ctx.lineTo(x-30,y+92)
    ctx.moveTo(x-45,y+8)
    ctx.lineTo(x-45,y+92)
    ctx.stroke()
}

const blocks = []
var count=0

function animate() {
  requestAnimationFrame(animate);
  count++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(count>500){
    ctx.drawImage(completed, 390, 150, 50, 50);
    button.innerText = "Delivered"
    return
  }
  
  drawRoad(roadXpos, roadYpos, roadWidth);
  if(count<300){
    boxUpdate()
  }else if(count >300){
    truckPosUpdate()
  }
  
  if(count %30 ==0 && boxXpos > 350 && count<500){
    const r1 = new roadBlock(535, 170,3,40)
    blocks.push(r1)
  }
  
  for(let i=0;i<blocks.length;i++){
    blocks[i].update()
  }  
  drawTruck()
  drawBack()
}


