import { ColorEnum } from '../interfaces';
import Figure from '../Figure/Figure';
import { Game } from '../Game/Game';
interface CellState {
    has_figure: boolean;
    is_highlighted: boolean;
    is_active: boolean;
    is_movable: boolean;
    has_moves: boolean;
    move_figure: string | null;
}
export default class Cell {
    game: Game;
    context: CanvasRenderingContext2D;
    size: number;
    color: ColorEnum;
    image: string;
    row: number;
    column: number;
    state: CellState;
    prevState: CellState;
    constructor(row: number, column: number, context: CanvasRenderingContext2D, game: Game);
    _figure: Figure | null;
    get figure(): Figure | null;
    set figure(figure: Figure | null);
    get x(): number;
    get y(): number;
    get cellColor(): string;
    get coordinates(): string;
    get rowToLetter(): string;
    getColorByRowAndColumn(row: number, column: number): ColorEnum;
    render(force?: boolean): void;
}
export {};
