import Figure from './Figure';
import { ColorEnum, FigureEnum } from '../interfaces';
import FigureMove from './FigureMove';

export default class King extends Figure {

  constructor(color: ColorEnum) {
    super(color);
    this.setFigure(FigureEnum.KING);

    this.moves = [
      new FigureMove(1, 1, ['isNotNearKing']),
      new FigureMove(1, 0, ['isNotNearKing']),
      new FigureMove(1, -1, ['isNotNearKing']),
      new FigureMove(0, 1, ['isNotNearKing']),
      new FigureMove(0, -1, ['isNotNearKing']),
      new FigureMove(-1, 1, ['isNotNearKing']),
      new FigureMove(-1, 0, ['isNotNearKing']),
      new FigureMove(-1, -1, ['isNotNearKing']),
    ];
  }
}
