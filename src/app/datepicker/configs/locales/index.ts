import {IDatepickerLocaleConfig} from "../../models/IDatepickerLocaleConfig";
import localeRu from './ru';
import localeEn from "./en";

export const locales: Record<string, Required<IDatepickerLocaleConfig>> = {
  ru: localeRu,
  en: localeEn
};
