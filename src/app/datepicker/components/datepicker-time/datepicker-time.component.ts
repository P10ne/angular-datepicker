import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatepickerTime } from "../../models/DatepickerTime";
import { DatepickerService } from "../../services/datepicker.service";
import { map, takeUntil } from "rxjs/operators";
import { withDestroy } from "../../mixins/withDestroy";

@Component({
  selector: 'app-datepicker-time',
  templateUrl: './datepicker-time.component.html',
  styleUrls: ['./datepicker-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerTimeComponent extends withDestroy() implements OnInit {
  @Output()
  private selectTime: EventEmitter<DatepickerTime> = new EventEmitter<DatepickerTime>();

  public selectedTime: DatepickerTime = new DatepickerTime();

  public hours: number[] = new Array(24).fill(0).map((v, i) => i);

  public minutes: number[] = new Array(60).fill(0).map((v, i) => i);

  public seconds: number[] = new Array(60).fill(0).map((v, i) => i);

  constructor(
    private datepickerService: DatepickerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeToDateChanged();
  }

  private subscribeToDateChanged(): void {
    this.datepickerService.currentSelectedDate$.pipe(
      map(date => date.getTime()),
      takeUntil(this.destroy$)
    ).subscribe(time => {
      this.selectedTime = time;
    })
  }

  public setHours(v: number): void {
    this.selectedTime.setHours(v);
  }

  public setMinutes(v: number): void {
    this.selectedTime.setMinutes(v);
  }

  public setSeconds(v: number): void {
    this.selectedTime.setSeconds(v);
  }

  public setTime(): void {
    this.selectTime.emit(this.selectedTime);
  }

}
