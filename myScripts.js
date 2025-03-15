// for the home page
function startUpFunction(){
    const myColors = ["#ff9900", "#EF4136", "#F26522","#0077ff", "#1C75BC", "#00AEEF", "#2B3990"];
    let myLetters = document.getElementsByClassName("letters");

    for(let i = 0; i < myLetters.length; i++){
        current = myLetters[i];
        randNum = Math.floor(Math.random() * (myColors.length));
        current.style.color = myColors[randNum];
    }
}

// for interactivity on the home page
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


// for the image galleries on individual project pages
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

// for getting a closer look at an image gallery image
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

// for escaping out of the expanded image view
function collapseViewImage(){
    let myImage = document.getElementById("expandableImage");
    myImage.style.display = "none";

    let myWindow = document.getElementById("imageWindow");
    myWindow.style.display = "none";

    let myEscape = document.getElementById("imageEscape");
    myEscape.style.display = "none";
}

