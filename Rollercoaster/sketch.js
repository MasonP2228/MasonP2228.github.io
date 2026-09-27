const communicator = document.getElementById('dataContainer');
let img;

let startTransparent = false;
let startTransparentTime = 0;

let startGrow = false;
let startGrowTime = 0;

async function setup() {
    // creating the canvas
    let myCanvas = document.getElementById('p5Canvas');
    createCanvas(windowWidth, windowHeight, P2D, myCanvas);

    // loading the logo image 
    img = await loadImage('images/RollercoasterLogo.png');
    imageMode(CENTER);
}

function draw() {
    // setting a scale factor so that the logo draws at the correct size/ resolution
    let scaleFactor = min((windowWidth/1920), (windowHeight/1080));
    clear();

    // reading a HTML data tag in order to receive info from three.js 
    if(communicator.dataset.animationstate == "beginning"){
        // at the beginning of the animation, make the logo fade out
        if(startTransparent == false){
            startTransparent = true;
            startTransparentTime = millis();
        }
        push();
        tint(255, 255 - (0.1 * (millis() - startTransparentTime)));
        scale(scaleFactor);
        image(img, 1/scaleFactor * windowWidth/2, 1/scaleFactor * windowHeight/2);
        pop();
        startGrow = false;

    } else if(communicator.dataset.animationstate == "middle"){
        startTransparent = false;

    } else{
        // at the end of the animation, make the logo grow outwards to full size
        if(startGrow == false){
            startGrow = true;
            startGrowTime = millis();
        }
        scaleFactor = min(scaleFactor, (0.001 * (millis() - startGrowTime)));
        push();
        scale(scaleFactor);
        image(img, 1/scaleFactor * windowWidth/2, 1/scaleFactor * windowHeight/2);
        pop();
    }
}