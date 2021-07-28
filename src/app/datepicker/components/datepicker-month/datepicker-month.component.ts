import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {DatepickerService} from "../../services/datepicker.service";
import {DatepickerDate} from "../../models/DatepickerDate";
import {takeUntil} from "rxjs/operators";
import {DestroyService} from "../../../shared/services/destroy.service";
import {DatepickerLocale} from "../../injection-tokens/DatepickerLocale";
import {IDatepickerLocale} from "../../models/IDatepickerLocale";

@Component({
  selector: 'app-datepicker-month',
  templateUrl: './datepicker-month.component.html',
  styleUrls: ['./datepicker-month.component.scss'],
  providers: [DestroyService]
})
export class DatepickerMonthComponent implements OnInit {
  @Output()
  changeMonth: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  changeYear: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  monthClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  yearClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  selectDay: EventEmitter<number> = new EventEmitter<number>();

  public get weekDaysMin(): string[] | undefined {
    return this.localeConfig.weekDaysMin;
  }

  public get months(): string[] | undefined {
    return this.localeConfig.months
  }

  public days: (DatepickerDate | null)[][] = [];

  public selectedDate!: DatepickerDate | null;

  public currentSelectedDate!: DatepickerDate;

  get month(): string | undefined {
    if (this.currentSelectedDate) {
      return this.months && this.months[this.currentSelectedDate.getMonth()];
    }
    return;
  }

  get year(): number {
    return this.currentSelectedDate.getYear();
  }

  constructor(
    private datepickerService: DatepickerService,
    private destroy$: DestroyService,
    @Inject(DatepickerLocale) private localeConfig: IDatepickerLocale
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
    this.changeMonth.emit(this.currentSelectedDate.getMonth() + 1);
  }

  public prevMonth(): void {
    this.changeMonth.emit(this.currentSelectedDate.getMonth() - 1);
  }

  public nextYear(): void {
    this.changeYear.emit(this.currentSelectedDate.getYear() + 1);
  }

  public prevYear(): void {
    this.changeYear.emit(this.currentSelectedDate.getYear() - 1);
  }

  public selectMonthDay(date: number): void {
    this.selectDay.emit(date);
  }

}
