import { NumberType, Scalar } from '../../unit/Scalar';

const bpm = 'bpm';
class Bpm extends Scalar<typeof bpm> {
  public constructor (value: NumberType)
  {
    super(value, bpm);
  }

  public add (other: Bpm): Bpm
  {
    return new Bpm(this.v.add(other.v));
  }
}


export type {
  Bpm
};
export {
  bpm
};
