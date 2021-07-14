import { Component, OnInit } from '@angular/core';

enum EPickerType {
  Years,
  Months,
  Days
}

@Component({
  selector: 'app-file-preview-overlay',
  templateUrl: './datepicker-overlay.component.html',
  styleUrls: ['./datepicker-overlay.component.scss']
})
export class DatepickerOverlayComponent implements OnInit {
  public pickerTypes = EPickerType;

  public pickerType: EPickerType = EPickerType.Days;

  constructor() { }

  ngOnInit(): void {
  }

  public goToSelectDay(): void {
    this.pickerType = EPickerType.Days;
  }

  public goToSelectMonth(): void {
    this.pickerType = EPickerType.Months;
  }

  public goToSelectYear(): void {
    this.pickerType = EPickerType.Years;
  }

}
