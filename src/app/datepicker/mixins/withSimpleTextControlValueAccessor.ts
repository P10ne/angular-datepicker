import { ControlValueAccessor } from "@angular/forms";

export function withSimpleTextControlValueAccessor(Base = class {}) {
  return class extends Base implements ControlValueAccessor {
    private _inputValue: Date | null = null;

    onChange: any = () => {}
    onTouch: any = () => {}

    set value(val: Date | null) {
      this._inputValue = val;
      this.onChange(val);
      this.onTouch();
    }

    get value(): Date | null {
      return this._inputValue;
    }

    registerOnChange(fn: any): void {
      this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
      this.onTouch = fn;
    }

    writeValue(obj: Date | null): void {
      this.value = obj;
    }
  }
}
