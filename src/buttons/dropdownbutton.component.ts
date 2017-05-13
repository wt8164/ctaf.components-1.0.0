import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, EventEmitter } from '@ctaf/framework';
import * as _ from 'underscore';

/**
 * 下拉按钮下拉项数据结构
 */
export interface IDropdownButtonItem {
	/**
	 * 类型，如果是分隔符需要设定值 `separator`，生成如下结构：
	 * <li role="separator" class="divider"></li>
	 */
    role: string;
	/**
	 * Item ID，用于 Item 的唯一性定位。
	 */
    id: string;
	/**
	 * Item 显示的文本。
	 */
    value: string;
}

/**
 * DropdownButtonComponent
 * 带下拉菜单的按钮控件，在通用按钮基础上可以展现一个下拉菜单，且提供菜单项的点击事件。针对 Bootstrap 的 button dropdowns 进行二次封装 。
 * 基础信息
 * 代码文件路径： src/buttons/dropdownbutton.component.ts
 * 引用模块：ctafframework
 * 父类：CompentBase
 * 类型名称：DropdownButtonComponent
 * 选择器名称：ctaf-cp-dropdownbutton
 */

/**
 * 代码结构
 *@Component({
 *	selector: 'ctaf-cp-dropdownbutton',
 *  templateUrl: 'dropdownbutton.component.html'
 * })
 * export class DropdownButtonComponent extends ComponentBase {
 * }
 */
@CTAFComponent({
    selector: 'ctaf-cp-dropdownbutton',
    templateUrl: 'dropdownbutton.component.html'
})
export class DropdownButtonComponent extends ComponentBase {
    protected get typeName(): string {
        return 'DropdownButtonComponent';
    }

	/**
	 * @Input() style: string
	 * Button 控件外观样式属性。包含以下几种外观样式，默认值为 default：
	 * default > Standard button.
	 * primary > Provides extra visual weight and identifies the primary action in a set of buttons.
	 * success > Indicates a successful or positive action.
	 * info > Contextual button for informational alert messages.
	 * warning > Indicates a dangerous or potentially negative action.
	 * danger > Indicates a dangerous or potentially negative action.
	 * link > Deemphasize a button by making it look like a link while maintaining button behavior.
	 */
    private _style: string = 'primary';
    @Input()
    set style(s: string) {
        this._style = s;
        this.setProperty('_style', s);
        this.classesMap();
    }
    get style(): string {
        return this._style;
    }

	/**
	 * @Input() size: string
	 * Button 控件外观大小属性。包含以下几种大小属性，默认值为空：
	 * lg > 超大。
	 * sm > 小号。
	 * xs > 超小。
	 */
    private _size: string = 'md';
    @Input()
    set size(s: string) {
        if (s === '1') {
            this._size = 'xs';
        }
        if (s === '2') {
            this._size = 'sm';
        }
        if (s === '3') {
            this._size = 'md';
        }
        if (s === '4') {
            this._size = 'lg';
        }
        // this.setProperty("_size", s)
        this.classesMap();
    }
    get size(): string {
        return this._size;
    }

	/**
	 * 	@Input() disabled: Boolean
	 * 当设置的属性值为 false 时，除当前属性外其余所有 api 不能使用。对应 Bootstrap.Button 中的 disabled 属性。
	 */
    private _disabled: boolean;
    @Input()
    set disabled(d: boolean) {
        this.setProperty('_disabled', d);
    }
    get disabled(): boolean {
        return this._disabled;
    }

	/**
	 * @Input() text: string
	 * Button 显示的文本信息。
	 */
    private _text: string;
    @Input()
    set text(t: string) {
        this._text = t;
        this.setProperty('_text', t);
    }
    get text(): string {
        return this._text;
    }


	/**
	 * @Input() preIcon: string
	 * 在文本信息前显示的 Icon，与文字间隔10px，默认支持 font-awsome 字体 Icon。
	 */
    private _preIcon: string = '';
    @Input()
    set preIcon(p: string) {
        this.setProperty('_preIcon', p);
    }
    get preIcon() {
        return this._preIcon;
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
        // this._showTooltip === true ? this._ttitle = this._text : this._ttitle = '';
    }

	/**
	 * @Input() items: Array<IDropdownButtonItem>
	 * 下拉项数据数组。
	 */
    @Input()
    public set items(v: string | Array<IDropdownButtonItem>) {
        if (typeof v === 'string') {
            this.itemDatas = $.parseJSON(v);
        } else {
            this.itemDatas = v;
        }
    }
    private itemDatas: Array<IDropdownButtonItem>;

	/**
	 * @Input() isDropUp: Boolean
	 * 下拉项向上显示还是向下显示。默认值为 false，下拉项向下显示。
	 */
    private _isDropUp: boolean;
    @Input()
    set isDropUp(i: boolean) {
        this.setProperty('_isDropUp', i);
    }
    get isDropUp(): boolean {
        return this._isDropUp;
    }

	/**
	 * @Input() isSplit: Boolean
	 * 下拉按钮是否显示为分割模式。默认值为 false。如果是分割模式，click 事件不做响应。
	 */
    private _isSplit: boolean;
    @Input()
    set isSplit(i: boolean) {
        this.setProperty('_isSplit', i);
    }
    get isSplit(): boolean {
        return this._isSplit;
    }

    public itemClick(item) {
        // console.log(item.id);
        // console.log(this.text);
        this.itemclick.emit(item);
        event.preventDefault();
        event.stopPropagation();
    }
	/**
	 * @Output() click
	 * 点击按钮后触发的事件。事件参数中传递当前 Button 实例。
	 * dropdownButtonInstance.click.subscribe((button: DropdownButtonComponent) => {
	 *    alert(button.text);
	 * );
	 */
    @Output() click: EventEmitter<DropdownButtonComponent> = new EventEmitter<DropdownButtonComponent>();
    @Output() itemclick: EventEmitter<DropdownButtonComponent> = new EventEmitter<DropdownButtonComponent>();
	/**
	 * @Output() itemClick
	 * 点击按钮后触发的事件。事件参数中传递当前 Button 实例。
	 * dropdownButtonInstance.itemClick.subscribe((dropdownButtonItem: IDropdownButtonItem) => {
	 *    alert(button.text);
	 * );
	 */
    public clickTrigger(event: MouseEvent) {
        if (this.isSplit) {
            this.click.emit(this);
        }
        console.log(this.text);
        event.preventDefault();
        event.stopPropagation();
    }

    constructor() {
        super();
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'btn': true,
            ['btn-' + this._style]: true,
            ['btn-' + this._size]: true
        });
    }
}
