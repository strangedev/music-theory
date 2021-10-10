const head = function <TValue> (generator: Generator<TValue>): TValue
{
  return nth(generator, 0);
}

const nth = function <TValue> (generator: Generator<TValue>, n: number): TValue
{
  return take(generator, n + 1)[n];
};

const take = function <TValue> (generator: Generator<TValue>, n=1): TValue[]
{
  const values: TValue[] = [];

  for (const value of generator)
  {
    values.push(value);

    if (values.length === n) {
      break;
    }
  }

  return values;
};

export {
  head,
  nth,
  take
};
