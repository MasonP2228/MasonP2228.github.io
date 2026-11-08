// setting up the Two.js canvas 
let params = {
    width: window.innerWidth - 300,
    height: window.innerHeight - 110
};

let elem = document.body;
let two = new Two(params).appendTo(elem);

// setting the background color to white 
two.renderer.domElement.style.background = '#FFFFFF';

// setting the update loop 
two.bind('update', update);
two.play();

// this function draws everything to the canvas 
function update(frameCount){
    // the function doesn't actually need to contain anything since 
    // the program does not use animations 
    // however, it still needs to be called in order for the shapes to display 
}
