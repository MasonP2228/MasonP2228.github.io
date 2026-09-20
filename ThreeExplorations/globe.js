import * as THREE from 'three';
import {STLLoader} from 'three/addons/loaders/STLLoader.js';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import {TTFLoader} from 'three/addons/loaders/TTFLoader.js';

// Setting up the scene
const scene = new THREE.Scene();

// Setting up the camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

// Setting up the renderer 
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
// Making the background transparent so p5 shows through from underneath
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

// Creating the globe
const geometry = new THREE.SphereGeometry(50, 100, 100);
const material = new THREE.MeshBasicMaterial({color: 0x0099ff});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Bringing in the continents
const loader = new STLLoader();
const continentGeo = await loader.loadAsync('models/Continents.stl');
const continentMat = new THREE.MeshBasicMaterial({color: 0x00cc44});
const continentMesh = new THREE.Mesh(continentGeo, continentMat);

// Making manual adjustments so that the model displays properly
continentMesh.rotateX(-Math.PI/2);
continentMesh.position.set(0,-3.5,0);

// Creating a group so that multiple objects can be rotated together
const rotationGroup = new THREE.Group();
scene.add(rotationGroup);
rotationGroup.add(continentMesh); // displaying the continents 

// Loading in a font
const fLoader = new FontLoader();
const tLoader = new TTFLoader();
const json = await tLoader.loadAsync('fonts/Roboto-Medium.ttf');
const projectFont = fLoader.parse(json);

// Defining a color for the font
const tMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});



// Defining a list of cities to display the times for 
let cityList = [];

// Defining a city class, which holds the name, difference from UTC time,
// the location to generate the text in, and the rotation of the text 
class City{
  constructor(name, timeDif, x, y, z, r){
    this.name = name;
    this.timeDif = timeDif;
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
  }
}

// defining the world y-axis for text rotations
const yAxis = new THREE.Vector3(0, 1, 0);

// defining a multiplication constant to convert degrees to radians
const toRad = Math.PI/180;

// Adding all of the cities to display the time for 
cityList.push(new City('Rio de Janeiro', -3, 30, -20, 38, 35*toRad));
cityList.push(new City('New York', -4, 10, 25, 45, 0));
cityList.push(new City('Bogota', -5, 12, -5, 50, 0));
cityList.push(new City('Mexico City', -6, -9, 10, 51, 0));
cityList.push(new City('Los Angeles', -7, -15, 20, 48, 0));
cityList.push(new City('Honolulu', -10, -50, 5, 16, 300*toRad));
cityList.push(new City('Sydney', 10, -30, -32, -31, 240*toRad));
cityList.push(new City('Tokyo', 9, -30, 16, -40, 210*toRad));
cityList.push(new City('Hong Kong', 8, -18, 5, -49, 200*toRad));
cityList.push(new City('Dhaka', 6, -5, 4, -52, 180*toRad));
cityList.push(new City('Dubai', 4, 18, 6, -49, 160*toRad));
cityList.push(new City('Moscow', 3, 23, 30, -38, 145*toRad));
cityList.push(new City('Cairo', 3, 30, 10, -42, 140*toRad));
cityList.push(new City('Rome', 2, 35, 20, -33, 134*toRad));
cityList.push(new City('Cape Town', 2, 29, -28, -33, 140*toRad));
cityList.push(new City('London', 1, 36, 30, -25, 128*toRad));
cityList.push(new City('Lagos', 1, 42, -8, -30, 128*toRad));


// creating lists to store text labels, this allows for them
// to be deleted later for performance/ memory purposes 
let textGeos = [];
let textMeshes = [];

// Starting the animation 
renderer.setAnimationLoop(animate);



// Running the animation
function animate(time) {
  // Deleting the previous label geometries and meshes
  for(let i = textGeos.length - 1; i >= 0; i--){
    textGeos[i].dispose();
  }
  textGeos = [];

  for(let i = textMeshes.length - 1; i >= 0; i--){
    rotationGroup.remove(textMeshes[i]);
    textMeshes[i].dispose();
  }
  textMeshes = [];

  // Getting the current time 
  let d = new Date();
  let hours = d.getUTCHours();
  let minutes = d.getUTCMinutes().toString();
  if(minutes.length < 2){
    minutes = "0" + minutes;
  }

  // Generating the text labels
  for(let i = 0; i < cityList.length; i++){
    // finding the local time for each city
    let localHour = hours + cityList[i].timeDif;
    if(localHour <= 0){
      localHour += 24;
    } else if(localHour > 24){
      localHour -= 24;
    }
    // creating the text
    let tGeometry = new TextGeometry(`${cityList[i].name}\n${localHour}:${minutes}`, {
      font: projectFont,
      size: 1,
      depth: 0.1
    });
    let tMesh = new THREE.Mesh(tGeometry, tMaterial);

    // making sure the text displays at the right angle
    tMesh.rotateOnAxis(yAxis, cityList[i].r);

    // making sure the text displays at the right location
    tMesh.position.set(cityList[i].x,cityList[i].y,cityList[i].z);

    // storing the geometry and mesh in lists for deletion
    textGeos.push(tGeometry);
    textMeshes.push(tMesh);

    // adding the mesh to the rotation group so that it displays
    // and moves with the continents
    rotationGroup.add(tMesh);
  }

  // Rotating the globe
  rotationGroup.rotation.y = time/8000;

  // Rendering the scene 
  renderer.render(scene, camera);
}