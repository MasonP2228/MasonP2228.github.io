// Most mouse input is handled through onclick events that are called in html 

// This function is an exception, since it is not tied to a specific html element

// It is used to drop a shape that the user is currently moving
function mouseClicked(){
    // if the user is currently moving a shape
    if(activateCur){
        // and the user did not just press the movement button
        let button = document.getElementById("moveButton");
        let rect = button.getBoundingClientRect();

        overlap = (rect.left < mouseX && mouseX < rect.right && rect.top < mouseY && mouseY < rect.bottom);

        if(!overlap){
            // release the shape
            stopMovement();
        }
    }
}