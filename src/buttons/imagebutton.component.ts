import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, EventEmitter } from '@ctaf/framework';
import * as _ from 'underscore';


/**
 * imagebutton

*  按钮控件，提供通用按钮的显示和功能。针对 Bootstrap 的 button 进行二次封装 。
  *  基础信息

   * 代码文件路径： src/buttons/imagebutton.component.ts
   * 引用模块：ctafframework
   * 父类：CompentBase
   * 类型名称：ImagebuttonComponent
   * 选择器名称：ctaf-cp-imagebutton
 */
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-imagebutton',
 *     templateUrl: 'imagebutton.component.html'
 * })
 * export class ImagebuttonComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-imagebutton',
    templateUrl: 'imagebutton.component.html',
})
export class ImagebuttonComponent extends ComponentBase {

	/**
	 * 控件类型名称，需要每个实现的子类进行自定义。
	 */
    protected get typeName(): string {
        return 'ImagebuttonComponent';
    }

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
	 * @Input() size: string
	 *  imagebutton 控件外观大小属性。包含以下几种大小属性，默认值为空：
	 *  lg > 超大。
     *  md > 默认。
	 *  sm > 小号。
	 *  xs > 超小。
	 */
    private _size: string;
    @Input()
    set size(v: string) {
        this._size = v;
        this.classesMap();
    }

    get size(): string {
        return this._size;
    }
    /**
     * imgbutton文字
     */
    private _title: string;
    @Input()
    set title(t: string) {
        this._title = t;
        // this.classesMap();
    }
    get title(): string {
        return this._title;
    }

    /**
	 * @Input() w: number
     * 设置宽
	 */
    private _w: number;
    @Input()
    set w(v: number) {
        this._w = v;
    }
    get w(): number {
        return this._w;
    }
    /**
	 * @Input() h: number
     * 设置高
	 */
    private _h: number;
    @Input()
    set h(v: number) {
        this._h = v;
    }

    get h(): number {
        return this._h;
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
    /**
	 * @Input() isBlock: Boolean
	 */
    private _imgUrl: string;
    @Input()
    set imgUrl(b: string) {
        this._imgUrl = b;
        this.classesMap();
    }
    get imgUrl(): string {
        return this._imgUrl;
    }

    private _opacity: number;
    @Input()
    set opacity(o: number) {
        this._opacity = o;
        this.classesMap();
    }
    get opacity(): number {
        return this._opacity;
    }
	/**
	 * @Output() click
	 * 点击按钮后触发的事件。事件参数中传递当前 imagebutton 实例。
	 */
    @Output() click: EventEmitter<ImagebuttonComponent> = new EventEmitter<ImagebuttonComponent>();

    public clickImage(event: MouseEvent) {
        this.click.emit(this);
        // console.log(event);
        event.preventDefault();
        event.stopPropagation();
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
    private _ttitle: string;
    @Input()
    set ttitle(t: string) {
        this.setProperty('_ttitle', t);
    }
    get ttitle(): string {
        return this._ttitle;
    }
    ngOnInit() {
        this._showTooltip === true ? this._ttitle = this._title : this._ttitle = '';
    }

    private _showTooltip: boolean;
    @Input()
    set showTooltip(s: boolean) {
        this.setProperty('_showTooltip', s);
    }
    get showTooltip(): boolean {
        return this._showTooltip;
    }
    constructor() {
        super();
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'imgbtn': true,
            ['imgbtn-' + this._size]: !!this._size,
            // ['imgbtn-block']: this._isBlock,
            ['border-' + this._style]: true,
            ['imgbutton-disabled']: this._disabled
        });
    }
}
