import { sPrint } from '../../unit/Scalar';
import { nIsEqual, Note } from './Note';

type Notes <TNoteName extends string> =  Record<TNoteName, Note>;
type NamedNotes <TNoteName extends string> = { note: Note; names: TNoteName[] }[];

interface AbstractSystem<TNoteName extends string> {
  notes: Notes<TNoteName>;
  names: NamedNotes<TNoteName>;
}

const cnIdentify = function <TNoteName extends string>
  (system: AbstractSystem<TNoteName>):
  (note: Note) => TNoteName[] | undefined
{
  return (note: Note) => {
    for (const { note: namedNote, names } of system.names) {
      if (nIsEqual(note, namedNote)) {
        return names;
      }
    }
  }
};


const cnPrint  = function <TNoteName extends string>
  (system: AbstractSystem<TNoteName>):
  (note: Note) => string
{
  const identify = cnIdentify(system);

  return (note: Note) => `${identify(note)}: ${sPrint(note)}`;
};

interface System <TNoteName extends string> extends AbstractSystem<TNoteName> {
  identify: (note: Note) => TNoteName[] | undefined;
  print: (note: Note) => string;
}

const system = function <TNoteName extends string>
  (abstract: AbstractSystem<TNoteName>):
  System<TNoteName>
{
  return {
    ...abstract,
    identify: cnIdentify(abstract),
    print: cnPrint(abstract)
  };
}

export type {
  AbstractSystem,
  System,
  Notes,
  NamedNotes
};
export {
  cnIdentify,
  cnPrint,
  system
};
