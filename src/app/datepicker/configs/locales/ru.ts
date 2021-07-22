import {IDatepickerLocaleConfig} from "../../models/IDatepickerLocaleConfig";

const localeRu: Required<IDatepickerLocaleConfig> = {
  weekStart: 1,
  months: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ],
  weekDaysMin: [
    'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
  ],
  dateFormat: 'dd.MM.yyyy'
}

export default localeRu;
