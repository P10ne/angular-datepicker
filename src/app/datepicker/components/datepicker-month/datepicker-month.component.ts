import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DatepickerService} from "../../services/datepicker.service";
import {DatepickerDate} from "../../models/DatepickerDate";
import {takeUntil} from "rxjs/operators";
import {DestroyService} from "../../../shared/services/destroy.service";

@Component({
  selector: 'app-datepicker-month',
  templateUrl: './datepicker-month.component.html',
  styleUrls: ['./datepicker-month.component.scss'],
  providers: [DestroyService]
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
    private datepickerService: DatepickerService,
    private destroy$: DestroyService
  ) { }

  ngOnInit(): void {
    this.subscribeToDateChanged();
  }

  public isCurrentDate(date: DatepickerDate): boolean {
    if (!date) return false;
    const currentDate = this.datepickerService.currentDate;
    return date.isSame(currentDate.getJSDate(), 'day');
  }

  public isSelectedDate(date: DatepickerDate): boolean {
    if (!date || !this.selectedDate) return false;
    return date.isSame(this.selectedDate.getJSDate(), 'day');
  }

  private subscribeToDateChanged(): void {
    this.datepickerService.currentSelectedDate$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((selectedDate) => {
      this.currentSelectedDate = selectedDate;
      this.days = this.datepickerService.getMonthDates(selectedDate.getJSDate());
    });

    this.datepickerService.selectedDate$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(selectedDate => {
      this.selectedDate = selectedDate;
    })
  }

  public nextMonth(): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setMonth(
        this.datepickerService.currentSelectedDate.getMonth() + 1
      ).getJSDate()
    )
  }

  public prevMonth(): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setMonth(
        this.datepickerService.currentSelectedDate.getMonth() - 1
      ).getJSDate()
    )
  }

  public nextYear(): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setYear(
        this.datepickerService.currentSelectedDate.getYear() + 1
      ).getJSDate()
    )
  }

  public prevYear(): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setYear(
        this.datepickerService.currentSelectedDate.getYear() - 1
      ).getJSDate()
    )
  }

  public selectMonthDay(date: Date): void {
    this.datepickerService.setSelectedDate(date);
  }

}
