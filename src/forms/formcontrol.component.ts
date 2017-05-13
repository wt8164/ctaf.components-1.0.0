import { Input, Output, ChangeDetectorRef } from '@angular/core';

import { CTAFComponent, ComponentBase, EventEmitter } from '@ctaf/framework';

import * as _ from 'underscore';

/**
 * 表单控件基类，提供基本的布局排版。
 */
@CTAFComponent({
    selector: 'ctaf-cp-formcontrol',
    templateUrl: 'formcontrol.component.html'
})
export class FormControlComponent extends ComponentBase {

    // private _size: Size = Size.lg;
    private _size: number = 2; // = Size.md;
    private _labelText: string = '';
    private _valueControl: HTMLFormElement = null;
    private _value: any;
    private _showLabel: boolean = true;
    private _labelWidth: number = 20;
    private _width: number;
    /**
     * 获取当前控件的尺寸。
     */
    public get size(): number {
        return this._size;
    }
    /**
     * 设置当前控件的尺寸。
     */
    @Input()
    public set size(v: number) {
        this.setProperty('_size', v);
    }


    /**
     * 设置当前控件的标签文本。
     */
    @Input()
    public set labelText(v: string) {
        this.setProperty('_labelText', v);
    }
    /**
     * 获取当前控件的标签文本。
     */
    public get labelText(): string {
        return this._labelText;
    }
    /**
     * 设置当前控件保存用户输入值的 Form 元素。
     */
    protected get valueControl(): HTMLFormElement {
        return this._valueControl;
    }
    /**
     * 设置当前控件保存用户输入值的 Form 元素。
     */
    protected set valueControl(v: HTMLFormElement) {
        this._valueControl = v;
    }

    /**
     * 获取当前控件的值。
     */
    public get value(): any {
        return this._value;
    }
    /**
     * 设置当前控件的值。
     */
    @Output()
    valueChange = new EventEmitter();
    @Input()
    public set value(v: any) {
        this.setProperty('_value', v);
        // if (this.setProperty('_value', v)) {
        //     this.setProperty('_value', v);
        //     this.valueChange.emit(v);
        // }
    }

    /**
     * 获取 是否显示控件的文字标签的值。
     */
    public get showLabel(): boolean {
        return this._showLabel;
    }
    /**
     * 设置 是否显示控件的文字标签的值。
     */
    public set showLabel(v: boolean) {
        this.setProperty('_showLabel', v);
    }

    /**
     *设置formcontrol框的必填标志 
     */
    private _require: boolean;
    @Input()
    public set require(r: boolean) {
        this.setProperty('_require', r);
    }
    public get require(): boolean {
        return this._require;
    }

    /**
     * 获取 控件文字标签宽度值。默认为 `0`。
     */
    /**
     * 设置 控件文字标签宽度值，使用绝对像素值，不能使用百分比。
     */
    @Input()
    public set labelWidth(v: number) {
        this.setProperty('_labelWidth', v);
    }
    public get labelWidth(): number {
        return this._labelWidth;
    }

    @Input()
    public set width(w: number) {
        this.setProperty('_width', w);
        this.classesMap();
    }
    public get width(): number {
        return this._width;
    }
    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
        // this._labelText=HTMLFormElement
    }


    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'ctaf-formcontrol': true,
            ['size-' + this._size]: true,
        });
    }
}
