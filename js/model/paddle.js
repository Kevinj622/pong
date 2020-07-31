import DIRECTION from '../model/direction.js'
class Paddle {

    color;
    height;
    width;
    speed;
    xPos;
    yPos;

    constructor (canvasWidth, canvasHeight) {
        this.color = 'rgb(255, 255, 255)';
        this.height = canvasHeight * .1; //10% of the view height
        this.width = canvasWidth * .01; //1% of the width
        this.yPos = (canvasHeight / 2) - (this.height / 2);
        this.speed = 5; //TODO make responsive
    }

    move(direction) {
       if (direction === DIRECTION.UP) {
           this.yPos -= this.speed;
       } else if (direction === DIRECTION.DOWN) {
           this.yPos += this.speed;
       }
    }

}

export class LeftPaddle extends Paddle {
    constructor(canvasWidth, canvasHeight){
        super(canvasWidth, canvasHeight);
        this.xPos = 0 + (5 * this.width);
    }
}

export class RightPaddle extends Paddle{
    constructor(canvasWidth, canvasHeight) {
        super(canvasWidth, canvasHeight);
        this.xPos = canvasWidth - (6 * this.width);
    }

}