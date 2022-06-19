import { ColorEnum, FigureEnum } from '../interfaces';
import FigureMove from './FigureMove';
import { GameUtility } from '../utils/game.utility';

export interface FigureState {
  is_highlighted: boolean;
}

export default class Figure {

  color: ColorEnum;
  multiplier: number = 1;
  figure!: FigureEnum;
  image!: HTMLImageElement;
  state: FigureState = {
    is_highlighted: false
  };

  moves: FigureMove[] = [];
  isMoved: boolean = false;

  constructor(color: ColorEnum) {
    this.color = color;
    this.multiplier = color === ColorEnum.WHITE ? 1 : -1;
  }

  setFigure(figure: FigureEnum) {
    this.figure = figure;
    this.image = new Image(GameUtility.cellSize(), GameUtility.cellSize());
    this.image.src = `assets/icons/figures/${this.color}/${this.figure.toLowerCase()}.svg`;
  }

}
