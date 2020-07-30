export default class Ball {

    radius;
    color;
    xPos;
    yPos;
    
    constructor(canvasWidth, canvasHeight) {

        this.color = 'rgb(255, 255, 255)';
        this.radius = 5;
        this.xPos = canvasWidth / 2 - this.radius;
        this.yPos = canvasHeight / 2 -this.radius;
    }

}