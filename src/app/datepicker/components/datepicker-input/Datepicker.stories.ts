import { componentWrapperDecorator, Meta, moduleMetadata, Story } from "@storybook/angular";
import { DatepickerOverlayComponent } from "../datepicker-overlay/datepicker-overlay.component";
import { DatepickerInputComponent } from "./datepicker-input.component";
import { DatepickerMonthComponent } from "../datepicker-month/datepicker-month.component";
import { DatepickerMonthsComponent } from "../datepicker-months/datepicker-months.component";
import { DatepickerYearsComponent } from "../datepicker-years/datepicker-years.component";
import { DatepickerTimeComponent } from "../datepicker-time/datepicker-time.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { SvgIconsModule } from "../../../svg-icons/svg-icons.module";
import { DatepickerOverlayService } from "../../services/datepicker-overlay.service";
import { DatepickerDateService } from "../../services/datepicker-date.service";
import { DatepickerLocale } from "../../injection-tokens/DatepickerLocale";
import localeRu from "../../configs/locales/ru";
import { action } from "@storybook/addon-actions";

export default {
  title: 'Components/datepicker',
  component: DatepickerInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        DatepickerOverlayComponent,
        DatepickerInputComponent,
        DatepickerMonthComponent,
        DatepickerMonthsComponent,
        DatepickerYearsComponent,
        DatepickerTimeComponent
      ],
      imports: [
        OverlayModule,
        FormsModule,
        SharedModule,
        NgxMaskModule.forRoot(),
        SvgIconsModule
      ],
      entryComponents: [
        DatepickerOverlayComponent
      ],
      providers: [
        DatepickerOverlayService,
        DatepickerDateService,
        {
          provide: DatepickerLocale,
          useValue: {
            ...localeRu
          }
        }
      ]
    }),
    componentWrapperDecorator(story => `<div style="width: 200px; height: 310px">${story}</div>`),
  ],
  argTypes: {
    dateFormat: {
      options: ['dd.MM.yyyy', 'dd-MM-yyyy', 'MM.dd.yyyy'],
      control: {type: 'select'},
      defaultValue: 'dd.MM.yyyy'
    },
    timeFormat: {
      defaultValue: 'hh:mm'
    },
    allowTime: {
      defaultValue: true
    }
  }
} as Meta;

const Template: Story<DatepickerInputComponent> = (args) => ({
  props: {
    ...args,
    pickerOpened: action('pickerOpened')
  }
})


export const Datepicker = Template.bind({});

export const DatepickerTime = Template.bind({});
DatepickerTime.args = {
  allowTime: true
}
