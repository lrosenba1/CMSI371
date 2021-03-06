//creates matrix object and functions

var Matrix4x4 = function () {
    this.array = [
             1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1]           
};

// JD: Better to expand the object's prototype than to
//     overwrite it completely.
Matrix4x4.prototype.multiply = function (m1, m2) {
    var product = new Matrix4x4();
    product.array[0] = m1.array[0]*m2.array[0] + m1.array[1]*m2.array[4] + m1.array[2]*m2.array[8] + m1.array[3]*m2.array[12];
    product.array[1] = m1.array[0]*m2.array[1] + m1.array[1]*m2.array[5] + m1.array[2]*m2.array[9] + m1.array[3]*m2.array[13];
    product.array[2] = m1.array[0]*m2.array[2] + m1.array[1]*m2.array[6] + m1.array[2]*m2.array[10] + m1.array[3]*m2.array[14];
    product.array[3] = m1.array[0]*m2.array[3] + m1.array[1]*m2.array[7] + m1.array[2]*m2.array[11] + m1.array[3]*m2.array[15];

    product.array[4] = m1.array[4]*m2.array[0] + m1.array[5]*m2.array[4] + m1.array[6]*m2.array[8] + m1.array[7]*m2.array[12];
    product.array[5] = m1.array[4]*m2.array[1] + m1.array[5]*m2.array[5] + m1.array[6]*m2.array[9] + m1.array[7]*m2.array[13];
    product.array[6] = m1.array[4]*m2.array[2] + m1.array[5]*m2.array[6] + m1.array[6]*m2.array[10] + m1.array[7]*m2.array[14];
    product.array[7] = m1.array[4]*m2.array[3] + m1.array[5]*m2.array[7] + m1.array[6]*m2.array[11] + m1.array[7]*m2.array[15];

    product.array[8] = m1.array[8]*m2.array[0] + m1.array[9]*m2.array[4] + m1.array[10]*m2.array[8] + m1.array[11]*m2.array[12];
    product.array[9] = m1.array[8]*m2.array[1] + m1.array[9]*m2.array[5] + m1.array[10]*m2.array[9] + m1.array[11]*m2.array[13];
    product.array[10] = m1.array[8]*m2.array[2] + m1.array[9]*m2.array[6] + m1.array[10]*m2.array[10] + m1.array[11]*m2.array[14];
    product.array[11] = m1.array[8]*m2.array[3] + m1.array[9]*m2.array[7] + m1.array[10]*m2.array[11] + m1.array[11]*m2.array[15];

    product.array[12] = m1.array[12]*m2.array[0] + m1.array[13]*m2.array[4] + m1.array[14]*m2.array[8] + m1.array[15]*m2.array[12];
    product.array[13] = m1.array[12]*m2.array[1] + m1.array[13]*m2.array[5] + m1.array[14]*m2.array[9] + m1.array[15]*m2.array[13];
    product.array[14] = m1.array[12]*m2.array[2] + m1.array[13]*m2.array[6] + m1.array[14]*m2.array[10] + m1.array[15]*m2.array[14];
    product.array[15] = m1.array[12]*m2.array[3] + m1.array[13]*m2.array[7] + m1.array[14]*m2.array[11] + m1.array[15]*m2.array[15];
           
    return product;
};

Matrix4x4.translate = function (dx, dy, dz) {
    var move = new Matrix4x4();

    // JD: You can take better advantage of JavaScript by just
    //     using a direct array literal---more concise and readable.
    // i.e.,
    //
    // move.array = [ 1,
    //                0,
    //                0,
    //                0,
    //
    //                0,
    //                1,
    //                0,
    //                0,
    //
    // ...etc. etc.
    move.array = [ 1,
                   0,
                   0,
                   0,
                   
                   0,
                   1,
                   0,
                   0,
                   
                   0,
                   0,
                   1,
                   0,
                   
                  dx,
                  dy,
                  dz,
                  1 ];
                   
    return move;
};

Matrix4x4.prototype.scale = function (sx, sy, sz) {
    var scaler = new Matrix4x4();
    scaler.array = [ sx,
                      0,
                      0,
                      0,
                      
                      0,
                      sy,
                      0,
                      0,
                      
                      0,
                      0,
                      sz,
                      0,
                      
                      0,
                      0,
                      0,
                      1 ];
    
    return scaler;
};

// JD: This was a good beginning, and really should not have lost steam like this.
//     For one thing, the indicated code over in matrices-webgl.js could have
//     easily settled in here with a little refactoring.
//
//     In addition, there is no demonstration of the correctness of these matrices,
//     whether in a demonstration web page or in the form of a unit test.
//
//     And why were there so many blank lines at the end?

// JD: Significantly missing from your matrix code (whether here or in the other
//     file): the camera matrix!  Because you don't have it, you also don't have
//     a compelling need to use the Vector object.  All lost opportunities to advance
//     your knowledge and understanding of the subject.
