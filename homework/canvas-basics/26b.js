var context = document.getElementById("canvas").getContext("2d");
var vLine = function(ctxt, i, j) {
   // creates a vertical line
   ctxt.lineWidth = 3;
   ctxt.strokeStyle = "#90EE90";
   ctxt.moveTo(i,j);
   ctxt.lineTo(i,500);
   ctxt.closePath();
   ctxt.stroke();
}

var hLine = function(ctxt, i, j) {
   // creates a horizontal line
   ctxt.lineWidth = 3;
   ctxt.strokeStyle = "#90EE90";
   ctxt.moveTo(i,j);
   ctxt.lineTo(500,j);
   ctxt.closePath();
   ctxt.stroke();
}

//using translation to create lines.
var i = 20;
var j = 0;
while (i < 501) {
    context.save();
    context.translate(i,j);
    vLine(context, i, j);
    context.restore();
    i = i + 20;
}

i = 0;
j = 20;

while (j < 501) {
    context.save();
    context.translate(i,j);
    hLine(context, i, j);
    context.restore();
    j = j + 20;
}
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   

