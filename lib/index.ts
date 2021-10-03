import { cent, major3rd, minor3rd, octave, perfect5th, semitone, wholeTone } from './theory/convention/twelveToneEqualTemperament/intervals';
import { twelveTone } from './theory/convention/twelveToneEqualTemperament/system';
import { construct } from './theory/harmony/Chord';
import { AbstractScale, actualize } from './theory/harmony/Scale';

console.log('Twelve Tone Equal Temperament');

const { notes, print, chord } = twelveTone();

console.log('Cent', cent);
console.log('Semitone', semitone);
console.log('Octave', octave);

console.log('Notes:');

for (const note of Object.values(notes)) {
  console.log(print(note));
}

console.log('Scales:')
const MajorScale: AbstractScale = {
  steps: [
    wholeTone,
    wholeTone,
    semitone,
    wholeTone,
    wholeTone,
    wholeTone,
    semitone
  ]
};
const MinorScale: AbstractScale = {
  steps: [
    wholeTone,
    semitone,
    wholeTone,
    wholeTone,
    semitone,
    wholeTone,
    wholeTone,
  ]
};

const C = actualize(MajorScale, notes.C4, {});
console.log('C scale', C.notes.map(print));

console.log('Scale degrees:');
const Gsm = actualize(MinorScale, notes.Gs4, {});
for (let i = 1; i <= 7; i++) {
  console.log('Degree', i, 'of Gsm is', print(Gsm.degree(i)!));
}

console.log('Chords');
const majorChord = chord(
  major3rd,
  perfect5th
);
const minorChord = chord(
  minor3rd,
  perfect5th
);

console.log('The C major chord is', construct(majorChord, notes.C4).notes.map(print));

console.log('Chord progressions:');
const F = actualize(MajorScale, notes.F4, {});
const progression = [
  construct(minorChord, F.degree(2)!),
  construct(majorChord, F.degree(5)!),
  construct(majorChord, F.degree(1)!),
];
console.log('ii V I in F');
for (const _chord of progression) {
  console.log(_chord.toString());
}