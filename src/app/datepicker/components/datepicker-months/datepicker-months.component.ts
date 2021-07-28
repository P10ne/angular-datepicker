import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {DatepickerLocale} from "../../injection-tokens/DatepickerLocale";
import {IDatepickerLocale} from "../../models/IDatepickerLocale";

@Component({
  selector: 'app-datepicker-months',
  templateUrl: './datepicker-months.component.html',
  styleUrls: ['./datepicker-months.component.scss']
})
export class DatepickerMonthsComponent implements OnInit {
  @Output()
  monthSelected: EventEmitter<number> = new EventEmitter<number>();

  public get months(): string[] | undefined {
    return this.localeConfig.months;
  }

  constructor(
    @Inject(DatepickerLocale) private localeConfig: IDatepickerLocale
  ) { }

  ngOnInit(): void {
  }

  public selectMonth(month: number): void {
    this.monthSelected.emit(month);
  }

}
