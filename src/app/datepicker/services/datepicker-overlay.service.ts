import {ElementRef, Injectable} from '@angular/core';
import {Overlay, OverlayConfig} from "@angular/cdk/overlay";
import {DatepickerOverlayComponent} from "../components/datepicker-overlay/datepicker-overlay.component";
import {ComponentPortal} from "@angular/cdk/portal";
import {DatepickerOverlayRef} from "../models/DatepickerOverlayRef";

@Injectable({
  providedIn: 'root'
})
export class DatepickerOverlayService {

  constructor(
    private overlay: Overlay
  ) { }

  public open(connectedTo: ElementRef) {
    const overlayRef = this.createOverlay(connectedTo);
    const datepickerOverlayPortal = new ComponentPortal(DatepickerOverlayComponent);
    overlayRef.attach(datepickerOverlayPortal);
    const dialogRef = new DatepickerOverlayRef(overlayRef);
    overlayRef.backdropClick().subscribe(() => dialogRef.close());
    return dialogRef;
  }

  private createOverlay(connectedTo: ElementRef) {
    const overlayConfig = this.getOverlayConfig(connectedTo);
    return this.overlay.create(overlayConfig);
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
}
