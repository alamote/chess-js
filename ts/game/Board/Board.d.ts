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
    setBoardSize(): void;
    getCell(row: number, column: number): Cell;
    getCellByXAndY(x: number, y: number): Cell;
    reset(): void;
    render(force?: boolean): void;
    getState(): BoardState;
}
export {};
