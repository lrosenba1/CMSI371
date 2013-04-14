
var context = document.getElementById("canvas").getContext("2d");
context.lineWidth = 3;
context.beginPath();
var grad = context.createRadialGradient(250,250,210,250,250,80);
grad.addColorStop(0,"#B0C4DE");
grad.addColorStop(1,"red");
context.fillStyle = grad;
context.fillRect(0,0,500,250);
context.closePath();

context.beginPath();
context.arc(250,250,80,Math.PI,2*Math.PI);
context.closePath();
var grd = context.createRadialGradient(250,250,30,250,250,80);
grd.addColorStop(0,"orange");
grd.addColorStop(1,"red");
context.fillStyle = grd;
context.fill();

context.beginPath();
var gradi = context.createRadialGradient(250,250,30,250,250,160);
gradi.addColorStop(0,"#FF4500");
gradi.addColorStop(1,"#006400");
context.fillStyle = gradi;
context.fillRect(0,250,500,250);
context.closePath();
