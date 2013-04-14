
var context = document.getElementById("canvas").getContext("2d");
context.beginPath();
context.moveTo(330,280);
context.bezierCurveTo(320,380,645,280,360,270);
context.closePath();
context.fillStyle="#3B3B3B";
context.fill();
context.save();
context.shadowColor="black";
context.shadowBlur=10;
context.fill();
context.restore();

var grd = context.createRadialGradient(310,210,20,340,240,80);
grd.addColorStop(0,"orange");
grd.addColorStop(1,"red");
context.fillStyle = grd;
context.beginPath();
context.arc(350,250,70,0*Math.PI,2*Math.PI);
context.closePath();
context.fill();

context.lineWidth = 3;
context.beginPath();
context.moveTo(50,250);
context.lineTo(50,350);
context.lineTo(150,350);
context.lineTo(150,250);
context.closePath();
context.fillStyle = "#D3D3D3";
context.fill();

context.beginPath();
context.moveTo(50,250);
context.lineTo(79,221);
context.lineTo(179,221);
context.lineTo(150,250);
context.closePath();
context.fillStyle = "#A9A9A9";
context.save();
context.shadowColor="#3B3B3B";
context.shadowBlur=8;
context.shadowOffsetX=96;
context.shadowOffsetY=98;
context.fill();

context.restore();

context.beginPath();
context.moveTo(150,250);
context.lineTo(179,221);
context.lineTo(179,321);
context.lineTo(150,350);
context.closePath();
context.fillStyle = "#696969";
context.fill();






























