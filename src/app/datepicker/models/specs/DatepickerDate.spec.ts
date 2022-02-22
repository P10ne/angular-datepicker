import { DatepickerDate } from "../DatepickerDate";
import * as dayjs from "dayjs";
import * as updateLocale from "dayjs/plugin/updateLocale";
import * as weekday from "dayjs/plugin/weekday";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import { DatepickerTime } from "../DatepickerTime";

describe('DatepickerDate', () => {
  beforeAll(() => {
    dayjs.extend(updateLocale);
    dayjs.extend(weekday);
    dayjs.extend(customParseFormat);
    // Dayjs locale name does not change
    dayjs.updateLocale('en', {
      weekStart: 1 // monday
    });
  })

  describe('Initial values', () => {

    it('Date is current when no arguments', () => {
      jasmine.clock().mockDate();
      const d = new DatepickerDate();
      expect(d.getJSDate().getTime()).toBe(new Date().getTime());
    })

    it('Date is equal date from argument', () => {
      const d = new DatepickerDate('2020-10-10T14:00:00');
      expect(d.getJSDate().getTime()).toBe(new Date('2020-10-10T14:00:00').getTime());
    })
  })


  describe('Getting date components', () => {

    let datepicker: DatepickerDate;

    beforeEach(() => {
      datepicker = new DatepickerDate('2021-09-22');
    })

    it('getYear return year of date from instance', () => {
      expect(datepicker.getYear()).toBe(2021);
    })

    it('getMonth return month index of date from instance', () => {
      expect(datepicker.getMonth()).toBe(8);
    })

    it('getDay return weekday index of date from instance', () => {
      expect(datepicker.getDay()).toBe(2);
    })

    it('getTime return DatepickerTime instance', () => {
      expect(datepicker.getTime()).toEqual(jasmine.any(DatepickerTime));
    })
  })

  describe('isSame check that instance date component is equal argument date component', () => {
    let datepicker: DatepickerDate;
    beforeEach(() => {
      datepicker = new DatepickerDate('2021-09-22');
    })
    it('is same year', () => {
      expect(datepicker.isSame(new Date('2021-09-22'), 'year')).toBe(true);
    })
    it('is not same year', () => {
      expect(datepicker.isSame(new Date('2020-09-22'), 'year')).toBe(false);
    })
  })

  describe('Date manipulations', () => {
    let datepicker: DatepickerDate;
    let date: Date;
    beforeEach(() => {
      date = new Date('2021-09-22');
      jasmine.clock().mockDate(date);
      datepicker = new DatepickerDate(date);
    })

    it('should return new instance with the new year', () => {
      // set the year to one less
      const dateWithNewYear = datepicker.setYear(2020);
      expect(dateWithNewYear).toEqual(jasmine.any(DatepickerDate));
      expect(dateWithNewYear.getYear()).toBe(2020);
      const MILLISECONDS_IN_YEAR = 31536000000;
      expect(
        date.getTime() - dateWithNewYear.getJSDate().getTime()
      ).toBe(MILLISECONDS_IN_YEAR);
    })
  })
})
