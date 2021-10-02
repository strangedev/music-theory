import { fmap, Scalar } from '../unit/Scalar';
import { Interval } from './Interval';
import { Decimal } from 'decimal.js';
import { Unitless } from '../unit/UnitLess';

const Hz = 'Hz';
type Hertz = Scalar<Decimal, typeof Hz>;

const fAdd = (x: Hertz, y: Hertz): Hertz => fmap((value) => value.add(y.value), x);
const fScale = (x: Hertz, c: Unitless): Hertz => fmap((value) => value.mul(c.value), x);

const fShiftBy = function (f: Hertz, i: Interval): Hertz {
  return fScale(f, i);
};

export type {
  Hertz
};
export {
  Hz,
  fAdd,
  fShiftBy
};
