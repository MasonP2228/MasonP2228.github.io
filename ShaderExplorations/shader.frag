// setting the precision 
precision mediump float;

// getting the pixel positions from shader.vert 
varying vec2 pos;

// getting variables from sketch.js 
uniform sampler2D image;
uniform float lineWeight;
uniform float sensitivity;
uniform float invert;

// running the main shader function 
void main(){
    // flipping the image so that it displays correctly 
    vec2 newPos = pos;
    newPos.y = 1. - newPos.y;

    // getting the original image pixel colors and converting them to grayscale 
    vec4 col = texture2D(image, newPos);
    float avg = (col.r + col.g + col.b) / 3.;

    // getting the colors of neighboring pixels in the x-direction 
    // and converting them to grayscale
    vec2 hNeighborPos = vec2(clamp(newPos.x + lineWeight, 0., 1.), newPos.y);
    vec4 hNeighborCol = texture2D(image, hNeighborPos);
    float hNeighborAvg = (hNeighborCol.r, hNeighborCol.g, hNeighborCol.b)/3.;

    // getting the colors of neighboring pixels in the y-direction 
    // and converting them to grayscale
    vec2 vNeighborPos = vec2(newPos.x, clamp(newPos.y + lineWeight, 0., 1.));
    vec4 vNeighborCol = texture2D(image, vNeighborPos);
    float vNeighborAvg = (vNeighborCol.r, vNeighborCol.g, vNeighborCol.b)/3.;

    // getting the maximum difference between the original pixel 
    // and the horizontal or vertical neighbor 
    float diff = max(abs(avg - hNeighborAvg), abs(avg - vNeighborAvg));

    // if the original pixel is a significantly different color from 
    // one of its neighbors, then make it a black outline 
    // otherwise, make it a white background
    // (flip this effect if the user checked the invert box)
    float pixCol = abs(invert - step(sensitivity, diff));

    // finally, set the pixel color 
    gl_FragColor = vec4(pixCol, pixCol, pixCol, 1.);
}

