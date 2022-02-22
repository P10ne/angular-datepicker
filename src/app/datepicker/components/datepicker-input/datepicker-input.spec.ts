import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef } from "@angular/core";
import { DatepickerInputComponent } from "./datepicker-input.component";
import { DatepickerConfigToken, DatepickerOverlayService } from "../../services/datepicker-overlay.service";
import localeRu from "../../configs/locales/ru";
import { DatepickerService } from "../../services/datepicker/datepicker.service";

describe('DatepickerInputComponent', () => {
  let datepickerServiceMock: DatepickerService = jasmine.createSpyObj<DatepickerService>('datepickerServiceMock', [
    'setSelectedDate',
    'setCurrentSelectedDate'
  ]);
  let datepickerOverlayServiceMock: DatepickerOverlayService = jasmine.createSpyObj('datepickerOverlayServiceMock', [
    'open'
  ]);
  let fixture: ComponentFixture<DatepickerInputComponent>;
  let comp: DatepickerInputComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DatepickerInputComponent
      ],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DatepickerInputComponent),
          multi: true
        },
        {
          provide: DatepickerConfigToken,
          useValue: localeRu
        },
        {
          provide: DatepickerService,
          useValue: datepickerServiceMock
        },
        {
          provide: DatepickerOverlayService,
          useValue: datepickerOverlayServiceMock
        }
      ]
    })

    fixture = TestBed.createComponent(DatepickerInputComponent);
    fixture.detectChanges();
  })

  it('should update date components in DatepickerService', () => {
    expect(fixture.componentInstance).toBeDefined();
  })
})
