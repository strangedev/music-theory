import { iScale, ivl } from '../../../signal/Interval';
import { u } from '../../../unit/UnitLess';
import { cIntervalsBetween, cIsInterval } from '../../harmony/Note';

const unison    = ivl   (1                  );
const semitone  = ivl   (1.059463           );
const cent      = iScale(semitone,  u(1e-2) );
const wholeTone = iScale(semitone,  u(2)    );
const octave    = iScale(semitone,  u(12)   );

const isCent      = cIsInterval(cent      );
const isSemitone  = cIsInterval(semitone  );
const isWholeTone = cIsInterval(wholeTone );
const isOctave    = cIsInterval(octave    );

const centsBetween      = cIntervalsBetween(cent      );
const semitonesBetween  = cIntervalsBetween(semitone  );
const wholeTonesBetween = cIntervalsBetween(wholeTone );
const octavesBetween    = cIntervalsBetween(octave    );

const minor2nd    = semitone;
const major2nd    = wholeTone;
const minor3rd    = iScale(semitone, u(3) );
const major3rd    = iScale(semitone, u(4) );
const perfect4th  = iScale(semitone, u(5) );
const tritone     = iScale(semitone, u(6) );
const perfect5th  = iScale(semitone, u(7) );
const minor6th    = iScale(semitone, u(8) );
const major6th    = iScale(semitone, u(9) );
const minor7th    = iScale(semitone, u(10));

export {
  unison,
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
  octavesBetween,

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
