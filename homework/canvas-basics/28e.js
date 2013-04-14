
var context = document.getElementById("canvas").getContext("2d");
context.save();
context.fillStyle = "#191970";
context.beginPath();
context.fillRect(0,0,500,500);
context.closePath();

// JD: Aw, you can come up with a better function name than these!
var wind = function(context) {
   context.fillStyle="yellow";
   context.fillRect(0,0,20,20);
}

context.restore();
// JD: Ditto function name...
var build = function(context) {
    // JD: Ack!  Missing indent.
var randInt = Math.ceil(350*Math.random());
   context.beginPath();
   context.fillRect(0,randInt,80,500);
   context.closePath();
   context.fillStyle="black";
   context.fill();
   context.stroke();
   var r = Math.ceil(500*Math.random());
   if (r < randInt) {
      r = r + randInt;
   }
   for (var j = 0; j < 3; j++) {
      context.save();
      context.translate(Math.ceil(60*Math.random()),r);
      wind(context);
      context.restore();
  }
}

//context.save();

for (var i=0; i < 400; i++) {
  //context.restore();
  //context.fillStyle="black";
  build(context);
  context.translate(70,40);
  //context.save();
  //context.restore();
}
//context.restore();


























