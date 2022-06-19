import Cell from '../Board/Cell';
import Player from '../Player/Player';
import Figure from '../Figure/Figure';

export class Move {

  player: Player;
  figure: Figure;
  from: Cell;
  to: Cell;
  timestamp: number;
  prevFigure!: Figure | null;

  constructor(player: Player, from: Cell, to: Cell) {
    this.player = player;
    this.figure = from.figure as Figure;
    this.from = from;
    this.to = to;
    this.timestamp = Date.now();

    if (this.figure) {
      this.figure.isMoved = true;
    }

    this.prevFigure = to.figure;
    to.figure = from.figure;
    from.figure = null;
  }

  restore() {
    this.from.figure = this.figure;
    this.to.figure = this.prevFigure;
    this.figure.isMoved = false;
  }

  toString() {
    return `${this.player.name}: ${this.figure.figure} ${this.from.coordinates} - ${this.to.coordinates}`
  }
}
