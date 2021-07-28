import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import { OverlayModule } from "@angular/cdk/overlay";
import { DatepickerOverlayComponent } from "./components/datepicker-overlay/datepicker-overlay.component";
import { DatepickerInputComponent } from './components/datepicker-input/datepicker-input.component';
import { DatepickerMonthComponent } from './components/datepicker-month/datepicker-month.component';
import {DatepickerOverlayService} from "./services/datepicker-overlay.service";
import { DatepickerMonthsComponent } from './components/datepicker-months/datepicker-months.component';
import { DatepickerYearsComponent } from './components/datepicker-years/datepicker-years.component';
import {FormsModule} from "@angular/forms";
import {DatepickerDateService} from "./services/datepicker-date.service";
import {SharedModule} from "../shared/shared.module";
import { NgxMaskModule } from 'ngx-mask'
import {SvgIconsModule} from "../svg-icons/svg-icons.module";
import {IDatepickerLocaleConfig} from "./models/IDatepickerLocaleConfig";
import {IDatepickerLocale} from "./models/IDatepickerLocale";
import {locales} from "./configs/locales";
import {TDatepickerWeekStart} from "./models/TDatepickerWeekStart";
import { DatepickerTimeComponent } from './components/datepicker-time/datepicker-time.component';
import { DatepickerLocale } from "./injection-tokens/DatepickerLocale";

@NgModule({
  declarations: [
    DatepickerOverlayComponent,
    DatepickerInputComponent,
    DatepickerMonthComponent,
    DatepickerMonthsComponent,
    DatepickerYearsComponent,
    DatepickerTimeComponent
  ],
  imports: [
    OverlayModule,
    FormsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    SvgIconsModule
  ],
  exports: [
    DatepickerInputComponent
  ],
  entryComponents: [
    DatepickerOverlayComponent
  ],
  providers: [
    DatepickerOverlayService,
    DatepickerDateService
  ]
})
export class DatepickerModule {
  public static forRoot(locale?: IDatepickerLocale): ModuleWithProviders<DatepickerModule> {
    const DEFAULT_LOCALE = 'ru';
    const config: Required<IDatepickerLocaleConfig> = locales[locale ? locale.name : DEFAULT_LOCALE];
    if (!config) throw new Error(`Locale ${locale?.name} was not found`);
    const datepickerLocale: Required<IDatepickerLocale> = {
      name: DEFAULT_LOCALE,
      ...config,
    };
    datepickerLocale.weekDaysMin = getWeekNamesByWeekStart(datepickerLocale.weekDaysMin, datepickerLocale.weekStart);
    return {
      ngModule: DatepickerModule,
      providers: [
        {
          provide: DatepickerLocale,
          useValue: datepickerLocale
        }
      ]
    }
  }
}

function getWeekNamesByWeekStart(weekNames: string[], weekStart: TDatepickerWeekStart): string[] {
  if (weekStart === 0) return weekNames;
  const [sunday, ...days] = weekNames;
  return [...days, sunday];
}
