import { Interval } from '../../../signal/Interval';
import { Note } from '../Note';
import { ScaleDegree } from './ScaleDegree';

/**
 * The IScaleWalker interface describes an iterator object that walks up or
 * down a musical scale. At any given time, the IScaleWalker resides at one of
 * the scale's notes. The note represents a scale degree, with the root note
 * being degree 1.
 * A scale walker may step through the scale by a positive or negative number
 * of degrees, where positive means ascending in pitch and negative means
 * decending in pitch.
 */
interface IScaleWalker <TNoteName extends string> {
  note: Note<TNoteName>;
  degree: ScaleDegree;
  step: (degrees: ScaleDegree) => IScaleWalker<TNoteName>;
}

/**
 * The IScaleWalkerImplementation tells a ScaleWalker how to transition from
 * one scale degree to another.
 */
type IScaleWalkerImplementation = (fromDegree: ScaleDegree, toDegree: ScaleDegree) => Interval;

export {
  IScaleWalker,
  IScaleWalkerImplementation
};
