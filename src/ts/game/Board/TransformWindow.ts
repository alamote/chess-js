import { GameConfig } from '../config';
import { ColorEnum } from '../interfaces';
import { CanvasUtility } from '../utils/canvas.utility';
import { GameUtility } from '../utils/game.utility';
import { Game } from '../Game/Game';
import Pawn from '../Figure/Pawn';
import Bishop from '../Figure/Bishop';
import Queen from '../Figure/Queen';
import Knight from '../Figure/Knight';
import Rook from '../Figure/Rook';
import Figure from '../Figure/Figure';

export default class TransformWindow {

  game: Game;
  figures: Figure[] = [];

  constructor(game: Game, color: ColorEnum) {
    this.game = game;

    this.figures = [
      new Pawn(color),
      new Rook(color),
      new Knight(color),
      new Bishop(color),
      new Queen(color),
    ];
  }

  getTransformFigureByXAndY(x: number, y: number): Figure | null {
    const height = GameUtility.cellSize() + GameConfig.board.padding * 2;
    const width = GameUtility.cellSize() * this.figures.length + GameConfig.board.padding;
    return this.figures.find((figure, index) => {
      const figureX = GameUtility.boardSize() / 2 - width / 2 + GameUtility.cellSize() * index + GameConfig.board.padding / 2;
      const figureY = GameUtility.boardSize() / 2 - height / 2 + GameConfig.board.padding * 1.5;
      return x >= figureX && x <= (figureX + GameUtility.cellSize()) && y >= figureY && y <= (figureY + GameUtility.cellSize());
    }) ?? null;
  }

  render() {
    const height = GameUtility.cellSize() + GameConfig.board.padding * 2;
    const width = GameUtility.cellSize() * this.figures.length + GameConfig.board.padding;
    CanvasUtility.roundedRect(this.game.board.context, GameUtility.boardSize() / 2 - width / 2, GameUtility.boardSize() / 2 - height / 2, width, height, 6, {
      stroke: true,
      line_color: GameConfig.colors.border,
      line_width: GameConfig.border_width,
      fill: true,
      fill_color: GameConfig.colors.white
    });
    CanvasUtility.text(this.game.board.context, 'Select new figure:', GameUtility.boardSize() / 2, GameUtility.boardSize() / 2 - height / 2 + GameConfig.board.padding, {
      line_width: 2,
      text_align: 'center',
      text_valign: 'middle',
      font: `bold ${GameUtility.cellSize() / 6}px Poppins`,
      line_color: GameConfig.colors.black,
      fill: true
    });
    this.figures.forEach((figure, index) => {
      const x = GameUtility.boardSize() / 2 - width / 2 + GameUtility.cellSize() * index + GameConfig.board.padding / 2;
      const y = GameUtility.boardSize() / 2 - height / 2 + GameConfig.board.padding * 1.5;
      CanvasUtility.preloadedImage(this.game.board.context, x, y, GameUtility.cellSize(), GameUtility.cellSize(), figure.image);
      if (figure.state.is_highlighted) {
        CanvasUtility.roundedRect(this.game.board.context, x, y, GameUtility.cellSize(), GameUtility.cellSize(), 6, {
          stroke: true,
          line_color: GameConfig.colors.border,
          line_width: GameConfig.border_width,
        });
      }
    });
  }
}
