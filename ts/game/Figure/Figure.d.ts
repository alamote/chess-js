import { ColorEnum, FigureEnum } from '../interfaces';
import FigureMove from './FigureMove';
export interface FigureState {
    is_highlighted: boolean;
}
export default class Figure {
    color: ColorEnum;
    multiplier: number;
    figure: FigureEnum;
    image: HTMLImageElement;
    state: FigureState;
    moves: FigureMove[];
    isMoved: boolean;
    constructor(color: ColorEnum);
    setFigure(figure: FigureEnum): void;
}
