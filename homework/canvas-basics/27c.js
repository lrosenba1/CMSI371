
var context = document.getElementById("canvas").getContext("2d");
context.lineWidth = 3;
context.beginPath();
context.arc(100,100,55,0*Math.PI,2*Math.PI);
context.closePath();
var grad = context.createRadialGradient(57,46,45,85,85,110);
grad.addColorStop(0,"#FFFFF0");
grad.addColorStop(1,"#6B4724");
context.fillStyle = grad;
context.fill();

context.beginPath();
context.moveTo(60,63);
context.bezierCurveTo(90,70,90,130,60,137);
context.strokeStyle = "red";
context.stroke();

context.beginPath();
context.moveTo(140,63);
context.bezierCurveTo(110,70,110,130,140,137);
context.strokeStyle = "red";
context.stroke();

context.beginPath();
context.arc(300,100,55,0*Math.PI,2*Math.PI);
context.closePath();
var grad = context.createRadialGradient(257,46,46,290,85,79);
grad.addColorStop(0,"#DBFF70");
grad.addColorStop(1,"#6BB224");
context.fillStyle = grad;
context.fill();

context.beginPath();
context.moveTo(343,67);
context.bezierCurveTo(255,35,255,165,343,133);
context.lineWidth = 5;
context.strokeStyle = "#FBFBFB";
context.stroke();

context.beginPath();
context.arc(80,242,40,0*Math.PI,2*Math.PI);
context.closePath();
var grad = context.createRadialGradient(80,197,35,80,252,40);
grad.addColorStop(0,"white");
grad.addColorStop(1,"black");
context.fillStyle = grad;
context.fill();

var hex = function(ctxt) {
   //this function creates hexagons
   ctxt.beginPath();
   ctxt.moveTo(0,0);
   ctxt.lineTo(5.2,-3);
   ctxt.lineTo(10.4,0);
   ctxt.lineTo(10.4,6);
   ctxt.lineTo(5.2,9);
   ctxt.lineTo(0,6);
   ctxt.closePath();
   ctxt.stroke();
}
context.lineWidth = 3;
context.strokeStyle = "#F2F2F2";
context.beginPath();
context.save();
context.translate(60,210);
hex(context);
context.restore();
context.save();
context.translate(70.4,208);
hex(context);
context.restore();
context.save();
context.translate(80.4,208);
hex(context);
context.restore();
context.save();
context.translate(90.4,210);
hex(context);
context.restore();
context.save();
context.translate(52.8,219);
hex(context);
context.restore();
context.save();
context.translate(65.2,218);
hex(context);
context.restore();
context.save();
context.translate(75.6,217);
hex(context);
context.restore();
context.save();
context.translate(86,219);
hex(context);
context.restore();
context.save();
context.translate(96.4,219);
hex(context);
context.restore();
context.save();
context.translate(46,228);
hex(context);
context.restore();
context.save();
context.translate(58.4,228);
hex(context);
context.restore();
context.save();
context.translate(68.8,228);
hex(context);
context.restore();
context.save();
context.translate(79.2,228);
hex(context);
context.restore();
context.save();
context.translate(89.6,228);
hex(context);
context.restore();
context.save();
context.translate(102,228);
hex(context);
context.restore();
context.strokeStyle = "#C1C1C1";
context.save();
context.translate(40.8,237);
hex(context);
context.restore();
context.save();
context.translate(51.2,237);
hex(context);
context.restore();
context.save();
context.translate(61.6,238);
hex(context);
context.restore();
context.save();
context.translate(72,238);
hex(context);
context.restore();
context.save();
context.translate(82.4,238);
hex(context);
context.restore();
context.save();
context.translate(92.8,238);
hex(context);
context.restore();
context.save();
context.translate(105.2,238);
hex(context);
context.restore();
context.strokeStyle = "#A9A9A9";
context.save();
context.translate(46,246);
hex(context);
context.restore();
context.save();
context.translate(56.4,246);
hex(context);
context.restore();
context.save();
context.translate(66.8,246);
hex(context);
context.restore();
context.save();
context.translate(77.2,246);
hex(context);
context.restore();
context.save();
context.translate(87.6,246);
hex(context);
context.restore();
context.save();
context.translate(98,246);
hex(context);
context.restore();
context.save();
context.translate(106.6,248);
hex(context);
context.restore();
context.strokeStyle = "#787878";
context.save();
context.translate(49.2,256);
hex(context);
context.restore();
context.save();
context.translate(59.6,256);
hex(context);
context.restore();
context.save();
context.translate(70,256);
hex(context);
context.restore();
context.save();
context.translate(80.4,256);
hex(context);
context.restore();
context.save();
context.translate(90.8,256);
hex(context);
context.restore();
context.save();
context.translate(101.2,256);
hex(context);
context.restore();
context.strokeStyle = "#484848";
context.save();
context.translate(54.4,265);
hex(context);
context.restore();
context.save();
context.translate(64.8,266);
hex(context);
context.restore();
context.save();
context.translate(75.2,266);
hex(context);
context.restore();
context.save();
context.translate(85.6,266);
hex(context);
context.restore();
context.save();
context.translate(95,265);
hex(context);
context.restore();


































