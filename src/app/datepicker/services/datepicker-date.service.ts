import { Injectable } from '@angular/core';
import {DatepickerDate} from "../models/DatepickerDate";
import * as dayjs from 'dayjs';
import * as ru_locale from 'dayjs/locale/ru';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import * as weekday from 'dayjs/plugin/weekday';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import {ConfigType} from "dayjs";

@Injectable()
export class DatepickerDateService {
  constructor() {
    dayjs.extend(updateLocale);
    dayjs.locale('ru');
    dayjs.updateLocale('ru', ru_locale);
    dayjs.extend(weekday);
    dayjs.extend(customParseFormat);
  }

  public create(config?: ConfigType): DatepickerDate {
    return new DatepickerDate(config);
  }
}
