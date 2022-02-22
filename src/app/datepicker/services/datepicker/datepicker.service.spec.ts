import { TestBed } from "@angular/core/testing";
import { DatepickerService } from "./datepicker.service";
import { DatepickerDate } from "../../models/DatepickerDate";
import { DatepickerDateService } from "../datepicker-date.service";

describe('DatepickerService', () => {
  let datepickerDateCreateSpy: jasmine.Spy;
  beforeEach(() => {
    datepickerDateCreateSpy = jasmine.createSpy('create').and.returnValue(new DatepickerDate());
    const mockDatepickerDateService = {
      create: datepickerDateCreateSpy
    }
    TestBed.configureTestingModule({
      providers: [
        DatepickerService,
        {
          provide: DatepickerDateService,
          useValue: mockDatepickerDateService
        }
      ]
    })
  })

  describe('Initial values', () => {
    it('Initial currentSelectedDate is instance of DatepickerDate with current date', () => {
      const datepickerService = TestBed.inject(DatepickerService);
      expect(datepickerService.currentSelectedDate).toEqual(jasmine.any(DatepickerDate));
      // datepickerDateService.create() without params should return current date
      expect(datepickerDateCreateSpy).toHaveBeenCalledWith();
    })
  })
})
