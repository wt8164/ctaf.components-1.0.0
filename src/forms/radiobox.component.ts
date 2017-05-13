import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ChangeDetectorRef, Inject, forwardRef, Optional, EventEmitter } from '@ctaf/framework';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'underscore';
import { RadioboxGroupComponent } from './radioboxgroup.component';
/* tslint:disable */
export const RADIOBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioboxComponent),
    multi: true
};
/**
 * Radiobox
 *  基础信息

* 代码文件路径： src/forms/radiobox.ts
* 引用模块：ctafframework
* 父类：CTAFCompentBase
* 类型名称：RadioboxComponent
* 选择器名称：ctaf-cp-radiobox

*/
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-radiobox',
 *     templateUrl: 'radiobox.component.html'
 * })
 * export class RadioboxComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-radiobox',
    templateUrl: 'radiobox.component.html',
    providers: [ RADIOBOX_VALUE_ACCESSOR ]
})
export class RadioboxComponent extends ComponentBase {
    constructor(cdr: ChangeDetectorRef, @Optional() radioboxgroup: RadioboxGroupComponent) {
        super(cdr);

        if (radioboxgroup) {
            radioboxgroup.radioboxs.push(this);
        }

    }

    private _style: string;
    private _size: string;
    private _disabled: boolean;
    private _block: boolean = false;
    private _state: boolean = true;
    private _name: string;
    private _value: string;
    private onModelChange: Function = () => { };
    private onModelTouched: Function = () => { };
    /**
     * 控件类型名称，需要每个实现的子类进行自定义。
     */
    protected get typeName(): string {
        return 'RadioboxComponent';
    }

    @Input()
    set style(sty: string) {
        this._style = sty;
        this.classesMap();
    }
    get style() {
        return this._style;
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
        return this._size;
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
    set state(s: boolean) {
        this._state = s;
        this.classesMap();
    }
    get state(): boolean {
        return this._state;
    }

    @Input()
    set name(t: string) {
        this._name = t;
    }
    get name() {
        return this._name;
    }

    @Input()
    set value(v: string) {
        this._value = v;
    }
    get value() {
        return this._value;
    }

    /**
	 * @Output() click
	 * 点击按钮后触发的事件。事件参数中传递当前 RadioboxGroup 实例。
	 */
    @Output() click: EventEmitter<RadioboxComponent> = new EventEmitter<RadioboxComponent>();

    private clickTrigger(event: MouseEvent) {
        this.click.emit(this);
        this.onModelChange(this.state);
        event.preventDefault();
        event.stopPropagation();
    }

    writeValue(value: any): void {
        this.state = value;
        this.forceChange();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'radioboxCtaf': true,
            ['radiobox-style-' + this._style]: !!this._style,
            ['radiobox-disabled-' + this._disabled]: true,
            ['radiobox-block']: this._block,
            ['radiobox-state-false']: !this._state,
            ['radiobox-size-' + this._size]: !!this._size
        });
    }
}
