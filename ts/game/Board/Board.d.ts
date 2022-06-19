import { ColorEnum, FigureEnum } from '../interfaces';
import Cell from './Cell';
import { Game } from '../Game/Game';
interface BoardState {
    size: number;
}
export default class Board {
    game: Game;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    size: number;
    cells: Cell[];
    state: BoardState;
    prevState: BoardState;
    constructor(game: Game);
    get transformCell(): Cell | null;
    setBoardSize(): void;
    getCell(row: number, column: number): Cell;
    getCellByXAndY(x: number, y: number): Cell;
    getCellsByColor(color: ColorEnum): Cell[];
    getCellByFigureAndColor(figure: FigureEnum, color: ColorEnum): Cell;
    processCheck(): void;
    reset(): void;
    render(force?: boolean): void;
}
export {};
