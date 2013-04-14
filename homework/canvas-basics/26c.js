var context = document.getElementById("canvas").getContext("2d");
var hex = function(ctxt, i, j) {
   //this function creates hexagons
   ctxt.lineWidth = 5;
   ctxt.strokeStyle = "#DAA520";
   ctxt.beginPath();
   ctxt.moveTo(i,j);
   ctxt.lineTo((i+52),(j-30));
   ctxt.lineTo((i+104),j);
   ctxt.lineTo((i+104),(j+60));
   ctxt.lineTo((i+52),(j+90));
   ctxt.lineTo(i,(j+60));
   ctxt.closePath();
   ctxt.stroke();
   ctxt.fillStyle = "gold";
   ctxt.fill();
}
// JD: The line above needs to have a semi-colon.

//using translation to create hexagons.
// JD: Methinks you could have put this in a loop...
    hex(context, 100, 100);
    hex(context, 204, 100);
    hex(context, 308, 100);
    hex(context, 152, 190);
    hex(context, 256, 190);
    hex(context, 360, 190);
    hex(context, 100, 280);
    hex(context, 204, 280);
    hex(context, 308, 280);
    
   
