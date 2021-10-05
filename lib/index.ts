import { cent, major3rd, minor3rd, octave, perfect5th, semitone, wholeTone } from './theory/convention/twelveToneEqualTemperament/intervals';
import { TwelveTone } from './theory/convention/twelveToneEqualTemperament/system';
import { AbstractChord } from './theory/harmony/Chord';
import { AbstractScale } from './theory/harmony/Scale';

const print = (...xs: any[]) => console.log(...xs.map(x => `${x}`))

print('Twelve Tone Equal Temperament');

const twto = new TwelveTone();

print('Cent', cent);
print('Semitone', semitone);
print('Octave', octave);

print('Notes:');

const _ = twto.notes;


for (const note of Object.values(_)) {
  print(note);
}

print('Scales:');

const majorScale = AbstractScale.FromSystem(twto)(
  wholeTone,
  wholeTone,
  semitone,
  wholeTone,
  wholeTone,
  wholeTone,
  semitone
);
const minorScale = AbstractScale.FromSystem(twto)(
  wholeTone,
  semitone,
  wholeTone,
  wholeTone,
  semitone,
  wholeTone,
  wholeTone,
);

const C = majorScale.at(_.C4);

print('C scale', C);

print('Scale degrees:');

const Gsm = minorScale.at(_.Gs4);

for (let i = 1; i <= 7; i++) {
  print('Degree', i, 'of Gsm is', Gsm.degree(i)!);
}

print('Chords');

const majorChord = AbstractChord.FromSystem(twto)(
  major3rd,
  perfect5th
);
const minorChord = AbstractChord.FromSystem(twto)(
  minor3rd,
  perfect5th
);

print('The C major chord is', majorChord.at(_.C4));

print('Chord progressions:');
print('ii V I in F');

const F = majorScale.at(_.F4);
const progression = [
  minorChord.at(F.degree(2)!),
  majorChord.at(F.degree(5)!),
  majorChord.at(F.degree(1)!),
];
for (const chord of progression) {
  print(chord);
}

/*
print('TimeSignatures / Meter');
const fourFour = meter(4, 4);
const threeFour = meter(3, 5);
const meshuggahProbably = meter(17, 12);
*/
