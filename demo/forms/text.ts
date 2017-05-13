import { Input, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CTAFComponent, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { TextComponent } from '../../src/entry';
@CTAFComponent({
    templateUrl: 'textbox.html'
})
export class DemoTextComponent extends ComponentBase {
    // private _textValue: string;
    // get textValue() {
    //     return this._textValue;
    // }
    // set textValue(v: string) {
    //     this.setProperty('_textValue', v);
    // }
    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }
    // private valueChangeHandler(b: boolean) {
    //     console.warn(b);
    // }
    private focusHandler(): void {
        console.log('focus');
    }
    private blurHandler(): void {
        alert('blur');
    }
    private changeHandler(): void {
        alert('change');
    }

    private value1: string = '原始值';
    private clickHandler() {
        this.value1 = '改变值';
    }
}
