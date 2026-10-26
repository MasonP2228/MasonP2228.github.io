import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

// Setting up the scene
const scene = new THREE.Scene();

// Setting up the camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Setting up the renderer 
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// loading in the scenery
const loader = new GLTFLoader();
const raceTrack = await loader.loadAsync("models/RaceTrack.glb");
scene.add(raceTrack.scene);

// creating a light source so that the scenery displays properly 
const ambLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambLight);

// adding a sky 
scene.background = new THREE.Color(0x00aaff);

// loading in the car 
const carModel = await loader.loadAsync("models/RaceCar.glb");

// grouping the car and the camera so that they move together 
const car = new THREE.Group();
scene.add(car);
car.add(carModel.scene);
carModel.scene.position.set(0, 1, 0);
car.add(camera);
camera.position.set(0, 4, 5);
camera.rotation.set(-0.05, 0, 0);

// setting the starting position of the car 
const startingPos = new THREE.Vector3(0, 0.5, 5);
car.position.set(startingPos.x, startingPos.y, startingPos.z);

// setting up a raycaster to make sure the player is on the course 
const raycastDir = new THREE.Vector3(0, -1, 0);
let boundsDetection = new THREE.Raycaster(startingPos, raycastDir);

// setting up variables to receive user input 
let moveLeft;
let moveRight;

// setting up variables related to timing  
const timer = new THREE.Timer();
let deltaTime;
let startingTime = -1;

// setting up variables related to car movement 
const speed = 15;
const boostSpeed = 30;
const turnRadius = 2;
let curDir = 0;
let radiansAngle;
let curSpeed = speed;
let boostTimer;

// setting up a variable for if the user has acknowledged the instructions 
let gameRunning = false;

// Running the animation
function animate(time) {
  if(gameRunning){
    // getting the delta time 
    timer.update(time);
    deltaTime = timer.getDelta();

    // if the game just started, update the starting time 
    if(startingTime == -1){
      startingTime = timer.getElapsed();
    }

    // changing the current direction if the car is turning 
    if(moveLeft){
      curDir += turnRadius;
    } else if(moveRight){
      curDir -= turnRadius;
    }

    if(curDir >= 360){
      curDir = 0;
    } else if(curDir < 0){
      curDir = 359;
    }

    // making the car face the correct direction 
    radiansAngle = THREE.MathUtils.degToRad(curDir);
    car.rotation.y = radiansAngle;

    // getting the car's current position 
    let curX = car.position.x;
    let curY = car.position.y;
    let curZ = car.position.z;

    // setting the speed to normal if the car is done boosting 
    if((curSpeed == boostSpeed) && (timer.getElapsed() - boostTimer > 1)){
      curSpeed = speed;
    }

    // getting the car's current direction and applying speed to it 
    let newX = curX - ((curSpeed * deltaTime) * Math.sin(radiansAngle));
    let newZ = curZ -((curSpeed * deltaTime) * Math.cos(radiansAngle));

    // making the car move forward
    car.position.set(newX, curY, newZ);

    // moving the raycaster with the car 
    boundsDetection.set(new THREE.Vector3(newX, curY, newZ), raycastDir);

    // checking for raycaster collisions
    let collisions = [];
    let outOfBounds = true;
    boundsDetection.intersectObjects(raceTrack.scene.children, true, collisions);

    // handling raycaster collisions 
    for(let i = 0; i < collisions.length; i++){
      let collisionName = collisions[i].object.name;
      // if the raycaster is not hitting the track, then the car is out of bounds 
      if(collisionName == "Track"){
        outOfBounds = false;
        // if the raycaster hits a fast track, then give the car a speed boost 
      } else if(collisionName.includes("Fast")){
        curSpeed = boostSpeed;
        boostTimer = timer.getElapsed();
        // if the raycaster hits a checkpoint, then make a record of it 
      } else if(collisionName.includes("Check")){
        let checkpointNum = parseInt(collisionName.replace("Checkpoint", ""));
        checkpointReached(checkpointNum);
      }
    }
    
    // if the car is out of bounds, bring it back within bounds 
    if(outOfBounds){
      car.position.set(curX, curY, curZ);
    }

    // displaying the timer 
    document.getElementById('timerText').textContent = `Time: ${Math.trunc(timer.getElapsed() - startingTime)}`;

    // Rendering the scene 
    renderer.render(scene, camera);
  }
}

// creating a checkpoint system to check the car's progress on the track 
let curCheck = 0;
const totalNumCheckpoints = 3;
let lapCount = 1;
const targetTime = 25;

function checkpointReached(checkpointNum){
  // if the checkpoint the car is at is one ahead of the previous
  // checkpoint, then it is valid 
  if(checkpointNum - curCheck == 1){
    curCheck = checkpointNum;
  }

  // if the car has reached the last checkpoint, then one lap has been completed 
  if(curCheck == totalNumCheckpoints){
    lapCount++;
    document.getElementById('lapCounter').textContent = `Lap: ${lapCount}/3`;
    curCheck = 0;
  }

  // if the car has completed 3 laps, then end the game 
  if(lapCount == 4){
    gameRunning = false;
    document.getElementById('startupMessage').style.display = 'none';
    document.getElementById('overlay').style.color = 'white';
    document.getElementById('overlay').style.display = 'none';
    renderer.domElement.remove();
    renderer.dispose();

    // if the player was fast enough, display a success message
    if((timer.getElapsed() - startingTime) < targetTime){
      document.getElementById('successMessage').style.display = 'inline';
    } else{
      document.getElementById('failureMessage').style.display = 'inline';
    }
  }
}


// checking keyboard input to start turning 
document.addEventListener('keydown', (event) => {
  if(event.key == "ArrowLeft"){
    moveLeft = true;
  }

  if(event.key == "ArrowRight"){
    moveRight = true;
  }
});


// checking keyboard input to stop turning 
document.addEventListener('keyup', (event) => {
  if(event.key == "ArrowLeft"){
    moveLeft = false;
  }

  if(event.key == "ArrowRight"){
    moveRight = false;
  }
});


// checking click input to start the game 
document.addEventListener('click', () => {
  gameRunning = true;
  document.getElementById('overlay').style.display = 'inline';
});

// setting the animation loop 
renderer.setAnimationLoop(animate);