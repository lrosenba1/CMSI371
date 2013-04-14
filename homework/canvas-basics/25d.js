
var context = canvas.getContext("2d");
context.lineWidth = 20;
context.strokeStyle = "orange";
context.beginPath();
context.moveTo(0,0);
context.lineTo(500,500);
context.closePath();
context.stroke();

context.beginPath();
context.moveTo(0,500);
context.lineTo(500,0);
context.closePath();
context.stroke();
