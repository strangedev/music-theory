import { Hertz } from '../../signal/Frequency';
import { Interval } from '../../signal/Interval';
import { fmap, sPrint } from '../../unit/Scalar';
import { u, Unitless } from '../../unit/UnitLess';

type Note = Hertz;

const nIsEqual = (x: Note, y: Note): boolean => x.value.toNearest(0.01).equals(y.value.toNearest(0.01));

const cIntervalsBetween = function
  (i: Interval):
  (x: Note, y: Note) => Unitless
  /*
  WRONG 
  y1 = i * x
  y2 = i * i * x = i * y1
  y3 = i* i * i * x = i * y2

  y = i^n * x
  
  y / x = i^n
  n = log(y / x) / log(i)
  */
{
  return (x, y) => u(y.value.div(x.value).div(i.value.log()))
}

const cIsInterval = function
  (i: Interval):
  (x: Note, y: Note) => boolean
{
  return (x: Note, y: Note) => cIntervalsBetween(i)(x, y).value.abs().equals(u(1).value);
}

const nTranspose = function
  (x: Note, i: Interval, nTimes = u(1)):
  Note
{
  return fmap((value) => i.value.pow(nTimes.value).mul(value), x);
}

export type {
  Note
};
export {
  cIntervalsBetween,
  cIsInterval,
  nTranspose,
  nIsEqual
};
