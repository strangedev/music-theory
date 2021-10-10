import { cent, major3rd, octave, perfect5th, semitone, wholeTone } from './theory/convention/twelveToneEqualTemperament/intervals';
import { TwelveTone } from './theory/convention/twelveToneEqualTemperament/system';
import { ScaleBasedChordTemplate } from './theory/harmony/Chord/templates/ScaleBasedChordTemplate';
import { SymmetricScaleTemplate } from './theory/harmony/Scale/templates/symmetric/SymmetricScaleTemplate';
import { Chord } from './theory/harmony/Chord/Chord';
import { IntervalBasedChordTemplate } from './theory/harmony/Chord/templates/IntervalBasedChordTemplate';
import { IChord } from './theory/harmony/Chord/IChord';


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

const majorScale = new SymmetricScaleTemplate(
  wholeTone,
  wholeTone,
  semitone,
  wholeTone,
  wholeTone,
  wholeTone,
  semitone
);
const minorScale = new SymmetricScaleTemplate(
  wholeTone,
  semitone,
  wholeTone,
  wholeTone,
  semitone,
  wholeTone,
  wholeTone,
);

const C = majorScale.construct(_.C4);

print('C scale', C);

print('Scale degrees:');

const F = majorScale.construct(_.F4);

for (let i = 1; i <= 7; i++) {
  print('Degree', i, 'of F is', F.degree(i)!);
}

print('Chords');

// Chords can be constructed from notes directly:
let cMajorChord: IChord = new Chord(_.C4, _.E4, _.G4);

// Chords can also be defined more abstractly.
// We can characterize a chord by the intervals of each note to the root:
const majorChord = new IntervalBasedChordTemplate(major3rd, perfect5th);
cMajorChord = majorChord.construct(_.C4);
print('majorChord', majorChord, 'at', _.C4, 'is', cMajorChord);

// We can also construct the chord by taking degrees from a scale:
// Note that the root is implied.
const minorChord = new ScaleBasedChordTemplate(minorScale, 3, 5);
const cMinorChord = minorChord.construct(_.C4);
print('minorChord', minorChord, 'at', _.C4, 'is', cMinorChord);

print('Chord progressions:');
print('ii V I in F');

const progression = [
  minorChord.construct(F.degree(2)!),
  majorChord.construct(F.degree(5)!),
  majorChord.construct(F.degree(1)!),
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
