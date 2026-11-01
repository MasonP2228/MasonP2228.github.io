// defining variables to hold the shader and the image 
let myShader;
let myImage;

// getting the input elements from HTML 
let weightSlider = document.getElementById('weightSlider');
let sensitivitySlider = document.getElementById('sensitivitySlider');
let invertBox = document.getElementById('invertBox');

// setting up variables to hold the input values 
let weightSliderVal = weightSlider.value;
let sensitivityVal = sensitivitySlider.value;
let invertVal = 1.0;
let uploadImage;

// getting up-to-date input values 
weightSlider.oninput = function(){
    weightSliderVal = this.value;
}

sensitivitySlider.oninput = function(){
    sensitivityVal = this.value;
}

invertBox.oninput = function(){
    if(this.checked){
        invertVal = 0.0;
    } else{
        invertVal = 1.0;
    }
}


async function setup() {
    // loading in the shader and the image 
    myShader = await loadShader('shader.vert', 'shader.frag');
    myImage = await loadImage('Images/Bunnies.jpg');

    // getting the aspect ratio of the image 
    let iWidth = myImage.width;
    let iHeight = myImage.height;
    let aspectRatio = iWidth / iHeight;

    // if the image is too wide to fit on-screen, shrink it 
    if(iWidth > window.innerWidth - 250){
        iWidth = window.innerWidth;
        iHeight = iWidth * (1/aspectRatio);
    }

    // if the image is too tall to fit on-screen, shrink it 
    if(iHeight > window.innerHeight - 100){
        iHeight = window.innerHeight - 100;
        iWidth = iHeight * aspectRatio;
    }

    // creating the canvas based on the adjusted size of the image 
    createCanvas(iWidth, iHeight, WEBGL);
    noStroke();

    // applying the shader to the image 
    shader(myShader);
    myShader.setUniform('image', myImage);
    myShader.setUniform('lineWeight', weightSliderVal);
    myShader.setUniform('sensitivity', sensitivityVal);
    myShader.setUniform('invert', invertVal);

    // setting up a button for users to upload their own files
    let uploadBtn = createFileInput(handleFile);
    uploadBtn.style('position', 'absolute');
    uploadBtn.style('left', '300px');
    uploadBtn.style('bottom', '50px');
    uploadBtn.style('font-family', 'Verdana, Geneva, Tahoma, sans-serif');
}


// creating a function to read in the user input
async function handleFile(file) {
  if (file.type === 'image') {
    let img = await loadImage(file.data);
    uploadImage = img;
  }
}


function draw() {
    // clear the canvas each frame 
    clear();

    // draw a rectangular surface for the shader to use 
    rect(0, 0, width, height);

    // apply any changes made through the user inputs 
    myShader.setUniform('lineWeight', weightSliderVal);
    myShader.setUniform('sensitivity', sensitivityVal);
    myShader.setUniform('invert', invertVal);

    if(uploadImage){
        myShader.setUniform('image', uploadImage);
    }
}