let geoList = [];
let numObjects = 0;

let curSelection = 0;
let activateCur = false;
let secondarySelection = 0;

let handActivated = false;
let lastHandClick = 0;

let instructionsShowing = true;

let font;
function preload(){
    //font = loadFont("/Fonts/Inconsolata/Inconsolata.otf");
    handPose = ml5.handPose({flipped:true});
}

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    // axes display
    //debugMode(AXES, 80, -(windowWidth/2) + 350, -(windowHeight/2) + 60, 0);
    debugMode(AXES, 80, 0, 0, 0);

    // video display
    video = createCapture(VIDEO);
    video.size(windowWidth/2, windowHeight/2);
    video.hide();
    handPose.detectStart(video, gotHands);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    debugMode(AXES, 80, -(windowWidth/2) + 350, -(windowHeight/2) + 60, 0);
    let top = document.getElementById("topButtons");
    if(windowWidth <= 900){
        top.style.left = "12%";
        if(instructionsShowing){
            let panel = document.getElementById("sidePanel");
            panel.style.width = "100%";
        }
    } else{
        if(instructionsShowing){
            top.style.left = "36%";
            let panel = document.getElementById("sidePanel");
            panel.style.width = "300px";
        } else{
            top.style.left = "28%";
        }
    }
}

function draw(){
    clear();
    orbitControl();
    lights();
    fill(225);
    
    if(handActivated){
        /*
        push();
        translate(width,0);
        scale(-1, 1);
        image(video, (3*windowWidth/4), -(windowHeight/4), (windowWidth/2), (windowHeight/2));
        pop(); */

        drawHands();
    }

    if(numObjects > 0){
        for(let i = 0; i < geoList.length; i++){

            if(i == secondarySelection && i != curSelection){
                stroke(0, 0, 255);
            } else if(i == curSelection){
                stroke(255, 0, 0);
            } else{
                stroke(200, 200, 200);
            }
            
            if(i == curSelection && activateCur == true && handActivated == true){
                push();
                translate(geoList[i].offset);
                translate(xCoord - (windowWidth/2), yCoord - (windowHeight/2));
                model(geoList[i].geometry);
                pop();
            } else if(i == curSelection && activateCur == true){
                push();
                translate(geoList[i].offset);
                translate(mouseX - (windowWidth/2), mouseY - (windowHeight/2));
                model(geoList[i].geometry);
                pop();
            } else{
                push();
                translate(geoList[i].location);
                model(geoList[i].geometry);
                pop();
            }

        }
    }
    
}
