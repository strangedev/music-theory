import { Hertz } from '../../signal/Frequency';
import { Interval } from '../../signal/Interval';
import { s, Scalar } from '../../unit/Scalar';
import { TuningSystem } from './TuningSystem';

class Note <TNoteName extends string> extends Hertz
{
  protected system: TuningSystem<TNoteName>;
  private _names: TNoteName[] | undefined;

  private constructor ({
    frequency,
    system
  }: {
    frequency: Hertz;
    system: TuningSystem<TNoteName>;
  })
  {
    super(frequency.v);
    this.system = system;
  }

  public transpose (interval: Interval, n=s(1)): Note<TNoteName>
  {
    return Note.FromSystem(this.system)(this.shift(interval.times(n)));
  }

  get names (): TNoteName[] | undefined
  {
    if (!this._names) {
      this._names = this.system.identify(this);
    }

    return this._names!;
  }

  public static FromSystem <TNoteName extends string> (system: TuningSystem<TNoteName>):
    (nameOrFrequency: Hertz | TNoteName) => Note<TNoteName>
  {
    return (nameOrFrequency: Hertz | TNoteName) => {
      if (typeof nameOrFrequency === 'string') {
        return system.notes[nameOrFrequency];
      }
      const frequency = nameOrFrequency;

      return new Note({
        frequency,
        system
      });

    };
  }
  
  public toString (): string
  {
    return this.names ? this.names[0] : '?';
  }
}

export {
  Note
};