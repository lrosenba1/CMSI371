/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        square = function (renderingContext) {
            renderingContext.fillStyle = "blue";
            renderingContext.fillRect(-20, -20, 40, 40);
        },

        circle = function (renderingContext) {
            renderingContext.strokeStyle = "red";
            renderingContext.beginPath();
            renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
            renderingContext.stroke();
        },

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: [square, circle],
                keyframes: [
                    {
                        frame: 0,
                        tx: 20,
                        ty: 20,

                        ease: KeyframeTweener.easeInBack
                    },

                    {
                        frame: 30,
                        tx: 100,
                        ty: 50,
                        ease: KeyframeTweener.easeOutBounce
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 80,
                        tx: 80,
                        ty: 500,
                        rotate: 60 // Keyframe.rotate uses degrees.
                    },
                   
                   //keyframes: [
                    {
                        frame: 50,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5,

                        ease: KeyframeTweener.easeInBack
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 0,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5
                    }
                ]
            }
        ];
    
    var dot = function(ctxt, i, j) {
        //this function creates polka-dots
        ctxt.beginPath();
        ctxt.arc(i,j,10,0*Math.PI,2*Math.PI);
        ctxt.closePath();
        ctxt.fillStyle = "pink";
        ctxt.fill();
    }
    
    var myBackground = function(context) {
         context.beginPath();
         context.fillStyle = "#8B4513";
         context.fillRect(0,0,1024,768);
         context.closePath();
         var i = 60;
         var j = 60;
         while (j < 768) {
            dot(context,i,j);
            i = i + 60;
            if (i > 964) {
                j = j + 60;
                i = 60;
            } 
          }
     }
    
    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        background: myBackground,
        sprites: sprites
    });
}());
