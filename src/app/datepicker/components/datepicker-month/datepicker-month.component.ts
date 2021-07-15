import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DatepickerService} from "../../services/datepicker.service";
import {DatepickerDate} from "../../models/DatepickerDate";

@Component({
  selector: 'app-datepicker-month',
  templateUrl: './datepicker-month.component.html',
  styleUrls: ['./datepicker-month.component.scss']
})
export class DatepickerMonthComponent implements OnInit {
  @Output()
  changeMonth: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  changeYear: EventEmitter<void> = new EventEmitter<void>();

  public monthShortNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  public monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  public days: (DatepickerDate | null)[][] = [];

  public selectedDate!: DatepickerDate | null;

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
    return this.datepickerService.currentDate.getDate();
  }

  constructor(
    private datepickerService: DatepickerService
  ) { }

  ngOnInit(): void {
    this.subscribeToDateChanged();
  }

  public isCurrentDate(date: DatepickerDate): boolean {
    if (!date) return false;
    const currentDate = this.datepickerService.currentDate;
    return date.isSame(currentDate.getISOString(), 'day');
  }

  public isSelectedDate(date: DatepickerDate): boolean {
    if (!date || !this.selectedDate) return false;
    return date.isSame(this.selectedDate.getISOString(), 'day');
  }

  private subscribeToDateChanged(): void {
    this.datepickerService.currentSelectedDate$.subscribe((selectedDate) => {
      this.currentSelectedDate = selectedDate;
      this.days = this.datepickerService.getMonthDates(selectedDate.getISOString());
    });

    this.datepickerService.selectedDate$.subscribe(selectedDate => {
      this.selectedDate = selectedDate;
    })
  }

  public nextMonth(): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setMonth(
        this.datepickerService.currentSelectedDate.getMonth() + 1
      ).getISOString()
    )
  }

  public prevMonth(): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setMonth(
        this.datepickerService.currentSelectedDate.getMonth() - 1
      ).getISOString()
    )
  }

  public nextYear(): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setYear(
        this.datepickerService.currentSelectedDate.getYear() + 1
      ).getISOString()
    )
  }

  public prevYear(): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setYear(
        this.datepickerService.currentSelectedDate.getYear() - 1
      ).getISOString()
    )
  }

  public selectMonthDay(ISOString: string): void {
    this.datepickerService.setSelectedDate(ISOString);
  }

}
