var context = document.getElementById("canvas").getContext("2d");
var square = function(ctxt) {
   //this function creates a lavender square.
   ctxt.lineWidth = 3;
   ctxt.fillStyle = "lavender";
   ctxt.fillRect(0,0,100,100);
}

//using translation to create squares.
var i = 0;
var j = 0;
while (i < 409) {
    context.save();
    context.translate(i,j);
    square(context);
    context.restore();
    i = i + 102;
    if (i > 408) {
       j = j + 102;
    }  
    if (i > 408 && j < 409) {
      i = 0;
    } 
}































