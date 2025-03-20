let particles = [];

class Particle{
    constructor(x, y, color){
        this.position = createVector(x,y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);

        this.size = 0;
        this.maxSpeed = 1;
        this.maxForce = 0.2;

        this.color = color;
    }

    applyForce(force){
        this.acceleration.add(force);
    }

    seek(target){
        let desired = p5.Vector.sub(target, this.position);
        desired.normalize();
        desired.mult(this.maxSpeed);

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        return steer;
    }

    separate(particles){
        let desiredSeparation = this.size = 0.2;
        let sum = createVector();
        let count = 0;

        for(let other of particles){
            let d = p5.Vector.dist(this.position, other.position);
            if(this != other && d < desiredSeparation){
                let diff = p5.Vector.sub(this.position, other.position);
                diff.setMag(1/d);
                sum.add(diff);
                count++;
            }
        }

        if(count > 0){
            sum.div(count);
            sum.setMag(this.maxSpeed);
            sum.sub(this.velocity);
            sum.limit(this.maxForce);
        }

        return sum;
    }

    seekAndSeparate(particles, fireworkPos){
        let separateForce = this.separate(particles);
        let seekForce = this.seek(createVector(fireworkPos.x, fireworkPos.y));

        separateForce.mult(1.5);
        seekForce.mult(0.5);

        this.applyForce(separateForce);
        this.applyForce(seekForce);
    }

    update(){
        this.acceleration.x = -this.acceleration.x;
        this.acceleration.y = -this.acceleration.y;
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    particleShow(){
        fill(this.color);
        ellipse(this.position.x, this.position.y, 4);
    }

}

let textTimer = 0;
let textTimerIncrement = 0;
let textContents = "OK";
let textPosition;

function textSetup(){
    textTimer = millis();
    textPosition = newFirework.getPosition();

    if (explosionLength == 3000){
        textTimerIncrement = int(3000/ 42);
        textContents = "Excellent!";
    } else if (explosionLength == 2000){
        textTimerIncrement = int(2000/ 18);
        textContents = "Great";
    } else if (explosionLength == 1500){
        textTimerIncrement = int(1500/ 12);
        textContents = "Good";
    } else{
        textTimerIncrement = int(1000/ 6);
        textContents = "OK";
    }
}

function textShow(){
    fill(color);
    textAlign(CENTER);
    if(textContents == "Excellent!"){
        textFont("Brush Script MT");
    } else{
        textFont("Verdana");
    }
    textSize(Math.ceil(2*(millis() - textTimer)/textTimerIncrement));
    text(textContents, textPosition.x, textPosition.y);
}
