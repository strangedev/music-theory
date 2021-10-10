import { Interval } from '../../../../signal/Interval';
import { Note } from '../../Note';
import { Chord } from '../Chord';
import { IChord } from '../IChord';
import { IChordTemplate } from '../IChordTemplate';

interface Options {
  direction: 'up' | 'down';
}

class IntervalBasedChordTemplate <TNoteName extends string, TScaleTemplateOptions extends object | undefined>
  implements IChordTemplate<TNoteName, (Options & TScaleTemplateOptions)>
{
  private _intervals: Interval[];

  constructor (...intervals: Interval[])
  {
    this._intervals = intervals;
  }

  public construct (root: Note<TNoteName>, options?: (Options & TScaleTemplateOptions)): IChord<TNoteName>
  {
    const notes = [ root ];

    for (const interval of this._intervals) {
      notes.push(root.transpose(interval));
    }

    return new Chord(...notes);
  }

  public toString (): string
  {
    return `[R ${this._intervals.join(' ')}]`
  }
}

export {
  IntervalBasedChordTemplate
};
