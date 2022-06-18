import { ColorEnum } from '../interfaces';

export default class Player {

  color: ColorEnum;
  name: string;
  me: boolean = false;

  constructor(name: string, color: ColorEnum, me: boolean = false) {
    this.name = name;
    this.color = color;
    this.me = me;
  }
}
