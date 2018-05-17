import { Component, forwardRef, Input,
    ViewEncapsulation, ChangeDetectorRef,
    ChangeDetectionStrategy, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SamFormControl } from 'sam-ui-elements/src/ui-kit/form-controls/sam-form-control';
import { SamFormService } from 'sam-ui-elements/src/ui-kit/form-service';

export const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SamInputMaskComponent),
    multi: true
};

@Component({
    selector: 'sam-input-mask',
    template: `<input
        [disabled]='disabled'
        type='text'
        [attr.id]='name'
        [attr.placeholder]='placeholder'
        [ngModel]='value'
        (ngModelChange)='onModelChange($event)'
        (focus)='onFocus()'
        (blur)='onBlur()' />`,
    providers: [ VALUE_ACCESSOR ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamInputMaskComponent extends SamFormControl implements OnInit {
    @Input() template: string;
    @Input() placeholder: string;
    @Input() disableFocusBehavior: boolean = false;

    previousVal;
    pattern = /([^_\/\)\(-\s])/g;
    defaultValue = '';
    protected _value: any = null;
    public get value (): any {
        return this._value;
    }
    public set value (val: any) {
        this._value = !val ? this.defaultValue : val;
    }

    constructor(public cdr: ChangeDetectorRef, public service: SamFormService) {
        super(service, cdr);
    }

    @HostListener('focus') onfocus() {
        this.onTouched();
    }

    onFocus() {
        if (!this.disableFocusBehavior) {
            this.value = this.templateToNumber(this.value);
        }
    }

    onBlur() {
        const newVal = this.numberToTemplate(this.value);
        this.value = newVal;
        if (newVal !== this.previousVal) {
            this.previousVal = this.value;
            this.onChange(this.value);
            this.cdr.detectChanges();
        }
    }

    onModelChange(newVal) {
        this.value = newVal;
        if (this.previousVal && this._value === '') {
            this.onChange(this._value);
            this.cdr.detectChanges();
        }
    }

    ngOnInit() {
        if (!this.template) {
            throw Error('No template provided');
        }
    }

    templateToNumber (template: string): string {
        if (!template) {
          return;
        } else {
          return template
            .split('')
            .filter(char => char.match(this.pattern))
            .join('');
        }
      }

    private numberToTemplate (numberStr: string): string {
        if (!numberStr) {
            return;
        }

        numberStr = numberStr.replace(/\D/g, '');

        const digits = numberStr
            .split('')
            .filter(digit => digit.match(this.pattern));

        const blanks = this.template
            ? this.template.split('')
            : [];

        return blanks.map(
                blank => {
                    if (blank === '_') {
                        const next = digits.shift();
                        return next ? next : blank;
                    } else {
                        return blank;
                    }
                }
            )
            .join('')
            .concat(digits.join(''));
    }

    writeValue(val) {
        this.value = val;
        this.previousVal = val;
        this.cdr.detectChanges();
    }
}