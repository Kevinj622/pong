export default class pongAudio {

    playGameOverSound() {
        this.#playSound("audGameOver");
    }

    playHitBoundarySound() {
        this.#playSound("audHitBoundary");
    }

    playScoreSound() {
        this.#playSound("audScore");
    }

    playHitPaddleSound() {
        this.#playSound("audHitPaddle");
    }

    #playSound (id) {
        const audioElem = document.getElementById(id);
        audioElem.play();
    }

}