var context = document.getElementById("canvas").getContext("2d");
context.lineWidth = 5;
context.beginPath();
context.arc(250,250,80,0*Math.PI,2*Math.PI);
context.closePath();
var grad = context.createRadialGradient(180,170,55,210,200,75);
grad.addColorStop(0,"#FFD700");
grad.addColorStop(1,"#B8860B");
context.fillStyle = grad;
context.fill();

context.beginPath();
context.moveTo(180,210);
context.bezierCurveTo(-96,105,593,403,328,265);
context.strokeStyle = "#000000";
context.stroke();

context.beginPath();
context.moveTo(182,207);
context.bezierCurveTo(-110,103,612,418,329,260);
context.strokeStyle = "#474747";
context.stroke();

context.beginPath();
context.moveTo(184,204);
context.bezierCurveTo(-125,106,631,433,329,255);
context.strokeStyle = "#808080";
context.stroke();

context.beginPath();
context.moveTo(187,201);
context.bezierCurveTo(-150,105,650,448,329,249);
context.strokeStyle = "#C0C0C0";
context.stroke();

context.beginPath();
context.moveTo(322,216);
context.bezierCurveTo(615,114,-98,403,174,274);
context.strokeStyle = "#000000";
context.stroke();

context.beginPath();
context.moveTo(320,212);
context.bezierCurveTo(630,116,-112,412,173,270);
context.strokeStyle = "#474747";
context.stroke();

context.beginPath();
context.moveTo(318,208);
context.bezierCurveTo(645,118,-126,421,172,266);
context.strokeStyle = "#808080";
context.stroke();

context.beginPath();
context.moveTo(315,204);
context.bezierCurveTo(660,120,-140,430,171,262);
context.strokeStyle = "#C0C0C0";
context.stroke();










































