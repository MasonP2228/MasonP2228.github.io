import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

// Setting up the scene
const scene = new THREE.Scene();

// Setting up the camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,10,5);

// Setting up the renderer 
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// loading in the scenery
const loader = new GLTFLoader();
const flatironsModel = await loader.loadAsync("models/Flatirons.glb");
flatironsModel.scene.rotateY(-Math.PI/2);
scene.add(flatironsModel.scene);

// creating a light source so that the scenery displays properly 
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 20, 10);
scene.add(dirLight);

// setting up a variable to store data from a .csv file 
let weatherDataFile;

// setting up a JSON object to store and access the data
const weatherDict = {};

// fetching the weather data 
fetch('data/WeatherData.csv')
  .then((res) => res.text())
  .then((text) => {
    weatherDataFile = text.split('\n');
  })
  .then(() =>{
    for(let i = 1; i < weatherDataFile.length; i++){
      let rowData = weatherDataFile[i].split(',');
      // get the month and day 
      let curDate = numToMonth(parseInt(rowData[0]));
      curDate += rowData[1];
      // use the date as a dictionary key 
      // use the rest of the data as the dictionary value 
      weatherDict[curDate] = rowData.slice(2);
    }
  })
  .then(() => {
    // setting the animation loop only after the csv file has been read
    renderer.setAnimationLoop(animate);
  })
.catch((e) => console.log(e));


// setting up variables to iterate through the days of the year
let curMonth = 12;
let curDay = 31;
let key;
let timer = 0;
let timeLimit = 2000;

// setting up variables to store each day's weather data 
let dailyData;
let temperature;
let precip;
let snow;

// setting up a constant value for the temperature display 
const hotColor = new THREE.Color(0xDDBB00);

// getting a HTML element that can be used to communicate with p5 
const communicator = document.getElementById('dataContainer'); 

// Running the animation
function animate() {
  // change the day on a timed interval or when the user manually changes it
  if(millis() - timer >= timeLimit || communicator.dataset.userChange != "none"){
    // increment the day by one if it is being changed by the timer 
    if(millis() - timer >= timeLimit){
      curDay++;
      timer = millis();
    // set the day to a custom value if it is being changed by the user 
    } else if(communicator.dataset.userChange != undefined){
      curMonth = monthToNum(communicator.dataset.userChange.split(" ")[0]);
      curDay = parseInt(communicator.dataset.userChange.split(" ")[1]);
      communicator.dataset.userChange = "none";
    }

    // turn the current month and day into a JSON key 
    key = numToMonth(curMonth) + curDay.toString();

    // if the key does not exist in the JSON, set the 
    // key to the first day of the next month 
    if(weatherDict[key] == undefined){
      curMonth++;
      if(curMonth >= 13){
        curMonth = 1;
      }
      curDay = 1;
    }
    key = numToMonth(curMonth) + curDay.toString();

    // send the key to p5 using a HTML data attribute 
    communicator.dataset.day = key;
    
    // retrieve the weather data 
    dailyData = weatherDict[key];
    temperature = parseInt(dailyData[0]);
    precip = parseFloat(dailyData[1]);
    snow = parseFloat(dailyData[2]);
    
    // manipulating the temperature data
    if(temperature < 0){
      temperature = 0;
    }

    if(temperature > 85){
      temperature = 85;
    }

    // setting the color of the sky based on the temperature 
    let coldColor = new THREE.Color(0x0064C8);
    let curColor = coldColor.lerpHSL(hotColor, temperature/85);
    renderer.setClearColor(curColor, 0.5);

    // displaying rain and snow 
    if(snow > 0){
      showSnow();
      hideRain();
    } else if(precip > 0){
      hideSnow();
      showRain();
    } else{
      hideSnow();
      hideRain();
    }
  }

  // updating the rain and snow positions
  if(snow > 0){
    updateSnow();
  } else if(precip > 0){
    updateRain();
  }

  // Rendering the scene 
  renderer.render(scene, camera);
}


// this function converts an integer from 1 to 12 into 
// a string of the name of a month 
function numToMonth(num){
  switch(num){
    case 1: 
      return 'January ';
    case 2:
      return 'February ';
    case 3:
      return 'March ';
    case 4:
      return 'April ';
    case 5:
      return 'May ';
    case 6:
      return 'June ';
    case 7:
      return 'July ';
    case 8:
      return 'August ';
    case 9:
      return 'September ';
    case 10:
      return 'October ';
    case 11:
      return 'November ';
    case 12:
      return 'December ';
  }
}

// this function converts a string of the name 
// of a month into an integer from 1 to 12 
function monthToNum(month){
  switch(month){
    case 'January': 
      return 1;
    case 'February':
      return 2;
    case 'March':
      return 3;
    case 'April':
      return 4;
    case 'May':
      return 5;
    case 'June':
      return 6;
    case 'July':
      return 7;
    case 'August':
      return 8;
    case 'September':
      return 9;
    case 'October':
      return 10;
    case 'November':
      return 11;
    case 'December':
      return 12;
  }
}

//*************************************************/
// RAIN PARTICLE SYSTEM 

// a list to store raindrops 
let rainParticles = [];

// a display material for rain 
const rainMat = new THREE.MeshBasicMaterial({
    color: 0x0055ff,
    transparent: true,
    opacity: 1
})

// generating 100 random raindrops 
for(let i = 0; i < 100; i++){
  let rainGeo = new THREE.SphereGeometry(1, 3, 3);
  let rainMesh = new THREE.Mesh(rainGeo, rainMat);
  scene.add(rainMesh);
  rainMesh.position.set(random(-70, 70), random(80), -random(100));
  rainParticles.push(rainMesh);
}

// a function to make the rain fall 
function updateRain(){
  for(let i = 0; i < rainParticles.length; i++){
    rainParticles[i].position.y -= (1 + random(1));
    if(rainParticles[i].position.y < 0){
      rainParticles[i].position.y = 80;
    }
  }
}

// a function to hide the rain 
function hideRain(){
  for(let i = 0; i < rainParticles.length; i++){
    rainParticles[i].material.opacity = 0;
  }
}

// a function to show the rain 
function showRain(){
  for(let i = 0; i < rainParticles.length; i++){
    rainParticles[i].material.opacity = 1;
  }
}

// hiding the rain on startup 
hideRain();
//*************************************************/


//*************************************************/
// SNOW PARTICLE SYSTEM 

// a list to store snowflakes
let snowParticles = [];

// a display material for snow 
const snowMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1
})

// generating 100 random snowflakes
for(let i = 0; i < 100; i++){
  let snowGeo = new THREE.SphereGeometry(1, 2, 2);
  let snowMesh = new THREE.Mesh(snowGeo, snowMat);
  scene.add(snowMesh);
  snowMesh.position.set(random(-70, 70), random(80), -random(100));
  snowParticles.push(snowMesh);
}

// a function to make the snow fall 
function updateSnow(){
  for(let i = 0; i < snowParticles.length; i++){
    snowParticles[i].position.y -= (0.2 + random(0.5));
    if(snowParticles[i].position.y < 0){
      snowParticles[i].position.y = 80;
    }
  }
}

// a function to hide the snow
function hideSnow(){
  for(let i = 0; i < snowParticles.length; i++){
    snowParticles[i].material.opacity = 0;
  }
}

// a function to show the snow 
function showSnow(){
  for(let i = 0; i < snowParticles.length; i++){
    snowParticles[i].material.opacity = 1;
  }
}

// hiding the snow on startup 
hideSnow();
//*************************************************/
