import { interval } from '../../../signal/Interval';
import { s } from '../../../unit/Scalar';

const unison      = interval(1);
const semitone    = interval(1.059463);
const minor2nd    = semitone;
const wholeTone   = semitone.times(s(2));
const major2nd    = wholeTone;
const minor3rd    = semitone.times(s(3) );
const major3rd    = semitone.times(s(4) );
const perfect4th  = semitone.times(s(5) );
const tritone     = semitone.times(s(6) );
const perfect5th  = semitone.times(s(7) );
const minor6th    = semitone.times(s(8) );
const major6th    = semitone.times(s(9) );
const minor7th    = semitone.times(s(10));
const octave      = semitone.times(s(12));

const cent        = semitone.times(s(1e-2));

export {
  unison,
  cent,
  semitone,
  wholeTone,
  octave,
  minor2nd,
  major2nd,
  minor3rd,
  major3rd,
  perfect4th,
  tritone,
  perfect5th,
  minor6th,
  major6th,
  minor7th,
};
