import { ColorEnum } from '../interfaces';
import { Game } from '../Game/Game';
import Figure from '../Figure/Figure';
export default class TransformWindow {
    game: Game;
    figures: Figure[];
    constructor(game: Game, color: ColorEnum);
    getTransformFigureByXAndY(x: number, y: number): Figure | null;
    render(): void;
}
