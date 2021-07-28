import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { DatepickerConfigToken, DatepickerOverlayService } from "../../services/datepicker-overlay.service";
import {DatepickerService} from "../../services/datepicker.service";
import {DatepickerOverlayRef} from "../../models/DatepickerOverlayRef";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DestroyService} from "../../../shared/services/destroy.service";
import {takeUntil} from "rxjs/operators";
import {DatepickerDate} from "../../models/DatepickerDate";
import { DatepickerConfig } from "../../models/DatepickerConfig";
import { DatepickerLocale } from "../../injection-tokens/DatepickerLocale";
import { IDatepickerLocale } from "../../models/IDatepickerLocale";
import { getMaskFormat } from "../../utils/getMaskFormat";

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
    {
      provide: DatepickerConfigToken,
      useFactory: (injector: Injector) => {
        const localeConfig: Required<IDatepickerLocale> = injector.get(DatepickerLocale);
        return new DatepickerConfig({
          dateFormat: localeConfig.dateFormat
        })
      },
      deps: [Injector]
    },
    DatepickerService,
    DestroyService
  ]
})
export class DatepickerInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input()
  set allowTime(v: boolean) {
    this.config.allowTime = v;
  }

  @Input()
  set dateFormat(v: string) {
    this.config.dateFormat = v;
  }

  @Input()
  set timeFormat(v: string) {
    this.config.timeFormat = v;
  }

  get dateFormat(): string {
    if (!this.config.allowTime) { return this.config.dateFormat }
    return `${this.config.dateFormat} ${this.config.timeFormat}`;
  }

  get maskFormat(): string {
    return getMaskFormat(this.dateFormat);
  }

  @ViewChild('datepicker', {read: ElementRef}) private datepicker!: ElementRef;

  @ViewChild('btn', {read: ElementRef}) private btn!: ElementRef;

  public inputValue: Date | null = null;

  private layoutRef: DatepickerOverlayRef | undefined;

  constructor(
    private datepickerOverlayService: DatepickerOverlayService,
    private datepickerService: DatepickerService,
    private destroy$: DestroyService,
    @Inject(DatepickerConfigToken) public config: DatepickerConfig
  ) {}
  public openPicker(): void {
    this.layoutRef = this.datepickerOverlayService.open(
      this.datepicker,
      this.datepickerService,
      this.config
    );
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

  modelChangeHandler(nextModelValue: string): void {
    // todo to optimize
    const date = new DatepickerDate(nextModelValue, DatepickerDate.getFormat(this.dateFormat), true);
    if (date.isValid()) {
      this.value = date.getJSDate();
    }
  }

}
