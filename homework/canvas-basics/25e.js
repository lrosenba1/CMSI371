//creating a brown hexagon
var context = canvas.getContext("2d");
context.lineWidth = 5;
context.strokeStyle = "brown";
context.beginPath();
context.moveTo(150,150);
context.lineTo(202,120);
context.lineTo(254,150);
context.lineTo(254,210);
context.lineTo(202,240);
context.lineTo(150,210);
context.closePath();
context.fillStyle = "brown";
context.fill();
context.stroke();
