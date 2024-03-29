import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatepickerService } from "../../services/datepicker/datepicker.service";

@Component({
  selector: 'app-datepicker-years',
  templateUrl: './datepicker-years.component.html',
  styleUrls: ['./datepicker-years.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerYearsComponent implements OnInit {
  @Output()
  yearSelected: EventEmitter<number> = new EventEmitter<number>();

  private currentYearOffset: number = 0;

  public years: number[] = [];

  constructor(
    private datepickerService: DatepickerService
  ) { }

  ngOnInit(): void {
    this.years = this.datepickerService.getYears();
  }

  public updateYears(offSetDirection: -1 | 1): void {
    this.currentYearOffset += offSetDirection;
    this.years = this.datepickerService.getYears(this.currentYearOffset);
  }

  public selectYear(year: number): void {
    this.yearSelected.emit(year);
  }
}
