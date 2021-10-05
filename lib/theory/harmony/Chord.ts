import { Interval } from '../../signal/Interval';
import { Note } from './Note';
import { TuningSystem } from './System';
class AbstractChord <TNoteName extends string> {
  protected intervals: Interval[];
  protected system: TuningSystem<TNoteName>;

  protected constructor ({
    intervals,
    system
  }: {
    intervals: Interval[];
    system: TuningSystem<TNoteName>;
  })
  {
    this.intervals = intervals;
    this.system = system;
  }

  public at (root: Note<TNoteName>): Chord<TNoteName>
  {
    return Chord.FromSystem(this.system)(root, ...this.intervals);
  }

  public toString (): string
  {
    return `(R ${this.intervals.join(' ')})`;
  }

  public static FromSystem <TNoteName extends string> (system: TuningSystem<TNoteName>):
    (...intervals: Interval[] | any) => AbstractChord<TNoteName>
  {
    return (...intervals) => new AbstractChord({ intervals, system });
  }
}

class Chord <TNoteName extends string> extends AbstractChord<TNoteName>
{
  public notes: Note<TNoteName>[];

  protected constructor ({
    notes,
    intervals,
    system
  }: {
    notes: Note<TNoteName>[];
    intervals: Interval[];
    system: TuningSystem<TNoteName>
  })
  {
    super({
      intervals,
      system
    });
    this.notes = notes;
  }

  public toString (): string
  {
    return `(${this.notes.join(' ')})`
  }

  public static FromSystem <TNoteName extends string> (system: TuningSystem<TNoteName>):
    (root: Note<TNoteName>, ...intervalsOrNotes: Interval[] | Note<TNoteName>[]) => Chord<TNoteName>
  {
    return (root, ...intervalsOrNotes) => {
      let intervals: Interval[] = [];
      let notes: Note<TNoteName>[] = [ root ];

      if (intervalsOrNotes.length === 0) {
        return new Chord({ intervals, system, notes })
      }
      if (intervalsOrNotes[intervalsOrNotes.length - 1]?.u === 'Hz') {
        notes = intervalsOrNotes as Note<TNoteName>[];
        for (let i = 1; i < notes.length; i++) {
          intervals.push(Interval.between(notes[0], notes[i]))
        }
      } else {
        intervals = intervalsOrNotes as Interval[];

        for (const interval of intervals) {
          notes.push(Note.FromSystem(system)(root.shift(interval)));
        }
      }

      return new Chord({ intervals, system, notes })
    };
  }
}

export {
  AbstractChord,
  Chord
};
