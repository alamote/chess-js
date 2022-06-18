import Cell from './Cell';
import Figure from '../Figure/Figure';
import { Game } from '../Game/Game';
interface BoardState {
    size: number;
}
export default class Board {
    game: Game;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    initialized: boolean;
    size: number;
    cells: Cell[];
    figures: Figure[];
    state: BoardState;
    prevState: BoardState;
    constructor(game: Game);
    setBoardSize(): void;
    getCell(row: number, column: number): Cell;
    getCellByXAndY(x: number, y: number): Cell;
    reset(): void;
    render(force?: boolean): void;
    getState(): BoardState;
}
export {};
