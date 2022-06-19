import { GameConfig } from '../config';
import { ColorEnum, FigureEnum } from '../interfaces';
import Cell from './Cell';
import King from '../Figure/King';
import { CanvasUtility, DrawOptions } from '../utils/canvas.utility';
import { GameUtility } from '../utils/game.utility';
import { Game } from '../Game/Game';
import { PlayerType } from '../Player/Player';
import Pawn from '../Figure/Pawn';
import Bishop from '../Figure/Bishop';
import Queen from '../Figure/Queen';
import Knight from '../Figure/Knight';
import Rook from '../Figure/Rook';

interface BoardState {
  size: number;
}

export default class Board {

  game: Game;

  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

  size!: number;
  cells: Cell[] = [];

  state: BoardState = {
    size: GameUtility.boardSize(),
  };
  prevState!: BoardState;

  constructor(game: Game) {
    this.game = game;
    this.canvas = document.querySelector('canvas.board') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        this.cells.push(new Cell(row, column, this.context, game));
      }
    }
  }

  get transformCell(): Cell | null {
    const rows: { [name: string]: number } = {
      [ColorEnum.WHITE]: 7,
      [ColorEnum.BLACK]: 0,
    }
    return this.cells.find(c => c.figure && c.figure instanceof Pawn && c.row === rows[c.figure.color]) ?? null;
  }

  setBoardSize() {
    if (this.size !== GameUtility.boardSize()) {
      this.size = GameUtility.boardSize();
      this.state.size = this.size;
      this.cells.forEach(cell => cell.size = GameUtility.cellSize());
      if (this.canvas) {
        this.canvas.width = this.size;
        this.canvas.height = this.size;
      }
    }
  }

  getCell(row: number, column: number): Cell {
    return this.cells.find(cell => cell.row === row && cell.column === column) as Cell;
  }

  getCellByXAndY(x: number, y: number): Cell {
    return this.cells.find(cell => x >= cell.x && x <= (cell.x + cell.size) && y >= cell.y && y <= (cell.y + cell.size)) as Cell;
  }

  getCellsByColor(color: ColorEnum): Cell[] {
    return this.cells.filter(cell => cell.figure && cell.figure.color === color);
  }

  getCellByFigureAndColor(figure: FigureEnum, color: ColorEnum): Cell {
    return this.cells.find(cell => cell.figure && cell.figure.figure === figure && cell.figure.color === color) as Cell;
  }

  processCheck() {
    Object.values(ColorEnum).forEach(color => {
      const kingCell = this.getCellByFigureAndColor(FigureEnum.KING, color);
      kingCell.state.is_checked = kingCell.isChecked;
    });
  }

  reset() {
    this.setBoardSize();
    this.cells.forEach(cell => cell.figure = null);
    [0, 7].forEach(row => {
      const color = !row ? ColorEnum.WHITE : ColorEnum.BLACK;
      this.getCell(row, 0).figure = new Rook(color);
      this.getCell(row, 1).figure = new Knight(color);
      this.getCell(row, 2).figure = new Bishop(color);
      this.getCell(row, 3).figure = new Queen(color);
      this.getCell(row, 4).figure = new King(color);
      this.getCell(row, 5).figure = new Bishop(color);
      this.getCell(row, 6).figure = new Knight(color);
      this.getCell(row, 7).figure = new Rook(color);
    });
    [1, 6].forEach(row => {
      for (let column = 0; column < 8; column++) {
        this.getCell(row, column).figure = new Pawn(row === 1 ? ColorEnum.WHITE : ColorEnum.BLACK);
      }
    });

    this.cells.forEach(cell => cell.state.has_moves = this.game.activePlayer.color === cell.figure?.color && cell?.hasMoves);
    this.processCheck();
    if (this.game.activePlayer.type === PlayerType.AI) {
      setTimeout(() => this.game.autoMove(), 100);
    }

    requestAnimationFrame(() => this.render());
  }

  render(force: boolean = false) {
    const textOptions: DrawOptions = {
      line_width: 2,
      text_align: 'center',
      text_valign: 'middle',
      font: '18px Arial',
      line_color: GameConfig.colors.white,
    };
    if (force || !this.prevState || JSON.stringify(this.state) !== JSON.stringify(this.prevState)) {
      this.prevState = {...this.state};
      CanvasUtility.rect(this.context, GameConfig.border_width / 2, GameConfig.border_width / 2, this.size - GameConfig.border_width, this.size - GameConfig.border_width, {
        stroke: true,
        line_color: GameConfig.colors.border,
        line_width: GameConfig.border_width,
        fill: true,
        fill_color: GameConfig.colors.black
      });

      const cellSize = this.cells[0].size;
      for (let row = 1; row <= 8; row++) {
        CanvasUtility.text(this.context, row.toString(), (row - 1) * cellSize + cellSize / 2 + GameConfig.board.padding + GameConfig.border_width * 1.15 * (row - 1) + 3, GameConfig.board.padding / 2 + 2, textOptions);
        CanvasUtility.text(this.context, row.toString(), (row - 1) * cellSize + cellSize / 2 + GameConfig.board.padding + GameConfig.border_width * 1.15 * (row - 1) + 3, this.size - GameConfig.board.padding / 2 - 2, textOptions);
        CanvasUtility.text(this.context, String.fromCharCode(64 + row), GameConfig.board.padding / 2, Math.abs(row - 8) * cellSize + cellSize / 2 + GameConfig.board.padding + GameConfig.border_width * 1.3 * Math.abs(row - 8), textOptions);
        CanvasUtility.text(this.context, String.fromCharCode(64 + row), this.size - GameConfig.board.padding / 2, Math.abs(row - 8) * cellSize + cellSize / 2 + GameConfig.board.padding + GameConfig.border_width * 1.3 * Math.abs(row - 8), textOptions);
      }
    }
    this.cells.forEach(cell => cell.render());

    if (this.transformCell) {
      const height = GameUtility.cellSize() + 32;
      const width = GameUtility.cellSize() * 5;
      CanvasUtility.rect(this.context, this.size / 2 - width / 2, this.size / 2 - height / 2, width, height, {
        stroke: true,
        line_color: GameConfig.colors.border,
        line_width: GameConfig.border_width,
        fill: true,
        fill_color: GameConfig.colors.white
      });
      CanvasUtility.text(this.context, 'Select new figure:', this.size / 2, this.size / 2 - height / 2 + 16, {
        line_width: 2,
        text_align: 'center',
        text_valign: 'middle',
        font: `bold 16px Poppins`,
        line_color: GameConfig.colors.black,
        fill: true
      });
      const color = this.transformCell.figure?.color ?? ColorEnum.WHITE;
      const figures = [
        new Pawn(color),
        new Rook(color),
        new Knight(color),
        new Bishop(color),
        new Queen(color),
      ];
      figures.forEach((figure, index) => {
        const x = this.size / 2 - width / 2 + GameUtility.cellSize() * index;
        const y = this.size / 2 - height / 2 + 24;
        CanvasUtility.preloadedImage(this.context, x, y, GameUtility.cellSize(), GameUtility.cellSize(), figure.image);
      });
    }

    if (!this.game.hasMoves()) {
      const options: DrawOptions = {
        line_width: 5,
        text_align: 'center',
        text_valign: 'middle',
        font: `bold ${this.size / 10}px Poppins`,
        line_color: GameConfig.colors.black,
        fill_color: GameConfig.colors.black,
        shadow_color: GameConfig.colors.white,
        shadow_blur: 20,
        fill: true
      }
      CanvasUtility.text(this.context, 'Game over!', this.size / 2, this.size / 2 - this.size / 15, options)
      CanvasUtility.text(this.context, this.cells.find(c => c.isChecked) ? `${this.game.oppositePlayer.name} won :)` : 'Stalemate :(', this.size / 2, this.size / 2 + this.size / 15, options)
    }

    if (this.game.transformWindow) {
      this.game.transformWindow.render();
    }

    requestAnimationFrame(() => this.render());
  }

}
