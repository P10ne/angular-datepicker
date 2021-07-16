import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-datepicker-months',
  templateUrl: './datepicker-months.component.html',
  styleUrls: ['./datepicker-months.component.scss']
})
export class DatepickerMonthsComponent implements OnInit {
  @Output()
  monthSelected: EventEmitter<number> = new EventEmitter<number>();

  public monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public selectMonth(month: number): void {
    this.monthSelected.emit(month);
  }

}
