import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker-month',
  templateUrl: './datepicker-month.component.html',
  styleUrls: ['./datepicker-month.component.scss']
})
export class DatepickerMonthComponent implements OnInit {
  public monthShortNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  public get days(): number[][] {
    return [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31]
    ];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
