import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule } from "./datepicker/datepicker.module";
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import { SomeModule } from "./some/some.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DatepickerModule.forRoot(),
    SomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
