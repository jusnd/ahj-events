import goblinImg from '../img/goblin.svg';

/**
 * Игровое поле: сетка фиксированного набора ячеек,
 * в которых может появляться гоблин.
 */
export default class Board {
  constructor(element, size = 4) {
    this.element = element;
    this.size = size;
    this.cells = [];
    this.render();
  }

  render() {
    this.element.innerHTML = '';
    this.cells = [];
    for (let i = 0; i < this.size * this.size; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      this.element.appendChild(cell);
      this.cells.push(cell);
    }
  }

  /** Случайный индекс ячейки, не совпадающий с excludeIndex. */
  getRandomCellIndex(excludeIndex = -1) {
    let index;
    do {
      index = Math.floor(Math.random() * this.cells.length);
    } while (index === excludeIndex);
    return index;
  }

  /** Показать гоблина в ячейке. */
  showGoblin(index) {
    this.hideGoblin();
    const img = document.createElement('img');
    img.src = goblinImg;
    img.alt = 'Гоблин';
    img.classList.add('goblin');
    this.cells[index].appendChild(img);
    this.goblinElement = img;
  }

  /** Убрать гоблина с поля. */
  hideGoblin(hit = false) {
    if (this.goblinElement) {
      if (hit) {
        this.goblinElement.classList.add('hit');
      }
      this.goblinElement.remove();
      this.goblinElement = null;
    }
  }
}
