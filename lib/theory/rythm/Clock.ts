import { Bpm } from './bpm';
import { Subdivision } from './Subdivision';

interface Clock {
  bpm: Bpm;
  beatUnit: Subdivision;
}

export type {
  Clock
};
