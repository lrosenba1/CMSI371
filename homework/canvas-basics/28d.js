
var context = document.getElementById("canvas").getContext("2d");
var stick = function(context) {
   context.beginPath();
   context.arc(100,56,28,0*Math.PI,2*Math.PI);
   context.closePath();
   context.fillStyle="#F5DEB3";
   context.fill();
   context.stroke();

   context.beginPath();
   context.arc(89,52,5,0*Math.PI,2*Math.PI);
   context.closePath();
   var grad = context.createRadialGradient(89,52,0.5,89,52,3);
   grad.addColorStop(0,"black");
   grad.addColorStop(1,"white");
   context.fillStyle = grad;
   context.fill();
   context.stroke();

   context.beginPath();
   context.arc(111,52,5,0*Math.PI,2*Math.PI);
   context.closePath();
   var grd = context.createRadialGradient(111,52,0.5,111,52,3);
   grd.addColorStop(0,"black");
   grd.addColorStop(1,"white");
   context.fillStyle = grd;
   context.fill();
   context.stroke();

   context.beginPath();
   context.moveTo(85,63);
   context.bezierCurveTo(90,78,110,78,115,63);
   context.stroke();
   
   context.beginPath();
   context.moveTo(100,84);
   context.lineTo(100,190);
   context.closePath();
   context.stroke();

   context.beginPath();
   context.moveTo(50,70);
   context.lineTo(100,120);
   context.lineTo(150,70);
   context.stroke();

   context.beginPath();
   context.moveTo(50,240);
   context.lineTo(100,190);
   context.lineTo(150,240);
   context.stroke();
 }

context.save();
context.beginPath();
context.translate(0,0);
stick(context);
context.restore();

   context.beginPath();
   context.moveTo(110,42);
   context.bezierCurveTo(135,72,166,62,127,42);
   context.fillStyle="blue";
   context.fill();
   context.stroke();

   var grd = context.createRadialGradient(100,20,5,100,30,20);
   grd.addColorStop(0,"orange");
   grd.addColorStop(1,"red");
   context.fillStyle = grd;
   context.beginPath();
   context.arc(100,55,30,(8/7)*Math.PI,(13*Math.PI)/7);
   context.closePath();
   context.fill();
   context.stroke();

   context.beginPath();
   context.arc(100,26,4.5,Math.PI,2*Math.PI);
   context.closePath();
   context.fillStyle="white";
   context.fill();
   context.stroke();

context.save();
context.beginPath();
context.translate(300,0);
stick(context);
context.restore();

context.beginPath();
context.arc(400,55,30,(8/7)*Math.PI,(13*Math.PI)/7);
context.closePath();
context.stroke();
context.fillStyle="black";
context.fill();

context.beginPath();
context.moveTo(374,40);
context.bezierCurveTo(355,200,380,200,383,40);
var grd = context.createRadialGradient(376,40,20,377,200,50);
grd.addColorStop(0,"black");
grd.addColorStop(1,"brown");
context.fillStyle = grd;
context.fill();
context.stroke();

context.beginPath();
context.moveTo(417,40);
context.bezierCurveTo(415,200,438,200,426,40);
context.fillStyle="black";
context.fill();
context.stroke();





















