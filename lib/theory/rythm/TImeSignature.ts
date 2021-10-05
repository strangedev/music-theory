import { NumberType, s } from '../../unit/Scalar';
import { Subdivision } from './Subdivision';

interface TimeSignature {
  length: NumberType;
  beatUnit: Subdivision;
}

const meter = function (lenght: NumberType, beatUnit: NumberType): TimeSignature
{
  return {
    length,
    beatUnit
  };
};

const isRationalMeter = function (ts: TimeSignature): boolean
{
  return ts.beatUnit.mod(2).equals(0);
};

const isIrrationMeter = (ts: TimeSignature): boolean => !isRationalMeter(ts); 

export type {
  TimeSignature
};
export {
  meter,
  isRationalMeter,
  isIrrationMeter
};
