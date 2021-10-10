import { Note } from '../Note';
import { IScaleWalker, IScaleWalkerImplementation } from './IScaleWalker';
import { ScaleDegree } from './ScaleDegree';

class ScaleWalker <TNoteName extends string>
  implements IScaleWalker<TNoteName>
{
  private _degree: ScaleDegree = 0;
  private _note: Note<TNoteName>;
  private _impl: IScaleWalkerImplementation;

  public constructor (note: Note<TNoteName>, degree: ScaleDegree, impl: IScaleWalkerImplementation)
  {
    this._degree = degree;
    this._note = note;
    this._impl = impl;
  }

  public step (degrees: ScaleDegree): ScaleWalker<TNoteName> {
    const newDegree = this._degree + degrees;
    const interval = this._impl(this._degree, newDegree);
    const newNote = this._note.transpose(interval);

    return new ScaleWalker(newNote, newDegree, this._impl);
  }

  public toString (): string
  {
    return `Sciterator @ ${this.degree} ${this.note}`;
  }

  get degree (): ScaleDegree
  {
    return this._degree;
  }

  get note (): Note<TNoteName>
  {
    return this._note;
  }
}

export {
  ScaleWalker
};
