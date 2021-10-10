import { nth, take } from '../../../../../generator';
import { Interval } from '../../../../../signal/Interval';
import { unison } from '../../../../convention/twelveToneEqualTemperament/intervals';
import { Note } from '../../../Note';
import { IScale } from '../../IScale';
import { ScaleDegree, scaleDegreeToArrayIndex } from '../../ScaleDegree';
import { ScaleWalker } from '../../ScaleWalker';
import { SymmetricScaleTemplate } from './SymmetricScaleTemplate';

class SymmetricScale <TNoteName extends string>
  implements IScale<TNoteName>
{
  private _root: Note<TNoteName>;
  private _intervals: Interval[];

  public constructor (root: Note<TNoteName>, ...intervals: Interval[])
  {
    this._root = root;
    this._intervals = intervals;
  }

  get root (): Note<TNoteName>
  {
    return this._root;
  }

  public * walk (degrees: ScaleDegree, start=1): Generator<Note<TNoteName>> {
    let startingNote = this._root;

    for (let i = 1; i < start; i++) {
      startingNote = startingNote.transpose(this._intervals[scaleDegreeToArrayIndex(i)]);
    }

    let walker = new ScaleWalker(startingNote, start, (fromDegree, toDegree): Interval => {
      const increment = toDegree > fromDegree ? 1 : -1;
      let interval = unison;

      for (let iDegree = fromDegree; iDegree != toDegree; iDegree += increment) {
        interval = interval.scale(this._intervals[scaleDegreeToArrayIndex(iDegree) % this._intervals.length]);
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
    return `(${take(this.walk(1), this._intervals.length).join(' ')})`
  }

  public degree (n: ScaleDegree): Note<TNoteName>
  {
    //console.log(`D.${n} ${nth(this.walk(n - 1), 1)}`);
    return nth(this.walk(n - 1), 1);
  }
}

export {
  SymmetricScale,
  SymmetricScaleTemplate as SymmetricScaleDefinition
};
