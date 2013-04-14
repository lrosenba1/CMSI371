
var context = canvas.getContext("2d");
context.lineWidth = 7;
context.beginPath();
context.fillStyle = "rgba(0, 128, 0, 0.5)";
context.fillRect(100,100,200,150);
context.closePath();

context.beginPath();
context.fillStyle = "rgba(255, 0, 0, 0.5)";
context.fillRect(170,175,200,150);
context.closePath();
