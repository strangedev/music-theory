import { fShiftBy } from '../../signal/Frequency';
import { Interval } from '../../signal/Interval';
import { isOctave, octavesBetween } from '../convention/twelveToneEqualTemperament/intervals';
import { Note } from './Note';

interface AbstractScale {
  steps: Interval[];
}

interface Scale {
  notes: Note[];
}

/**
 * Actualizes an AbstractScale by applying the Scale's Intervals starting from
 * the tonic. If the scale is octave-repeating, it generates one octave.
 * If the scale is not octave-repeating, it generates 100 notes.
 */
const actualize = function (scale: AbstractScale, tonic: Note, options: {
  numOctaves?: number;
  numNotes?: number;
}): Scale {
  const {
    numOctaves,
    numNotes
  } = {
    numOctaves: 1,
    numNotes: 100,
    ...options
  };

  const notes = [ tonic ];

  let currentStepIndex = 0;
  let currentNote = tonic;
  let octavesGenerated = 0;

  for (;;) {
    console.log(octavesBetween(tonic, currentNote));
    if (isOctave(tonic, currentNote)) {
      octavesGenerated += 1;
    }

    if (octavesGenerated >= numOctaves || notes.length >= numNotes) {
      break;
    }

    const currentStep = scale.steps[currentStepIndex];
    const nextNote = fShiftBy(currentNote, currentStep);

    notes.push(nextNote);

    currentNote = nextNote;
    currentStepIndex = (currentStepIndex + 1) % scale.steps.length;
  }

  return {
    notes
  };
};

export type {
  AbstractScale,
  Scale
};
export {
  actualize
};
