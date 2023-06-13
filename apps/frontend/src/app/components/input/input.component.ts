import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";

type OnChangeCallback = (value: string) => void;
type OnTouchedCallback = () => void;

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, Validator {
  @Input({ required: true }) placeholder: string;
  @Input({ required: true }) label: string;
  @Input() type: 'text' | 'number' = 'text';

  value: string;
  disabled = false;
  onChange: OnChangeCallback;
  onTouched: OnTouchedCallback;
  protected formControl: AbstractControl;

  registerOnChange(fn: OnChangeCallback): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: OnTouchedCallback): void {
    this.onTouched = fn;
  }
  writeValue(value: string): void {
    if (this.disabled) return;
    this.value = value;
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
  setValue($event: Event) {
    if (this.disabled) return;
    const inputEvent = $event as InputEvent;
    this.value = (inputEvent.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.onTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.formControl=control;
    return null;
  }
}
