import { Printable } from '../../../Printable';
import { Note } from '../Note';
import { ScaleDegree } from './ScaleDegree';

/**
 * The IScale interface describes a musical scale.
 * A scale is a sequence of notes starting from the root note.
 * Couting from the root note as 1, each note in the scale 
 * is numbered by their scale degree.
 * Scales can be traversed forwards (up in pitch) or backwards (down in pitch),
 * with negative scale degrees representing a backwards traversal
 * of the scale.
 * Note that not all scales are symmetrical, like the melodic minor scale.
 * The notes associated with a certain degree may therefore change
 * depending on the direction of the traversal.
 */
interface IScale <TNoteName extends string> extends Printable {
  root: Note<TNoteName>;
  /**
   * Walk starts a traversal of the scale.
   * The stride dictates the direction of the traversal and the
   * number of scale degrees between the notes in the resulting sequence.
   */
  walk: (stride: ScaleDegree, start?: ScaleDegree) => Generator<Note<TNoteName>>;
  degree: (n: ScaleDegree) => Note<TNoteName>;
}

export {
  IScale
};
