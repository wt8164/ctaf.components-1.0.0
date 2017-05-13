import { ChangeDetectorRef } from '@angular/core';
import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding } from '@ctaf/framework';

import * as _ from 'underscore';

/**
 * Progress
 *  基础信息

* 代码文件路径： src/forms/progress.ts
* 引用模块：ctafframework
* 父类：CTAFCompentBase
* 类型名称：ProgressComponent
* 选择器名称：ctaf-cp-progress

*/
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-progress',
 *     templateUrl: 'progress.component.html'
 * })
 * export class ProgressComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-progressbar',
    templateUrl: 'progressbar.component.html'
})
export class ProgressComponent extends ComponentBase {
    private _w: number = 400;
    private _disabled: boolean = false;
    private _h: number = 20;
    private _block: boolean = false;
    private _value: number = 0;
    private _style: string = 'primary';
    private _titleShow: boolean = true;
    private _direction: boolean = false;

    /**
     * 控件类型名称，需要每个实现的子类进行自定义。
     */
    protected get typeName(): string {
        return 'ProgressComponent';
    }



    @Input()
    set w(t: number) {
        this._w = t;
    }
    get w() {
        return this._w;
    }

    @Input()
    set disabled(b: boolean) {
        this._disabled = b;
    }
    get disabled(): boolean {
        return this._disabled;
    }

    @Input()
    set h(t: number) {
        this._h = t;
    }
    get h() {
        return this._h;
    }

    @Input()
    set style(s: string) {
        this._style = 'progress-bar-' + s;
    }

    get style(): string {
        return this._style;
    }

    @Input()
    set titleShow(b: boolean) {
        this._titleShow = b;
    }

    get titleShow(): boolean {
        return this._titleShow;
    }

    @Input()
    set direction(b: boolean) {
        this._direction = b;
        this.classesMap();
    }

    get direction(): boolean {
        return this._direction;
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

    @Input()
    set value(s: number) {
        // this._value = s;
        if (s < 0) {
            s = 0;
            this._titleShow = false;
        }
        if (s > 100) {
            s = 100;
        }
        this.setProperty('_value', s);
    }
    get value(): number {
        return this._value;
    }

    // constructor(protected cdr: ChangeDetectorRef) {
    //     super(cdr);
    // }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'progressCtaf': true,
            ['progress-block']: this._block,
            ['progress-direction']: this._direction
        });
    }
}
