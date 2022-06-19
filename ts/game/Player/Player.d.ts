import { ColorEnum } from '../interfaces';
export declare enum PlayerType {
    HUMAN = "human",
    AI = "ai"
}
export default class Player {
    color: ColorEnum;
    name: string;
    type: PlayerType;
    me: boolean;
    constructor(name: string, color: ColorEnum, type?: PlayerType, me?: boolean);
}
