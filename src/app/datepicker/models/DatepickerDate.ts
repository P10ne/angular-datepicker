import * as dayjs from 'dayjs';

export class DatepickerDate {
  private _date: any;

  public getYear(): number {
    return this._date.year();
  }

  public setYear(v: number): DatepickerDate {
    return new DatepickerDate(this._date.year(v));
  }

  public getMonth(): number {
    return this._date.month();
  }

  public setMonth(v: number): DatepickerDate {
    return new DatepickerDate(this._date.month(v));
  }

  public getDate(): number {
    return this._date.date();
  }

  public setDate(v: number): DatepickerDate {
    return new DatepickerDate(this._date.date(v));
  }

  public getDay(): number {
    return this._date.day();
  }

  public setDay(v: number): DatepickerDate {
    return new DatepickerDate(this._date.day(v));
  }

  public getDaysInMonth(): number {
    return this._date.daysInMonth();
  }

  public getISOString(): string {
    return this._date.toISOString();
  }

  constructor(date?: any) {
    this._date = dayjs(date);
  }
}
