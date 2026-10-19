import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

// Setting up the scene
const scene = new THREE.Scene();

// Setting up the camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,10,0);

// Setting up the renderer 
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// loading in the scenery
const loader = new GLTFLoader();
const envModel = await loader.loadAsync("models/AudioEnvironment.glb");
scene.add(envModel.scene);

// creating light sources so that the scenery displays properly 
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(0, 50, 30);
scene.add(dirLight);

const ambLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambLight);

// adding a sky 
scene.background = new THREE.Color(0x00aaff);

// setting up a variable for if the user has acknowledged the instructions 
let started = false;

// a function to load in the audio 
// if this is done immediately on startup, some browsers block it 
function loadAudio(){
  const listener = new THREE.AudioListener();
  camera.add(listener);
  const audioLoader = new THREE.AudioLoader();

  // previewMaterial visualizes the sound sources 
  const previewMaterial = new THREE.MeshBasicMaterial({color: 0xff8800});

  // loading in the growl sound
  const gSound = new THREE.PositionalAudio(listener);
  audioLoader.load('sounds/growl.m4a', function(buffer){
    gSound.setBuffer(buffer);
    gSound.setDistanceModel('linear');
    gSound.setRefDistance(20); // distance where it starts to get quiet
    gSound.setMaxDistance(50); // distance where it is silent 
    gSound.setLoop(true);
    gSound.play();
  });

  // positioning the growl sound
  const growlGeo = new THREE.BoxGeometry(1, 2, 1);
  const growlMesh = new THREE.Mesh(growlGeo, previewMaterial);
  scene.add(growlMesh);
  growlMesh.position.x = 48;
  growlMesh.position.y = 5;
  growlMesh.position.z = -55;
  growlMesh.add(gSound);

  // loading in the birds sound
  const bSound = new THREE.PositionalAudio(listener);
  audioLoader.load('sounds/birds.flac', function(buffer){
    bSound.setBuffer(buffer);
    bSound.setDistanceModel('linear');
    bSound.setRefDistance(50); // distance where it starts to get quiet
    bSound.setMaxDistance(80); // distance where it is silent 
    bSound.setLoop(true);
    bSound.play();
  });

  // positioning the birds sound
  const birdsGeo = new THREE.BoxGeometry(1, 2, 1);
  const birdsMesh = new THREE.Mesh(birdsGeo, previewMaterial);
  scene.add(birdsMesh);
  birdsMesh.position.x = 48;
  birdsMesh.position.y = 5;
  birdsMesh.position.z = 50;
  birdsMesh.add(bSound);

  // loading in the frogs sound
  const fSound = new THREE.PositionalAudio(listener);
  audioLoader.load('sounds/frogs.wav', function(buffer){
    fSound.setBuffer(buffer);
    fSound.setDistanceModel('linear');
    fSound.setRefDistance(25); // distance where it starts to get quiet
    fSound.setMaxDistance(60); // distance where it is silent 
    fSound.setLoop(true);
    fSound.play();
  });

  // positioning the frogs sound
  const frogsGeo = new THREE.BoxGeometry(1, 2, 1);
  const frogsMesh = new THREE.Mesh(frogsGeo, previewMaterial);
  scene.add(frogsMesh);
  frogsMesh.position.x = -48;
  frogsMesh.position.y = 10;
  frogsMesh.position.z = 50;
  frogsMesh.add(fSound);

  // loading in the waterfall sound
  const wSound = new THREE.PositionalAudio(listener);
  audioLoader.load('sounds/waterfall.mp3', function(buffer){
    wSound.setBuffer(buffer);
    wSound.setDistanceModel('linear');
    wSound.setRefDistance(40); // distance where it starts to get quiet
    wSound.setMaxDistance(90); // distance where it is silent 
    wSound.setLoop(true);
    wSound.play();
  });

  // positioning the waterfall sound
  const waterGeo = new THREE.BoxGeometry(1, 2, 1);
  const waterMesh = new THREE.Mesh(waterGeo, previewMaterial);
  scene.add(waterMesh);
  waterMesh.position.x = -55;
  waterMesh.position.y = 5;
  waterMesh.position.z = -55;
  waterMesh.add(wSound);
}

// setting up variables to manage camera rotation
let rotateCounterClockwise = false;
let rotateClockwise = false;
const rotationSpeed = 0.02;

// setting up variables to manage camera position 
let curFacingDir = new THREE.Vector3();
const moveSpeed = 0.7;
const rotationAxis = new THREE.Vector3(0, 1, 0);
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

// setting up variables to manage camera boundaries 
const xMin = -40;
const xMax = 45;
const zMin = -40;
const zMax = 40;

// Running the animation
function animate() {
  if(started){
    // rotating the camera based on mouse position 
    if(rotateCounterClockwise){
      camera.rotateY(rotationSpeed);
    } else if(rotateClockwise){
      camera.rotateY(-rotationSpeed);
    }

    // moving the camera based on keyboard input 
    if(moveForward){
      camera.getWorldDirection(curFacingDir);
      camera.position.addScaledVector(curFacingDir, moveSpeed);
    } else if(moveBackward){
      camera.getWorldDirection(curFacingDir);
      camera.position.addScaledVector(curFacingDir.applyAxisAngle(rotationAxis, Math.PI), moveSpeed);
    } else if(moveLeft){
      camera.getWorldDirection(curFacingDir);
      camera.position.addScaledVector(curFacingDir.applyAxisAngle(rotationAxis, Math.PI/2), moveSpeed);
    } else if(moveRight){
      camera.getWorldDirection(curFacingDir);
      camera.position.addScaledVector(curFacingDir.applyAxisAngle(rotationAxis, -Math.PI/2), moveSpeed);
    }

    // applying boundaries to the scene 
    if(camera.position.x < xMin){
      camera.position.x = xMin;
    } else if(camera.position.x > xMax){
      camera.position.x = xMax;
    }

    if(camera.position.z < zMin){
      camera.position.z = zMin;
    } else if(camera.position.z > zMax){
      camera.position.z = zMax;
    }

    // Rendering the scene 
    renderer.render(scene, camera);
  }
}

// checking the mouse position for the camera rotation 
document.addEventListener('mousemove', (event) => {
  let mouseX = event.clientX;

  if(mouseX < 200){
    rotateCounterClockwise = true;
  } else{
    rotateCounterClockwise = false;
  }

  if(mouseX > window.innerWidth - 200){
    rotateClockwise = true;
  } else{
    rotateClockwise = false;
  }
});


// checking keyboard input to start camera movement 
document.addEventListener('keydown', (event) => {
  if(event.key == "w"){
    moveForward = true;
  } 
  
  if(event.key == "s"){
    moveBackward = true;
  }

  if(event.key == "a"){
    moveLeft = true;
  }

  if(event.key == "d"){
    moveRight = true;
  }
});


// checking keyboard input to stop camera movement 
document.addEventListener('keyup', (event) => {
  if(event.key == "w"){
    moveForward = false;
  }

  if(event.key == "s"){
    moveBackward = false;
  }

  if(event.key == "a"){
    moveLeft = false;
  }

  if(event.key == "d"){
    moveRight = false;
  }
});


// checking click input 
// this is to ensure that browsers don't block the audio 
document.addEventListener('click', () => {
  started = true;
  loadAudio();
});

// setting the animation loop 
renderer.setAnimationLoop(animate);