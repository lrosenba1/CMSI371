
var context = document.getElementById("canvas").getContext("2d");
context.lineWidth = 3;
context.beginPath();
var grad = context.createRadialGradient(250,250,250,250,250,70);
grad.addColorStop(0,"#B0C4DE");
grad.addColorStop(1,"#FF4500");
context.fillStyle = grad;
context.fillRect(0,0,500,250);
context.closePath();

/**context.beginPath();
context.arc(250,250,60,Math.PI,2*Math.PI);
context.closePath();
var grd = context.createRadialGradient(250,250,30,250,250,60);
grd.addColorStop(0,"orange");
grd.addColorStop(1,"red");
context.fillStyle = grd;
context.fill();*/

/**var gradi = context.createRadialGradient(250,250,30,250,250,70);
gradi.addColorStop(0,"#FF4500");
gradi.addColorStop(1,"#191970");
context.beginPath();
context.fillRect(0,250,500,125);
context.closePath();*/

var gradi1 = context.createLinearGradient(0, 250, 0, 500);
gradi1.addColorStop(0,"#191970");
gradi1.addColorStop(1,"#EAB988");
context.fillStyle = gradi1;
context.beginPath();
context.fillRect(0,250,500,250);
context.closePath();



