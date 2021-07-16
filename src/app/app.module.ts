import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule } from "./datepicker/datepicker.module";
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
