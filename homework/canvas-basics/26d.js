var context = document.getElementById("canvas").getContext("2d");
context.beginPath();
context.fillStyle = "#8B4513";
context.fillRect(0,0,500,500);
context.closePath();

var dot = function(ctxt, i, j) {
   //this function creates polka-dots
   ctxt.beginPath();
   ctxt.arc(i,j,10,0*Math.PI,2*Math.PI);
   ctxt.closePath();
   ctxt.fillStyle = "pink";
   ctxt.fill();
}

var i = 50;
var j = 50;
while (j < 500) {
    dot(context,i,j);
    i = i + 50;
    if (i > 450) {
       j = j + 50;
       i = 50;
    }  
}
