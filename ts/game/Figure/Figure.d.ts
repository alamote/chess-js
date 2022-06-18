import { ColorEnum, FigureEnum } from '../interfaces';
import FigureMove from './FigureMove';
import { Game } from '../Game/Game';
import Cell from '../Board/Cell';
export default class Figure {
    color: ColorEnum;
    multiplier: number;
    figure: FigureEnum;
    image: string;
    moves: FigureMove[];
    isMoved: boolean;
    constructor(color: ColorEnum);
    setFigure(figure: FigureEnum): void;
    getMoves(game: Game, cell: Cell): FigureMove[];
    hasMoves(game: Game, cell: Cell): boolean;
    showMoves(game: Game, cell: Cell): void;
}
