import {AfterViewInit, Component, ElementRef, forwardRef, OnInit, ViewChild} from '@angular/core';
import {DatepickerOverlayService} from "../../services/datepicker-overlay.service";
import {DatepickerService} from "../../services/datepicker.service";
import {DatepickerOverlayRef} from "../../models/DatepickerOverlayRef";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerInputComponent),
    multi: true
  }]
})
export class DatepickerInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild('datepicker', {read: ElementRef}) private datepicker!: ElementRef;

  @ViewChild('btn', {read: ElementRef}) private btn!: ElementRef;

  public inputValue: string | null = null;

  private layoutRef: DatepickerOverlayRef | undefined;

  constructor(
    private datepickerOverlayService: DatepickerOverlayService,
    private datepickerService: DatepickerService
  ) {}
  public openPicker(): void {
    this.layoutRef = this.datepickerOverlayService.open(this.datepicker);
  }

  ngOnInit(): void {
    this.subscribeToSelectedDateChange();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initDate());
  }

  private subscribeToSelectedDateChange(): void {
    this.datepickerService.selectedDate$.subscribe(date => {
      if (date) {
        this.value = date?.getISOString();
        this.layoutRef?.close();
      }
    });
  }

  private initDate(): void {
    if (this.inputValue) {
      this.datepickerService.setSelectedDate(this.inputValue);
      this.datepickerService.setCurrentSelectedDate(this.inputValue);
    }
  }

  // ControlValueAccessor implementation
  onChange: any = () => {}
  onTouch: any = () => {}

  set value(val: string | null) {
    this.inputValue = val;
    this.onChange(val);
    this.onTouch();
  }

  get value(): string | null {
    return this.inputValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: string): void {
    this.value = obj;
  }

}
