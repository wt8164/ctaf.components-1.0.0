import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding} from '@ctaf/framework';
import * as _ from 'underscore';

/**
 * 基础信息
 * 代码文件路径： src/navbars/navbars.component.ts
 * 引用模块：ctafframework
 * 父类：CompentBase
 * 类型名称：NavbarComponent
 * 选择器名称：ctaf-cp-navbar
 */
@CTAFComponent({
    selector: 'ctaf-cp-navbar',
    templateUrl: 'navbars.component.html'
})
export class NavbarComponent extends ComponentBase {

    protected get typeName(): string {
        return 'NavbarComponent';
    }

	/**
	 * @Input() style: string
	 * Panel 控件外观样式属性。包含以下几种外观样式，默认值为 default：
	 * default > Standard button.
	 * primary > Provides extra visual weight and identifies the primary action in a set of buttons.
	 * success > Indicates a successful or positive action.
	 * info > Contextual button for informational alert messages.
	 * warning > Indicates a dangerous or potentially negative action.
	 * danger > Indicates a dangerous or potentially negative action.
	 */
    private _style: string = 'default';
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
    * @Input() title: string
    导航条左侧头部显示的品牌文本信息
    */
    private _title: string;
    @Input()
    set title(t: string) {
        this.setProperty('_title', t);
    }
    get title(): string {
        return this._title;
    }


	/**
	 * @Input() icon: string
	 * 导航条左侧品牌文本信息前显示的 Icon，与文字间隔10px，默认支持 font-awsome 字体 Icon。
     * 设置后显示对于的 html 元素，不设置则不显示 html 元素（使用 ngIf）。
	 */
    private _icon: string = '';
    @Input()
    set icon(i: string) {
        this.setProperty('_icon', i);
    }

    get icon(): string {
        return this._icon;
    }


    /**
     * @Input() inverse: Boolean
     * 导航条主题色调是否反色。默认值为 false。
     */
    private _inverse: boolean;
    @Input()
    set inverse(i: boolean) {
        this.setProperty('_inverse', i);
    }

    get inverse(): boolean {
        return this._inverse;
    }


    /**
     * @Input() isFixed: Boolean
     * 是否固定导航条。默认值为 false。
     */
    private _isFixed: boolean;
    @Input()
    
    set isFixed(i: boolean) {
        this.setProperty('_isFixed', i);
    }

    get isFixed(): boolean {
        return this._isFixed;
    }
    

    /**
     * @Input() fixedDirection: string
     * 导航条固定方位: top, bottom，默认值为 top。此属性只有在 isFiexed = true 的情况下才会生效。
     */
    private _fixedDirection: string = 'top';
    @Input()
    set fixedDirecetion(f: string) {
        this._fixedDirection = f;
        this.setProperty('_fixedDirection', f);
        this.classesMap();
    }

    get fixedDirecetion(): string{
        return this._fixedDirection;
    }

    constructor() {
        super();
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'navbar': true,
            ['navbar-' + this._style]: true,
            ['navbar-inverse']: this._inverse,
            ['navbar-fixed-' + this._fixedDirection]: this._isFixed
        });
    }
}
