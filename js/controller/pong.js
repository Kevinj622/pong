import Ball from '../model/ball.js'
import Net from '../model/net.js'
import Paddle from '../model/paddle.js'
import canvasView from '../view/canvasView.js';

export default class Pong {
    ball;
    net;
    leftPaddle;
    rightPaddle;

    constructor() {
        this.view = new canvasView();

        const viewWidth = this.view.getWidth();
        const viewHeight = this.view.getHeight();

        this.ball = new Ball(viewWidth, viewHeight);
        this.net = new Net(viewWidth, viewHeight);
        this.leftPaddle = new Paddle(viewWidth, viewHeight, true);
        this.rightPaddle = new Paddle(viewWidth, viewHeight, false);
        
        this.view.draw(
            this.ball,
            this.net,
            this.leftPaddle,
            this.rightPaddle
            )
    }

}