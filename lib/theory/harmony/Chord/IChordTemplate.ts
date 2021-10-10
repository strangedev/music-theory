import { Printable } from '../../../Printable';
import { Note } from '../Note';
import { IChord } from './IChord';

interface IChordTemplate <TNoteName extends string, TOptions extends object | undefined> extends Printable {
  construct: (root: Note<TNoteName>, options?: TOptions) => IChord<TNoteName>;
}

export {
  IChordTemplate
};
