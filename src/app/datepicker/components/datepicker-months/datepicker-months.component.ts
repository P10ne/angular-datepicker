import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DatepickerDateService} from "../../services/datepicker-date.service";

@Component({
  selector: 'app-datepicker-months',
  templateUrl: './datepicker-months.component.html',
  styleUrls: ['./datepicker-months.component.scss']
})
export class DatepickerMonthsComponent implements OnInit {
  @Output()
  monthSelected: EventEmitter<void> = new EventEmitter<void>();

  public monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  constructor(
    private datepickerDateService: DatepickerDateService
  ) { }

  ngOnInit(): void {
  }

  public selectMonth(month: number): void {
    this.datepickerDateService.setCurrentSelectedDate(
      this.datepickerDateService.currentSelectedDate.setMonth(month).getISOString()
    )
    this.monthSelected.emit();
  }

}
