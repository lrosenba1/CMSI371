
var context = document.getElementById("canvas").getContext("2d");
context.lineWidth = 3;
context.beginPath();
context.arc(100,100,55,0*Math.PI,2*Math.PI);
context.closePath();
var grad = context.createRadialGradient(100,67,30,100,100,65);
grad.addColorStop(0,"#FFFF00");
grad.addColorStop(1,"#FF8C00");
context.fillStyle = grad;
context.fill();

context.beginPath();
context.moveTo(65,115);
context.bezierCurveTo(80,145,120,145,135,115);
context.stroke();

context.beginPath();
context.arc(80,85,6,0*Math.PI,2*Math.PI);
context.closePath();
context.stroke();

context.beginPath();
context.arc(120,85,6,0*Math.PI,2*Math.PI);
context.closePath();
context.stroke();

context.beginPath();
context.moveTo(110,135);
context.bezierCurveTo(135,152,145,140,126,128);
context.fillStyle = "red";
context.stroke();
context.fill();

