type ScaleDegree = number;

const scaleDegreeToArrayIndex = function (degree: ScaleDegree): number
{
  return degree - 1;
};

const arrayIndexToScaleDegree = function (index: number): ScaleDegree
{
  return index + 1;
};

export {
  ScaleDegree,
  scaleDegreeToArrayIndex,
  arrayIndexToScaleDegree
};
