import { Interval } from '../../lib/signal/Interval';
import { semitone } from '../../lib/theory/convention/twelveToneEqualTemperament/intervals';
import { TwelveTone } from '../../lib/theory/convention/twelveToneEqualTemperament/system';
import { ScaleWalker } from '../../lib/theory/harmony/Scale/ScaleWalker';
import { s } from '../../lib/unit/Scalar';

suite('ScaleWalker', (): void => {
  test('does stuff.', async (): Promise<void> => {
    const system = new TwelveTone();

    const step = function (fromDegree: number, toDegree: number): Interval {
      return semitone.times(s(toDegree - fromDegree));
    };

    let walker = new ScaleWalker(system.notes.C4, 1, step);

    for (let i = 0; i < 10; i++) {
      walker = walker.step(-1);

      console.log(`${walker}`);
    }
  });
});
