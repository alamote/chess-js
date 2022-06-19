import Player from '../Player/Player';
import { Log } from './Log';
import Cell from '../Board/Cell';
import Board from '../Board/Board';
import TransformWindow from '../Board/TransformWindow';
export declare class Game {
    board: Board;
    transformWindow: TransformWindow | null;
    log: Log;
    players: Player[];
    activePlayer: Player;
    constructor();
    get me(): Player;
    get activeCell(): Cell | null;
    get oppositePlayer(): Player;
    hasMoves(): boolean;
    move(player: Player, from: Cell, to: Cell): void;
    updateBoard(): void;
    changePlayer(): void;
    onClick(event: MouseEvent): void;
    onMouseLeave(): void;
    onMouseMove(event: MouseEvent): boolean;
    autoMove(): void;
}
