import { Game } from '../Game/Game';
import Cell from '../Board/Cell';
export default class FigureMove {
    multiplier: number;
    row: number;
    column: number;
    conditions: string[];
    conditionCallbacks: {
        [name: string]: (game: Game, cell: Cell) => boolean;
    };
    constructor(row: number, column: number, conditions?: string[], defaults?: boolean);
    getTarget(game: Game, cell: Cell): Cell | null;
    isValid(game: Game, cell: Cell): boolean;
}