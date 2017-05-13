import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ChangeDetectorRef, EventEmitter, ContentChildren, QueryList } from '@ctaf/framework';
import * as _ from 'underscore';
import { CheckboxComponent } from './checkbox.component';
/**
 * Checkboxgroup
 *  基础信息

* 代码文件路径： src/forms/checkboxgroup.ts
* 引用模块：ctafframework
* 父类：CTAFCompentBase
* 类型名称：CheckboxGroupComponent
* 选择器名称：ctaf-cp-checkboxgroup

*/
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-checkboxgroup',
 *     templateUrl: 'checkboxgroup.component.html'
 * })
 * export class CheckboxGroupComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-checkboxgroup',
    templateUrl: 'checkboxgroup.component.html'
})
export class CheckboxGroupComponent extends ComponentBase {
    public checkboxs: CheckboxComponent[] = [];

    private _style: string;
    private _size: string;
    private _disabled: boolean = false;
    private _block: boolean = false;
    private _name: any = this.cid;
    public arrVal: Array<any> = [];
    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngAfterViewInit() {
        this.checkboxs.forEach((ch: CheckboxComponent) => {
            ch.name = this.name;
            if (ch.state) {
                this.arrVal.push(ch.value);
            }
        });
        this.checkboxs.forEach((c: CheckboxComponent) => {
            c.click.subscribe(() => {
                this.arrVal = [];
                this.checkboxs.forEach((ch: CheckboxComponent) => {
                    if (ch.state) {
                        this.arrVal.push(ch.value);
                    }
                });
                setTimeout(() => {
                    this.click.emit(this);
                }, 0);

            });
        });

    }

    /**
     * 控件类型名称，需要每个实现的子类进行自定义。
     */
    protected get typeName(): string {
        return 'CheckboxGroupComponent';
    }

    @Input()
    set name(n: any) {
        this.setProperty('_name', n);
    }
    get name() {
        return this._name;
    }

    @Input()
    set style(sty: string) {
        this.setProperty('_style', sty);
    }
    get style() {
        return this._style;
    }

    @Input()
    set disabled(d: boolean) {
        this.setProperty('_disabled', d);
    }
    get disabled(): boolean {
        return this._disabled;
    }

    @Input()
    set size(s: string) {
        this.setProperty('_size', s);
    }
    get size() {
        return this._size;
    }

    @Input()
    set block(blo: boolean) {
        this.setProperty('_block', blo);
    }
    get block() {
        return this._block;
    }

    /**
	 * @Output() click
	 * 点击按钮后触发的事件。事件参数中传递当前 CheckboxGroup 实例。
	 */
    @Output() click: EventEmitter<CheckboxGroupComponent> = new EventEmitter<CheckboxGroupComponent>();

    private clickTrigger(event: MouseEvent) {
        // this.click.emit(this);
        event.preventDefault();
        event.stopPropagation();

    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            ['checkboxgroup-style-' + this._style]: !!this._style,
            ['checkboxgroup-disabled-' + this._disabled]: true,
            ['checkboxgroup-block-' + this._block]: true,
            ['checkboxgroup-size-' + this._size]: !!this._size
        });
    }
}
