import Decimal from 'decimal.js';
import { merge } from 'lodash';
import { Unit } from './Unit';

const EPSILON = 0.001;
const MACHINE = Decimal;
type MachineNumberType = Decimal
type HumanNumberType = number;
type NumberType = MachineNumberType | HumanNumberType;

const machine = (num: NumberType): MachineNumberType =>
  (num instanceof MACHINE) ?
    num as MachineNumberType
    :
    new Decimal(num);

type UnitType = Unit;

interface ScalarOptions {
  print: {
    precision: NumberType;
  }
}

class Scalar <TUnit extends UnitType | undefined = undefined> {
  public readonly isScalar = true;

  protected value: MachineNumberType;
  protected unit: TUnit | undefined;
  
  public constructor
  (
    value: NumberType,
    unit?: TUnit | undefined
  )
  {
    this.value = machine(value);
    this.unit = unit;
  }

  public isUnitless (): boolean
  {
    return !Boolean(this.unit);
  }

  public toString (): string
  {
    const roundedValue = this.value.toNearest(EPSILON);
    const unit = this.isUnitless() ? '' : ` ${this.unit}`;

    return `${roundedValue}${unit}`;
  }

  public get v (): MachineNumberType
  {
    return this.value;
  }

  public get u (): TUnit | undefined
  {
    return this.unit;
  }

  public equals (other: Scalar<any>): boolean
  {
    return this.valueEquals(other) && this.u === other.u;
  }

  public valueEquals (other: Scalar): boolean
  {
    return this.v.sub(other.v).toNearest(EPSILON).equals(0);
  }
}

const s = function <TUnit extends Unit | undefined = undefined>
  (value: NumberType, unit?: TUnit):
  Scalar<TUnit>
{
  return new Scalar(value, unit);
};

export {
  NumberType,
  MachineNumberType,
  HumanNumberType,
  Scalar,
  s
};
