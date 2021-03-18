export enum unitOfTime {
  Millisecond = 1,
  Second = 1000 * Millisecond,
  Minute = 60 * Second,
  Hour = 60 * Minute,
}

class Duration {
  _value: number;
  _unit: unitOfTime;

  constructor(n: number, unit: unitOfTime = unitOfTime.Millisecond) {
    this._value = n;
    this._unit = unit;
  }

  toUnit(unit: unitOfTime): void {
    this._value *= this._unit / unit;
    this._unit = unit;
  }

  unitAbbrev(): string {
    return Duration._unitAbbrev(this._unit);
  }

  static _unitAbbrev(unit: unitOfTime): string {
    switch (unit) {
      case unitOfTime.Millisecond:
        return "ms";
      case unitOfTime.Second:
        return "sec";
      case unitOfTime.Minute:
        return "min";
      case unitOfTime.Hour:
        return "hour";
      default:
        return "unknown";
    }
  }

  toString(n = 2): string {
    return `${this.toFixed(n)} ${this.unitAbbrev()}`;
  }

  toFixed(n = 2): string {
    return this._value
      .toFixed(n)
      .replace(/(\.[1-9]*)0*$/, "$1")
      .replace(/\.$/, "");
  }

  milliseconds = (): number =>
    (this._value * this._unit) / unitOfTime.Millisecond;
  seconds = (): number => (this._value * this._unit) / unitOfTime.Second;
  minutes = (): number => (this._value * this._unit) / unitOfTime.Minute;
  hours = (): number => (this._value * this._unit) / unitOfTime.Hour;
}

export default Duration;
