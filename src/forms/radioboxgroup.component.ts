import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ChangeDetectorRef, EventEmitter, ContentChildren, QueryList } from '@ctaf/framework';
import * as _ from 'underscore';
import { RadioboxComponent } from './radiobox.component';
/**
 * Radioboxgroup
 *  基础信息

* 代码文件路径： src/forms/radioboxgroup.ts
* 引用模块：ctafframework
* 父类：CTAFCompentBase
* 类型名称：RadioboxGroupComponent
* 选择器名称：ctaf-cp-radioboxgroup

*/
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-radioboxgroup',
 *     templateUrl: 'radioboxgroup.component.html'
 * })
 * export class RadioboxGroupComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-radioboxgroup',
    templateUrl: 'radioboxgroup.component.html'
})
export class RadioboxGroupComponent extends ComponentBase {
    public radioboxs: RadioboxComponent[] = [];

    private _style: string;
    private _size: string;
    private _disabled: boolean = false;
    private _block: boolean = false;
    private _name: any = this.cid;
    public arrVal: any;
    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
    }
    ngOnInit() {
        this.radioboxs.forEach((ch: RadioboxComponent) => {
            ch.state = false;
        });
    }
    ngAfterViewInit() {        
        this.radioboxs.forEach((c: RadioboxComponent) => {
            c.name = this.name;
            if (c.state) {
                this.arrVal = c.value;
            }
            c.forceChange();
            c.click.subscribe(() => {
                this.arrVal = c.value;
                this.radioboxs.forEach((ch: RadioboxComponent) => {
                    ch.state = false;                    
                    ch.forceChange();
                });
                c.state = true;
                c.forceChange();
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
        return 'RadioboxGroupComponent';
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
	 * 点击按钮后触发的事件。事件参数中传递当前 RadioboxGroup 实例。
	 */
    @Output() click: EventEmitter<RadioboxGroupComponent> = new EventEmitter<RadioboxGroupComponent>();

    private clickTrigger(event: MouseEvent) {
        // this.click.emit(this);
        event.preventDefault();
        event.stopPropagation();

    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            ['radioboxgroup-style-' + this._style]: !!this._style,
            ['radioboxgroup-disabled-' + this._disabled]: true,
            ['radioboxgroup-block-' + this._block]: true,
            ['radioboxgroup-size-' + this._size]: !!this._size
        });
    }
}
