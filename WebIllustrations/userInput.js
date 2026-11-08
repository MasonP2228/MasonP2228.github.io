// letting users change the background color of the canvas 
let background = document.getElementById('backgroundColor');

background.addEventListener('input', (event) => {
    two.renderer.domElement.style.background = event.target.value;
});

//**************************************************************** */
// SHAPE SELECTION 

// allowing users to select scene objects from the list (once the list is populated)
let sceneObjects = document.getElementById('sceneObjects');
let bottomMenu = document.getElementById('bottomMenu');
let editingText = document.getElementById('editingText');
let colorButton = document.getElementById('changeColor');
let widthSlider = document.getElementById('stretchXSlider');
let heightSlider = document.getElementById('stretchYSlider');
let rotationSlider = document.getElementById('rotationSlider');

sceneObjects.addEventListener('click', (event) => {
    if(event.target.nodeName === 'LI'){
        // setting the selected object internally 
        setCurGeo(event.target.textContent);

        // highlighting the selected object in the user's menu 
        setBlackBorders();
        event.target.style.borderColor = '#0088FF';

        // setting the control panel text to the object name 
        editingText.textContent = event.target.textContent;

        // setting the color button equal to the current color 
        colorButton.value = curGeo.geo.fill;

        // setting the width slider equal to the current width 
        widthSlider.value = curGeo.geo.scale.x;

        // setting the height slider equal to the current height 
        heightSlider.value = curGeo.geo.scale.y;

        // setting the rotation slider equal to the current rotation 
        rotationSlider.value = (curGeo.geo.rotation) * (180 / Math.PI);

        // displaying the bottom control panel menu 
        bottomMenu.style.display = 'inline';
    }
});

// setting all list item borders to black so that only the selected item is highlighted 
function setBlackBorders(){
    let allItems = document.querySelectorAll('li');
    for(let i = 0; i < allItems.length; i++){
        allItems[i].style.borderColor = 'black';
    }
}

//**************************************************************** */
// SHAPE INITIALIZATIONS

// letting users add a circle to their scene 
let circleButton = document.getElementById('circleButton');

circleButton.addEventListener('click', (event) => {
    // making the circle
    let circle = two.makeCircle(two.width*0.5, two.height*0.5, 50);
    circle.fill = '#0088FF';
    circle.noStroke();

    // storing the circle 
    let circleGeo = new UserGeo(circle, `Circle${circleNum}`);
    circleNum++;
    userGeos.push(circleGeo);

    // adding the circle to the list that users can see 
    const newItem = document.createElement('li');
    newItem.textContent = circleGeo.name;
    sceneObjects.appendChild(newItem);
});


// letting users add a rectangle to their scene 
let rectangleButton = document.getElementById('rectangleButton');

rectangleButton.addEventListener('click', (event) => {
    // making the rectangle 
    let rect = two.makeRectangle(two.width*0.5, two.height*0.5, 100, 100);
    rect.fill = '#0088FF';
    rect.noStroke();

    // storing the rectangle 
    let rectGeo = new UserGeo(rect, `Rectangle${rectNum}`);
    rectNum++;
    userGeos.push(rectGeo);

    // adding the rectangle to the list that users can see 
    const newItem = document.createElement('li');
    newItem.textContent = rectGeo.name;
    sceneObjects.appendChild(newItem);
});


// letting users add a triangle to their scene 
let triangleButton = document.getElementById('triangleButton');

triangleButton.addEventListener('click', (event) => {
    // making the triangle 
    let tri = two.makePolygon(two.width*0.5, two.height*0.5, 50, 3);
    tri.fill = '#0088FF';
    tri.noStroke();

    // storing the triangle 
    let triGeo = new UserGeo(tri, `Triangle${triNum}`);
    triNum++;
    userGeos.push(triGeo);

    // adding the triangle to the list that users can see 
    const newItem = document.createElement('li');
    newItem.textContent = triGeo.name;
    sceneObjects.appendChild(newItem);
});

//**************************************************************** */
// TRANSFORMATIONS 

// allowing users to set the color of the selected geometry 
colorButton.addEventListener('input', (event) => {
    curGeo.geo.fill = event.target.value;
});

// allowing users to adjust the width of the geometry 
widthSlider.addEventListener('input', (event) => {
    let vec;

    if(curGeo.geo.scale.y){
        vec = new Two.Vector(event.target.value, curGeo.geo.scale.y);
    } else{
        vec = new Two.Vector(event.target.value, 1);
    }
    
    curGeo.geo.scale = vec;
});


// allowing users to adjust the height of the geometry 
heightSlider.addEventListener('input', (event) => {
    let vec;

    if(curGeo.geo.scale.x){
        vec = new Two.Vector(curGeo.geo.scale.x, event.target.value);
    } else{
        vec = new Two.Vector(1, event.target.value);
    }
    
    curGeo.geo.scale = vec;
});


// allowing users to adjust the rotation of the geometry 
rotationSlider.addEventListener('input', (event) => {
    curGeo.geo.rotation = event.target.value * (Math.PI/180);
});


// allowing users to move the current geometry 
let moveButton = document.getElementById('moveButton');
let moving = false;
let movementTimer = 0;

// if the user clicks on the move button, activate movement 
moveButton.addEventListener('click', (event) => {
    moving = true;
    movementTimer = performance.now();
});

// if movement is activated, make the current geometry follow the user's mouse 
window.addEventListener('mousemove', (event) => {
    if(moving){
        curGeo.geo.translation.set(event.clientX, event.clientY);
    }
});

// if the user clicks somewhere on the screen, deactivate movement 
// this will drop the current geometry wherever the mouse was clicked 
window.addEventListener('click', (event) => {
    if(moving && performance.now() - movementTimer > 200){
        moving = false;
    }
});
