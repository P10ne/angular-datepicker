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

  setSelectedDate(date: Date): void {
    this._selectedDate$.next(this.datepickerDateService.create(date));
  }

  setCurrentSelectedDate(date: Date): void {
    this._currentSelectedDate$.next(this.datepickerDateService.create(date));
  }

  getMonthDates(d: Date): (DatepickerDate | null)[][] {
    const date = this.datepickerDateService.create(d).setDate(1);
    const monthStartDay: number = date.getDay();
    const daysInMonth = date.getDaysInMonth();
    const daysInMonthWithStartNulls = daysInMonth + monthStartDay;
    const flatMonthDays = new Array(daysInMonthWithStartNulls).fill(null).map((_, i) => {
      if (i < monthStartDay || i > daysInMonthWithStartNulls) { return null }
      else {
        return date.setDate(i - monthStartDay + 1);
      }
    });

    const DAYS_IN_WEEK = 7;
    const result: (DatepickerDate | null)[][] = [];
    while(flatMonthDays.length > 0) {
      const weekDates = flatMonthDays.splice(0, DAYS_IN_WEEK);
      result.push(weekDates);
    }
    return result;
  }

  getYears(offset: number = 0): number[] {
    const selectedYear = this.currentSelectedDate.getYear();
    const startDecadeYear = (Math.floor(selectedYear / 10) + offset) * 10;
    return new Array(10).fill(0).map((v, i) => startDecadeYear + i);
  }
}
