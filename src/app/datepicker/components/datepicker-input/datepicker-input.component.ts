import {AfterViewInit, Component, ElementRef, forwardRef, OnInit, ViewChild} from '@angular/core';
import {DatepickerOverlayService} from "../../services/datepicker-overlay.service";
import {DatepickerService} from "../../services/datepicker.service";
import {DatepickerOverlayRef} from "../../models/DatepickerOverlayRef";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DestroyService} from "../../../shared/services/destroy.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerInputComponent),
      multi: true
    },
    DestroyService
  ]
})
export class DatepickerInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild('datepicker', {read: ElementRef}) private datepicker!: ElementRef;

  @ViewChild('btn', {read: ElementRef}) private btn!: ElementRef;

  public inputValue: Date | null = null;

  private layoutRef: DatepickerOverlayRef | undefined;

  constructor(
    private datepickerOverlayService: DatepickerOverlayService,
    private datepickerService: DatepickerService,
    private destroy$: DestroyService
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
    this.datepickerService.selectedDate$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(date => {
      if (date) {
        this.value = date.getJSDate();
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

  set value(val: Date | null) {
    this.inputValue = val;
    this.onChange(val);
    this.onTouch();
  }

  get value(): Date | null {
    return this.inputValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: Date | null): void {
    this.value = obj;
  }

}
