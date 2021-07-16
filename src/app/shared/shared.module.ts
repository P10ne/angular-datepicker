import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestroyService } from "./services/destroy.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule
  ],
  providers: [
    DestroyService
  ]
})
export class SharedModule { }
