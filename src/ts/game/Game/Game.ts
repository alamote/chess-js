import Player from '../Player/Player';
import { ColorEnum } from '../interfaces';
import { Log } from './Log';
import Cell from '../Board/Cell';
import { Move } from './Move';
import Board from '../Board/Board';
import Figure from '../Figure/Figure';

export class Game {

  board: Board;
  isAuto: boolean = false;

  log: Log = new Log();
  players: Player[] = [];

  activePlayer!: Player;

  constructor() {
    this.players.push(new Player('Sergey', ColorEnum.WHITE, true));
    this.players.push(new Player('Vet', ColorEnum.BLACK));

    this.changePlayer();

    if (this.activePlayer.color !== this.me.color) {
      setTimeout(() => this.autoMove(), 100);
    }

    this.board = new Board(this);
    this.board.reset();
  }

  get me(): Player {
    return this.players.find(p => p.me) as Player;
  }

  get activeCell(): Cell | null {
    return this.board.cells.find(cell => cell.state.is_active) ?? null;
  }

  move(player: Player, from: Cell, to: Cell) {
    const move = new Move(player, from, to);
    this.log.add(move);
    this.changePlayer();
    this.board.cells.forEach(cell => cell.state.is_movable = false);
    if (!this.isAuto && this.activePlayer.color !== this.me.color) {
      setTimeout(() => this.autoMove(), 100);
    }
  }

  changePlayer() {
    this.activePlayer = this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  isOwn(player: Player, figure: Figure) {
    return figure.color === player.color;
  }

  onClick(event: MouseEvent) {
    const cell = this.board.getCellByXAndY(event.offsetX, event.offsetY);
    if (cell?.state.is_movable && this.activeCell) {
      this.move(this.activePlayer, this.activeCell, cell);
    }
    this.board.cells.forEach(cell => cell.state.is_movable = false);
    if (cell?.state.is_active) {
      cell.state.is_active = false;
      return;
    }
    this.board.cells.forEach(cell => cell.state.is_active = false);
    if (cell?.figure && cell?.state.has_moves) {
      cell.state.is_active = true;
      cell.figure.showMoves(this, cell);
    }
  }

  onMouseLeave() {
    this.board.cells.forEach(cell => cell.state.is_highlighted = false);
  }

  onMouseMove(event: MouseEvent): boolean {
    this.board.cells.forEach(cell => cell.state.is_highlighted = false);
    const cell = this.board.getCellByXAndY(event.offsetX, event.offsetY);
    if (cell?.state.has_moves || cell?.state.is_movable) {
      cell.state.is_highlighted = true;
    }
    return !!cell?.state.is_highlighted;
  }

  autoMove() {
    const hasMoves = this.board.cells.filter(c => c.state.has_moves && c.state.has_figure);
    if (hasMoves.length) {
      const from = hasMoves[Math.floor(Math.random() * hasMoves.length)];
      from.state.is_active = true;
      from.figure?.showMoves(this, from);
      const targets = this.board.cells.filter(c => c.state.is_movable);
      if (targets.length) {
        const to = targets[Math.floor(Math.random() * targets.length)];
        this.move(this.activePlayer, from, to);
        from.state.is_active = false;
      }
    }
  }

  autoGame() {
    this.isAuto = true;
    setInterval(() => this.autoMove(), 100);
  }
}
