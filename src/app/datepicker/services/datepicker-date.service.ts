import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { DatepickerDate } from "../models/DatepickerDate";


@Injectable()
export class DatepickerDateService {
  private _date$: BehaviorSubject<DatepickerDate> = new BehaviorSubject(new DatepickerDate());

  public get date$(): Observable<DatepickerDate> {
    return this._date$.pipe();
  }

  public get selectedDate(): DatepickerDate {
    return this._date$.getValue();
  }

  constructor() {  }

  setDate(ISODate: string): void {
    this._date$.next(new DatepickerDate(ISODate));
  }

  getMonthDates(): (DatepickerDate | null)[][] {
    const MAX_WEEKS_AT_MONTH_COUNT = 6;
    const WEEK_DAYS_COUNT = 7;
    const result: (DatepickerDate | null)[][] = [];
    let date = this.selectedDate.setDate(1);
    const monthStartDay: number = date.getDay();
    const daysInMonth = date.getDaysInMonth();
    let exitFlag = false;
    for (let week = 0; week <= MAX_WEEKS_AT_MONTH_COUNT; week++) {
      const weekDates = new Array(WEEK_DAYS_COUNT).fill(null).map((value, weekDayIndex) => {
        if (exitFlag) return new DatepickerDate(date.getISOString());
        let d = null;
        if (week === 0) { // Первая неделя
          if (monthStartDay <= weekDayIndex) {
            d = new DatepickerDate(date.getISOString());
            date = date.setDate(date.getDate() + 1);
          }
        } else {
          d = new DatepickerDate(date.getISOString());
          date = date.setDate(date.getDate() + 1);
        }
        if (date.getDate() === daysInMonth ) {
          exitFlag = true;
        }
        return d;
      });
      result.push(weekDates);
      if (exitFlag) { break; }
    }
    return result;
  }
}
