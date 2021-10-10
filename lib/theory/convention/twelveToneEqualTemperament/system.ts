import { s } from '../../../unit/Scalar';
import { NamedNotes, Notes, TuningSystem } from '../../harmony/TuningSystem';
import { concertA } from '../concertA';
import { octave, semitone } from './intervals';

const octaves = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] as const;
type Octaves = typeof octaves[number];
const noteNames = [
  'A',
  'As', 'Bb',
  'B',
  'C',
  'Cs', 'Db',
  'D',
  'Ds', 'Eb',
  'E',
  'F',
  'Fs', 'Gb',
  'G',
  'Gs', 'Ab'
] as const;
type NoteNames = `${ typeof noteNames[number] }${ Octaves }`

const realNotes = [
  [ 'A' ],
  [ 'As', 'Bb' ],
  [ 'B' ],
  [ 'C' ],
  [ 'Cs', 'Db' ],
  [ 'D' ],
  [ 'Ds', 'Eb' ],
  [ 'E' ],
  [ 'F' ],
  [ 'Fs', 'Gb' ],
  [ 'G' ],
  [ 'Gs', 'Ab' ]
] as (typeof noteNames[number])[][];

class TwelveTone extends TuningSystem<NoteNames> 
{
  constructor (A=concertA)
  {
    const A0 = A.shift(octave.times(s(-4)));
    const frequencies: Partial<Notes<NoteNames>> = {};
    const names: NamedNotes<NoteNames> = [];
    const numNotes = octaves.length * 12 + 1;

    for (
      let iNote = 0,
      iNames = 0,
      octave: Octaves = 0,
      frequency = A0
      ;
      iNote < numNotes
      ;
      iNote++,
      iNames = (iNames + 1) % 12)
    {
      octave = Math.floor((iNote + 9) / 12) as Octaves;
      
      const noteNames = realNotes[iNames].map((name): NoteNames => `${name}${octave}`);

      names.push({
        frequency,
        names: noteNames
      });
  
      for (const name of noteNames) {
        frequencies[name] = frequency;
      }
  
      frequency = frequency.shift(semitone);
    }

    super({
      frequencies: frequencies as Notes<NoteNames>,
      noteNames: names
    });
  }
}

export {
  TwelveTone,
  NoteNames
};
