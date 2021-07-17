import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularSvgIconModule} from "angular-svg-icon";
import {AngularSvgIconPreloaderModule} from "angular-svg-icon-preloader";
import {HttpClientModule} from "@angular/common/http";
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';



@NgModule({
  declarations: [
    SvgIconComponent
  ],
  exports: [
    SvgIconComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule, // fix no provider error
    AngularSvgIconModule.forRoot(),
    AngularSvgIconPreloaderModule.forRoot({
      configUrl: './assets/icons.json',
    }),
  ]
})
export class SvgIconsModule { }
