import { Component, OnInit } from '@angular/core';
import {DatepickerService} from "../../services/datepicker.service";
import {DatepickerTime} from "../../models/DatepickerTime";

enum EPickerType {
  Years,
  Months,
  Days,
  Time
}

@Component({
  selector: 'app-file-preview-overlay',
  templateUrl: './datepicker-overlay.component.html',
  styleUrls: ['./datepicker-overlay.component.scss']
})
export class DatepickerOverlayComponent implements OnInit {
  public pickerTypes = EPickerType;

  public pickerType: EPickerType = EPickerType.Days;

  constructor(
    private datepickerService: DatepickerService
  ) { }

  ngOnInit(): void {
  }

  public selectDayHandler(day: number): void {
    this.setCurrentSelectedDate(day);
    this.goToSelectTime();
  }


  public selectYearHandler(year: number): void {
    this.setCurrentSelectedYear(year);
    this.goToSelectMonth();
  }

  public selectMonthHandler(month: number): void {
    this.setCurrentSelectedMonth(month);
    this.goToSelectDay();
  }

  public setCurrentSelectedYear(year: number): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setYear(year).getJSDate()
    );
  }

  public setCurrentSelectedMonth(month: number): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setMonth(month).getJSDate()
    );
  }

  public setCurrentSelectedDate(date: number): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setDate(date).getJSDate()
    )
  }

  public selectTimeHandler(time: DatepickerTime): void {
    this.datepickerService.setSelectedDate(
      this.datepickerService.currentSelectedDate.setTime(time).getJSDate()
    )
  }

  public goToSelectTime(): void {
    this.pickerType = EPickerType.Time;
  }

  public goToSelectDay(): void {
    this.pickerType = EPickerType.Days;
  }

  public goToSelectMonth(): void {
    this.pickerType = EPickerType.Months;
  }

  public goToSelectYear(): void {
    this.pickerType = EPickerType.Years;
  }

}
