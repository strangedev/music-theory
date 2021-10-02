import { iScale, ivl } from '../../../signal/Interval';
import { u } from '../../../unit/UnitLess';
import { cIntervalsBetween, cIsInterval } from '../../harmony/Note';

const semitone  = ivl   (1.059463           );
const cent      = iScale(semitone,  u(1e-2) );
const wholeTone = iScale(semitone,  u(2)    );
const octave    = iScale(semitone,  u(12)   );

const isCent      = cIsInterval(cent);
const isSemitone  = cIsInterval(semitone);
const isWholeTone = cIsInterval(wholeTone);
const isOctave    = cIsInterval(octave);

const centsBetween      = cIntervalsBetween(cent);
const semitonesBetween  = cIntervalsBetween(semitone);
const wholeTonesBetween = cIntervalsBetween(wholeTone);
const octavesBetween    = cIntervalsBetween(octave);

export {
  cent,
  semitone,
  wholeTone,
  octave,
  isCent,
  isSemitone,
  isWholeTone,
  isOctave,
  centsBetween,
  semitonesBetween,
  wholeTonesBetween,
  octavesBetween
};
