import { NumberType, s, Scalar } from '../unit/Scalar';
import { Hertz } from './Frequency';
class Interval extends Scalar
{
  public scale (factor: Scalar): Interval
  {
    return new Interval(this.v.mul(factor.v));
  }

  public times (factor: Scalar): Interval
  {
    return new Interval(this.v.pow(factor.v));
  }

  public numBetween (low: Hertz, high: Hertz): Scalar
  {
    return s(high.v.div(low.v).log().div(this.v.log()).toNearest(0.01));
  }

  public static between (low: Hertz, high: Hertz): Interval
  {
    return new Interval(high.v.div(low.v));
  }

  public matches (low: Hertz, high: Hertz): boolean
  public matches (other: Interval): boolean
  public matches (lowerOrOther: Hertz | Interval, high?: Hertz): boolean {
    const otherInterval = high ?
      Interval.between(lowerOrOther as Hertz, high)
      :
      lowerOrOther as Interval

    return this.equals(otherInterval);
  }

  public toString (): string
  {
    return `<1:${this.v}>`;
  }
}

const interval = (ratio: NumberType): Interval => new Interval(ratio);

export {
  Interval,
  interval
};
