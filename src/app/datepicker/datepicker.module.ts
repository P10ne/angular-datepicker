import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from "@angular/cdk/overlay";
import { DatepickerOverlayComponent } from "./components/datepicker-overlay/datepicker-overlay.component";
import { DatepickerInputComponent } from './components/datepicker-input/datepicker-input.component';
import { DatepickerMonthComponent } from './components/datepicker-month/datepicker-month.component';
import {DatepickerOverlayService} from "./services/datepicker-overlay.service";
import {DatepickerDateService} from "./services/datepicker-date.service";



@NgModule({
  declarations: [
    DatepickerOverlayComponent,
    DatepickerInputComponent,
    DatepickerMonthComponent
  ],
  imports: [
    CommonModule,
    OverlayModule
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
