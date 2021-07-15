import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { DatepickerDate } from "../models/DatepickerDate";
import { DatepickerDateService } from "./datepicker-date.service";


@Injectable()
export class DatepickerService {
  private _selectedDate$: BehaviorSubject<DatepickerDate | null> = new BehaviorSubject<DatepickerDate | null>(null);

  private _selectedDate: DatepickerDate | undefined;

  private _currentSelectedDate$: BehaviorSubject<DatepickerDate> = new BehaviorSubject<DatepickerDate>(this.datepickerDateService.create());

  public get selectedDate$(): Observable<DatepickerDate | null> {
    return this._selectedDate$.pipe();
  }

  public get selectedDate(): DatepickerDate | undefined {
    return this._selectedDate;
  }

  public get currentSelectedDate$(): Observable<DatepickerDate> {
    return this._currentSelectedDate$.pipe();
  }

  public get currentSelectedDate(): DatepickerDate {
    return this._currentSelectedDate$.getValue();
  }

  public get currentDate(): DatepickerDate {
    return this.datepickerDateService.create();
  }

  constructor(
    private datepickerDateService: DatepickerDateService
  ) {  }

  setSelectedDate(ISODate: string): void {
    this._selectedDate$.next(this.datepickerDateService.create(ISODate));
  }

  setCurrentSelectedDate(ISODate: string): void {
    this._currentSelectedDate$.next(this.datepickerDateService.create(ISODate));
  }

  getMonthDates(d: any): (DatepickerDate | null)[][] {
    const MAX_WEEKS_AT_MONTH_COUNT = 6;
    const WEEK_DAYS_COUNT = 7;
    const result: (DatepickerDate | null)[][] = [];
    let date = this.datepickerDateService.create(d).setDate(1);
    const monthStartDay: number = date.getDay();
    const daysInMonth = date.getDaysInMonth();
    let exitFlag = false;
    for (let week = 0; week <= MAX_WEEKS_AT_MONTH_COUNT; week++) {
      const weekDates = new Array(WEEK_DAYS_COUNT).fill(null).map((value, weekDayIndex) => {
        if (exitFlag) return this.datepickerDateService.create(date.getISOString());
        let d = null;
        if (week === 0) { // Первая неделя
          if (monthStartDay <= weekDayIndex) {
            d = this.datepickerDateService.create(date.getISOString());
            date = date.setDate(date.getDate() + 1);
          }
        } else {
          d = this.datepickerDateService.create(date.getISOString());
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

  getYears(offset: number = 0): number[] {
    const selectedYear = this.currentSelectedDate.getYear();
    const startDecadeYear = (Math.floor(selectedYear / 10) + offset) * 10;
    return new Array(10).fill(0).map((v, i) => startDecadeYear + i);
  }
}
