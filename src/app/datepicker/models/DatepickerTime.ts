export class DatepickerTime {
  private _hours: number;

  private _minutes: number;

  private _seconds: number;

  constructor(hours: number = 0, minutes: number = 0, seconds: number = 0) {
    this._hours = hours;
    this._minutes = minutes;
    this._seconds = seconds;
  }

  public getHours(): number {
    return this._hours;
  }
  public setHours(v: number): void {
    this._hours = v;
  }

  public getMinutes(): number {
    return this._minutes;
  }
  public setMinutes(v: number): void {
    this._minutes = v;
  }

  public getSeconds(): number {
    return this._seconds;
  }
  public setSeconds(v: number): void {
    this._seconds = v;
  }

}
