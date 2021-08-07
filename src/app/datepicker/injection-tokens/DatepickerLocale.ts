import { InjectionToken } from "@angular/core";
import { IDatepickerLocale } from "../models/IDatepickerLocale";

export const DatepickerLocale = new InjectionToken<Required<IDatepickerLocale>>('DatepickerLocale');
