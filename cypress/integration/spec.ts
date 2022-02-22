import localeRu from "../../src/app/datepicker/configs/locales/ru";

describe('Datepicker', () => {
  const getPrevDecadeBtn: () => Chainable<JQuery> =
    () => cy.get('[data-test-id="prev-decade-btn"]');

  const getControl: () => Chainable<JQuery> =
    () => cy.get('[data-test-id="datepicker-input"]');

  const getMonthLabelOnMonthPicker: () => Chainable<JQuery>
    = () => cy.get('[data-test-id="datepicker-month_month-label"]');

  const getYearLabelOnMonthPicker: () => Chainable<JQuery> =
    () => cy.get('[data-test-id="datepicker-month_year-label"]');

  const getMarkedToday: () => Chainable<JQuery> =
    () => cy.get('.datepicker-month-table__cell_day_current');

  const getSelectedDay: () => Chainable<JQuery> =
    () => cy.get('.datepicker-month-table__cell_day_selected');

  const openPicker: () => void =
    () => cy.get('[data-test-id="open-picker-btn"]').click();

  const closePicker: () => void =
    () => cy.get('body').click(0, 0);

  const pickerShowsValidMonthDays: (
    {year, month}: {year: number, month: number}
  ) => void = ({year, month}) => {
    getDaysOfMonth().should($days => {
      expect($days.first().text()).to.equal(' 1 ');
      const lastDayNumber = new Date(year, month + 1, 0).getDate();
      expect($days.last().text()).to.equal(` ${lastDayNumber.toString()} `);
    })
  }

  const selectDayInPicker: (day: number) => void =
    (day: number) => getDaysOfMonth().eq(day - 1).click();

  const getDaysOfMonth: () => Chainable<JQuery<HTMLElement>> =
    () => cy.get('[data-test-day-of-month]');

  const currentDateComponents = {
    year: 2021,
    month: 8,
    day: 8
  };
  beforeEach(() => {
    const { year, month, day } = currentDateComponents;
    cy.clock(new Date(year, month, day));
    cy.visit('/');
  })

  it('Input is rendered', () => {
    getControl();
  })

  it('Clicking on the icon opens picker on current date, marked today and valid month\'s days', () => {
    openPicker();
    getMarkedToday()
      .should('have.length', 1)
      .contains(currentDateComponents.day);
    getMonthLabelOnMonthPicker().contains(localeRu.months[currentDateComponents.month]);
    getYearLabelOnMonthPicker().contains(currentDateComponents.year.toString());
    pickerShowsValidMonthDays(currentDateComponents);
    getSelectedDay()
      .should('not.exist');
  })

  it('Selected day is marked', () => {
    const DAY_FOR_SELECT = 5;
    openPicker();
    getSelectedDay()
      .should('not.exist');
    selectDayInPicker(DAY_FOR_SELECT);
    openPicker();
    getSelectedDay()
      .should('have.length', 1)
      .contains(` ${DAY_FOR_SELECT} `);
  })

  it('User can select another year, month and day', () => {
    openPicker();
    getYearLabelOnMonthPicker()
      .click();
    getPrevDecadeBtn()
      .click();
    const YEAR_ITEMS_ALIAS = 'year-items';
    const YEAR_FOR_SELECT_OFFSET = 3;
    const MONTH_FOR_SELECT_INDEX = 4;
    const startPrevDecadeYear = (Math.floor(currentDateComponents.year / 10) - 1) * 10;
    const lastPrevDecadeYear = startPrevDecadeYear + 9;
    cy.get('[data-test-year-id]').as(YEAR_ITEMS_ALIAS);
    cy.get(`@${YEAR_ITEMS_ALIAS}`).first().contains(startPrevDecadeYear);
    cy.get(`@${YEAR_ITEMS_ALIAS}`).last().contains(lastPrevDecadeYear);

    cy
      .get(`@${YEAR_ITEMS_ALIAS}`).eq(YEAR_FOR_SELECT_OFFSET)
      .click();

    const MONTH_ITEMS_ALIAS = 'month-items';
    cy.get('[data-test-month-index]').as(MONTH_ITEMS_ALIAS)
    cy.get(`@${MONTH_ITEMS_ALIAS}`).first()
      .contains(localeRu.months[0]);
    cy.get(`@${MONTH_ITEMS_ALIAS}`).last()
      .contains(localeRu.months[11]);
    cy.get(`@${MONTH_ITEMS_ALIAS}`).eq(MONTH_FOR_SELECT_INDEX)
      .click();

    const selectedYear = startPrevDecadeYear + YEAR_FOR_SELECT_OFFSET;
    getYearLabelOnMonthPicker()
      .contains(selectedYear);
    getMonthLabelOnMonthPicker()
      .contains(localeRu.months[MONTH_FOR_SELECT_INDEX]);
    pickerShowsValidMonthDays({year: selectedYear, month: MONTH_FOR_SELECT_INDEX});

    const DAY_FOR_SELECT = 24;
    selectDayInPicker(DAY_FOR_SELECT);
    closePicker();
    getControl().find('input').should('have.value', `${DAY_FOR_SELECT}.0${MONTH_FOR_SELECT_INDEX + 1}.${selectedYear}`);
  })
})
