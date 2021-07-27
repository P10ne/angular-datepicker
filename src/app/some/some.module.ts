import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SomeComponent } from './components/some/some.component';

export const SomeToken = new InjectionToken<string>('SomeToken');

@NgModule({
  declarations: [
    SomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SomeComponent
  ],
  providers: [
    {
      provide: SomeToken,
      useValue: 'someTokenString'
    }
  ]
})
export class SomeModule { }
