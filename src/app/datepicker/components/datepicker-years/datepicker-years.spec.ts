import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DatepickerYearsComponent } from "./datepicker-years.component";
import { DatepickerService } from "../../services/datepicker/datepicker.service";
import { By } from "@angular/platform-browser";
import { ChangeDetectionStrategy, DebugElement } from "@angular/core";
import Spy = jasmine.Spy;

describe('DatepickerYearsComponent', () => {
  let fixture: ComponentFixture<DatepickerYearsComponent>;
  let component: DatepickerYearsComponent;
  let debugElement: DebugElement;
  let datepickerServiceMock: { getYears: (offset: number) => number[] };
  let getYearsSpy: Spy;
  const GET_YEARS_DEFAULT_RETURN_VALUE = [1];

  beforeEach(async () => {
    datepickerServiceMock = {
      getYears: () => []
    };

    getYearsSpy = spyOn(datepickerServiceMock, 'getYears').and.returnValue(GET_YEARS_DEFAULT_RETURN_VALUE);

    await TestBed.configureTestingModule({
      declarations: [DatepickerYearsComponent],
      providers: [
        {
          provide: DatepickerService,
          useValue: datepickerServiceMock
        }
      ]
    }).overrideComponent(DatepickerYearsComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerYearsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  })

  describe('initialization', () => {
    it('should be defined', () => {
      expect(fixture.componentInstance).toBeDefined();
    })

    it('years property should be defined', () => {
      getYearsSpy.and.returnValue(GET_YEARS_DEFAULT_RETURN_VALUE);

      expect(datepickerServiceMock.getYears).toHaveBeenCalled();
      expect(component.years).toEqual(GET_YEARS_DEFAULT_RETURN_VALUE);
    })
  })

  describe('render nodes', () => {
    const yearsData = [ 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024 ];
    const firstYearValue = yearsData[0];
    const lastYearValue = yearsData[yearsData.length - 1];

    beforeEach(() => {
      component.years = yearsData;
      fixture.detectChanges();
    })

    it('should render years', () => {
      const firstYearNode = debugElement.query(By.css(`[data-test-year-id="${firstYearValue}"]`));
      const lastYearNode = debugElement.query(By.css(`[data-test-year-id="${lastYearValue}"]`));

      expect((firstYearNode.nativeElement as HTMLSpanElement).textContent).toBe(firstYearValue.toString());
      expect((lastYearNode.nativeElement as HTMLSpanElement).textContent).toBe(lastYearValue.toString());
    })

    it('should render years range on header', () => {
      const yearsRangeNode = debugElement.query(By.css(`[data-test-id="years-range"]`));
      expect(
        (yearsRangeNode.nativeElement as HTMLSpanElement).textContent
      ).toBe(` ${firstYearValue} - ${lastYearValue} `)
    })
  })

  describe('changing decades', () => {
    it('should take new years list from datepicker.getYears() called with offset for prev decade', () => {
      const prevDecadeBtn = debugElement.query(By.css(`[data-test-id="prev-decade-btn"]`));

      const testPrevDecade = (getYearsMockReturnValue: number[], getYearsArg: number) => {
        getYearsSpy.and.returnValue(getYearsMockReturnValue);
        prevDecadeBtn.triggerEventHandler('click', null);
        expect(datepickerServiceMock.getYears).toHaveBeenCalledWith(getYearsArg);
        expect(component.years).toEqual(getYearsMockReturnValue);
      }

      testPrevDecade([1, 2, 3], -1);
      testPrevDecade([1, 2, 5], -2);
    })

    it('should new next years list from datepicker.getYears() called with offset for next decade', () => {
      const nextDecadeBtn = debugElement.query(By.css(`[data-test-id="next-decade-btn"]`));

      const testNextDecade = (getYearsMockReturnValue: number[], getYearsArg: number) => {
        getYearsSpy.and.returnValue(getYearsMockReturnValue);
        nextDecadeBtn.triggerEventHandler('click', null);
        expect(datepickerServiceMock.getYears).toHaveBeenCalledWith(getYearsArg);
        expect(component.years).toEqual(getYearsMockReturnValue);
      }

      testNextDecade([1, 2, 3], 1);
      testNextDecade([1, 2, 5], 2);
    })
  })
})
