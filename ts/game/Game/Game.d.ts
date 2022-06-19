import Player from '../Player/Player';
import { Log } from './Log';
import Cell from '../Board/Cell';
import Board from '../Board/Board';
import Figure from '../Figure/Figure';
export declare class Game {
    board: Board;
    isAuto: boolean;
    log: Log;
    players: Player[];
    activePlayer: Player;
    constructor();
    get me(): Player;
    get activeCell(): Cell | null;
    move(player: Player, from: Cell, to: Cell): void;
    changePlayer(): void;
    isOwn(player: Player, figure: Figure): boolean;
    onClick(event: MouseEvent): void;
    onMouseLeave(): void;
    onMouseMove(event: MouseEvent): boolean;
    autoMove(): void;
    autoGame(): void;
}
