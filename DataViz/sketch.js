// getting a HTML element used to communicate with three.js
const communicator = document.getElementById('dataContainer');
communicator.dataset.userChange = "none";

function setup() {
    // creating the canvas
    let myCanvas = document.getElementById('p5Canvas');
    createCanvas(windowWidth, windowHeight, P2D, myCanvas);
    noStroke();
}

function draw() {
    // drawing the control panel 
    fill(200);
    rect(0, windowHeight - 150, windowWidth, 150);

    // title text 
    fill(0);
    textSize(24);
    text('Boulder / Denver Weather', windowWidth/2 -140, windowHeight - 100);

    // retrieving the current day using a HTML data attribute 
    text(communicator.dataset.day + ", 2024", windowWidth/2-95, windowHeight - 40);
}

// handling user input to change the month and day 
const dayChangeForm = document.getElementById('daySelection');
dayChangeForm.addEventListener("submit", changeDay);

function changeDay(event){
    event.preventDefault();
    let inputData = new FormData(event.target);
    // sending the user input to three.js
    communicator.dataset.userChange = inputData.get("monthInput") + inputData.get("dayInput");
}

