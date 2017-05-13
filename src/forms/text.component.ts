import {
    CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ChangeDetectorRef, ViewChild, ElementRef, Size,
    EventEmitter, NG_VALUE_ACCESSOR, forwardRef,
    trigger,
    state,
    style,
    transition,
    keyframes,
    animate
} from '@ctaf/framework';
import * as _ from 'underscore';

import { TextualInputControlBase } from './textualinputcontrol.component';
/* tslint:disable */
export const TEXT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextComponent),
    multi: true
};
/**
 * Text
 * 基础信息

* 代码文件路径： src/forms/text.ts
* 引用模块：ctafframework
* 父类：CTAFCompentBase
* 类型名称：TextComponent
* 选择器名称：ctaf-cp-text

*/
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-text',
 *     templateUrl: 'text.component.html'
 * })
 * export class TextComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-textbox',
    templateUrl: 'text.component.html',
    animations: [
        trigger('routeAnimation', [
            state('off', style({
                color: '#3d3d3d'
            })),
            state('on', style({
                color: '#3d3d3d'
            })),
            /** ease 默认，规定慢速开始，然后变快，然后慢速结束的过渡效果
             *  linear 规定以相同速度开始至结束的过渡效果
             *  ease-in 规定以慢速开始的过渡效果
             *  ease-out 规定以慢速结束的过渡效果
             *  ease-in-out 规定以慢速开始和结束的过渡效果
             */
            transition('off <=> on', [
                animate(900, keyframes([
                    style({ color: '#3d3d3d', offset: 0 }),
                    style({ color: 'transparent', offset: 0.2 }),
                    style({ color: '#3d3d3d', offset: 0.5 }),
                    style({ color: 'transparent', offset: 0.8 }),
                    style({ color: '#3d3d3d', offset: 1 })
                ]))
            ])
        ])
    ],
    providers: [TEXT_VALUE_ACCESSOR]
})
export class TextComponent extends TextualInputControlBase {
    // private _size: string;
    // private size: Size = Size.md;
    private _w: number;
    private _regstr: string;
    private _animation: boolean = false;
    // private _preIcon: string = '';
    // private _afterIcon: string = '';
    private _block: boolean = false;
    private _disabled: boolean = false;
    private _showTooltip: boolean = false;
    private _style: string = 'primary';
    // private _value: string;
    private _placeHolder: string;
    // private displayValue: string;
    private onModelChange: Function = () => { };
    private onModelTouched: Function = () => { };

    @ViewChild('ipt') ipt: ElementRef;

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onChange: EventEmitter<any> = new EventEmitter();


    get routeAnimation() {
        return this.animationState ? 'on' : 'off';
    }

    private _animationState: boolean = false;
    @Input()
    set animationState(a: boolean) {
        this.setProperty('_animationState', a);
    }
    get animationState(): boolean {
        if (this.animation) {
            return this._animationState;
        }
    }

    /**
     * 控件类型名称，需要每个实现的子类进行自定义。
     */
    protected get typeName(): string {
        return 'TextComponent';
    }

    @Input()
    set style(sty: string) {
        this.setProperty('_style', sty);
        this.classesMap();
    }

    get style(): string {
        return this._style;
    }


    /**
     * @Input() size: string
     *  switch 控件外观大小属性。包含以下几种大小属性，默认值为md：
     *  lg > 超大。
     *  md > 默认。
     *  sm > 小号。
     *  xs > 超小。
     */
    // @Input()
    // set size(t: string) {
    //     this._size = t;
    //     this.classesMap();
    // }
    // get size() {
    //     return 'text-size-' + this._size;
    // }

    @Input()
    set w(t: number) {
        this._w = t;
    }
    get w(): number {
        return this._w;
    }

    @Input()
    set regstr(s: string) {
        this.setProperty('_regstr', s);
    }
    get regstr(): string {
        return this._regstr;
    }

    @Input()
    set animation(b: boolean) {
        this.setProperty('_animation', b);
    }
    get animation(): boolean {
        return this._animation;
    }

