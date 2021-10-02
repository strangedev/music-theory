import Decimal from 'decimal.js';
import { s, Scalar } from './Scalar';

type Unitless = Scalar<Decimal>;

const u = function (value: number | Decimal): Unitless {
  return s(new Decimal(value));
}

export type {
  Unitless
};
export {
  u
};