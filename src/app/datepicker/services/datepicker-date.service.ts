import {Inject, Injectable} from '@angular/core';
import {DatepickerDate} from "../models/DatepickerDate";
import * as dayjs from 'dayjs';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import * as weekday from 'dayjs/plugin/weekday';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import {ConfigType} from "dayjs";
import {DatepickerLocale} from "../injection-tokens/DatepickerLocale";
import {IDatepickerLocale} from "../models/IDatepickerLocale";

@Injectable()
export class DatepickerDateService {
  constructor(
    @Inject(DatepickerLocale) private localeConfig: IDatepickerLocale
  ) {
    dayjs.extend(updateLocale);
    dayjs.extend(weekday);
    dayjs.extend(customParseFormat);
    // Dayjs locale name does not change
    dayjs.updateLocale('en', {
      weekStart: this.localeConfig.weekStart
    });
  }

  public create(config?: ConfigType): DatepickerDate {
    return new DatepickerDate(config);
  }
}
