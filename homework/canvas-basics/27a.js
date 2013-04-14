var context = document.getElementById("canvas").getContext("2d");
context.lineWidth = 3;
context.strokeStyle = "#006400";
context.beginPath();
context.strokeRect(194,106.1,150,150);
context.closePath();

context.beginPath();
context.strokeStyle = "#539E53";
context.strokeRect(150,150,150,150);
context.closePath();

context.beginPath();
context.moveTo(150,150);
context.lineTo(194,106.1);
context.moveTo(300,150);
context.lineTo(344,106.1);
context.moveTo(150,300);
context.lineTo(194,256.1);
context.moveTo(300,300);
context.lineTo(344,256.1);
context.closePath();
context.stroke();
