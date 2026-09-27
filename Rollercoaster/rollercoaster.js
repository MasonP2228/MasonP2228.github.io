import * as THREE from 'three';
import {STLLoader} from 'three/addons/loaders/STLLoader.js';
import {Vector3} from 'three';

// Setting up the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0064C8);

// Setting up the camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Setting up the renderer 
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Bringing in the 3D models
const loader = new STLLoader();
const rollercoasterGeo = await loader.loadAsync('models/Rollercoaster.stl');
const rollercoasterMat = new THREE.MeshBasicMaterial({color: 0xdd2200});
const rollercoasterMesh = new THREE.Mesh(rollercoasterGeo, rollercoasterMat);
scene.add(rollercoasterMesh);

const supportsGeo = await loader.loadAsync('models/SupportBeams.stl');
const supportsMat = new THREE.MeshBasicMaterial({color: 0xdddd00});
const supportsMesh = new THREE.Mesh(supportsGeo, supportsMat);
scene.add(supportsMesh);

const groundGeo = await loader.loadAsync('models/Ground.stl');
const groundMat = new THREE.MeshBasicMaterial({color: 0x22ee44});
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
scene.add(groundMesh);

const treesGeo = await loader.loadAsync('models/Trees.stl');
const treesMat = new THREE.MeshBasicMaterial({color: 0x55dd99});
const treesMesh = new THREE.Mesh(treesGeo, treesMat);
scene.add(treesMesh);

// making manual adjustments so that the models display properly 
rollercoasterMesh.rotateX(-Math.PI/2);
supportsMesh.rotateX(-Math.PI/2);
groundMesh.rotateX(-Math.PI/2);
treesMesh.rotateX(-Math.PI/2);

// creating a list to store positions that the camera should visit in sequential order 
let posList = [];

// setting up variables for the animation loop
let curPos = 0; // the list index of the most recent camera position
let startPosMillis = 0; // the time that the camera was at its latest position
let speed = 50; // a variable that controls the speed of the animation 
const communicator = document.getElementById('dataContainer'); // used to send info to p5

// setting up a variable to store data from a .txt file 
let posFileData;

// fetching the text file 
fetch('cameraData/Rollercoaster.txt')
  .then((res) => res.text())
  .then((text) => {
    // cleaning the text file 
    text = text.replaceAll("{", "");
    text = text.replaceAll("}", "");
    posFileData = text.split('\n');
  })
  .then(() =>{
    // using the rows in the text file to construct Vector3 position objects
    for(let i = 0; i < posFileData.length; i++){
      let posRow = posFileData[i];
      let posData = posRow.split(',');

      posList.push(new Vector3(parseFloat(posData[0]), 
                                parseFloat(posData[2]) + 2, 
                                -parseFloat(posData[1])
                                ));
    }
  })
  .then(() => {
    // setting the animation loop only after the text file has been read
    renderer.setAnimationLoop(animate);
  })
.catch((e) => console.log(e));


// Running the animation
function animate(time) {
  // getting the most recent camera position and the next 2 camera positions
  let startPos = posList[curPos];
  let midPos;
  let endPos;

  if(curPos + 1 >= posList.length){
    midPos = posList[0];
    endPos = posList[1];
  } else if(curPos + 2 >= posList.length){
    midPos = posList[curPos + 1];
    endPos = posList[0];
  } else{
    midPos = posList[curPos + 1];
    endPos = posList[curPos + 2];
  }

  // tracking the progress of the animation and sending this information to p5
  if(curPos == 0){
    communicator.dataset.animationstate = "beginning";
  } else if(curPos == 50){
    communicator.dataset.animationstate = "middle";
  } else if(curPos == 675){
    communicator.dataset.animationstate = "end";
  }

  // getting the amount of milliseconds that have passed since the camera 
  // was at its most recent position
  let elapsed = time - startPosMillis;

  // making the rollercoaster speed up or slow down with the hills/ valleys
  if(startPos.y < midPos.y){
    speed += 1;
  } else if(startPos.y > midPos.y){
    speed -= 0.3;
  } else{
    speed += 0.2;
  }

  if(speed < 10){
    speed = 10;
  } else if(speed > 50){
    speed = 50;
  }

  // transitioning between the most recent position and the next position
  camera.position.lerpVectors(startPos, midPos, elapsed/speed);

  // telling the camera where to look (somewhere between the next camera position
  // and the one after that)
  let targetVector = new Vector3();
  targetVector.lerpVectors(midPos, endPos, elapsed/speed);
  camera.lookAt(targetVector);

  // if the camera has reached its next position, then set it as the current 
  // position and reset the timer 
  if(elapsed >= speed){
    curPos++;
    if(curPos >= posList.length){
      curPos = 0;
    }
    startPosMillis = time;
  }
  
  // Rendering the scene 
  renderer.render(scene, camera);
}