// by http://github.com/PascalPrecht
// modfied HTML by [HH]
import { Component, OnInit, forwardRef, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Prayer } from './prayer.interface';


export function createCounterRangeValidator(maxValue, minValue) {
  return (c: FormControl) => {
    let err = {
      rangeError: {
        given: c.value,
        max: maxValue || 10,
        min: minValue || 0
      }
    };

  return (c.value > +maxValue || c.value < +minValue) ? err: null;
  }
}

@Component({
  selector: 'counter-input',
  template: `
  <div class="input-group">
      <span class="input-group-btn">
          <button type="button" class="btn btn-primary btn-number btn-sm"  (click)="increase()">
              <span class="fa fa-plus"></span>
          </button>
      </span>
      <input type="tel" onkeypress='return event.charCode >= 48 && event.charCode <= 57' class="form-control input-number form-control-sm" min="{{counterRangeMin}}" max="{{counterRangeMax}}" [(ngModel)]="counterValue">
      <span class="input-group-btn">
          <button type="button" class="btn btn-primary btn-number btn-sm"  (click)="decrease()">
              <span class="fa fa-minus"></span>
          </button>
      </span>
    </div>
  `,
  styles: [`
  .input-number {
      background-color: rgba(0, 0, 0, 0);
      color: #EEE;
      text-align: center;
      width:57px;
  }
  .btn-primary {
    color: #000;
    background-color: #5f5f5f;
    border-color: #4a4a4a;
  }
  .btn-primary:active:focus {
    color: #91cedb;
    background-color: #5f5f5f;
    border-color: #4a4a4a;
  }
  `],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CounterInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CounterInputComponent), multi: true }
  ]
})
export class CounterInputComponent implements ControlValueAccessor, OnChanges {

  propagateChange:any = () => {};
  validateFn:any = () => {};

  @Input('counterValue') _counterValue = 0;
  @Input() counterRangeMax;
  @Input() counterRangeMin;
  @Input() counterName;
  @Output() notify: EventEmitter<Prayer> = new EventEmitter<Prayer>();

  get counterValue() {
    return this._counterValue;
  }

  set counterValue(val) {
    this._counterValue = val;
    this.propagateChange(val);
  }

  ngOnChanges(inputs) {
    if (inputs.counterRangeMax || inputs.counterRangeMin) {
      this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
    }
  }

  writeValue(value) {
    if (value) {
      this.counterValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  increase() {
    if (this.counterValue < this.counterRangeMax) {
      this.counterValue++;
      this.notify.emit({name: this.counterName, value:this.counterValue});
    }

  }

  decrease() {
    if (this.counterValue > this.counterRangeMin) {
      this.counterValue--;
      this.notify.emit({name: this.counterName, value:this.counterValue});
    }
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }
}
