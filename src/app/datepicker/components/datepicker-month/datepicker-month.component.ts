import { Component, OnInit } from '@angular/core';
import {DatepickerDateService} from "../../services/datepicker-date.service";
import {DatepickerDate} from "../../models/DatepickerDate";

@Component({
  selector: 'app-datepicker-month',
  templateUrl: './datepicker-month.component.html',
  styleUrls: ['./datepicker-month.component.scss']
})
export class DatepickerMonthComponent implements OnInit {
  public monthShortNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  public monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  public days: (DatepickerDate | null)[][] = [];

  public selectedDate!: DatepickerDate;

  public currentSelectedDate!: DatepickerDate;

  // @ts-ignore
  get month(): string {
    if (this.currentSelectedDate) {
      return this.monthNames[this.currentSelectedDate.getMonth()];
    }
  }

  get year(): number {
    return this.currentSelectedDate.getYear();
  }

  get currentDate(): number {
    // todo создается новый экземпляр при каждом вызове
    return this.datepickerDateService.currentDate.getDate();
  }

  constructor(
    private datepickerDateService: DatepickerDateService
  ) { }

  ngOnInit(): void {
    this.subscribeToDateChanged();
  }

  public isCurrentDate(date: DatepickerDate): boolean {
    if (!date) return false;
    const currentDate = this.datepickerDateService.currentDate;
    return date.isSame(currentDate.getISOString(), 'day');
  }

  public isSelectedDate(date: DatepickerDate): boolean {
    if (!date) return false;
    return date.isSame(this.selectedDate.getISOString(), 'day');
  }

  private subscribeToDateChanged(): void {
    this.datepickerDateService.currentSelectedDate$.subscribe((selectedDate) => {
      this.currentSelectedDate = selectedDate;
      this.days = this.datepickerDateService.getMonthDates(selectedDate.getISOString());
    });

    this.datepickerDateService.selectedDate$.subscribe(selectedDate => {
      this.selectedDate = selectedDate;
    })
  }

  public nextMonth(): void {
    this.datepickerDateService.setCurrentSelectedDate(
      this.datepickerDateService.currentSelectedDate.setMonth(
        this.datepickerDateService.currentSelectedDate.getMonth() + 1
      ).getISOString()
    )
  }

  public prevMonth(): void {
    this.datepickerDateService.setCurrentSelectedDate(
      this.datepickerDateService.currentSelectedDate.setMonth(
        this.datepickerDateService.currentSelectedDate.getMonth() - 1
      ).getISOString()
    )
  }

  public nextYear(): void {
    this.datepickerDateService.setCurrentSelectedDate(
      this.datepickerDateService.currentSelectedDate.setYear(
        this.datepickerDateService.currentSelectedDate.getYear() + 1
      ).getISOString()
    )
  }

  public prevYear(): void {
    this.datepickerDateService.setCurrentSelectedDate(
      this.datepickerDateService.currentSelectedDate.setYear(
        this.datepickerDateService.currentSelectedDate.getYear() - 1
      ).getISOString()
    )
  }

  public selectMonthDay(ISOString: string): void {
    this.datepickerDateService.setSelectedDate(ISOString);
  }

}
