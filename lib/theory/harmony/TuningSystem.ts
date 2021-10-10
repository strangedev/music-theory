import { Hertz } from '../../signal/Frequency';
import { Note } from './Note';

type Frequencies <TNoteName extends string> =  Record<TNoteName, Hertz>;
type NoteNames <TNoteName extends string> = { frequency: Hertz; names: TNoteName[] }[];
type Notes <TNoteName extends string> = Record<TNoteName, Note<TNoteName>>;

class TuningSystem <TNoteName extends string>
{
  private _frequencies: Frequencies<TNoteName>;
  private _notes: Notes<TNoteName> | undefined;
  private noteNames: NoteNames<TNoteName>;

  constructor ({ frequencies, noteNames }: {
    frequencies: Frequencies<TNoteName>;
    noteNames: NoteNames<TNoteName>;
  })
  {
    this._frequencies = frequencies;
    this.noteNames = noteNames;
  }

  get notes (): Record<TNoteName, Note<TNoteName>>
  {
    if (!this._notes) {
      this._notes = Object.fromEntries(
        Object.entries<Hertz>(this._frequencies).
          map(
            ([name, freq ]): [TNoteName, Note<TNoteName>] => [ name as TNoteName, Note.FromSystem(this)(freq) ] 
          )
      ) as Notes<TNoteName>;
    }

    return this._notes;
  }

  get range (): { low: Note<TNoteName>; high: Note<TNoteName> }
  {
    const notes = Object.values<Note<TNoteName>>(this.notes);

    return {
      low: notes[0],
      high: notes[notes.length - 1]
    };
  }

  public identify (frequency: Hertz): TNoteName[] | undefined
  {
    for (const { frequency: namedFrequency, names } of this.noteNames) {
      if (frequency.equals(namedFrequency)) {
        return names;
      }
    }
  }
}

export type {
  Frequencies as Notes,
  NoteNames as NamedNotes
};
export {
  TuningSystem
};

