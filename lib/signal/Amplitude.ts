import Decimal from 'decimal.js';
import { Scalar } from '../unit/Scalar';

const dB = '[dB]: Decibel. Pseudo unit for relative amplitude.';
type Decibel = Scalar<Decimal, typeof dB>;

export type {
  Decibel
};
export {
  dB
};
