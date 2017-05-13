import { CTAFComponent, ComponentBase } from '@ctaf/framework';
import { Input, Output, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'underscore';
import { FormControlComponent } from './formcontrol.component';
import './textualinputcontrol.less';

/**
 * 文本输入型 Input 类型表单控件基类，是使用了 `<input type="any" />` 类型 html 元素的基类。
 * 
 * HTML 4.01 中的类型：button, checkbox, file, hidden, image, password, radio, reset, submit, text。
 * 以下类型是 HTML5 中的新类型：color, date, datetime, datetime-local, month, week, time, email, number, range, search, tel 以及 url。
 * 
 * 本控件只支持 password, text, number, search, datetime, email, tel 类型。
 */
@CTAFComponent({
    selector: 'ctaf-cp-textualinput',
    templateUrl: 'textualinputcontrol.component.html'
})
export class TextualInputControlBase extends FormControlComponent {

    private _prefix: string = null;
    private _suffix: string = null;
    private _displayValue: string;

    /**
     * 获取当前控件的前缀字体名称，支持 `awsome-font` 字体。
     */
    public get prefix(): string {
        return this._prefix;
    }
    /**
     * 设置当前控件的前缀字体名称，支持 `awsome-font` 字体。
     */
    @Input()
    public set prefix(v: string) {
        this.setProperty('_prefix', v);
    }

    /**
     * 获取当前控件的后缀字体名称，支持 `awsome-font` 字体。
     */
    public get suffix(): string {
        return this._suffix;
    }
    /**
     * 设置当前控件的后缀字体名称，支持 `awsome-font` 字体。
     */
    @Input()
    public set suffix(v: string) {
        this.setProperty('_suffix', v);
    }

    /**
     * 获取当前控件的显示值。
     */
    protected get displayValue(): string {
        return this._displayValue;
    }
    /**
     * 设置当前控件的显示值。
     */
    protected set displayValue(v: string) {
        this.setProperty('_displayValue', v);
    }

    /**
     * Mustfill必填标志
     */

    @ViewChild('valueControl') valueControlRef: ElementRef;

    // constructor() {
    //     super();
    // }

    ngAfterViewInit() {
        // 如果控件模板文件中存在 `valueControl` 的元素，则设置为当前控件的 HtmlElement
        if (this.valueControlRef) {
            this.valueControl = this.valueControlRef.nativeElement;
        }
    }

    /**
     * 格式化当前控件的值，从 value 到 displayValue 的转换。
     */
    protected valueFormat() { }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {

        });
    }
}
