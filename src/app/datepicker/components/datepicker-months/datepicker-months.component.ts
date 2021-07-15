import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DatepickerService} from "../../services/datepicker.service";

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
    private datepickerService: DatepickerService
  ) { }

  ngOnInit(): void {
  }

  public selectMonth(month: number): void {
    this.datepickerService.setCurrentSelectedDate(
      this.datepickerService.currentSelectedDate.setMonth(month).getJSDate()
    )
    this.monthSelected.emit();
  }

}
