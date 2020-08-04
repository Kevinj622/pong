export default class Ball {

    angle; //in degrees
    radius;
    color;
    speed;
    dx; //change in x pos
    dy; //change in y pos
    xPos;
    yPos;
    
    constructor(canvasWidth, canvasHeight) {

        this.angle = 45;
        this.color = 'rgb(255, 255, 255)';
        this.radius = 5;
        this.speed = 8;
        this.xPos = canvasWidth / 2;
        this.yPos = canvasHeight / 2;

        const rad = this.degreesToRadians(this.angle)
        this.dx = this.speed * Math.cos(rad);
        this.dy = this.speed * Math.sin(rad);
      
    }

    degreesToRadians(deg) {
        return (deg / 180) * Math.PI;
    }

    move() {
        this.xPos += this.dx;
        this.yPos += this.dy;
    }

    reverseX() {
        this.dx *= - 1;
    }

    reverseY() {
        this.dy *= - 1;
    }

    getYPos() {
        return this.yPos;
    }

    getRadius() {
        return this.radius;
    }

    getLeftEdge() {
        return this.xPos - this.radius;
    }

    getRightEdge() {
        return this.xPos + this.radius;
    }

    getTopEdge() {
        return this.yPos - this.radius;
    }

    getBottomEdge() {
        return this.yPos + this.radius;
    }

    getDX() {
        return this.dx;
    }

}