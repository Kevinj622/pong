import DIRECTION from '../model/direction.js'
class Paddle {
    canvasHeight;
    color;
    direction;
    height;
    width;
    speed;
    xPos;
    yPos;

    constructor (canvasWidth, canvasHeight) {
        this.canvasHeight = canvasHeight;
        this.color = 'rgb(255, 255, 255)';
        this.direction = DIRECTION.NONE;
        this.height = canvasHeight * .1; //10% of the view height
        this.width = canvasWidth * .01; //1% of the width
        this.yPos = (canvasHeight / 2) - (this.height / 2);
        this.speed = 8; //TODO make responsive
    }

    move() {
        const topEdgePos = 0;
        const bottomEdgePos = this.canvasHeight;

       if (this.direction === DIRECTION.UP) {
           if(this.yPos > (topEdgePos + this.speed)) {
               this.yPos -= this.speed;
           } else if (this.yPos > topEdgePos) {
               this.yPos = topEdgePos;
           }
       } else if (this.direction === DIRECTION.DOWN) {
           if(this.yPos < (bottomEdgePos - this.height - this.speed)) {
               this.yPos += this.speed;
           } else if (this.yPos < (bottomEdgePos - this.height)) {
               this.yPos = bottomEdgePos - this.height;
           }
       }
    }
    setDirection(direction) {
        this.direction = direction;
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