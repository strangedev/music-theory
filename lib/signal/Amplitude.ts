import { Scalar } from '../unit/Scalar';

const dB = '[dB]: Decibel. Pseudo unit for relative amplitude.';
class Decibel extends Scalar<typeof dB> {

}

export type {
  Decibel
};
export {
  dB
};
