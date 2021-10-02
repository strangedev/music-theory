import { cent, octave, semitone, wholeTone } from './theory/convention/twelveToneEqualTemperament/intervals';
import { twelveTone } from './theory/convention/twelveToneEqualTemperament/system';
import { AbstractScale, actualize } from './theory/harmony/Scale';
import { sPrint } from './unit/Scalar';

console.log('Twelve Tone Equal Temperament');

const { notes, print } = twelveTone();

console.log(sPrint(cent));
console.log(sPrint(semitone));
console.log(sPrint(octave));


for (const note of Object.values(notes)) {
  console.log(print(note));
}

const MajorScale: AbstractScale = {
  steps: [
    wholeTone,
    wholeTone,
    semitone,
    wholeTone,
    wholeTone,
    semitone
  ]
};

const CmajScale = actualize(MajorScale, notes.C4, {});
console.log('Cmaj Scale', CmajScale.notes.map(print));