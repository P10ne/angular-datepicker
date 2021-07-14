import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DatepickerDateService} from "../../services/datepicker-date.service";

@Component({
  selector: 'app-datepicker-years',
  templateUrl: './datepicker-years.component.html',
  styleUrls: ['./datepicker-years.component.scss']
})
export class DatepickerYearsComponent implements OnInit {
  @Output()
  yearSelected: EventEmitter<void> = new EventEmitter<void>();

  private currentYearOffset: number = 0;

  public years: number[] = [];

  constructor(
    private datepickerDateService: DatepickerDateService
  ) { }

  ngOnInit(): void {
    this.years = this.datepickerDateService.getYears();
  }

  public updateYears(offSetDirection: -1 | 1): void {
    this.currentYearOffset += offSetDirection;
    this.years = this.datepickerDateService.getYears(this.currentYearOffset);
  }

  public selectYear(year: number): void {
    this.datepickerDateService.setCurrentSelectedDate(
      this.datepickerDateService.currentSelectedDate.setYear(year).getISOString()
    )
    this.yearSelected.emit();
  }



}
