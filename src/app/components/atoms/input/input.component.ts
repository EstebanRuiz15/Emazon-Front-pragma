import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() position: { top?: string, left?: string } = {};
  @Input() width: string = '100%';
  @Input() formControl?: FormControl;
  @Input() required: boolean = false;

  private _value: string = '';
  disabled: boolean = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
    if (this.formControl && !this.required) {
      this.formControl.setErrors(null);
    }
  }

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }

  ngOnInit() {
    if (this.formControl) {
      this.formControl.valueChanges.subscribe(value => {
        if (value !== this._value) {
          this._value = value;
        }
      });
    }
  }
}