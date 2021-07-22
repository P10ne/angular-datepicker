import {IDatepickerLocaleConfig} from "../../models/IDatepickerLocaleConfig";

const localeEn: Required<IDatepickerLocaleConfig> = {
  weekStart: 0,
  months: [
    'January ', 'February ', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  weekDaysMin: [
    'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'
  ],
  dateFormat: 'MM-dd-yyyy'
}

export default localeEn;
