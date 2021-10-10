import { Printable } from '../../../Printable';
import { Note } from '../Note';

interface IChord <TNoteName extends string = string> extends Printable {
  notes: Note<TNoteName>[];
}

export {
  IChord
};
