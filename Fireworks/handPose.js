let handPose;
let video;
let hands = [];

function drawHands(){
    if(hands.length > 0){
        let hand = hands[0];

        wrist = hand.wrist;
        thumb = hand.thumb_tip;
        indexF = hand.index_finger_tip;
        middleF = hand.middle_finger_tip;
        ringF = hand.ring_finger_tip;
        pinkyF = hand.pinky_finger_tip;

        let d0 = dist(wrist.x, wrist.y, thumb.x, thumb.y);
        let d1 = dist(wrist.x, wrist.y, indexF.x, indexF.y);
        let d2 = dist(wrist.x, wrist.y, middleF.x, middleF.y);
        let d3 = dist(wrist.x, wrist.y, ringF.x, ringF.y);
        let d4 = dist(wrist.x, wrist.y, pinkyF.x, pinkyF.y);

        // the hand pose visualization is red by default, green 
        // if activated
        fill(255, 0, 0);

        if(d0 > 90 && d1 > 100 && d2 > 100 
            && d3 > 100 && d4 > 100){
                inputReceived();
                fill(0,255,0);
        }

        // visualize the hand pose for the user
        ellipse(wrist.x, wrist.y, 20, 20);
        ellipse(thumb.x, thumb.y, 20, 20);
        ellipse(indexF.x, indexF.y, 20, 20);
        ellipse(middleF.x, middleF.y, 20, 20);
        ellipse(ringF.x, ringF.y, 20, 20);
        ellipse(pinkyF.x, pinkyF.y, 20, 20);

    }
}


function gotHands(results){
    hands = results;
}