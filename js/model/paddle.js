export default class Paddle {

    color;
    height;
    width;
    xPos;
    yPos;

    constructor (canvasWidth, canvasHeight, isLeftPaddle) {
        this.color = 'rgb(255, 255, 255)'
        this.height = canvasHeight * .1; //10% of the view height
        this.width = canvasWidth * .01; //1% of the width
        this.yPos = (canvasHeight / 2) - (this.height / 2);
        
        if (isLeftPaddle) {
            this.xPos = 0 + (5 * this.width);
        } else {
            this.xPos = canvasWidth - (6 * this.width);
        }
    }

}

class leftPaddle {
    constructor(canvasWidth, canvasHeight){
        super(canvasWidth, canvasHeight);
        this.xPos = 0;
    }
}

class rightPaddle {
    constructor(canvasWidth, canvasHeight)

}