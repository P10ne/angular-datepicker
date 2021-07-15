import * as dayjs from 'dayjs';
import {Dayjs, OpUnitType, ConfigType} from "dayjs";

export class DatepickerDate {
  private _date: Dayjs;

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
    return this._date.weekday();
  }

  public setDay(v: number): DatepickerDate {
    return new DatepickerDate(this._date.weekday(v));
  }

  public isSame(ISOString: string, unit: OpUnitType) {
    return this._date.isSame(ISOString, unit);
  }

  public getDaysInMonth(): number {
    return this._date.daysInMonth();
  }

  public getISOString(): string {
    return this._date.toISOString();
  }

  constructor(config?: ConfigType) {
    this._date = dayjs(config);
  }
}
