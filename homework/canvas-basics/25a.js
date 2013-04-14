// JD: Don't forget to wrap this in a function!  Otherwise you
//     are polluting the global namespace.
var context = document.getElementById("canvas").getContext("2d");
context.lineWidth = 3;
context.beginPath();
context.fillStyle = "blue";
context.fillRect(150,150,200,200);
context.closePath();

