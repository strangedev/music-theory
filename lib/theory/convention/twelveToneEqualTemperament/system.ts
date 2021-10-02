import { u } from '../../../unit/UnitLess';
import { nTranspose } from '../../harmony/Note';
import { NamedNotes, Notes, System, system } from '../../harmony/System';
import { concertA } from '../concertA';
import { octave, semitone } from './intervals';

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
type NoteNames = typeof noteNames[number];
type NoteName = `${NoteNames}${number}`;

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
] as NoteNames[][];

const twelveTone = function
  (A = concertA):
  System<NoteName>
{
  const A0 = nTranspose(A, octave, u(-4));
  const notes: Notes<NoteName> = {};
  const names: NamedNotes<NoteName> = [];
  const numOctaves = 7;
  const numNotes = numOctaves * 12 + 1;

  for (
    let iNote = 0,
    iNames = 0,
    octave = 0,
    note = A0
    ;
    iNote < numNotes
    ;
    iNote++,
    iNames = (iNames + 1) % 12)
  {
    octave = Math.floor((iNote + 9) / 12);
    
    const noteNames = realNotes[iNames].map((name): NoteName => `${name}${octave}`);

    names.push({
      note,
      names: noteNames
    });

    for (const name of noteNames) {
      notes[name] = note;
    }

    note = nTranspose(note, semitone);
  }

  return system<NoteName> ({
    notes,
    names
  });
};

export type {
  NoteName
};
export {
  twelveTone
};
