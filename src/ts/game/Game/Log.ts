import { Move } from './Move';

export class Log {

  moves: Move[] = [];

  add(move: Move) {
    this.moves.push(move);
    console.log(move.toString());
  }

  getMoves(): string[] {
    return this.moves.map(move => move.toString());
  }
}
