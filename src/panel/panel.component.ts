import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ChangeDetectorRef, EventEmitter } from '@ctaf/framework';
import * as _ from 'underscore';
import { ButtonComponent } from '../buttons/button.component';
/**
 * 基础信息
 * 代码文件路径： src/panels/panel.component.ts
 * 引用模块：ctafframework
 * 父类：CompentBase
 * 类型名称：PanelComponent
 * 选择器名称：ctaf-cp-panel
 */
@CTAFComponent({
    selector: 'ctaf-cp-panel',
    templateUrl: 'panel.component.html'
})
export class PanelComponent extends ComponentBase {

    protected get typeName(): string {
        return 'PanelComponent';
    }

    /**
     * @Input headerHeight
     * 用于设置panel容器的头部高度，默认值为30
     */
    private _headerHeight: number = 26;
    @Input()
    set headerHeight(h: number) {
        this.setProperty('_headerHeight', h);
    }
    get headerHeight(): number {
        return this._headerHeight;
    }

    /**
     * @Input bodyHeight
     * 用于设置panel容器的body高度，默认值30
     */

    _borderNum: number = 2;
    @Input()
    set borderNum(s: any) {
        this._borderNum = s;
    }
    get borderNum() {
        return this._borderNum;
    }

    /**
     * @Input columns:number
     * 用于设置Panel的显示宽度，采用bootstrap的栅格系统，范围为1-12，1占用一格，12占用12格，即宽度的100%.
     * 当参数大于12时，显示满行，即占用12格，参数小于1时，占用1格.
     */
    private _columns: number;
    @Input()
    set columns(c: number) {
        if (c < 1) {
            c = 1;
        }
        this._columns = c;
        // this.classesMap
    }
    get columns(): number {
        return this._columns;
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
    * @Input() title: string
    Panel 显示的标题。
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
     * 显示在头部标题文字前的 Icon，与文字间隔10px，默认支持 font-awsome 字体 Icon。
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
     * @Input() collapsed: Boolean
     * 是否提供 Panel 内容的收缩功能（点击 Panel 头部的 title 可以收缩展开 Panel body）。默认值为 false，不提供此功能。
     */
    private _collapsed: boolean;
    @Input()
    set collapsed(c: boolean) {
        this.setProperty('_collapsed', c);
    }
    get collapsed(): boolean {
        return this._collapsed;
    }

    /**
     * 高度。
     */
    private _height: string = '50%';
    @Input()
    set height(h: string) {
        this.setProperty('_height', h);
    }
    get height(): string {
        return this._height;
    }

    @Output() click: EventEmitter<PanelComponent> = new EventEmitter<PanelComponent>();
    public destroy() {
        this.click.emit(this);
        super.destroy();

        // if (this.container) {
        //     setTimeout(() => {
        //         this.container.refresh();
        //     }, 0);
        // }
    }
    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }


    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'panel': true,
            ['panel-' + this._style]: true,
            ['col-xs-' + this._columns]: true
        });
    }

}
