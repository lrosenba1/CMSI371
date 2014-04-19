/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
$(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // This variable stores 3D model information.
        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,
        
        // The raw meshes from which we will derive our objects.
        mesh = Shapes.sphere(),
        mesh1 = Shapes.cube(),

        // Important state variables.
        currentRotation = 0.0,
        currentInterval,
        modelViewMatrix,
        xRotationMatrix,
        yRotationMatrix,
        projectionMatrix,
        vertexPosition,
        vertexDiffuseColor,
        vertexSpecularColor,
        shininess,
        //rotationAroundX = 0.0,
        //rotationAroundY = 0.0,
        vertexColor,
        
        // For emphasis, we separate the variables that involve lighting.
        normalVector,
        lightPosition,
        lightDiffuse,
        lightSpecular,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,

        // JD: These matrix functions really should have gone into your library.
        //     Ultimately this is conceptually simple---move the code, change the
        //     signatures slightly, and then you're done.  The fact that these
        //     did not happen do not speak well of your understanding of the
        //     material, or of dealing with larger programming structures.
        /*
         * This code does not really belong here: it should live
         * in a separate library of matrix and transformation
         * functions.  It is here only to show you how matrices
         * can be used with GLSL.
         *
         * Based on the original glRotate reference:
         *     http://www.opengl.org/sdk/docs/man/xhtml/glRotate.xml
         */
        getRotationMatrix = function (angle, x, y, z) {
            // In production code, this function should be associated
            // with a matrix object with associated functions.
            var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
                s = Math.sin(angle * Math.PI / 180.0),
                c = Math.cos(angle * Math.PI / 180.0),
                oneMinusC = 1.0 - c,

                // We can't calculate this until we have normalized
                // the axis vector of rotation.
                x2, // "2" for "squared."
                y2,
                z2,
                xy,
                yz,
                xz,
                xs,
                ys,
                zs;

            // Normalize the axis vector of rotation.
            x /= axisLength;
            y /= axisLength;
            z /= axisLength;

            // *Now* we can calculate the other terms.
            x2 = x * x;
            y2 = y * y;
            z2 = z * z;
            xy = x * y;
            yz = y * z;
            xz = x * z;
            xs = x * s;
            ys = y * s;
            zs = z * s;

            // GL expects its matrices in column major order.
            return [
                (x2 * oneMinusC) + c,
                (xy * oneMinusC) + zs,
                (xz * oneMinusC) - ys,
                0.0,

                (xy * oneMinusC) - zs,
                (y2 * oneMinusC) + c,
                (yz * oneMinusC) + xs,
                0.0,

                (xz * oneMinusC) + ys,
                (yz * oneMinusC) - xs,
                (z2 * oneMinusC) + c,
                0.0,

                0.0,
                0.0,
                0.0,
                1.0
            ];
        },

        // JD: This is a one-line pass-through to your matrix library...why is this
        //     even here?
        translate = function (x, y ,z) {
            Matrix4x4.translate(x, y, z);
        },

        /*
         * This is another function that really should reside in a
         * separate library.  But, because the creation of that library
         * is part of the student course work, we leave it here for
         * later refactoring and adaptation by students.
         */
        getOrthoMatrix = function (left, right, bottom, top, zNear, zFar) {
            var width = right - left,
                height = top - bottom,
                depth = zFar - zNear;

            return [
                2.0 / width,
                0.0,
                0.0,
                0.0,

                0.0,
                2.0 / height,
                0.0,
                0.0,

                0.0,
                0.0,
                -2 / depth,
                0.0,

                -(right+left)/width,
                -(top+bottom)/height,
                -(zFar + zNear) / depth,
                1.0
            ];
        };

        getFrustumMatrix = function (left, right, bottom, top, zNear, zFar) {
            var width = right - left,
                height = top - bottom,
                depth = zFar - zNear;

            return [
                (2.0*zNear) / width,
                0.0,
                0.0,
                0.0,

                0.0,
                (2.0*zNear) / height,
                0.0,
                0.0,

                (right + left) / width,
                (top + bottom) / height,
                -(zFar + zNear) / depth,
                -1.0,

                0,
                0,
                (-2*zFar*zNear) / depth,
                0
            ];
        };

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.  Note how each object may come with a
    // rotation axis now.
    objectsToDraw = [
        // We move our original triangles a bit to accommodate a new addition
        // to the scene (yes, a translation will also do the trick, if it
        // where implemented in this program).
        {
            vertices: Shapes.toRawTriangleArray(Shapes.rect()),
            color: { r: 0.0, g: 0.0, b: 1.0 },
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,
            normals: Shapes.toNormalArray(Shapes.rect()),
            mode: gl.TRIANGLES,
            axis: { x: 1.0, y: 1.0, z: 1.0 }
        },
        
        {
            vertices: Shapes.toRawTriangleArray(Shapes.rect2()),
            color: { r: 0.0, g: 0.0, b: 1.0 },
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,
            normals: Shapes.toNormalArray(Shapes.rect2()),
            mode: gl.TRIANGLES,
            axis: { x: 1.0, y: 1.0, z: 1.0 }
        },
        
        {
            vertices: Shapes.toRawTriangleArray(Shapes.semirect()),
            color: { r: 0.0, g: 0.0, b: 1.0 },
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,
            normals: Shapes.toNormalArray(Shapes.semirect()),
            mode: gl.TRIANGLES,
            axis: { x: 1.0, y: 1.0, z: 1.0 }
        },

        {
            colors: [].concat(
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                //[ 0.0, 1.0, 0.0 ],
                //[ 0.0, 1.0, 0.0 ],
                //[ 0.0, 1.0, 0.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                //[ 1.0, 1.0, 0.0 ],
                //[ 1.0, 1.0, 0.0 ],
                //[ 1.0, 1.0, 0.0 ],
                //[ 1.0, 0.0, 0.0 ],
                //[ 1.0, 0.0, 0.0 ],
                //[ 1.0, 0.0, 0.0 ]
                //[ 1.0, 0.0, 0.0 ],
                //[ 1.0, 0.0, 0.0 ],
                //[ 1.0, 0.0, 0.0 ]
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ]
            ),
            vertices: Shapes.toRawTriangleArray(Shapes.triBlock()),
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,
            normals: Shapes.toNormalArray(Shapes.triBlock()),
            mode: gl.TRIANGLES,
            axis: { x: 1.0, y: 1.0, z: 1.0 }
        },

       /**{
            color: { r: 0.0, g: 0.0, b: 1.0 },
            vertices: Shapes.cylinder()['top'],
            
            mode: gl.TRIANGLE_FAN,
            axis: { x: 0.0, y: 1.0, z: 1.0 }
        },
        
        {
            color: { r: 0.0, g: 0.0, b: 1.0 },
            vertices: Shapes.cylinder()['bottom'],
            
            mode: gl.TRIANGLE_FAN,
            axis: { x: 0.0, y: 1.0, z: 1.0 }
        },
        
        {
            color: { r: 0.0, g: 0.0, b: 1.0 },
            vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
            
            mode: gl.TRIANGLE_STRIP,
            axis: { x: 0.0, y: 1.0, z: 1.0 }
        }*/

        /**{
            color: { r: 0.0, g: 0.0, b: 1.0 },
            vertices: [].concat(
                [ -1.0, -1.0, 0.75 ],
                [ -1.0, -0.1, -1.0 ],
                [ -0.1, -0.1, -1.0 ],
                [ -0.1, -1.0, 0.75 ]
            ),
            //specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            //shininess: 10,
            //normals: Shapes.toNormalArray(mesh1),
            mode: gl.LINE_LOOP,
            axis: { x: 1.0, y: 0.0, z: 1.0 }
        },*/

        // JD: It's unfortunate that you sphere code went "stale" as you
        //     added lighting.  Appropriate normals actually aren't that
        //     hard to calculate, and helper functions could have been
        //     used for colors.  Just need a little elbow grease here.
        //{
            //vertices: Shapes.sphere()['strip'],
            
            /**colors: [].concat(
                [ 1.0, 1.0, 1.0, ],
                [ 1.0, 1.0, 1.0, ],
                [ 0.5, 0.5, 0.75, ],
                [ 0.5, 0.0, 0.5, ]
            ),*/
       /**     color: { r: 1.0, g: 0.0, b: 0.0 },
            
            mode: gl.TRIANGLE_STRIP,
            axis: { x: 0.0, y: 1.0, z: 1.0 }
        },
        
        {
            color: { r: 1.0, g: 0.0, b: 0.0 },
            vertices: Shapes.sphere()['fan1'],
            
            mode: gl.TRIANGLE_FAN
        },
        
        {
            color: { r: 1.0, g: 0.0, b: 0.0},
            vertices: Shapes.sphere()['fan2'],
            /**specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,
            normals: Shapes.toNormalArray(mesh),*/
            //mode: gl.TRIANGLE_FAN
        //},

        // Something that would have been clipped before.
        {
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            // 12 triangles in all.
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,
            normals: Shapes.toNormalArray(Shapes.cube()),
            colors: [].concat(
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 1.0, 0.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 1.0, 0.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ],
                [ 0.0, 1.0, 1.0 ]
            ),
            mode: gl.TRIANGLES,
            axis: { x: 1.0, y: 1.0, z: 1.0 }
        }

        // Show off the new shape.
        
    ];

    // Pass the vertices to WebGL.
    var processObject = function (objectToDraw) {
        objectToDraw.buffer = GLSLUtilities.initVertexBuffer(gl,
                objectToDraw.vertices);

        if (!objectToDraw.colors) {
            // If we have a single color, we expand that into an array
            // of the same color over and over.
            objectToDraw.colors = [];
            for (j = 0, maxj = objectToDraw.vertices.length / 3;
                    j < maxj; j += 1) {
                objectToDraw.colors = objectToDraw.colors.concat(
                    objectToDraw.color.r,
                    objectToDraw.color.g,
                    objectToDraw.color.b
                );
            }
        }
        objectToDraw.colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectToDraw.colors);
          
        // Same trick with specular colors.
        if (!objectToDraw.specularColors) {
            // Future refactor: helper function to convert a single value or
            // array into an array of copies of itself.
            objectToDraw.specularColors = [];
            for (j = 0, maxj = objectToDraw.vertices.length / 3;
                    j < maxj; j += 1) {
                objectToDraw.specularColors = objectToDraw.specularColors.concat(
                    objectToDraw.specularColor.r,
                    objectToDraw.specularColor.g,
                    objectToDraw.specularColor.b
                );
            }
        }
        objectToDraw.specularBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectToDraw.specularColors);

        // One more buffer: normals.
        objectToDraw.normalBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectToDraw.normals);
    };

    for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
        processObject(objectsToDraw[i]);
    }

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    // JD 4/3: Your GLSL shader no longer has a variable called vertexColor,
    //     so these lines should simply go away.
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);
    vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);

    // Finally, we come to the typical setup for transformation matrices:
    // model-view and projection, managed separately.
    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    xRotationMatrix = gl.getUniformLocation(shaderProgram, "xRotationMatrix");
    yRotationMatrix = gl.getUniformLocation(shaderProgram, "yRotationMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    
    // Note the additional variables.
    // JD: Note that your *JavaScript* has values related to lighting, but these
    //     depend on variables in the *shader* (as seen by the reference to
    //     shaderProgram).  If you look at your current fragment shader, you'll
    //     notice that these variables are not there at all.
    lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    shininess = gl.getUniformLocation(shaderProgram, "shininess");

    /*
     * Displays an individual object, including a transformation that now varies
     * for each object drawn.
     */
    drawObject = function (object) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        // JD 4/3: Same here; this is no longer applicable.
        //     You have two new color arrays: vertexDiffuseColor and vertexSpecularColor.
        //
        //     It looks like you translated vertexSpecularColor OK from the bazaar code,
        //     but not vertexDiffuseColor.  I suggest you follow references to that variable
        //     in the sample code and make sure you transplant those here correctly.
        //
        //     And remember to not just blindly copy-paste code, but make sure you
        //     understand what it is doing.  If you don't, ask me.
        gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);
        //object.vertices.translate(0.5, 0.5, 0.5)
        // Set up the model-view matrix, if an axis is included.  If not, we
        // specify the identity matrix.
        
        gl.bindBuffer(gl.ARRAY_BUFFER, object.specularBuffer);
        gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);

        // Set the shininess.
        gl.uniform1f(shininess, object.shininess);
        
        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(object.axis ?
                getRotationMatrix(currentRotation, object.axis.x, object.axis.y, object.axis.z) :
                [1, 0, 0, 0, // N.B. In a full-fledged matrix library, the identity
                 0, 1, 0, 0, //      matrix should be available as a function.
                 0, 0, 1, 0,
                 0, 0, 0, 1]
            ));
        
        // Set the varying normal vectors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);
        
        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        // Set the overall rotation.
        /**gl.uniformMatrix4fv(xRotationMatrix, gl.FALSE, new Float32Array(
                getRotationMatrix(rotationAroundX, 1.0, 0.0, 0.0)
        ));
        gl.uniformMatrix4fv(yRotationMatrix, gl.FALSE, new Float32Array(
                getRotationMatrix(rotationAroundY, 0.0, 1.0, 0.0)
        ));*/
        
        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    // Because our canvas element will not change size (in this program),
    // we can set up the projection matrix once, and leave it at that.
    // Note how this finally allows us to "see" a greater coordinate range.
    // We keep the vertical range fixed, but change the horizontal range
    // according to the aspect ratio of the canvas.  We can also expand
    // the z range now.
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(getOrthoMatrix(
        -2 * (canvas.width / canvas.height),
        2 * (canvas.width / canvas.height),
        -2,
        2,
        -10,
        10
    )));
    
    gl.uniform4fv(lightPosition, [500.0, 1000.0, 100.0, 1.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);
    gl.uniform3fv(lightSpecular, [1.0, 1.0, 1.0]);
    
    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                currentRotation += 1.0;
                drawScene();
                if (currentRotation >= 360.0) {
                    currentRotation -= 360.0;
                }
            }, 30);
        }
    });
    
    var n = 0;
    var x = 0.1;
    var y = 10;
    var z = 10;

    $("#add").click( function() {
        // Create the object to be added.
        var newObject = {
                vertices: objectsToDraw[n].vertices,
                color: { r: 1.0, g: 0.0, b: 0.0 },
                specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                shininess: 10,
                normals: objectsToDraw[n].normals,
                mode: gl.TRIANGLES,
                axis: { x: 1.0, y: 1.0, z: 1.0 }
            };

        // Translate all vertices by (x, 0, 0).
        newObject.vertices = newObject.vertices.map(function (value, index) {
            if (index % 3 === 0) {
                return value + x;
            } else {
                return value;
            }

            // Sexy way.
            //return (index % 3) ? value : value + x;
        });

        processObject(newObject);
        objectsToDraw.push(newObject);
        drawScene();

        x += 0.1;
        n += 1;
    });
      



}(document.getElementById("matrices-webgl")));
