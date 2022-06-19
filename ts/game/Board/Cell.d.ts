import { ColorEnum } from '../interfaces';
import Figure from '../Figure/Figure';
import { Game } from '../Game/Game';
import FigureMove from '../Figure/FigureMove';
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
    color: ColorEnum;
    image: HTMLImageElement;
    row: number;
    column: number;
    state: CellState;
    constructor(row: number, column: number, context: CanvasRenderingContext2D, game: Game);
    _figure: Figure | null;
    get figure(): Figure | null;
    set figure(figure: Figure | null);
    get x(): number;
    get y(): number;
    get cellColor(): string;
    get coordinates(): string;
    get rowToLetter(): string;
    get isChecked(): boolean;
    get getMoves(): FigureMove[];
    get hasMoves(): boolean;
    get getCheckMove(): FigureMove | null;
    getColorByRowAndColumn(row: number, column: number): ColorEnum;
    showMoves(): void;
    render(): void;
}
export {};
