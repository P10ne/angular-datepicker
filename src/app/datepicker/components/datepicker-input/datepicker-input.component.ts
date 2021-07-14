import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DatepickerOverlayService} from "../../services/datepicker-overlay.service";
import {DatepickerDateService} from "../../services/datepicker-date.service";
import {DatepickerOverlayRef} from "../../models/DatepickerOverlayRef";

@Component({
  selector: 'app-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss']
})
export class DatepickerInputComponent implements OnInit {
  @ViewChild('datepicker', {read: ElementRef}) private datepicker!: ElementRef;

  @ViewChild('btn', {read: ElementRef}) private btn!: ElementRef;

  public inputValue: string = '';

  private layoutRef: DatepickerOverlayRef | undefined;

  constructor(
    private datepickerOverlayService: DatepickerOverlayService,
    private datepickerDateService: DatepickerDateService
  ) {}
  public openPicker(): void {
    this.layoutRef = this.datepickerOverlayService.open(this.datepicker);
  }

  ngOnInit(): void {
    this.subscribeToSelectedDateChange();
    this.initDate();
  }

  private subscribeToSelectedDateChange(): void {
    this.datepickerDateService.selectedDate$.subscribe(date => {
      if (date) {
        this.inputValue = date?.getISOString();
        this.layoutRef?.close();
      }
    });
  }

  private initDate(): void {
    this.datepickerDateService.setSelectedDate(this.inputValue);
    this.datepickerDateService.setCurrentSelectedDate(this.inputValue);
  }

}
