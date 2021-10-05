import { Interval } from '../../signal/Interval';
import { Note } from './Note';
import { TuningSystem } from './System';
class AbstractScale <TNoteName extends string> {
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

  public at (root: Note<TNoteName>): Scale<TNoteName>
  {
    return Scale.FromSystem(this.system)(root, ...this.intervals);
  }

  public toString (): string
  {
    return `(R ${this.intervals.join(' ')})`;
  }

  public static FromSystem <TNoteName extends string> (system: TuningSystem<TNoteName>):
    (...intervals: Interval[] | any) => AbstractScale<TNoteName>
  {
    return (...intervals) => new AbstractScale({ intervals, system });
  }
}

class Scale <TNoteName extends string> extends AbstractScale<TNoteName>
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
    (root: Note<TNoteName>, ...intervalsOrNotes: Interval[] | Note<TNoteName>[]) => Scale<TNoteName>
  {
    return (root, ...intervalsOrNotes) => {
      let intervals: Interval[] = [];
      let notes: Note<TNoteName>[] = [ root ];

      if (intervalsOrNotes.length === 0) {
        return new Scale({ intervals, system, notes })
      }
      if (intervalsOrNotes[intervalsOrNotes.length - 1]?.u === 'Hz') {
        notes = intervalsOrNotes as Note<TNoteName>[];
        for (let i = 1; i < notes.length; i++) {
          intervals.push(Interval.between(notes[0], notes[i]))
        }
      } else {
        intervals = intervalsOrNotes as Interval[];
        let note = root;

        for (const interval of intervals) {
          note = note.transpose(interval);
          notes.push(note);
        }
      }

      return new Scale({ intervals, system, notes })
    };
  }

  public repeat (n=1): Scale <TNoteName>
  {
    const intervals = Array(n).fill(this.intervals).flat();

    return Scale.FromSystem(this.system)(this.notes[0], ...intervals);
  }

  public degree (num: number): Note<TNoteName> | undefined
  {
    return this.notes[num - 1];
  }
}

export {
  AbstractScale,
  Scale
};
