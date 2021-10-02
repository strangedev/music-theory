import { fmap } from '../unit/Scalar';
import { u, Unitless } from '../unit/UnitLess';

type Interval = Unitless;

const ivl = function (ratio: number): Interval {
  return u(ratio);
};

const iAdd = (x: Interval, y: Interval): Interval => fmap((value) => value.add(y.value), x);
const iScale = (x: Interval, c: Unitless): Interval => fmap((value) => value.pow(c.value), x);

export type {
  Interval
};
export {
  ivl,
  iAdd,
  iScale
};
