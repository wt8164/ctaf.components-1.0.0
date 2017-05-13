import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, EventEmitter } from '@ctaf/framework';
import * as _ from 'underscore';
import './linkbutton.less';

/**
 * linkbutton

*  linkbutton控件，提供通用按钮的显示和功能。针对 Bootstrap 的 button 进行二次封装 。
  *  基础信息

   * 代码文件路径： src/buttons/linkbutton.component.ts
   * 引用模块：ctafframework
   * 父类：CompentBase
   * 类型名称：LinkbuttonComponent
   * 选择器名称：ctaf-cp-linkbutton
 */
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-linkbutton',
 *     templateUrl: 'linkbutton.component.html'
 * })
 * export class LinkbuttonComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-linkbutton',
    templateUrl: 'linkbutton.component.html',
    // styleUrls: ['linkbutton.less']
})
export class LinkbuttonComponent extends ComponentBase {

	/**
	 * 控件类型名称，需要每个实现的子类进行自定义。
	 */
    protected get typeName(): string {
        return 'ImagebuttonComponent';
    }

	/**
	 * @Input() size: string
	 *  imagebutton 控件外观大小属性。包含以下几种大小属性，默认值为空：
	 *  lg > 超大。
     *  md > 默认。
	 *  sm > 小号。
	 *  xs > 超小。
	 */
    private _size: number = 2;
    @Input()
    set size(v: number) {
        this._size = v;
        this.classesMap();
    }

    get size(): number {
        return this._size;
    }

	/**
	 * @Input() isBlock: Boolean
     * 设置是否为块状元素，独占一行显示
	 */
    private _isBlock: boolean;
    @Input()
    set isBlock(i: boolean) {
        this._isBlock = i;
        this.classesMap();
    }
    get isBlock(): boolean {
        return this._isBlock;
    }

    private _style: string = 'default';
    @Input()
    set style(s: string) {
        this._style = s;
        this.classesMap();
    }
    get style(): string {
        return this._style;
    }

    /**
     * 链接文字
     */
    private _text: string = 'default text';
    @Input()
    set text(t: string) {
        this._text = t;
    }
    get text(): string {
        return this._text;
    }
    
    private _title: string;
    @Input()
    set title(t: string) {
        this.setProperty('_title', t);
    }
    get title(): string {
        return this._title;
    }


    private _showTooltip: boolean;
    @Input()
    set showTooltip(s: boolean) {
        this.setProperty('_showTooltip', s);
    }
    get showTooltip(): boolean {
        return this._showTooltip;
    }
    ngOnInit() {
        this._showTooltip === true ? this._title = this._text : this._title = '';
    }
    /**
     * 链接地址
     */
    private _href: string = '#';
    @Input()
    set href(h: string) {
        this._href = h;
        this.classesMap();
    }
    get href(): string {
        return this._href;
    }
    /**
     * disabled禁用
     */
    private _disabled: boolean;
    @Input()
    set disabled(d: boolean) {
        this._disabled = d;
        this.classesMap();
    }
    get disabled(): boolean {
        return this._disabled;
    }
    /**
 * @Output() click
 * 点击按钮后触发的事件。事件参数中传递当前 LinkbuttonComponent 实例。
 */
    // @Output() click: EventEmitter<LinkbuttonComponent> = new EventEmitter<LinkbuttonComponent>();
    /**
     * 阻止API调用click事件，只执行a标签的跳转操作
     */
    // @Output() click: EventEmitter<LinkbuttonComponent> = new EventEmitter<LinkbuttonComponent>();
    private clickevent(event: MouseEvent) {
        // this.click.emit(this);
        // console.log(event);
        // event.preventDefault();
        event.stopPropagation();
    }
    constructor() {
        super();
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            ['linkbutton']: true,
            ['style-' + this._style]: true,
            ['linkbutton-disabled']: this._disabled,
            ['block']: this._isBlock,
            ['size-' + this._size]: true
        });
    }
}
