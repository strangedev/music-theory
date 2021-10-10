import { Printable } from '../../../Printable';
import { Note } from '../Note';
import { IScale } from './IScale';

interface IScaleTemplate <TNoteName extends string, TOptions extends object | undefined> extends Printable {
  construct: (root: Note<TNoteName>, options?: TOptions) => IScale<TNoteName>;
}

export {
  IScaleTemplate
};
