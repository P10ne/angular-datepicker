import { NgModule } from '@angular/core';
import { OverlayModule } from "@angular/cdk/overlay";
import { DatepickerOverlayComponent } from "./components/datepicker-overlay/datepicker-overlay.component";
import { DatepickerInputComponent } from './components/datepicker-input/datepicker-input.component';
import { DatepickerMonthComponent } from './components/datepicker-month/datepicker-month.component';
import {DatepickerOverlayService} from "./services/datepicker-overlay.service";
import {DatepickerService} from "./services/datepicker.service";
import { DatepickerMonthsComponent } from './components/datepicker-months/datepicker-months.component';
import { DatepickerYearsComponent } from './components/datepicker-years/datepicker-years.component';
import {FormsModule} from "@angular/forms";
import {DatepickerDateService} from "./services/datepicker-date.service";
import {SharedModule} from "../shared/shared.module";
import { NgxMaskModule } from 'ngx-mask'


@NgModule({
  declarations: [
    DatepickerOverlayComponent,
    DatepickerInputComponent,
    DatepickerMonthComponent,
    DatepickerMonthsComponent,
    DatepickerYearsComponent
  ],
  imports: [
    OverlayModule,
    FormsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    DatepickerInputComponent
  ],
  entryComponents: [
    DatepickerOverlayComponent
  ],
  providers: [
    DatepickerOverlayService,
    DatepickerDateService
  ]
})
export class DatepickerModule { }
