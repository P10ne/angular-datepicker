import { Injectable } from '@angular/core';
import {DatepickerDate} from "../models/DatepickerDate";
import * as dayjs from 'dayjs';
import * as ru_locale from 'dayjs/locale/ru';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import * as weekday from 'dayjs/plugin/weekday';

@Injectable()
export class DatepickerDateService {
  constructor() {
    dayjs.extend(updateLocale);
    dayjs.locale('ru');
    dayjs.updateLocale('ru', ru_locale);

    dayjs.extend(weekday);
    DatepickerDate.dateLib = dayjs;
  }

  public create(...args: any[]): DatepickerDate {
    return new DatepickerDate(dayjs, ...args);
  }
}
