import { Interval } from '../../../../../signal/Interval';
import { Note } from '../../../Note';
import { IScaleTemplate } from '../../IScaleTemplate';
import { SymmetricScale } from './SymmtericScale';

class SymmetricScaleTemplate <TNoteName extends string>
  implements IScaleTemplate<TNoteName, undefined>
{
  private _intervals: Interval[]; 

  public constructor (...intervals: Interval[])
  {
    this._intervals = intervals;
  }

  public construct (root: Note<TNoteName>):  SymmetricScale<TNoteName>
  {
    return new SymmetricScale(root, ...this._intervals);
  }

  get intervals (): Interval[]
  {
    return this._intervals;
  }

  public toString (): string
  {
    return `(R ${this.intervals.join(' ')})`;
  }
}

export {
  SymmetricScaleTemplate
};
