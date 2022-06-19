import { Game } from '../Game/Game';
import Cell from '../Board/Cell';
import { ColorEnum, FigureEnum } from '../interfaces';
import King from './King';
import { Move } from '../Game/Move';

export default class FigureMove {

  row: number;
  column: number;
  conditions: string[] = []
  conditionCallbacks: { [name: string]: (game: Game, cell: Cell) => boolean } = {
    isBlack: (game: Game, cell: Cell) => cell?.figure?.color === ColorEnum.BLACK,
    isWhite: (game: Game, cell: Cell) => cell?.figure?.color === ColorEnum.WHITE,
    isNotOwn: (game: Game, cell: Cell) => !this.getTarget(game, cell)?.figure || cell.figure?.color !== (this.getTarget(game, cell) as Cell)?.figure?.color,
    isEnemy: (game: Game, cell: Cell) => !!this.getTarget(game, cell)?.figure && cell.figure?.color !== (this.getTarget(game, cell) as Cell)?.figure?.color,
    isEmpty: (game: Game, cell: Cell) => !this.getTarget(game, cell)?.figure,
    isNotEmpty: (game: Game, cell: Cell) => !!this.getTarget(game, cell)?.figure,
    isMoved: (game: Game, cell: Cell) => !!cell?.figure?.isMoved,
    isNotMoved: (game: Game, cell: Cell) => !cell?.figure?.isMoved,
    isCellExists: (game: Game, cell: Cell) => !!this.getTarget(game, cell),
    isVerticalPathEmpty: (game: Game, cell: Cell) => Array(Math.abs(this.row) - 1).fill(0).every((_, i) => !game.board.getCell(cell.row + (i + 1) * (this.row > 0 ? 1 : -1), cell.column)?.figure),
    isHorizontalPathEmpty: (game: Game, cell: Cell) => Array(Math.abs(this.column) - 1).fill(0).every((_, i) => !game.board.getCell(cell.row, cell.column + (i + 1) * (this.column > 0 ? 1 : -1))?.figure),
    isDiagonalPathEmpty: (game: Game, cell: Cell) => Array(Math.abs(this.row) - 1).fill(0).every((_, i) => !game.board.getCell(cell.row + (i + 1) * (this.row > 0 ? 1 : -1), cell.column + (i + 1) * (this.column > 0 ? 1 : -1))?.figure),
    isKing: (game: Game, cell: Cell) => this.getTarget(game, cell)?.figure instanceof King,
    isNotKing: (game: Game, cell: Cell) => !(this.getTarget(game, cell)?.figure instanceof King),
    isNotNearKing: (game: Game, cell: Cell) => {
      const target = this.getTarget(game, cell);
      if (!target) {
        return false;
      }
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const figure = game.board.getCell(target.row + i, target.column + j)?.figure;
          if (figure instanceof King && figure.color !== cell.figure?.color) {
            return false;
          }
        }
      }
      return true;
    },
  }

  constructor(row: number, column: number, conditions: string[] = [], defaults: boolean = true) {
    this.row = row;
    this.column = column;
    this.conditions = conditions;
    if (defaults) {
      if (!this.conditions.includes('isCellExists')) {
        this.conditions.push('isCellExists');
      }
      if (!this.conditions.includes('isNotOwn')) {
        this.conditions.push('isNotOwn');
      }
      if (!this.conditions.includes('isNotKing')) {
        this.conditions.push('isNotKing');
      }
    }
  }

  getTarget(game: Game, cell: Cell): Cell | null {
    return game.board.getCell(cell.row + this.row, cell.column + this.column);
  }

  isValid(game: Game, cell: Cell): boolean {
    return this.conditions.every(condition => this.conditionCallbacks[condition](game, cell)) && this.isPreventsCheck(game, cell);
  }

  isPreventsCheck(game: Game, cell: Cell): boolean {
    if (!this.getTarget(game, cell)) {
      return true;
    }
    let isValid = true;
    const move = new Move(game.activePlayer, cell, this.getTarget(game, cell) as Cell);
    const king = game.board.getCellByFigureAndColor(FigureEnum.KING, game.activePlayer.color);
    if (king.isChecked) {
      isValid = false;
    }
    move.restore();

    return isValid;
  }

  isCheckMove(game: Game, cell: Cell): boolean {
    const target = this.getTarget(game, cell);
    if (!target) {
      return false;
    }
    if (!this.conditions.filter(c => !['isNotKing', 'isNotOwn'].includes(c)).every(condition => this.conditionCallbacks[condition](game, cell))) {
      return false;
    }
    return target.figure instanceof King && target.figure.color !== cell.figure?.color;
  }

}
