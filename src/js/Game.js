/**
 * Игровая логика:
 * - гоблин появляется в случайной ячейке ровно на 1 секунду;
 * - клик по ячейке с гоблином: +1 балл, гоблин пропадает;
 * - 5 пропущенных появлений — конец игры.
 */
export default class Game {
  constructor(board, scoreBoard, { maxMisses = 5, interval = 1000 } = {}) {
    this.board = board;
    this.scoreBoard = scoreBoard;
    this.maxMisses = maxMisses;
    this.interval = interval;

    this.score = 0;
    this.misses = 0;
    this.currentCellIndex = -1;
    this.lastCellIndex = -1;
    this.hit = false;
    this.timerId = null;
    this.playing = false;

    this.onBoardClick = this.onBoardClick.bind(this);
    this.tick = this.tick.bind(this);

    this.board.element.addEventListener('click', this.onBoardClick);
  }

  start() {
    this.stop();
    this.score = 0;
    this.misses = 0;
    this.currentCellIndex = -1;
    this.lastCellIndex = -1;
    this.hit = false;
    this.playing = true;
    this.scoreBoard.update(this.score, this.misses);
    this.scoreBoard.hideGameOver();
    this.board.hideGoblin();
    this.placeGoblin();
    this.timerId = setInterval(this.tick, this.interval);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.playing = false;
  }

  /** Появление гоблина раз в секунду. */
  tick() {
    if (!this.playing) {
      return;
    }

    // Гоблин был на поле, но по нему не успели кликнуть — промах.
    if (this.currentCellIndex !== -1 && !this.hit) {
      this.misses += 1;
      this.scoreBoard.update(this.score, this.misses);
    }

    if (this.misses >= this.maxMisses) {
      this.gameOver();
      return;
    }

    this.placeGoblin();
  }

  placeGoblin() {
    // Гоблин не появляется в одной и той же ячейке два раза подряд,
    // даже если по нему только что кликнули: исключаем lastCellIndex.
    this.currentCellIndex = this.board.getRandomCellIndex(this.lastCellIndex);
    this.lastCellIndex = this.currentCellIndex;
    this.hit = false;
    this.board.showGoblin(this.currentCellIndex);
  }

  onBoardClick(event) {
    if (!this.playing) {
      return;
    }

    const cell = event.target.closest('.cell');
    if (!cell) {
      return;
    }

    const index = Number(cell.dataset.index);
    if (index === this.currentCellIndex && !this.hit) {
      this.hit = true;
      this.score += 1;
      this.scoreBoard.update(this.score, this.misses);
      this.board.hideGoblin(true);
      this.currentCellIndex = -1;
    }
  }

  gameOver() {
    this.stop();
    this.board.hideGoblin();
    this.scoreBoard.showGameOver(this.score);
  }
}
