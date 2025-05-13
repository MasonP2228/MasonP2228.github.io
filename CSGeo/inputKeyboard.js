function keyPressed(){
    if(keyCode == 49){ // 1 key
        makeBox();
    } else if (keyCode == 50){ // 2 key
        makeSphere();
    } else if (keyCode == 51){ // 3 key
        makeCylinder();
    } else if (keyCode == 52){ // 4 key
        makeCone();
    } else if (keyCode == 53){ // 5 key
        makeEllipsoid();
    } else if (keyCode == 54){ // 6 key
        makeTorus();
    } else if (keyCode == 81){ // q key
        switchCur();
    } else if (keyCode == 83){ // s key
        switchSecondary(); 
    } else if (keyCode == 87){ // w key
        if(!activateCur){
            makeMovement(); 
        } else{
            stopMovement();
        }
    } else if (keyCode == 65){ // a key
        makeUnion(); 
    } else if (keyCode == 90){ // z key
        makeDifference(); 
    } else if (keyCode == 88){ // x key
        makeIntersection();
    } else if (keyCode == 8){ // backspace key
        deleteGeo();
    }

}
