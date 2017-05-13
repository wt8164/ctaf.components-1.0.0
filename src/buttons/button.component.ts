import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, EventEmitter, ChangeDetectorRef, Optional } from '@ctaf/framework';
import * as _ from 'underscore';
import { ButtonGroupComponent } from './buttongroup.component';
/**
 * Button 控件样式枚举。
 */
export enum ButtonStyle {

}

/**
 * Button 控件大小枚举。
 */
export enum ButtonSize {

}

/**
 * Button

*  按钮控件，提供通用按钮的显示和功能。针对 Bootstrap 的 button 进行二次封装 。
  *  基础信息

   * 代码文件路径： src/buttons/button.ts
   * 引用模块：ctafframework
   * 父类：CompentBase
   * 类型名称：ButtonComponent
   * 选择器名称：ctaf-cp-button
 */
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-button',
 *     templateUrl: 'button.component.html'
 * })
 * export class ButtonComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-button',
    templateUrl: 'button.component.html',
})
export class ButtonComponent extends ComponentBase {
	/**
	 * 控件类型名称，需要每个实现的子类进行自定义。
	 */
    protected get typeName(): string {
        return 'ButtonComponent';
    }

    private _ttitle: string;
    @Input()
    set ttitle(t: string) {
        this.setProperty('_ttitle', t);
    }
    get ttitle(): string {
        return this._ttitle;
    }

    // ngAfterViewInit() {
    //     this._showTooltip === true ? this._ttitle = this._title : this._ttitle = '';
    // }
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

	/** 	
	 * 当设置的属性值为 false 时，除当前属性外其余所有 api 不能使用。对应 Bootstrap.Button 中的 disabled 属性。
	 **/
    private _disabled: boolean;
    @Input()
    set disabled(d: boolean) {
        this.setProperty('_disabled', d);
    }
    get disabled(): boolean {
        return this._disabled;
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
    get preIcon(): string {
        return this._preIcon;
    }

	/**
	 * @Input() afterIcon: string
	 * 在文本信息后显示的 Icon，与文字间隔10px，默认支持 font-awsome 字体 Icon。
	 */
    private _afterIcon: string = '';
    @Input()
    set afterIcon(a: string) {
        this.setProperty('_afterIcon', a);
    }
    get afterIcon(): string {
        return this._afterIcon;
    }

	/**
	 * @Input() title: string
	 *     Button 显示的文本信息。
	 */
    private _title: string;
    @Input()
    set title(title: string) {
        this.setProperty('_title', title);
    }
    get title(): string {
        return this._title;
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
	 *  Button 控件外观大小属性。包含以下几种大小属性，默认值为空：
	 *  lg > 超大。
	 *  sm > 小号。
	 *  xs > 超小。
	 */
    private _size: string = 'md';
    @Input()
    set size(v: string) {
        if (this._disabled) {
            return;
        }
        if (v === '1') {
            this._size = 'xs';
        }
        if (v === '2') {
            this._size = 'sm';
        }
        if (v === '3') {
            this._size = 'md';
        }
        if (v === '4') {
            this._size = 'lg';
        }
        this.classesMap();
    }

    get size(): string {
        return this._size;
    }


	/**
	 * @Input() active: Boolean
	 * 设置为active后，按钮处于激活状态
	 */
    private _active: boolean;
    @Input()
    set active(a: boolean) {
        this.setProperty('_active', a);
    }
    get action(): boolean {
        return this._active;
    };

	/**
	 * @Input() isBlock: Boolean
	 * 设置后整个 Button 充满父容器。对应 Bootstrap.Button 中的 .btn-clock 样式。
	 */
    
    protected hostClassesMap(): any {
        return _.extend(super.hostClassesMap(), {
            'btn-block': this._isBlock
        });
    }
    private _isBlock: boolean;
    @Input()
    set isBlock(i: boolean) {
        this._isBlock = i;
        this.classesMap();
        this.setProperty('_block', i);
    }
    get isBlock(): boolean {
        return this._isBlock;
    }
    

	/**
	 * @Output() click
	 * 点击按钮后触发的事件。事件参数中传递当前 Button 实例。
	 */
    @Output() click: EventEmitter<ButtonComponent> = new EventEmitter<ButtonComponent>();

    private clickTrigger(event: MouseEvent) {
        this.click.emit(this);
        event.preventDefault();
        event.stopPropagation();
    }

    constructor(cdr: ChangeDetectorRef, @Optional() buttongroup: ButtonGroupComponent) {
        super(cdr);

        if (buttongroup) {
            buttongroup.buttons.push(this);
        }

    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'btn': true,
            ['btn-' + this._style]: true,
            ['btn-' + this._size]: this._size,
            ['active']: this._active,
            ['btn-block']: this._isBlock
        });
    }
}
