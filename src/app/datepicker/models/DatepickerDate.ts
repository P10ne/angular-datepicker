import * as dayjs from 'dayjs';
import {Dayjs, OpUnitType, ConfigType, OptionType} from "dayjs";
import {DatepickerTime} from "./DatepickerTime";

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

  public setTime(time: DatepickerTime): DatepickerDate {
    return new DatepickerDate(
      this._date
        .hour(time.getHours())
        .minute(time.getMinutes())
        .second(time.getSeconds())
    )
  }

  public getTime(): DatepickerTime {
    return new DatepickerTime(
      this._date.hour(),
      this._date.minute(),
      this._date.second()
    )
  }

  public isSame(date: Date, unit: OpUnitType) {
    return this._date.isSame(date, unit);
  }

  public getDaysInMonth(): number {
    return this._date.daysInMonth();
  }

  public getISOString(): string {
    return this._date.toISOString();
  }

  public getJSDate(): Date {
    return this._date.toDate();
  }

  public isValid(): boolean {
    return this._date.isValid();
  }

  constructor(config?: ConfigType, format?: OptionType, strict?: boolean) {
    this._date = dayjs(config, format, strict);
  }

  public static getFormat(jsFormat: string): string {
    return jsFormat.replace(/[dyh]/g, s => s.toUpperCase());
  }
}
