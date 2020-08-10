import Ball from '../model/ball.js'
import Net from '../model/net.js'
import {LeftPaddle, RightPaddle} from '../model/paddle.js'
import CanvasView from '../view/canvasView.js';
import DIRECTION from '../model/direction.js';
import Player from '../model/player.js';
import pongAudio from '../model/pongAudio.js';

export default class Pong {
    audio;
    WINNING_SCORE = 5;
    ball;
    net;
    leftPaddle;
    rightPaddle;
    leftPlayer;
    rightPlayer;

    view;

    isGamePaused;

    constructor() {
        this.audio = new pongAudio();
        this.view = new CanvasView(this);

        const viewWidth = this.view.getWidth();
        const viewHeight = this.view.getHeight();

        this.ball = new Ball(viewWidth, viewHeight);
        this.net = new Net(viewWidth, viewHeight);
        this.leftPaddle = new LeftPaddle(viewWidth, viewHeight);
        this.rightPaddle = new RightPaddle(viewWidth, viewHeight);
        this.leftPlayer = new Player(this.leftPaddle, this.WINNING_SCORE);
        this.rightPlayer = new Player(this.rightPaddle, this.WINNING_SCORE);

        this.pauseGame();
        this.draw();
      
    }

    isGameStopped () {
        return this.isGamePaused || this.isGameOver();
    }

    isGameOver() {
        return this.leftPlayer.hasWon()  || this.rightPlayer.hasWon();
    }

    draw() {
        this.view.draw(
            this.ball,
            this.net,
            this.leftPlayer,
            this.rightPlayer
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

    pauseGame() {
        this.isGamePaused = true;
    }

    unpauseGame() {
        if (this.isGameOver()) {
            this.isGamePaused = false;
            this.leftPlayer.resetScore();
            this.rightPlayer.resetScore();
            this.loop();
        }
        else if (this.isGamePaused) {
            this.isGamePaused = false;
            this.loop();
        } 
    }

    update() {
   
        this.ball.move();
        this.leftPaddle.move(DIRECTION.UP);
        this.rightPaddle.move(DIRECTION.DOWN);
        
        if (this.didBallCollideWithBoundary(this.ball, this.view.getHeight(), 0)) {
            this.audio.playHitBoundarySound();
            this.ball.reverseY();
        } else if (this.didLeftPlayerScore(this.ball, this.view.getWidth())) {
            this.pauseGame();
            this.leftPlayer.incrementScore();
                    if(this.isGameOver()){
                        this.audio.playGameOverSound();
                    } else {
                        this.audio.playScoreSound();
                    }
            this.ball.reset();
            this.ball.reverseX();
        } else if (this.didRightPlayerScore(this.ball, 0)) {
            this.pauseGame();
            this.rightPlayer.incrementScore();
            if(this.isGameOver()){
                this.audio.playGameOverSound();
            } else {
                this.audio.playScoreSound();
            }
            this.ball.reset();
            this.ball.reverseX();
        } else if (this.didLeftPaddleHitBall(this.ball, this.leftPaddle) || this.didRightPaddleHitBall(this.ball, this.rightPaddle)) {
            this.audio.playHitPaddleSound();
            this.ball.reverseX();
        }
    }

    didBallCollideWithBoundary(ball, lowerBoundaryYPos, upperBoundaryYPos) {

        return ball.getBottomEdge() >= lowerBoundaryYPos || ball.getTopEdge() <= upperBoundaryYPos;
      
    }

    didLeftPaddleHitBall(ball, paddle) {

        return (ball.getDX() < 0 //Left paddle
        && ball.getLeftEdge() >= paddle.getLeftEdge() 
        && ball.getLeftEdge() <= paddle.getRightEdge() 
        && ball.getYPos() >= paddle.getTopEdge()
        && ball.getYPos() <= paddle.getBottomEdge());

    }

    didRightPaddleHitBall(ball, paddle) {

        return (ball.getDX() > 0    //Right paddle
            && ball.getRightEdge() >= paddle.getLeftEdge() 
            && ball.getRightEdge() <= paddle.getRightEdge() 
            && ball.getYPos() >= paddle.getTopEdge()
            && ball.getYPos() <= paddle.getBottomEdge());
    }

    didLeftPlayerScore(ball, scoreLine) {
        return this.ball.getLeftEdge() >= scoreLine;
    }

    didRightPlayerScore(ball, scoreLine) {
        return this.ball.getRightEdge() <= scoreLine;
    }

    setLeftPaddleDirection(direction) {
        this.leftPaddle.setDirection(direction);
    }

    setRightPaddleDirection(direction) {
        this.rightPaddle.setDirection(direction);
    }

 

}