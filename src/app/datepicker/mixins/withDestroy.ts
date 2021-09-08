import { Observable, Subject } from "rxjs";
import { OnDestroy } from "@angular/core";

export function withDestroy(Base = class {}) {
  return class extends Base implements OnDestroy {
    private _destroy$ = new Subject<void>();

    get destroy$(): Observable<void> {
      return this._destroy$.pipe();
    }

    ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }
}
