let explode = false;
let startPos;
let resetStartPos = true;
let cooldownTimer = 0;

let explosionLength = 1000;
let timing;

function inputReceived(){
    if(explode && (millis()- cooldownTimer > explosionLength)){
        if(resetStartPos){
            startPos = newFirework.getPosition();
            resetStartPos = false;
        }
        for(let i = 0; i < 100; i ++){
            let randomX = Math.ceil((Math.random() * 30) - 15);
            let randomY = Math.ceil((Math.random()* 30) - 15);
            particles.push(new Particle(startPos.x + randomX, startPos.y + randomY, color));
        }

        //set the explosion length/size
        timing = Math.abs(newFirework.getVelocity());
        if (timing < 0.5){
            explosionLength = 3000;
        } else if (timing < 2){
            explosionLength = 2000;
        } else if (timing < 4){
            explosionLength = 1500;
        } else{
            explosionLength = 1000;
        }

        textSetup();

        explode = false;
        explosionTimer = millis();
        cooldownTimer = millis();
    }
}


function checkLaunch(){
    if (!explode && (millis()- cooldownTimer > explosionLength)){
        launchFirework();
        particles = [];
        explode = true;
        resetStartPos = true;
    }
}