    ngOnInit() {
        // console.warn(this._w);
    }

    private isWrong: boolean = false;
    private changeHandler(e: Event) {
        let reg = new RegExp(this.regstr, 'g');
        if (this.value !== '') {
            this.isWrong = !reg.test(this.value);
        } else {
            this.isWrong = false;
        }
        // console.warn(this.animationState);
        this.animationState = !this.animationState;
        this.onChange.emit(e);
    }

    private focusHandler(e: MouseEvent): void {
        this.onFocus.emit(e);
    }

    private blurHandler(e: MouseEvent): void {
        this.onBlur.emit(e);
    }

    private removeValue() {
        this.value = '';
        this.isWrong = false;
        this.cdr.detach();
        this.cdr.detectChanges();
        this.ipt.nativeElement.focus();
    }
    /**
	 * @Input() preIcon: string
	 * 在文本信息前显示的 Icon，与文字间隔10px，默认支持 font-awsome 字体 Icon。
	 */
    // @Input()
    // set preIcon(p: string) {
    //     this._preIcon = p;
    // }
    // get preIcon(): string {
    //     return this._preIcon;
    // }

	/**
	 * @Input() afterIcon: string
	 * 在文本信息后显示的 Icon，与文字间隔10px，默认支持 font-awsome 字体 Icon。
	 */
    // @Input()
    // set afterIcon(a: string) {
    //     this._afterIcon = a;
    // }
    // get afterIcon(): string {
    //     return this._afterIcon;
    // }

    /** 
     * @Input() block: boolean
     * 当设置的属性值为 true 时，以块状元素显示（独占一行）.
     **/
    @Input()
    set block(blo: boolean) {
        this._block = blo;
        this.classesMap();
    }

    /** 
     * @Input() disabled: boolean	
     * 当设置的属性值为 true 时，除当前属性外其余所有 api 不能使用。对应表单元素 disabled 属性。默认值为true.
     **/
    @Input()
    set disabled(d: boolean) {
        this._disabled = d;
        // this.classesMap();
    }
    get disabled(): boolean {
        return this._disabled;
    }

    @Input()
    set showTooltip(d: boolean) {
        this._showTooltip = d;
    }
    get showTooltip(): boolean {
        return this._showTooltip;
    }

    // @Output()
    // valueChange = new EventEmitter();
    // @Input()
    // set value(s: string) {
    //     super();
    //     if (this.setProperty('_value', s)) {
    //        // this._value = s;
    //         this.valueChange.emit(s);
    //     }
    // }
    // get value(): string {
    //     return this._value;
    // }

    writeValue(value: any): void {
        this.value = value;
        this.forceChange();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    inputHandler(event) {
        this.onModelChange(event.target.value);
    }

    @Input()
    set placeHolder(s: string) {
        this._placeHolder = s;
    }
    get placeHolder(): string {
        return this._placeHolder;
    }

    private _textsize: string = 'md';

    // @Input()
    // set size(s: number) {
    //     if (s === 0) {
    //         this._textsize = 'xs';
    //     }
    //     if (s === 1) {
    //         this._textsize = 'sm';
    //     }
    //     if (s === 2) {
    //         this._textsize = 'md';
    //     }
    //     if (s === 3) {
    //         this._textsize = 'lg';
    //     }
    //     this.setProperty('_textsize', s);
    // }

    // get textsize() {
    //     if (this.size === 0) {
    //         return '0';
    //     }
    //     if (this.size === 1) {
    //         return '1';
    //     }
    //     if (this.size === 2) {
    //         return '2';
    //     }
    //     if (this.size === 3) {
    //         return '3';
    //     }
    // }
    // get size(): number {
    //     return this.size;
    // }

    // public ngOnInit(): void {
    //     detail() {
    //         console.log($(this.in.nativeElement).val);
    //     };
    // }

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'textCtaf': true,
            ['text-style-' + this._style]: true,
            // ['text-disabled']: this._disabled,
            ['text-block']: this._block,
            // ['size-3' + Size.md]: true
            // ['text-size-' + this.textsize]: true
        });
    }
}
