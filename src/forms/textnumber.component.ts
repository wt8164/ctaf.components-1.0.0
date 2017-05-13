import { EventEmitter } from '@angular/core';

import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ChangeDetectorRef, ViewChild, ElementRef, NG_VALUE_ACCESSOR, forwardRef } from '@ctaf/framework';
import * as _ from 'underscore';
/* tslint:disable */
export const TEXTNUMBER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextNumberComponent),
    multi: true
};
/**
 * TextNumber
 *  基础信息

* 代码文件路径： src/forms/textnumber.component.ts
* 引用模块：ctafframework
* 父类：CTAFCompentBase
* 类型名称：TextNumberComponent
* 选择器名称：ctaf-cp-textnumber
* 实现格式化功能
* 1、float：支持小数（几位小数）
* 2、thousands：支持千分位
* 3、prefix：支持前导符（如美元）

*/
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-textnumber',
 *     templateUrl: 'textnumber.component.html'
 * })
 * export class TextNumberComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-textnumber',
    templateUrl: 'textnumber.component.html',
    providers: [TEXTNUMBER_VALUE_ACCESSOR]
})
export class TextNumberComponent extends ComponentBase {
    private step: number = 1;
    private _size: string;
    private _w: number = 148;
    private _preIcon: string = '';
    private _block: boolean = false;
    private _disabled: boolean = false;
    private _showTooltip: boolean = false;
    private _value: number = 0;
    private _displayValue: string = '0';
    private _formatStr: string;
    private _labelText: string;
    private onModelChange: Function = () => { };
    private onModelTouched: Function = () => { };

    @ViewChild('ipt') ipt: ElementRef;

    ngOnInit() {
        this.formatHandler(this._value ? this._value : 0);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            $(this.ipt.nativeElement).val(this.displayValue);
        }, 0);
    }

    /**
     * 控件类型名称，需要每个实现的子类进行自定义。
     */
    protected get typeName(): string {
        return 'TextNumberComponent';
    }

    /**
     * @Input() size: string
     *  switch 控件外观大小属性。包含以下几种大小属性，默认值为md：
     *  lg > 超大。
     *  md > 默认。
     *  sm > 小号。
     *  xs > 超小。
     */
    @Input()
    set size(t: string) {
        this._size = t;
        this.classesMap();
    }
    get size() {
        return 'textnumber-size-' + this._size;
    }

    @Input()
    set labelText(t: string) {
        this._labelText = t;
    }
    get labelText() {
        return this._labelText;
    }

    @Input()
    set w(t: number) {
        this._w = t;
    }
    get w() {
        return this._w;
    }

    /**
	 * @Input() preIcon: string
	 * 在文本信息前显示的 Icon，与文字间隔10px，默认支持 font-awsome 字体 Icon。
	 */
    @Input()
    set preIcon(p: string) {
        this._preIcon = p;
    }
    get preIcon(): string {
        return this._preIcon;
    }

    /** 
     * @Input() block: boolean
     * 当设置的属性值为 true 时，以块状元素显示（独占一行）.
     **/
    @Input()
    set block(blo: boolean) {
        this._block = blo;
        this.classesMap();
    }

    /** 
     * @Input() disabled: boolean	
     * 当设置的属性值为 true 时，除当前属性外其余所有 api 不能使用。对应表单元素 disabled 属性。默认值为true.
     **/
    @Input()
    set disabled(d: boolean) {
        this._disabled = d;
        this.classesMap();
    }
    get disabled(): boolean {
        return this._disabled;
    }

    @Input()
    set showTooltip(d: boolean) {
        this._showTooltip = d;
    }
    get showTooltip(): boolean {
        return this._showTooltip;
    }

    // @Output()
    // valueChange = new EventEmitter();
    @Input()
    set value(s: number) {
        if (this.setProperty('_value', s)) {
            this._value = s;
            this.onModelChange(s);
        }
    }
    get value(): number {
        return this._value;
    }

    writeValue(value: any): void {
        this._value = value;
        this.formatHandler(this._value ? this._value : 0);
        this.forceChange();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    @Input()
    set displayValue(s: string) {
        this.setProperty('_displayValue', s);
    }
    get displayValue(): string {
        return this._displayValue;
    }

    @Input()
    set formatStr(s: string) {
        this._formatStr = s;
    }
    get formatStr(): string {
        return this._formatStr;
    }

    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    private clickHandler(e: MouseEvent, opt: string) {
        e.stopPropagation();
        if (!this._value) {
            let val: number = $(this.ipt.nativeElement).val();
            this._value = val;
        }

        switch (opt) {
            case 'add':
                this.value = Number(this._value) + this.step;
                break;
            case 'sub':
                this.value = Number(this._value) - this.step;
                break;
        }
    }

    private mouseleaveHandler(e) {
        this.formatHandler(this._value);
        setTimeout(() => {
            $(this.ipt.nativeElement).val(this.displayValue);
        }, 0);
    }

    private keydownHandler(e) {
        let k: string = e.key;
        let b: boolean = true;
        let val = $(e.target).val();
        switch (k) {
            case '-':
                if (this.value + '' !== '' && this.value !== undefined) {
                    b = false;
                    if (e.target.selectionStart === 0) {
                        b = true;
                    }
                }
                break;
            case '.':
                if ((this.value && (this.value + '').indexOf(k) > 0) || (this.value + '' === '' || this.value === undefined) || e.target.selectionStart === 0) {
                    b = false;
                }
                break;
        }
        switch (e.keyCode) {
            case 38:
                e.preventDefault();
                val = Number(val) + this.step;
                this.value = val;
                $(e.target).val(val);
                break;
            case 40:
                e.preventDefault();
                val = Number(val) - this.step;
                this.value = val;
                $(e.target).val(val);
                break;
        }
        return b;
    }

    private focusHandler(e: MouseEvent) {
        $(e.target).val(this._value);
    }

    private blurHandler(e) {
        // this.value = Number(e.target.value);
        this.formatHandler(this._value);
        setTimeout(() => {
            $(this.ipt.nativeElement).val(this.displayValue);
        }, 0);
    }

    private formatHandler(n: number) {
        this._displayValue = this._formatStr ? numeral(n).format(this._formatStr) : n + '';
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'textnumberCtaf': true,
            ['textnumber-disabled']: this._disabled,
            ['textnumber-block']: this._block,
            ['textnumber-size-' + this._size]: !!this._size
        });
    }
}
