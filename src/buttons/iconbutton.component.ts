import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ChangeDetectorRef, EventEmitter } from '@ctaf/framework';
import * as _ from 'underscore';

/**
 * 基础信息
 * 代码文件路径： src/cornericon/cornericon.component.ts
 * 引用模块：ctafframework
 * 父类：CompentBase
 * 类型名称：IconButtonComponent
 * 选择器名称：ctaf-cp-cornericon
 */
@CTAFComponent({
    selector: 'ctaf-cp-iconbutton',
    templateUrl: 'iconbutton.component.html'
})

export class IconButtonComponent extends ComponentBase {

    /**
     * @Input icon:string
     * 用于设置icon的类型，支持font-awesome
     */
    _icon: string = 'fa-commenting';
    @Input()
    set icon(i: string) {
        this._icon = i;
    }
    get icon(): string {
        return this._icon;
    }


    /**
     * @Input() style: string
     * iconButton 控件外观样式属性。包含以下几种外观样式，默认值为 default：
     * default > Standard button.
     * primary > Provides extra visual weight and identifies the primary action in a set of buttons.
     * success > Indicates a successful or positive action.
     * info > Contextual button for informational alert messages.
     * warning > Indicates a dangerous or potentially negative action.
     * danger > Indicates a dangerous or potentially negative action.
     */
    _style: string = 'primary';
    @Input()
    set style(s: string) {
        if (s === 'primary') {
            this._style = 'primary';
        }
        if (s === 'success') {
            this._style = 'success';
        }
        if (s === 'info') {
            this._style = 'info';
        }
        if (s === 'warning') {
            this._style = 'warning';
        }
        if (s === 'danger') {
            this._style = 'danger';
        }
    }
    get style(): string {
        return this._style;
    }

    /**
     * @Input iconSize:number
     * 设置icon的大小，共有1，2，3，4四种可选，默认为2
     */
    _iconSize: number = 4;
    @Input()
    set iconSize(i: number) {
        if (i === 1) {
            this._iconSize = 2;
        }
        if (i === 2) {
            this._iconSize = 3;
        }
        if (i === 3) {
            this._iconSize = 4;
        }
        if (i === 4) {
            this._iconSize = 5;
        }
    }
    get iconSize(): number {
        return this._iconSize;
    }

    /**
     * @Input cornerPosition:string
     * 控制icon角标的位置，默认为bottom，设置为top时，角标位于右上角
     */
    _cornerPosition: string = 'right-bottom';
    @Input()
    set CornerPosition(c: string) {
        if (c === 'right-top') {
            this._cornerPosition = 'right-top';
        }
        if (c === 'left-top') {
            this._cornerPosition = 'left-top';
        }
        if (c === 'left-bottom') {
            this._cornerPosition = 'left-bottom';
        }
    }

    get CornerPosition(): string {
        return this._cornerPosition;
    }
    /**
     * @Input text:string
     * text为角标中显示的文本，不设置时，角标不显示
     */
    _text: string = '';
    @Input()
    set text(t: string) {
        this._text = t;
    }
    get text(): string {
        return this._text;
    }

    private _disabled: boolean = false;
    @Input()
    set disabled(b: boolean) {
        this._disabled = b;
    }
    get disabled(): boolean {
        return this._disabled;
    }

    /**
     * @Input cornercolor 角标的颜色
     */
    _cornercolor: string = 'cornercolor-default';
    @Input()
    set cornercolor(c: string) {
        if (c === 'primary') {
            this._cornercolor = 'cornercolor-primary';
        }
        if (c === 'success') {
            this._cornercolor = 'cornercolor-success';
        }
        if (c === 'info') {
            this._cornercolor = 'cornercolor-info';
        }
        if (c === 'warning') {
            this._cornercolor = 'cornercolor-warning';
        }
        if (c === 'danger') {
            this._cornercolor = 'cornercolor-danger';
        }
    }
    get cornercolor(): string {
        return this._cornercolor;
    }

    /**
     * @Input textcolor 角标字体的颜色
     */
    _textcolor: string = 'textcolor-default';
    @Input()
    set textcolor(t: string) {
        if (t === 'primary') {
            this._cornercolor = 'textcolor-primary';
        }
        if (t === 'success') {
            this._cornercolor = 'textcolor-success';
        }
        if (t === 'info') {
            this._cornercolor = 'textcolor-info';
        }
        if (t === 'warning') {
            this._cornercolor = 'textcolor-warning';
        }
        if (t === 'danger') {
            this._cornercolor = 'textcolor-danger';
        }
    }
    get textcolor(): string {
        return this._textcolor;
    }


    @Output() click: EventEmitter<IconButtonComponent> = new EventEmitter<IconButtonComponent>();

    private clickIcon(event: MouseEvent) {
        if (!this.disabled) {
            this.click.emit(this);
            console.log(event);
            event.preventDefault();
            event.stopPropagation();
        }
    }

    constructor() {
        super();
    }
}
