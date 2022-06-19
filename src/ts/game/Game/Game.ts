import Player, { PlayerType } from '../Player/Player';
import { ColorEnum } from '../interfaces';
import { Log } from './Log';
import Cell from '../Board/Cell';
import { Move } from './Move';
import Board from '../Board/Board';
import TransformWindow from '../Board/TransformWindow';
import { PageUtility } from '../utils/page.utility';

export class Game {

  board: Board;
  transformWindow!: TransformWindow | null;

  log: Log = new Log();
  players: Player[] = [];

  activePlayer!: Player;

  constructor() {
    const query = PageUtility.getQuery();
    const mode = query.mode?.toLowerCase() ?? 'pvp'
    this.players.push(new Player('Sergey', ColorEnum.WHITE, mode.startsWith('p') ? PlayerType.HUMAN : PlayerType.AI, true));
    this.players.push(new Player('Vet', ColorEnum.BLACK, mode.endsWith('p') ? PlayerType.HUMAN : PlayerType.AI));

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

  get oppositePlayer(): Player {
    return this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  hasMoves(): boolean {
    return !!this.board.cells.find(cell => this.activePlayer.color === cell.figure?.color && cell?.hasMoves);
  }

  move(player: Player, from: Cell, to: Cell) {
    this.board.cells.forEach(cell => cell.state.is_checked = false);
    const move = new Move(player, from, to);
    this.log.add(move);
    if (this.board.transformCell) {
      this.transformWindow = new TransformWindow(this, this.board.transformCell.figure?.color as ColorEnum);
      return;
    }
    this.updateBoard();
  }

  updateBoard() {
    this.board.processCheck();
    this.changePlayer();
    this.board.cells.forEach(cell => cell.state.is_movable = false);
    this.board.cells.forEach(cell => cell.state.has_moves = this.activePlayer.color === cell.figure?.color && cell?.hasMoves);
    if (this.hasMoves() && this.activePlayer.type === PlayerType.AI) {
      setTimeout(() => this.autoMove(), 100);
    }
  }

  changePlayer() {
    this.activePlayer = this.oppositePlayer;
  }

  onClick(event: MouseEvent) {
    if (this.transformWindow && this.board.transformCell) {
      const figure = this.transformWindow.getTransformFigureByXAndY(event.offsetX, event.offsetY);
      if (figure) {
        this.board.transformCell.figure = figure;
        this.transformWindow = null;
        this.updateBoard();
      }
    } else {
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
        cell.showMoves();
      }
    }
  }

  onMouseLeave() {
    this.board.cells.forEach(cell => cell.state.is_highlighted = false);
  }

  onMouseMove(event: MouseEvent): boolean {
    this.board.cells.forEach(cell => cell.state.is_highlighted = false);
    if (this.transformWindow) {
      this.transformWindow.figures.forEach(figure => figure.state.is_highlighted = false);
      const figure = this.transformWindow.getTransformFigureByXAndY(event.offsetX, event.offsetY);
      if (figure) {
        figure.state.is_highlighted = true;
      }
      return !!figure;
    }
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
      from.showMoves();
      const targets = this.board.cells.filter(c => c.state.is_movable);
      if (targets.length) {
        const to = targets[Math.floor(Math.random() * targets.length)];
        this.move(this.activePlayer, from, to);
        from.state.is_active = false;
      }
    }
  }

}
