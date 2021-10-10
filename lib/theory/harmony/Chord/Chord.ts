import { Note } from '../Note';
import { IChord } from './IChord';

class Chord <TNoteName extends string>
  implements IChord <TNoteName>
{
  private _notes: Note<TNoteName>[];

  constructor (...notes: Note<TNoteName>[])
  {
    this._notes = notes;
  }

  get notes (): Note<TNoteName>[]
  {
    return this._notes;
  }

  public toString (): string
  {
    return `[${this._notes.join(' ')}]`;
  }
}

export {
  Chord
};
