import { fShiftBy } from '../../signal/Frequency';
import { Interval } from '../../signal/Interval';
import { Note } from './Note';
import { System } from './System';

interface AbstractChord <TNoteName extends string> {
  intervals: Interval[];
  system:  Pick<System<TNoteName>, 'identify'>;
}

interface Chord <TNoteName extends string> extends AbstractChord <TNoteName> {
  notes: Note[];
  toString: () => string;
}

const cChord = function <TNoteName extends string>
  (system: Pick<System<TNoteName>, 'identify'>):
  (...intervals: Interval[]) => AbstractChord<TNoteName>
{
  return (...intervals) => ({
    system,
    intervals
  });
};

const construct = function <TNoteName extends string>
  (abstract: AbstractChord<TNoteName>, root: Note):
  Chord<TNoteName>
{
  const notes = [ root ];

  for (const interval of abstract.intervals) {
    notes.push(fShiftBy(root, interval));
  }

  return {
    ...abstract,
    notes,
    toString: () => `${notes.map(abstract.system.identify)}`
  };
};

export type {
  AbstractChord,
  Chord
};
export {
  cChord,
  construct
};
