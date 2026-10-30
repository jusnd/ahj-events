/**
 * Панель счёта и экран завершения игры.
 */
export default class ScoreBoard {
  constructor({ scoreEl, missesEl, gameOverEl, finalScoreEl }) {
    this.scoreEl = scoreEl;
    this.missesEl = missesEl;
    this.gameOverEl = gameOverEl;
    this.finalScoreEl = finalScoreEl;
  }

  update(score, misses) {
    this.scoreEl.textContent = score;
    this.missesEl.textContent = misses;
  }

  showGameOver(score) {
    this.finalScoreEl.textContent = score;
    this.gameOverEl.classList.remove('hidden');
  }

  hideGameOver() {
    this.gameOverEl.classList.add('hidden');
  }
}
