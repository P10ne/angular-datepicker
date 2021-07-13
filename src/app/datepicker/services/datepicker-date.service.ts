import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { DatepickerDate } from "../models/DatepickerDate";


@Injectable()
export class DatepickerDateService {
  private _selectedDate$: BehaviorSubject<DatepickerDate> = new BehaviorSubject(new DatepickerDate());

  private _currentSelectedDate$: BehaviorSubject<DatepickerDate> = new BehaviorSubject<DatepickerDate>(new DatepickerDate());

  public get selectedDate$(): Observable<DatepickerDate> {
    return this._selectedDate$.pipe();
  }

  public get selectedDate(): DatepickerDate {
    return this._selectedDate$.getValue();
  }

  public get currentSelectedDate$(): Observable<DatepickerDate> {
    return this._currentSelectedDate$.pipe();
  }

  public get currentSelectedDate(): DatepickerDate {
    return this._currentSelectedDate$.getValue();
  }

  public get currentDate(): DatepickerDate {
    return new DatepickerDate();
  }

  constructor() {  }

  setSelectedDate(ISODate: string): void {
    this._selectedDate$.next(new DatepickerDate(ISODate));
  }

  setCurrentSelectedDate(ISODate: string): void {
    this._currentSelectedDate$.next(new DatepickerDate(ISODate));
  }

  getMonthDates(d: any): (DatepickerDate | null)[][] {
    const MAX_WEEKS_AT_MONTH_COUNT = 6;
    const WEEK_DAYS_COUNT = 7;
    const result: (DatepickerDate | null)[][] = [];
    let date = new DatepickerDate(d).setDate(1);
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
