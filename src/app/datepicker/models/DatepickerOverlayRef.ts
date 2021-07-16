import {OverlayRef} from "@angular/cdk/overlay";

export class DatepickerOverlayRef {
  constructor(
    private overlayRef: OverlayRef
  ) {}

  close() {
    this.overlayRef.dispose();
  }
}
