function createBox(){
    box();
}

function createSphere(){
    sphere();
}

function createCylinder(){
    cylinder();
}

function createCone(){
    cone();
}

function createEllipsoid(){
    ellipsoid(50, 30, 20);
}

function createTorus(){
    torus();
}

function createCustom(){
    let build = instructions[instructionIndex];
    push();
    translate(build.translation);
    if(build.shape == "b"){
        box();
    } else if(build.shape == "s"){
        sphere();
    } else if(build.shape == "c"){
        cylinder();
    } else if(build.shape == "v"){
        cone();
    } else if(build.shape == "e"){
        ellipsoid(50, 30, 20);
    } else if(build.shape == "t"){
        torus();
    }
    pop();
}
