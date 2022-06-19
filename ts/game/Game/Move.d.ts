import Cell from '../Board/Cell';
import Player from '../Player/Player';
import Figure from '../Figure/Figure';
export declare class Move {
    player: Player;
    figure: Figure;
    from: Cell;
    to: Cell;
    timestamp: number;
    prevFigure: Figure | null;
    constructor(player: Player, from: Cell, to: Cell);
    restore(): void;
    toString(): string;
}
