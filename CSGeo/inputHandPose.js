let handPose;
let video;
let hands = [];
let xCoord;
let yCoord;

function drawHands(){
    if(hands.length > 0){
        let hand = hands[0];

        //wrist = hand.wrist;
        indexF = hand.index_finger_tip;
        thumb = hand.thumb_tip;

        xCoord = indexF.x * 2;
        yCoord = indexF.y * 2;

        let d = dist(thumb.x, thumb.y, indexF.x, indexF.y);
        let cursor = document.getElementById("handCursor");
        if(d < 15){
            cursor.src = "Images/ClickIcon.png";
            clickCheck(xCoord, yCoord);
        } else{
            cursor.src = "Images/HandIcon.png";
        }

        fill(255, 0, 0);

        // visualize the cursor
        /*
        ellipse(indexF.x - (windowWidth/4), indexF.y - (windowHeight/4), 10, 10);
        ellipse(thumb.x - (windowWidth/4), thumb.y - (windowHeight/4), 5, 5);*/
        moveCursor(indexF.x*2, indexF.y*2);

        fill(225);
    }
}


function gotHands(results){
    hands = results;
}


function moveCursor(cursorX, cursorY){
    let cursor = document.getElementById("handCursor");
    cursor.style.display = "block";
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
}


function clickCheck(xPos, yPos){
    if(millis() - lastHandClick < 500){
        return;
    }

    // if moving a shape, then clicking drops the shape
    if(activateCur){
        stopMovement();
        return;
    }
    
    let button = document.getElementById("boxButton");
    let rect = button.getBoundingClientRect();

    let overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        makeBox();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("sphereButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        makeSphere();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("cylinderButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        makeCylinder();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("coneButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        makeCone();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("ellipsoidButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        makeEllipsoid();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("torusButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        makeTorus();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("moveButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        makeMovement();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("switchButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        switchCur();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("deleteButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        deleteGeo();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("secondarySelectButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        switchSecondary();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("unionButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        makeUnion();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("subtractButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        makeDifference();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("intersectButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        makeIntersection();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("handPoseButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        handControls();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("objButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        saveObj();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("stlButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        saveStl();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("hideButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        collapseInstructions();
        lastHandClick = millis();
    } 
    ///////////////////////////////////
    button = document.getElementById("showButton");
    rect = button.getBoundingClientRect();

    overlap = (rect.left < xPos && xPos < rect.right && rect.top < yPos && yPos < rect.bottom);

    if(overlap){
        showInstructions();
        lastHandClick = millis();
    } 


}
