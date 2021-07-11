import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule } from "./datepicker/datepicker.module";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
