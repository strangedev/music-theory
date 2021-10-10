import { nth, take } from '../../../generator';
import { Interval } from '../../../signal/Interval';
import { unison } from '../../convention/twelveToneEqualTemperament/intervals';
import { Note } from '../Note';
import { TuningSystem } from '../TuningSystem';
import { IScale } from './IScale';
import { ScaleDegree, scaleDegreeToArrayIndex } from './ScaleDegree';
import { ScaleWalker } from './ScaleWalker';

class SymmetricScaleDefinition <TNoteName extends string>
{
  private _intervals: Interval[]; 

  protected constructor (...intervals: Interval[])
  {
    this._intervals = intervals;
  }

  public static FromSystem <TNoteName extends string> (system: TuningSystem<TNoteName>):
    (...intervals: Interval[]) => SymmetricScaleDefinition<TNoteName>
  {
    return (...intervals) => {
      return new SymmetricScaleDefinition<TNoteName>(...intervals);
    };
  }

  public at (root: Note<TNoteName>):  SymmetricScale<TNoteName>
  {
    return new SymmetricScale(root, ...this._intervals);
  }

  get intervals (): Interval[]
  {
    return this._intervals;
  }

  public toString (): string
  {
    return `{R ${this.intervals.join(' ')}}`;
  }
}

class SymmetricScale <TNoteName extends string>
  extends SymmetricScaleDefinition<TNoteName>
  implements IScale<TNoteName>
{
  private _root: Note<TNoteName>;

  public constructor (root: Note<TNoteName>, ...intervals: Interval[])
  {
    super(...intervals);
    this._root = root;
  }

  get root (): Note<TNoteName>
  {
    return this._root;
  }

  public * walk (degrees: ScaleDegree, start=1): Generator<Note<TNoteName>> {
    let startingNote = this._root;

    for (let i = 1; i < start; i++) {
      startingNote = startingNote.transpose(this.intervals[scaleDegreeToArrayIndex(i)]);
    }

    let walker = new ScaleWalker(startingNote, start, (fromDegree, toDegree): Interval => {
      const increment = toDegree > fromDegree ? 1 : -1;
      let interval = unison;

      for (let iDegree = fromDegree; iDegree != toDegree; iDegree += increment) {
        interval = interval.scale(this.intervals[scaleDegreeToArrayIndex(iDegree) % this.intervals.length]);
      }

      return interval;
    });

    for (;;) {
      yield walker.note;

      walker = walker.step(degrees);
    }
  }

  public toString (): string
  {
    return `{${take(this.walk(1), this.intervals.length).join(' ')}}`
  }

  public degree (n: ScaleDegree): Note<TNoteName>
  {
    return nth(this.walk(n - 1), 1);
  }
}

export {
  SymmetricScale,
  SymmetricScaleDefinition
};
