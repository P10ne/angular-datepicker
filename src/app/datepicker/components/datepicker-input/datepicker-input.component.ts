import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  forwardRef,
  Inject,
  Injector,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import { DatepickerConfigToken, DatepickerOverlayService } from "../../services/datepicker-overlay.service";
import { DatepickerService } from "../../services/datepicker/datepicker.service";
import { DatepickerOverlayRef } from "../../models/DatepickerOverlayRef";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { DatepickerDate } from "../../models/DatepickerDate";
import { DatepickerConfig } from "../../models/DatepickerConfig";
import { DatepickerLocale } from "../../injection-tokens/DatepickerLocale";
import { IDatepickerLocale } from "../../models/IDatepickerLocale";
import { getMaskFormat } from "../../utils/getMaskFormat";
import { withSimpleTextControlValueAccessor } from "../../mixins/withSimpleTextControlValueAccessor";
import { withDestroy } from "../../mixins/withDestroy";
import { Mixin } from "ts-mixer";

@Component({
  selector: 'app-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    DatepickerService
  ]
})
export class DatepickerInputComponent extends Mixin(withDestroy(), withSimpleTextControlValueAccessor()) implements OnInit, AfterViewInit {
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

  // Only for storybook actions test
  @Output()
  pickerOpened = new EventEmitter<void>();

  get dateFormat(): string {
    if (!this.config.allowTime) { return this.config.dateFormat }
    return `${this.config.dateFormat} ${this.config.timeFormat}`;
  }

  get maskFormat(): string {
    return getMaskFormat(this.dateFormat);
  }

  @ViewChild('datepicker', {read: ElementRef}) private datepicker!: ElementRef;

  @ViewChild('btn', {read: ElementRef}) private btn!: ElementRef;

  private layoutRef: DatepickerOverlayRef | undefined;

  constructor(
    private datepickerOverlayService: DatepickerOverlayService,
    private datepickerService: DatepickerService,
    @Inject(DatepickerConfigToken) public config: DatepickerConfig,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }
  public openPicker(): void {
    this.layoutRef = this.datepickerOverlayService.open(
      this.datepicker,
      this.datepickerService,
      this.config
    );
    this.pickerOpened.emit();
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
        this.cdr.markForCheck();
      }
    });
  }

  private initDate(): void {
    if (this.value) {
      this.datepickerService.setSelectedDate(this.value);
      this.datepickerService.setCurrentSelectedDate(this.value);
    }
  }

  modelChangeHandler(nextModelValue: string): void {
    // todo to optimize
    const date = new DatepickerDate(nextModelValue, DatepickerDate.getFormat(this.dateFormat), true);
    if (date.isValid()) {
      this.value = date.getJSDate();
      this.initDate();
    }
  }

}
