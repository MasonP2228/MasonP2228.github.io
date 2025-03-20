function preload(){
    handPose = ml5.handPose({flipped:true});
}

// draw the canvas
function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0);

    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    handPose.detectStart(video, gotHands);
}


// resize the canvas with the window
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}


function draw(){
    // draw the background to clear the viewport
    background(0);

    // draw the instructions
    fill(100);
    rect(0, 0, 321, windowHeight);

    fill(240);
    textSize(48);
    textFont("Brush Script MT");
    textAlign(LEFT);
    text("Fireworks!", 70, 300);

    fill(200);
    textSize(12);
    textFont("Verdana");
    textAlign(CENTER);
    textLeading(18);
    text("Move your hand into view of the webcam.\nThen, spread all of your fingers to make the fireworks explode!\nTry to make them explode at their peak.\n\nHints:\nGreen lights should appear on your fingers when you spread them apart.\nIf the green lights do not appear, try moving your hand closer to the camera.\nMake sure you close your hand after each explosion to allow the next firework to be launched.\nThe fireworks will flash white at the optimal time to make them explode.\n\nHave fun!", 10, 340, 300);

    // resetting the textSize to 1 so that it doesn't cause issues later
    textSize(1);


    // flipping the video to align with proper left & right and drawing it
    push();
    translate(width,0);
    scale(-1, 1);
    image(video, windowWidth-320, 0, 320, 240);
    pop();

    // display hands
    drawHands();

    // if there is a firework, draw it and apply forces to it
    if (newFirework != null){
        let gravity = createVector(0, 0.1);
        newFirework.applyForces(gravity);
        newFirework.update();
        newFirework.updateColor();
        newFirework.show();

        // if the firework has gone off screen, overwrite it by launching
        // a new one
        if(newFirework.getPosition().y > windowHeight){
            launchFirework();
        }
    }

    // run the explosion animation if it has been triggered
    if(particles.length != 0 && (millis() - explosionTimer) < explosionLength){
        for(let p of particles){
            p.seekAndSeparate(particles, startPos);
            p.update();
            p.particleShow();
            newFirework = null;
        }
        textShow();
        
    }

    // launch a new firework if applicable
    checkLaunch();

    
}
