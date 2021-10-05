import { Chord } from '../harmony/Chord';
import { Note } from '../harmony/Note';
import { Beat } from './Beat';
import { TimeSignature } from './TImeSignature';

interface Position {
  beat: Beat;
  notes: (Note|Chord)[]
}

interface Bar {
  meter: TimeSignature;
  positions: Position[]
}

export type {
  Bar,
  Position
}