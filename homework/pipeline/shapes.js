/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
 
 var moonVertexPositionBuffer;
  var moonVertexNormalBuffer;
  //var moonVertexTextureCoordBuffer;
  var moonVertexIndexBuffer;
 
var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    
    rect: function() {
      return {
         vertices: [
                [ 1.25, 0.5, 1.0 ],
                [ 1.25, 0.5, 0.0 ],
                [ -0.5, 0.5, 0.0 ],
                [ -0.5, 0.5, 1.0 ],
                [ 1.25, -0.5, 1.0 ],
                [ 1.25, -0.5, 0.0 ],
                [ 0.85, -0.5, 1.0 ],
                [ 0.85, -0.5, 0.0 ],
                [ 0.730, -0.190, 1.0 ],
                [ 0.730, -0.190, 0.0 ],
                [ 0.58, -0.03, 1.0 ],
                [ 0.58, -0.03, 0.0 ],
                [ 0.375, 0.05, 1.0 ],
                [ 0.375, 0.05, 0.0 ],
                [ 0.18, -0.03, 1.0 ],
                [ 0.18, -0.03, 0.0 ],
                [ 0.020, -0.190, 1.0 ],
                [ 0.020, -0.190, 0.0 ],
                [ -0.1, -0.5, 1.0 ],
                [ -0.1, -0.5, 0.0 ],
                [ -0.5, -0.5, 0.0 ],
                [ -0.5, -0.5, 1.0 ]
         ],
         
         indices: [
                   [ 0, 1, 3 ],
                   [ 2, 3, 1 ],
                   [ 0, 4, 6 ],
                   [ 8, 6, 0 ],
                   [ 10, 8, 0 ],
                   [ 12, 10, 0 ],
                   [ 3, 12, 0 ],
                   [ 3, 14, 12 ],
                   [ 16, 14, 3 ],
                   [ 18, 16, 3 ],
                   [ 21, 18, 3 ],
                   [ 3, 21, 20 ],
                   [ 20, 2, 3 ],
                   [ 20, 19, 2 ],
                   [ 2, 19, 17 ],
                   [ 2, 17, 15 ],
                   [ 2, 15, 13 ],
                   [ 2, 13, 1 ],
                   [ 13, 11, 1 ],
                   [ 1, 11, 9 ],
                   [ 9, 7, 1 ],
                   [ 7, 5, 1 ],
                   [ 1, 4, 0 ],
                   [ 4, 5, 1 ],
                   [ 5, 6, 4 ],
                   [ 6, 7, 5 ],
                   [ 18, 20, 21 ],
                   [ 20, 19, 18 ]
                  ]
        };
      },
      
      triBlock: function() {
      return {
         vertices: [
                [ 0.375, 1.51, 1.0 ],
                [ 0.375, 1.51, 0.0 ],
                [ -0.75, 0.51, 0.0 ],
                [ -0.75, 0.51, 1.0 ],
                [ 1.5, 0.51, 1.0 ],
                [ 1.5, 0.51, 0.0 ]
         ],
         
         indices: [
                   [ 0, 1, 3 ],
                   [ 2, 3, 1 ],
                   [ 0, 3, 4 ],
                   [ 5, 4, 0 ],
                   [ 1, 5, 0 ],
                   [ 1, 5, 2 ],
                   [ 3, 2, 4 ],
                   [ 5, 4, 2]
                   /**[ 5, 1, 4 ],
                   [ 1, 5, 6 ],
                   [ 2, 1, 6 ]*/
                  ]
        };
      },
      
    cylinder: function() {
        var degreesToRadians = Math.PI / 180;
        var pole1Vertices = Array();
        var pole2Vertices = Array();
        //Loop variable declarations:
        var phi, phiR, phiR20, theta, thetaR;
        var sin80 = Math.sin(80 * degreesToRadians);
        var cos80 = Math.cos(80 * degreesToRadians);
        var x, y, z;
        pole1Vertices = pole1Vertices.concat(-1.4, -sin80, 0);
        for (theta = -180; theta <= 180; theta += 10) {
            thetaR = theta * degreesToRadians;
            x = (Math.sin(thetaR) * cos80) - 1.4;
            y = -sin80;
            z = Math.cos(thetaR) * cos80; 
            pole1Vertices = pole1Vertices.concat(x, y, z);
        }
        pole2Vertices = pole2Vertices.concat(-1.4, -sin80 - 0.5, 0);
        for (theta = -180; theta <= 180; theta += 10) {
            thetaR = theta * degreesToRadians;
            x = (Math.sin(thetaR) * cos80) - 1.4;
            y = -sin80 - 0.5;
            z = Math.cos(thetaR) * cos80; 
            pole2Vertices = pole2Vertices.concat(x, y, z);
        }
        var combine = pole1Vertices.concat(pole2Vertices);
        var index = Array();
        for (var i = 0; i < pole1Vertices.length; i++) {
            x = i;
            y = i + pole1Vertices.length;
            z = i + 1;
            index = index.concat([x, y, z]);
        }
        return { top: pole1Vertices, bottom: pole2Vertices, vertices: combine, indices: index};
     },
         
          
    sphere: function() {
        var degreesToRadians = Math.PI / 180;
        
        //Loop variable declarations:
        var phi, phiR, phiR20, theta, thetaR;
        
        //The array holding the coordinates of all vertices except the poles
        //in the order necessary to connect them in a "STRIP" pattern
        var stripVertices = Array();

        
        
        //Variables that hold the x, y, and z coordinates of a given vertex:
        var x, y, z;
        
        //Draw everything but the poles:
        for (phi = -180; phi <= 80; phi += 10) {
            phiR = phi * degreesToRadians;
            phiR20 = (phi + 10) * degreesToRadians;
            
            for (theta = -180; theta <= 180; theta += 10) {
                thetaR = theta * degreesToRadians;
                
                //Calculate and push the vertex on this circle:
                x = Math.sin(thetaR) * Math.cos(phiR);
                y = Math.cos(thetaR) * Math.cos(phiR);
                z = Math.sin(phiR);
                stripVertices = stripVertices.concat(x, y, z);
                
                //Calculate and push the vertex on the next circle:
                x = Math.sin(thetaR) * Math.cos(phiR20);
                y = Math.cos(thetaR) * Math.cos(phiR20);
                z = Math.sin(phiR20);
                stripVertices = stripVertices.concat(x, y, z);
            }
        }
        
        //Constants for RAD values of sine and cosine of 80 deg:
        var sin80 = Math.sin(80 * degreesToRadians);
        var cos80 = Math.cos(80 * degreesToRadians);
        
        
        //Draw the far pole:
        var pole1Vertices = Array();
        
        //Add the far tip:
        pole1Vertices = pole1Vertices.concat(0, 0, 1);
        
        //Add the far ring:
        for (theta = -180; theta <= 180; theta += 10) {
            thetaR = theta * degreesToRadians;
            x = Math.sin(thetaR) * cos80;
            y = Math.cos(thetaR) * cos80;
            z = sin80;
            pole1Vertices = pole1Vertices.concat(x, y, z);
        }
        
        
        //Draw the near pole:
        var pole2Vertices = Array();
        
        //Add the near:
        pole2Vertices = pole2Vertices.concat(0, 0, -1);
        
        //Add the near ring:
        for (theta = -180; theta <= 180; theta += 10) {
            thetaR = theta * degreesToRadians;
            x = Math.sin(thetaR) * cos80;
            y = Math.cos(thetaR) * cos80;
            z = -sin80;
            
            pole2Vertices = pole2Vertices.concat(x, y, z);
        }
        
        /**for (phi = -180; phi <= 80; phi += 20) {
            phiR = phi * degreesToRadians;
            phiR20 = (phi + 20) * degreesToRadians;
            
            for (theta = -180; theta <= 180; theta += 20) {
                thetaR = theta * degreesToRadians;*/
               
        //Return an object containing both the strip patterns and
        //the poles:
        return {strip: stripVertices, fan1: pole1Vertices, fan2: pole2Vertices};
    },

    
    /*icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.225731112119133606,
            Z = 0.550650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },*/

    /*
     * Returns the vertices for a small cube.  Note the breakdown into triangles.
     */
    cube: function () {
        return {
            vertices: [
                [ 1.0, -0.51, 1.0 ],
                [ 1.0, -0.51, -0.35 ],
                [ -0.35, -0.51, -0.35 ],
                [ -0.35, -0.51, 1.0 ],
                [ 1.0, -1.86, 1.0 ],
                [ 1.0, -1.86, -0.35 ],
                [ -0.35, -1.86, -0.35 ],
                [ -0.35, -1.86, 1.0 ]
            ],

            indices: [
                [ 0, 1, 3 ],
                [ 2, 3, 1 ],
                [ 0, 3, 4 ],
                [ 7, 4, 3 ],
                [ 0, 4, 1 ],
                [ 5, 1, 4 ],
                [ 1, 5, 6 ],
                [ 2, 1, 6 ],
                [ 2, 7, 3 ],
                [ 6, 7, 2 ],
                [ 4, 7, 6 ],
                [ 5, 4, 6 ]
            ]
        };
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    },
    
    toSphereLineArray: function (vertex) {
        var result = [];
    },    
        

    /*
     * Utility function for computing normal vectors based on indexed vertices.
     * The secret: take the cross product of each triangle.  Note that vertex order
     * now matters---the resulting normal faces out from the side of the triangle
     * that "sees" the vertices listed counterclockwise.
     *
     * The vector computations involved here mean that the Vector module must be
     * loaded up for this function to work.
     */
    toNormalArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p0,
            p1,
            p2,
            v0,
            v1,
            v2,
            normal;

        // For each face...
        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            // We form vectors from the first and second then second and third vertices.
            p0 = indexedVertices.vertices[indexedVertices.indices[i][0]];
            p1 = indexedVertices.vertices[indexedVertices.indices[i][1]];
            p2 = indexedVertices.vertices[indexedVertices.indices[i][2]];

            // Technically, the first value is not a vector, but v can stand for vertex
            // anyway, so...
            v0 = new Vector(p0[0], p0[1], p0[2]);
            v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
            v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
            normal = v1.cross(v2).unit();

            // We then use this same normal for every vertex in this face.
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    },

    /*
     * Another utility function for computing normals, this time just converting
     * every vertex into its unit vector version.  This works mainly for objects
     * that are centered around the origin.
     */
    toVertexNormalArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p,
            normal;

        // For each face...
        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            // For each vertex in that face...
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                p = indexedVertices.vertices[indexedVertices.indices[i][j]];
                normal = new Vector(p[0], p[1], p[2]).unit();
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    }

};



















