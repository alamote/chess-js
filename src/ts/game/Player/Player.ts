import { ColorEnum } from '../interfaces';

export enum PlayerType {
  HUMAN = 'human',
  AI = 'ai',
}

export default class Player {

  color: ColorEnum;
  name: string;
  type!: PlayerType;
  me: boolean = false;

  constructor(name: string, color: ColorEnum, type: PlayerType = PlayerType.HUMAN, me: boolean = false) {
    this.name = name;
    this.color = color;
    this.type = type;
    this.me = me;
  }
}
