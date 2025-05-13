function makeBox(){
    let newInstructions = new BuildAction("b");
    newInstructions.addTranslation(createVector(0,0,0));

    let newGeo = new Geometry(buildGeometry(createBox), createVector(0,0,0), createVector(0,0,0), [newInstructions]);
    geoList.push(newGeo);
    numObjects += 1;
}

function makeSphere(){
    let newInstructions = new BuildAction("s");
    newInstructions.addTranslation(createVector(0,0,0));

    let newGeo = new Geometry(buildGeometry(createSphere), createVector(0,0,0), createVector(0,0,0), [newInstructions]);
    geoList.push(newGeo);
    numObjects += 1;
}

function makeCylinder(){
    let newInstructions = new BuildAction("c");
    newInstructions.addTranslation(createVector(0,0,0));

    let newGeo = new Geometry(buildGeometry(createCylinder), createVector(0,0,0), createVector(0,0,0), [newInstructions]);
    geoList.push(newGeo);
    numObjects += 1;
}

function makeCone(){
    let newInstructions = new BuildAction("v");
    newInstructions.addTranslation(createVector(0,0,0));

    let newGeo = new Geometry(buildGeometry(createCone), createVector(0,0,0), createVector(0,0,0), [newInstructions]);
    geoList.push(newGeo);
    numObjects += 1;
}

function makeEllipsoid(){
    let newInstructions = new BuildAction("e");
    newInstructions.addTranslation(createVector(0,0,0));

    let newGeo = new Geometry(buildGeometry(createEllipsoid), createVector(0,0,0), createVector(0,0,0), [newInstructions]);
    geoList.push(newGeo);
    numObjects += 1;
}

function makeTorus(){
    let newInstructions = new BuildAction("t");
    newInstructions.addTranslation(createVector(0,0,0));

    let newGeo = new Geometry(buildGeometry(createTorus), createVector(0,0,0), createVector(0,0,0), [newInstructions]);
    geoList.push(newGeo);
    numObjects += 1;
}

function switchCur(){
    // only switch if the current object is not being moved
    if(activateCur == false){
        curSelection += 1;
        if (curSelection >= numObjects){
            curSelection = 0;
        }
    }
}

function switchSecondary(){
    secondarySelection += 1;
    if (secondarySelection >= numObjects){
        secondarySelection = 0;
    }
}

function makeMovement(){
    activateCur = true;
}

function stopMovement(){
    // save the new information
    let oldX = geoList[curSelection].location.x;
    let oldY = geoList[curSelection].location.y;
    let newX;
    let newY;
    if(handActivated){
        newX = xCoord - (windowWidth/2) + geoList[curSelection].offset.x;
        newY = yCoord - (windowHeight/2) + geoList[curSelection].offset.y;
    } else{
        newX = mouseX - (windowWidth/2) + geoList[curSelection].offset.x;
        newY = mouseY - (windowHeight/2) + geoList[curSelection].offset.y;
    }

    // save position
    geoList[curSelection].location.x = newX;
    geoList[curSelection].location.y = newY;

    // save history
    for(let i = 0; i < geoList[curSelection].buildHistory.length; i++){
        if(geoList[curSelection].buildHistory[i].translation != null){
            geoList[curSelection].buildHistory[i].translation.x += (newX - oldX);
            geoList[curSelection].buildHistory[i].translation.y += (newY - oldY);
        }
    }
    // turn movement off
    activateCur = false;
}

function deleteGeo(){
    geoList.splice(curSelection, 1);
    numObjects -= 1;
    switchCur();
}

function saveObj(){
    geoList[curSelection].geometry.saveObj();
}

function saveStl(){
    geoList[curSelection].geometry.saveStl("model.stl", {binary: true});
}

function makeUnion(){
    csgOperation("u");
}

function makeDifference(){
    csgOperation("m");
}

function makeIntersection(){
    csgOperation("x");
}

function handControls(){
    handActivated = !handActivated;

    let dInstructions = document.getElementById("defaultInstructions");
    let hInstructions = document.getElementById("handInstructions");
    let dLogo = document.getElementById("logo");
    let hLogo = document.getElementById("handLogo");
    let cursor = document.getElementById("handCursor");

    if(handActivated){
        dInstructions.style.display = "none";
        dLogo.style.display = "none";
        hInstructions.style.display = "block";
        hLogo.style.display = "block";
        cursor.style.display = "block";
        showInstructions();
    } else{
        dInstructions.style.display = "block";
        dLogo.style.display = "block";
        hInstructions.style.display = "none";
        hLogo.style.display = "none";
        cursor.style.display = "none";
    }
}

function collapseInstructions(){
    let sidePanel = document.getElementById("sidePanel");
    sidePanel.style.width = "0px";
    sidePanel.style.opacity = "0";

    let leftButtons = document.getElementById("leftButtons");
    leftButtons.style.left = "0px";

    let topButtons = document.getElementById("topButtons");
    if(windowWidth <= 900){
        topButtons.style.left = "12%";
    } else{
        topButtons.style.left = "28%";
    }

    timeout = setTimeout(_secondCollapse, 2000);

    instructionsShowing = false;
}

function _secondCollapse(){
    let sidePanel = document.getElementById("sidePanel");
    sidePanel.style.visibility = "hidden";

    let showButton = document.getElementById("showButton");
    showButton.style.visibility = "visible";
    showButton.style.opacity = "1";
}

function showInstructions(){
    let sidePanel = document.getElementById("sidePanel");
    sidePanel.style.visibility = "visible";
    sidePanel.style.opacity = "1";
    if(windowWidth <= 900){
        sidePanel.style.width = "100%";
    } else{
        sidePanel.style.width = "300px";
    }
    
    let showButton = document.getElementById("showButton");
    showButton.style.visibility = "hidden";
    showButton.style.opacity = "0";

    let leftButtons = document.getElementById("leftButtons");
    leftButtons.style.left = "300px";
    
    let topButtons = document.getElementById("topButtons");
    if(windowWidth <= 900){
        topButtons.style.left = "12%";
    } else{
        topButtons.style.left = "36%";
    }

    instructionsShowing = true;
}
