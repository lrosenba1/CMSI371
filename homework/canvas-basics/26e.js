var context = document.getElementById("canvas").getContext("2d");
//create first circle
   context.beginPath();
   context.arc(250,100,50,0*Math.PI,2*Math.PI);
   context.closePath();
   context.fillStyle = "purple";
   context.fill();
//create 2nd circle   
   context.beginPath();
   context.arc(250,210,70,0*Math.PI,2*Math.PI);
   context.closePath();
   context.fillStyle = "purple";
   context.fill();


