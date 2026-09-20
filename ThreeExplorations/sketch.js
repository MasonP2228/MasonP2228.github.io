function setup() {
    let myCanvas = document.getElementById('p5Canvas');
    createCanvas(windowWidth, windowHeight, P2D, myCanvas);

    // drawing the space background
    noStroke();
    fill(0);
    rect(0, 0, windowWidth, windowHeight);

    // drawing the stars 
    fill(255);
    for(let i = 0; i < 100; i++){
        circle(random(0, windowWidth), random(0, windowHeight), 2);
    }
}

function draw() {
    // nothing needs to be updated each frame for now...
}