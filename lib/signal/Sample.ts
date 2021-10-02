import { Decibel } from './Amplitude';
import { Hertz } from './Frequency';

interface Sample {
  frequency: Hertz;
  amplitude: Decibel;
}

export type {
  Sample
};
