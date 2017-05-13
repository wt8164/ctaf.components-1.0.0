import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, forwardRef, ChangeDetectorRef } from '@ctaf/framework';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'underscore';
/* tslint:disable */
export const SWITCH_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwitchComponent),
    multi: true
};
/**
 * Switch
 *  基础信息

* 代码文件路径： src/forms/switch.ts
* 引用模块：ctafframework
* 父类：CTAFCompentBase
* 类型名称：SwitchComponent
* 选择器名称：ctaf-cp-switch

*/
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-switch',
 *     templateUrl: 'switch.component.html'
 * })
 * export class SwitchComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-switch',
    templateUrl: 'switch.component.html',
    providers: [SWITCH_VALUE_ACCESSOR]
})
export class SwitchComponent extends ComponentBase {
    private _styleOn: string;
    private _styleOff: string;
    private _size: string = 'md';
    private _gradient: boolean = false;
    private _animate: boolean = true;
    private _onText: any = 'ON';
    private _offText: any = 'OFF';
    private _block: boolean = false;
    private _disabled: boolean = false;
    private _state: boolean = true;
    private onModelChange: Function = () => { };
    private onModelTouched: Function = () => { };
    /**
     * 控件类型名称，需要每个实现的子类进行自定义。
     */
    protected get typeName(): string {
        return 'SwitchComponent';
    }

    /**
     * @Input() styleOn: string
     * @Input() styleOff: string
     * Switch 控件外观样式属性。包含以下几种外观样式:
     * primary > Provides extra visual weight and identifies the primary action in a set of buttons.
     * success > Indicates a successful or positive action.
     * info > Contextual button for informational alert messages.
     * warning > Indicates a dangerous or potentially negative action.
     * danger > Indicates a dangerous or potentially negative action.
     */
    @Input()
    set styleOn(ons: string) {
        this._styleOn = ons;
        this.classesMap();
    }
    @Input()
    set styleOff(offs: string) {
        this._styleOff = offs;
        this.classesMap();
    }

    /** 
     * @Input() gradient: boolean
     * 当设置的属性值为 true 时，Switch 控件颜色为过渡色。默认值为 false.
     **/
    @Input()
    set gradient(gra: boolean) {
        this._gradient = gra;
        this.classesMap();
    }

    /** 
     * @Input() block: boolean
     * 当设置的属性值为 false 时，切换状态无动画过渡效果。默认值为 true.
     **/
    @Input()
    set animate(s: boolean) {
        this._animate = s;
        this.classesMap();
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
        return 'switch-size-' + this._size;
    }

    /**
     * @Input() onText: any
     * 设置替换掉"on/off"的文字
     */
    @Input()
    set onText(v: any) {
        this._onText = v;
    }
    get onText(): any {
        return this._onText;
    }
    @Input()
    set offText(g: any) {
        this._offText = g;
    }
    get offText(): any {
        return this._offText;
    }

    /**
     * @Output() click
     * 点击switch后触发的事件。_state为false时显示“OFF”,为true时显示“ON”
     */
    @Output()
    private clickToggle(event: MouseEvent) {
        this._state = !this._state;
        this.onModelChange(this.state);
        event.preventDefault();
        event.stopPropagation();
    }
    @Input()
    set state(s: boolean) {
        this._state = s;
        this.classesMap();
    }
    get state(): boolean {
        return this._state;
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

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'switch-wrap': true,
            ['switch-style-on-' + this._styleOn]: !!this._styleOn,
            ['switch-style-off-' + this._styleOff]: !!this._styleOff,
            ['switch-style-on-gradient-' + this._styleOn]: this._gradient && !!this._styleOn,
            ['switch-style-off-gradient-' + this._styleOff]: this._gradient && !!this._styleOff,
            ['switch-move']: !this._state,
            ['switch-animate']: this._animate,
            ['switch-block']: this._block,
            ['switch-disabled']: this._disabled,
            ['switch-size-' + this._size]: !!this._size
        });
    }
}
