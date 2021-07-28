import { Meta, moduleMetadata, Story } from "@storybook/angular";
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

export default {
  title: 'Components/Datepicker',
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
    })
  ]
} as Meta;

const Template: Story<DatepickerInputComponent> = (args) => ({
  props: args
})

export const Datepicker = Template.bind({});
