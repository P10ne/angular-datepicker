import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule } from "./datepicker/datepicker.module";
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    DatepickerModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
