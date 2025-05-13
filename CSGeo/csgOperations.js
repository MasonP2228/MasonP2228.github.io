let instructions = null;
let instructionIndex = 0;

function csgOperation(operation){
    // exit the code if only one geometry is selected
    if(curSelection == secondarySelection){
        return;
    }

    // get a list of instructions, made up of the instructions for each of the 
    // two geometries and a new operator 
    let operator = new BuildAction(operation);
    instructions = geoList[curSelection].buildHistory.concat(geoList[secondarySelection].buildHistory, [operator]);
    instructionIndex = 0;

    // complete the operations to construct the new shape, maintaining
    // the order of operations using a postfix notation
    let geoStack = new Stack();

    for(let i = 0; i < instructions.length; i++){
        if(instructions[i].shape == "b" ||
            instructions[i].shape == "s" ||
            instructions[i].shape == "c" ||
            instructions[i].shape == "v" ||
            instructions[i].shape == "e" ||
            instructions[i].shape == "t"
        ){
            instructionIndex = i;
            let newGeo = csg(createCustom);
            geoStack.push(newGeo);
        } else if(instructions[i].shape == "u"){
            let shapeB = geoStack.pop();
            let shapeA = geoStack.pop();
            let newGeo = shapeA.union(shapeB);
            geoStack.push(newGeo);
        } else if(instructions[i].shape == "m"){
            let shapeB = geoStack.pop();
            let shapeA = geoStack.pop();
            let newGeo = shapeA.subtract(shapeB);
            geoStack.push(newGeo);
        } else if(instructions[i].shape == "x"){
            let shapeB = geoStack.pop();
            let shapeA = geoStack.pop();
            let newGeo = shapeA.intersect(shapeB);
            geoStack.push(newGeo);
        }
    }


    // add the new geometry to the scene with translation data 
    let finalGeo = geoStack.pop().done();
    let finalLocation = createVector(0,0,0);
    let finalOffset = createVector(-geoList[curSelection].location.x, -geoList[curSelection].location.y, -geoList[curSelection].location.z);
    let finalInstructions = instructions;

    let newGeo = new Geometry(finalGeo, finalLocation, finalOffset, finalInstructions);
    geoList.push(newGeo);
    
    // remove the original geometries from the geoList
    if (curSelection > secondarySelection){
        geoList.splice(curSelection, 1);
        geoList.splice(secondarySelection, 1);
    } else{
        geoList.splice(secondarySelection, 1);
        geoList.splice(curSelection, 1);
    }

    numObjects -= 1;
    curSelection = numObjects - 1;
}
