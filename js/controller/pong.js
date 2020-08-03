import Ball from '../model/ball.js'
import Net from '../model/net.js'
import {LeftPaddle, RightPaddle} from '../model/paddle.js'
import CanvasView from '../view/canvasView.js';
import DIRECTION from '../model/direction.js';

export default class Pong {
    ball;
    net;
    leftPaddle;
    rightPaddle;
    view;

    constructor() {
        this.view = new CanvasView(this);

        const viewWidth = this.view.getWidth();
        const viewHeight = this.view.getHeight();

        this.ball = new Ball(viewWidth, viewHeight);
        this.net = new Net(viewWidth, viewHeight);
        this.leftPaddle = new LeftPaddle(viewWidth, viewHeight);
        this.rightPaddle = new RightPaddle(viewWidth, viewHeight);
        
        
        this.draw();
        this.loop();
    }

    isGameStopped () {
        return false;
    }

    draw() {
        this.view.draw(
            this.ball,
            this.net,
            this.leftPaddle,
            this.rightPaddle
            );
    }

    loop() {
        //we want to update the xPos and yPos when the ball moves
        this.update();
        //redraw the screen
        this.draw();

        if (!this.isGameStopped()) {
            //this takes in an argument that runs on a certain frequency taken in as an argument.
            window.requestAnimationFrame(() => {
                this.loop();
            })
       
        }
    }

    update() {

   
        this.ball.move();
        this.leftPaddle.move(DIRECTION.UP);
        this.rightPaddle.move(DIRECTION.DOWN);

        if (this.didBallCollideWithBoundary(this.ball.getYPos(), this.view.getHeight(), 0)) {
            this.ball.reverseY();
        } 
    }

    didBallCollideWithBoundary(ball, lowerBoundaryYPos, upperBoundaryYPos) {

        const ballYPos = this.ball.getYPos();
        const ballRadius = this.ball.getRadius();
        return (ballYPos + ballRadius) >= lowerBoundaryYPos || (ballYPos - ballRadius) <= upperBoundaryYPos;
      
    }

    setLeftPaddleDirection(direction) {
        this.leftPaddle.setDirection(direction);
    }

    setRightPaddleDirection(direction) {
        this.rightPaddle.setDirection(direction);
    }

 

}