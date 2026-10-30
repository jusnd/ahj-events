import '../css/style.css';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import Game from './Game';

const board = new Board(document.getElementById('board'), 4);

const scoreBoard = new ScoreBoard({
  scoreEl: document.getElementById('score'),
  missesEl: document.getElementById('misses'),
  gameOverEl: document.getElementById('game-over'),
  finalScoreEl: document.getElementById('final-score'),
});

const game = new Game(board, scoreBoard, { maxMisses: 5, interval: 1000 });

document.getElementById('restart').addEventListener('click', () => game.start());

game.start();
