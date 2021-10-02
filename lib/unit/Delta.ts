import { s, Scalar } from './Scalar';
import { Unit } from './Unit';

interface Delta<TMachineType, TUnit extends Unit | undefined, TScalar extends Scalar<TMachineType, TUnit>>
{
  scalar: TScalar;
  type: 'delta';
}

const isDelta = function <TMachineType,  TUnit extends Unit | undefined, TScalar extends Scalar<TMachineType, TUnit>> 
  (obj: Partial<Delta<TMachineType, TUnit, TScalar>>): obj is Delta<TMachineType, TUnit, TScalar>
{
  return Boolean(obj.type && obj.type === 'delta' && obj.scalar);
};

const delta = function <TUnit extends Unit | undefined, TMachineType, TScalar extends Scalar<TMachineType, TUnit>>
  (scalar: TScalar): Delta<TMachineType, TUnit, TScalar>
{
  return {
    type: 'delta',
    scalar
  };
};

export type {
  Delta
};
export {
  isDelta,
  delta
};
