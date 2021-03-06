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
        this.speed = 8; //TODO make responsive

       this.reset();
    }



    getLeftEdge() {
        return this.xPos;
    }

    getRightEdge() {
        return this.xPos + this.width;
    }

    getTopEdge() {
        return this.yPos;
    }

    getBottomEdge() {
        return this.yPos + this.height;
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

    reset() {
        this.yPos = (this.canvasHeight / 2) - (this.height / 2);
    }

    setDirection(direction) {
        this.direction = direction;
    }
}

export class LeftPaddle extends Paddle {
    constructor(canvasWidth, canvasHeight){
        super(canvasWidth, canvasHeight);
        this.reset();
    }
    reset() {
        this.xPos = 0 + (5 * this.width);
        super.reset();
    }
}

export class RightPaddle extends Paddle{
    canvasWidth;
    constructor(canvasWidth, canvasHeight) {
        super(canvasWidth, canvasHeight);
        this.canvasWidth = canvasWidth;
        this.reset();
    }
    reset() {
        this.xPos = this.canvasWidth - (6 * this.width);
       super.reset();
    }
}