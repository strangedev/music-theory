import Decimal from 'decimal.js';
import { Unit } from './Unit';

type Scalar<TMachineType, TUnit extends Unit | undefined = undefined> =
  TUnit extends undefined ?
    {
      unitLess: true;
      value: TMachineType
    } :
    {
      unit: TUnit; 
      value: TMachineType;
    };

const s = function <TMachineType, TUnit extends Unit | undefined = undefined>
  (value: TMachineType, unit?: TUnit):
  TUnit extends undefined ?
    Scalar<TMachineType> :
    Scalar<TMachineType, TUnit>
{
  return (unit ?
    {
      unit,
      value
    } :
    {
      unitLess: true,
      value
    }) as any;
}

const fmap = function <TMachineType, TUnit extends Unit | undefined = undefined>
  (fn: (x: TMachineType) => TMachineType , scalar: Scalar<TMachineType, TUnit>):
  Scalar<TMachineType, TUnit>
{
  return {
    ...scalar,
    value: fn(scalar.value)
  };
};

const cfmap = function <TUnit extends Unit | undefined, TMachineType>
  (fn: (x: TMachineType) => TMachineType):
  (scalar: Scalar<TMachineType, TUnit>) => Scalar<TMachineType, TUnit>
{
  return (scalar): Scalar<TMachineType, TUnit> => ({
    ...scalar,
    value: fn(scalar.value)
  });
};

const f = (x: any): Decimal => new Decimal(x);

const sPrint = (scalar: any, precision = 2) => `${scalar.value.toNearest(Math.pow(10, -precision))} ${scalar.unitLess ? '' : scalar.unit}`;

export type {
  Scalar
};
export {
  s,
  f,
  fmap,
  cfmap,
  sPrint
};
