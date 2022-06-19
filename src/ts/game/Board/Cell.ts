import { ColorEnum, OppositeColor } from '../interfaces';
import { GameConfig } from '../config';
import Figure from '../Figure/Figure';
import { CanvasUtility } from '../utils/canvas.utility';
import { GameUtility } from '../utils/game.utility';
import { Game } from '../Game/Game';
import FigureMove from '../Figure/FigureMove';
import { PlayerType } from '../Player/Player';

interface CellState {
  has_figure: boolean;
  is_highlighted: boolean;
  is_active: boolean;
  is_movable: boolean;
  is_checked: boolean;
  has_moves: boolean;
  move_figure: HTMLImageElement | null;
}

export default class Cell {

  game: Game;
  context: CanvasRenderingContext2D;

  size: number;
  color!: ColorEnum;
  image!: HTMLImageElement;

  row: number;
  column: number;
  state: CellState = {
    has_figure: true,
    is_highlighted: false,
    is_active: false,
    is_movable: false,
    is_checked: false,
    has_moves: false,
    move_figure: null,
  };

  constructor(row: number, column: number, context: CanvasRenderingContext2D, game: Game) {
    this.color = this.getColorByRowAndColumn(row, column);
    this.row = row;
    this.column = column;
    this.size = GameUtility.cellSize();
    this.context = context;
    this.game = game;
    this.image = new Image(this.size, this.size);
    this.image.src = `assets/images/cell_bg_${Math.floor(Math.random() * 8) + 1}.png`;
  }

  _figure!: Figure | null;

  get figure(): Figure | null {
    return this._figure;
  }

  set figure(figure: Figure | null) {
    this._figure = figure;
    this.state.has_figure = !!figure;
  }

  get x(): number {
    return this.size * this.column + GameConfig.border_width * this.column + GameConfig.border_width + GameConfig.board.padding;
  }

  get y(): number {
    return this.size * Math.abs(this.row - 7) + GameConfig.border_width * Math.abs(this.row - 7) + GameConfig.border_width + GameConfig.board.padding;
  }

  get cellColor(): string {
    if (this.state.is_highlighted) {
      return this.color === ColorEnum.BLACK ? GameConfig.colors.black_hover : GameConfig.colors.white_hover;
    }
    if (this.state.is_checked) {
      return GameConfig.colors.move_attack;
    }
    if (this.state.is_active) {
      return GameConfig.colors.move;
    }
    return this.color === ColorEnum.BLACK ? GameConfig.colors.black : GameConfig.colors.white;
  }

  get coordinates(): string {
    return `${this.rowToLetter}${this.column + 1}`;
  }

  get rowToLetter(): string {
    return String.fromCharCode(65 + this.row);
  }

  get isChecked(): boolean {
    if (!this.figure) {
      return false;
    }
    const enemyCells = this.game.board.getCellsByColor(OppositeColor[this.figure.color]);
    return enemyCells.some(enemyCell => {
      const move = enemyCell.getCheckMove;
      if (move) {
        const target = this.game.board.getCell(enemyCell.row + move.row, enemyCell.column + move.column);
        return target?.row === this.row && target?.column === this.column;
      }
      return false;
    });
  }

  get getMoves(): FigureMove[] {
    return this.figure?.moves.filter(move => move.isValid(this.game, this)) ?? [];
  }

  get hasMoves() {
    return !!this.getMoves.length;
  }

  get getCheckMove(): FigureMove | null {
    return this.figure?.moves.find(move => move.isCheckMove(this.game, this)) ?? null;
  }

  getColorByRowAndColumn(row: number, column: number): ColorEnum {
    return ((row + 1) % 2 && (column + 1) % 2) || (!((row + 1) % 2) && !((column + 1) % 2)) ? ColorEnum.BLACK : ColorEnum.WHITE;
  }

  showMoves() {
    this.getMoves.forEach(move => {
      const target = this.game.board.getCell(this.row + move.row, this.column + move.column);
      if (target) {
        target.state.is_movable = true;
        target.state.move_figure = this.figure?.image ?? null;
      }
    });
  }

  render() {
    CanvasUtility.rect(this.context, this.x, this.y, this.size, this.size, {
      fill: true,
      fill_color: this.cellColor,
      stroke: true,
      line_color: GameConfig.colors.border,
      line_width: GameConfig.border_width,
    });
    CanvasUtility.preloadedImage(this.context, this.x, this.y, this.size, this.size, this.image);
    if (this.figure?.image) {
      CanvasUtility.preloadedImage(this.context, this.x, this.y, this.size, this.size, this.figure.image);
      if (this.state.is_movable) {
        CanvasUtility.circle(this.context, this.x + this.size / 2, this.y + this.size / 2, this.size / 4, {
          fill: true,
          fill_color: GameConfig.colors.move_attack,
        });
        if (this.state.move_figure) {
          CanvasUtility.preloadedImage(this.context, this.x + this.size / 3, this.y + this.size / 3, this.size / 3, this.size / 3, this.state.move_figure);
        }
      }
    }
    if (!this.game.board.transformCell) {
      if (this.state.is_movable && !this.figure) {
        CanvasUtility.circle(this.context, this.x + this.size / 2, this.y + this.size / 2, this.size / 4, {
          fill: true,
          fill_color: GameConfig.colors.move,
        });
        if (this.state.move_figure) {
          CanvasUtility.preloadedImage(this.context, this.x + this.size / 3, this.y + this.size / 3, this.size / 3, this.size / 3, this.state.move_figure);
        }
      }
      if (this.game.activePlayer.type === PlayerType.HUMAN && this.state.has_moves) {
        CanvasUtility.rect(this.context, this.x, this.y + this.size - this.size / 20, this.size, this.size / 20, {
          fill: true,
          fill_color: GameConfig.colors.move,
        });
      }
    }
  }

}
