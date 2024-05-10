let darkModeOn = false;

function darkModeFunction(){
    let colorChange = "";
    let backColorChange = "";
    if(darkModeOn){
        colorChange = "#0077ff";
        backColorChange = "#ffffff";
        darkModeOn = false;
    } else{
        colorChange = "#ffffff";
        backColorChange = "#0077ff";
        darkModeOn = true;
    }

    let border = document.getElementById("borderContent");
    border.style.color = colorChange;

    let mainArea = document.getElementById("mainContent");
    mainArea.style.backgroundColor = backColorChange;
    mainArea.style.borderColor = colorChange;

    let outsideArea = document.getElementById("borderWhiteRectangle");
    outsideArea.style.backgroundColor = backColorChange;

    try{
        let projectsText = document.getElementById("projectsHeader");
        projectsText.style.color = colorChange;
    } catch{}

    try{
        let contactText = document.getElementById("contactInfoContent");
        contactText.style.color = colorChange;
    } catch{}

    try{
        let projectSubpageText = document.getElementById("projectDescription");
        projectSubpageText.style.color = colorChange;
    } catch{}

    try{
        let bigImage = document.getElementById("mainImage");
        let galleryImages = document.getElementsByClassName("gallery");
        for(let i = 0; i < galleryImages.length; i++){
            current = galleryImages[i];
            if(current.src != bigImage.src){
                current.style.borderColor = backColorChange;
            }
        }
    } catch{}

    if(darkModeOn){
        recolorWhite();
    } else{
        startUpFunction();
    }
    
}

function changeImage(newImageSource, clickedImage){
    let bigImage = document.getElementById("mainImage");
    bigImage.src = newImageSource;

    let imageGalleryImages = document.getElementsByClassName("gallery");
    for(let i = 0; i < imageGalleryImages.length; i++){
        imageGalleryImages[i].style.borderColor = "#ffffff";
    }

    let newBorder = document.getElementById(clickedImage);
    newBorder.style.borderColor = "#ff9900";

}


function startUpFunction(){
    const myColors = ["#ff9900", "#EF4136", "#F26522","#0077ff", "#1C75BC", "#00AEEF", "#2B3990"];
    let myLetters = document.getElementsByClassName("letters");

    for(let i = 0; i < myLetters.length; i++){
        current = myLetters[i];
        randNum = Math.floor(Math.random() * (myColors.length));
        current.style.color = myColors[randNum];
    }
}

function recolorWhite(){
    const newColors = ["#ff9900", "#EF4136", "#F26522","#ffffff", "#cccccc", "#00AEEF", "#2B3990"];
    let myLetters = document.getElementsByClassName("letters");

    for(let i = 0; i < myLetters.length; i++){
        current = myLetters[i];
        randNum = Math.floor(Math.random() * (newColors.length));
        current.style.color = newColors[randNum];
    }

}

function lettersFunction(event){
    let mouseX = event.pageX;
    let mouseY = event.pageY;

    let myLetters = document.getElementsByClassName("letters");

    for(let i = 0; i < myLetters.length; i++){
        current = myLetters[i];
        current.style.transitionDuration = "0.5s";

        let xPos = current.offsetLeft;
        let yPos = current.offsetTop;
        let xDist = mouseX - xPos;
        let yDist= mouseY - yPos;

        let overallDistance = Math.sqrt((xDist*xDist) + (yDist*yDist));

        let scaleFactor = 8 - Math.floor(overallDistance / 100);

        current.style.fontSize = scaleFactor + "em";

    }
}

function expandViewPDF(){
    let myPDF = document.getElementById("expandablePDF");
    myPDF.style.display = "block";

    let myEscape = document.getElementById("escape");
    myEscape.style.display = "block";

}

function collapseViewPDF(){
    let myPDF = document.getElementById("expandablePDF");
    myPDF.style.display = "none";

    let myEscape = document.getElementById("escape");
    myEscape.style.display = "none";
}

function expandViewImage(){
    let bigImage = document.getElementById("mainImage");
    let myImage = document.getElementById("expandableImage");

    myImage.src = bigImage.src;
    myImage.style.display = "block";

    let myWindow = document.getElementById("imageWindow");
    myWindow.style.display = "block";

    let myEscape = document.getElementById("imageEscape");
    myEscape.style.display = "block";
}

function collapseViewImage(){
    let myImage = document.getElementById("expandableImage");
    myImage.style.display = "none";

    let myWindow = document.getElementById("imageWindow");
    myWindow.style.display = "none";

    let myEscape = document.getElementById("imageEscape");
    myEscape.style.display = "none";
}