import { ColorEnum } from '../interfaces';
export default class Player {
    color: ColorEnum;
    name: string;
    me: boolean;
    constructor(name: string, color: ColorEnum, me?: boolean);
}
