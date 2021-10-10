import { Note } from '../../Note';
import { IScaleTemplate } from '../../Scale/IScaleTemplate';
import { ScaleDegree } from '../../Scale/ScaleDegree';
import { Chord } from '../Chord';
import { IChord } from '../IChord';
import { IChordTemplate } from '../IChordTemplate';

interface Options {
  direction: 'up' | 'down';
}

class ScaleBasedChordTemplate <TNoteName extends string, TScaleTemplateOptions extends object | undefined>
  implements IChordTemplate<TNoteName, Options & TScaleTemplateOptions>
{
  private _scaleTemplate: IScaleTemplate<TNoteName, TScaleTemplateOptions>;
  private _degrees: ScaleDegree[];

  constructor (scaleTemplate: IScaleTemplate<TNoteName, TScaleTemplateOptions>, ...degrees: ScaleDegree[])
  {
    this._scaleTemplate = scaleTemplate;
    this._degrees = [ ...degrees ];
  }

  public construct (root: Note<TNoteName>, options?: Options & TScaleTemplateOptions): IChord<TNoteName>
  {
    const scale = this._scaleTemplate.construct(root, options);

    const { direction } = options ?? { direction: 'up' };
    const directionFactor = direction === 'down' ? -1 : 1;

    const notes: Note<TNoteName>[] = [ root ];

    for (const degree of this._degrees) {
      notes.push(scale.degree(degree * directionFactor));
    }

    return new Chord(...notes);
  }

  public toString (): string
  {
    return `[Degrees (${this._degrees.join(' ')}) of ${this._scaleTemplate}]`;
  }
}

export {
  ScaleBasedChordTemplate
};
