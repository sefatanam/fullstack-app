import { Component, Input, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OnChangeCallback, OnTouchedCallback } from '../utils/components';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'chips-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChipsInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ChipsInputComponent,
      multi: true,
    },
  ],
})
export class ChipsInputComponent implements ControlValueAccessor, Validator {
  @Input({ required: true }) label = 'unknown';
  values: Array<string> = [];
  protected formControl: AbstractControl;
  onChange: OnChangeCallback<Array<string>>;
  onTouched: OnTouchedCallback;
  disabled = false;

  announcer = inject(LiveAnnouncer);

  removeKeyword(keyword: string) {
    const index = this.values.indexOf(keyword);
    if (index >= 0) {
      this.values.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
      this.writeValue(this.values);
    }
  }
  add(event: MatChipInputEvent): void {
    if (!this.values) {
      this.values = [];
    }
    const value = (event.value || '').trim();
    if (value) {
      this.values.push(value);
      this.writeValue(this.values);
    }
    event.chipInput?.clear();
  }

  registerOnChange(fn: OnChangeCallback<Array<string>>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedCallback): void {
    this.onTouched = fn;
  }
  writeValue(obj: Array<string>): void {
    if (this.disabled) return;
    this.values = obj;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  validate(control: AbstractControl): ValidationErrors | null {
    this.formControl = control;
    return null;
  }
}
