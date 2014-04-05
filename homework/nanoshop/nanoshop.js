/*
 * This is a very simple module that demonstrates rudimentary,
 * pixel-level image processing.
 */
var Nanoshop = {
    /*
     * Applies the given filter to the given ImageData object,
     * then modifies its pixels according to the given filter.
     *
     * A filter is a function (r, g, b, a) that returns another
     * pixel as a 4-element array representing an RGBA value.
     */
    applyFilter: function (imageData, filter) {
        // For every pixel, replace with something determined by the filter.
        var i,
            j,
            max,
            pixel,
            pixelArray = imageData.data;

        for (i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            pixel = filter(pixelArray[i], pixelArray[i + 1], pixelArray[i + 2], pixelArray[i + 3]);
            for (j = 0; j < 4; j += 1) {
                pixelArray[i + j] = pixel[j];
            }
        }

        return imageData;
    },

    rand: Math.floor(Math.random()*3),
    rn: Math.floor(Math.random()*3),
    rd: Math.floor(Math.random()*3),

    lighten: function (r, g, b, a) {
        return [r * 2, g * 2, b * 2, a];
    },

    darken: function (r, g, b, a) {
        return [r / 2, g / 2, b / 2, a];
    },

    multiColor: function (r, g, b, a) {
        return [r*Math.floor(Math.random()*3), g*Math.floor(Math.random()*3), b*Math.floor(Math.random()*3), a];
    },

    randomTint: function (r, g, b, a) {
        return [r*Nanoshop.rand, g*Nanoshop.rn, b*Nanoshop.rd, a];
    }

};










