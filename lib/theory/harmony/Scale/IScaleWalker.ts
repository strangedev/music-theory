import { Interval } from '../../../signal/Interval';
import { Note } from '../Note';
import { ScaleDegree } from './ScaleDegree';

interface IScaleWalker <TNoteName extends string> {
  note: Note<TNoteName>;
  degree: ScaleDegree;
  step: (degrees: ScaleDegree) => IScaleWalker<TNoteName>;
}

type IScaleWalkerImplementation = (fromDegree: ScaleDegree, toDegree: ScaleDegree) => Interval;

export {
  IScaleWalker,
  IScaleWalkerImplementation
};
