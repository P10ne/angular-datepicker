import { ComponentRef, ElementRef, Injectable, InjectionToken, Injector } from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {DatepickerOverlayComponent} from "../components/datepicker-overlay/datepicker-overlay.component";
import {ComponentPortal} from "@angular/cdk/portal";
import {DatepickerOverlayRef} from "../models/DatepickerOverlayRef";
import {DatepickerService} from "./datepicker.service";
import { DatepickerConfig } from "../models/DatepickerConfig";

export const DatepickerConfigToken = new InjectionToken<DatepickerConfig>('DatepickerConfig');

@Injectable()
export class DatepickerOverlayService {

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) { }

  public open(connectedTo: ElementRef, datepickerService: DatepickerService, config?: DatepickerConfig) {
    const overlayRef = this.createOverlay(connectedTo);
    const dialogRef = new DatepickerOverlayRef(overlayRef);
    this.attachOverlayContainer(overlayRef, dialogRef, datepickerService, config);
    overlayRef.backdropClick().subscribe(() => dialogRef.close());
    return dialogRef;
  }

  private createOverlay(connectedTo: ElementRef) {
    const overlayConfig = this.getOverlayConfig(connectedTo);
    return this.overlay.create(overlayConfig);
  }

  private attachOverlayContainer(overlayRef: OverlayRef, dialogRef: DatepickerOverlayRef, datepickerService: DatepickerService, config?: DatepickerConfig): DatepickerOverlayComponent {
    const injector = this.createInjector(dialogRef, datepickerService, config);
    const containerPortal = new ComponentPortal(DatepickerOverlayComponent, null, injector);
    const containerRef: ComponentRef<DatepickerOverlayComponent> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  private getOverlayConfig(connectedTo: ElementRef) {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(connectedTo)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      }]);

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'my-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createInjector(dialogRef: DatepickerOverlayRef, datepickerService: DatepickerService, config?: DatepickerConfig): Injector {
    return Injector.create({
      parent: this.injector,
       providers: [
         { provide: DatepickerOverlayRef, useValue: dialogRef },
         { provide: DatepickerService, useValue: datepickerService },
         { provide: DatepickerConfigToken, useValue: config }
       ]
    });
  }
}
