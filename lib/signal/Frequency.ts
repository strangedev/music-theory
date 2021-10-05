import { NumberType, Scalar } from '../unit/Scalar';
import { Interval } from './Interval';

const Hz = 'Hz';

class Hertz extends Scalar<typeof Hz>
{
  public constructor (value: NumberType)
  {
    super(value, Hz);
  }

  public add (other: Hertz): Hertz
  {
    return new Hertz(this.v.add(other.v));
  }

  public scale (factor: Scalar): Hertz
  {
    return new Hertz(this.v.mul(factor.v));
  }

  public shift (interval: Interval): Hertz
  {
    return this.scale(interval);
  }
}

export {
  Hertz,
  Hz
};
