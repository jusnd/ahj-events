import '../css/style.css';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import Game from './Game';

const BOARD_SIZE = 4; // размер поля: 4×4 ячеек
const MAX_MISSES = 5; // промахов до конца игры
const GOBLIN_INTERVAL_MS = 1000; // гоблин показывается ровно 1 секунду

const board = new Board(document.getElementById('board'), BOARD_SIZE);

const scoreBoard = new ScoreBoard({
  scoreEl: document.getElementById('score'),
  missesEl: document.getElementById('misses'),
  gameOverEl: document.getElementById('game-over'),
  finalScoreEl: document.getElementById('final-score'),
});

const game = new Game(board, scoreBoard, {
  maxMisses: MAX_MISSES,
  interval: GOBLIN_INTERVAL_MS,
});

document.getElementById('restart').addEventListener('click', () => game.start());

game.start();
