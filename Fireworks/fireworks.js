let newFirework; // an empty variable to make new firework objects

let explosionTimer = 0; // a variable to make the explosion end

// a list of colors for the fireworks, each firework is one color
let colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0], [255, 0, 255]];

// a variable to store color, and pass it between files
let color;

// a variable that defines how far from the edges of the screen a firework
// can spawn at
let buffer = 200;


class Firework{
    // initialize a new firework with a position, a randomized upwards
    // velocity, an acceleration, and a color
    constructor(x, y, color){
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1.5, 1.5), random(-10, -8));
        this.acceleration = createVector(0,0);
        this.color = color;
    }

    // apply a force to a firework object
    applyForces(force){
        this.acceleration.add(force);
    }

    // update the motion vectors for the firework object
    update(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    // display a firework object
    show(){
        fill(this.color);
        ellipse(this.position.x, this.position.y, 12);
    }

    // get a firework's position (used to delete object if it is off-screen)
    getPosition(){
        return this.position;
    }

    // get the velocity of the firework
    getVelocity(){
        return this.velocity.y;
    }

    //update the firework's color so that it flashes at its peak
    updateColor(){
        if(Math.abs(this.velocity.y) < 0.5){
            this.color = 255;
        } else{
            this.color = color;
        }
    }

}


// launch a firework with a randomized position and color
function launchFirework(){
    let xPos = Math.floor((Math.random() * (windowWidth - 320 - (2*buffer))) + 320 + buffer);
    let yPos = windowHeight;
    color = colors[Math.floor(Math.random()* colors.length)];

    newFirework = new Firework(xPos, yPos, color);
}
