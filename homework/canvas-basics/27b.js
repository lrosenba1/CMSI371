var context = document.getElementById("canvas").getContext("2d");
context.lineWidth = 3;
context.beginPath();
context.moveTo(150,44);
context.lineTo(150,194);
context.lineTo(300,194);
context.lineTo(300,44);
context.closePath();
context.fillStyle = "#D3D3D3";
context.fill();

context.beginPath();
context.moveTo(150,44);
context.lineTo(194,0);
context.lineTo(344,0);
context.lineTo(300,44);
context.closePath();
context.fillStyle = "#A9A9A9";
context.fill();

context.beginPath();
context.moveTo(300,44);
context.lineTo(344,0);
context.lineTo(344,150);
context.lineTo(300,194);
context.closePath();
context.fillStyle = "#696969";
context.fill();
