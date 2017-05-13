import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ChangeDetectorRef} from '@ctaf/framework';
import * as _ from 'underscore';

import { TextualInputControlBase } from './textualinputcontrol.component';
/**
 * Password
 *  基础信息

* 代码文件路径： src/forms/password.ts
* 引用模块：ctafframework
* 父类：CTAFCompentBase
* 类型名称：PasswordComponent
* 选择器名称：ctaf-cp-password

*/
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-password',
 *     templateUrl: 'password.component.html'
 * })
 * export class PasswordComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-password',
    templateUrl: 'password.component.html'
})
export class PasswordComponent extends TextualInputControlBase {
    // private _size: string;
    private _w: number;
    private _regstr: string;
    private _showpwdtext: boolean;
    // private _preIcon: string = '';
    // private _afterIcon: string = '';
    private _block: boolean = false;
    private _disabled: boolean = false;
    private _style: string = 'primary';
    // private _value: string;
    private _placeHolder: string;
    // private displayValue: string;

    /**
     * 控件类型名称，需要每个实现的子类进行自定义。
     */
    protected get typeName(): string {
        return 'PasswordComponent';
    }

    @Input()
    set style(sty: string) {
        this.setProperty('_style', sty);
        this.classesMap();
    }

    get style(): string {
        return this._style;
    }

    @Input()
    set regstr(s: string) {
        this.setProperty('_regstr', s);
    }
    get regstr(): string {
        return this._regstr;
    }

    @Input()
    set showpwdtext(b: boolean) {
        this.setProperty('_showpwdtext', b);
    }
    get showpwdtext(): boolean {
        return this._showpwdtext;
    }

    private isWrong: boolean= false;
    private changeHandler(s: string) {
        let reg = new RegExp(this.regstr, 'g'); 
        this.isWrong = !reg.test(s);
    }

    private bShowPwd: boolean;
    private pwdText: string;
    private showPwdHandler(s: string) {
        if (s) {
            this.bShowPwd = !this.bShowPwd;
            this.pwdText = s;
        }
        
    }

    // private _labelWidth: number;
    // @Input()
    // set labelWidth(n: number) {
    //     this.setProperty('_labelWidth', n);
    // }

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
    //     return 'password-size-' + this._size;
    // }

    @Input()
    set w(t: number) {
        this._w = t;
    }
    get w() {
        return this._w;
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

    // @Input()
    // set value(s: string) {
    //     this._value = s;
    //     this.displayValue = 'ssssssssss';
    // }
    // get value(): string {
    //     return this._value;
    // }

    @Input()
    set placeHolder(s: string) {
        this._placeHolder = s;
    }
    get placeHolder(): string {
        return this._placeHolder;
    }

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    private _textsize: string = 'md';
    get textsize() {
        if (this.size === 0) {
            return '0';
        }
        if (this.size === 1) {
            return '1';
        }
        if (this.size === 2) {
            return '2';
        }
        if (this.size === 3) {
            return '3';
        }
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'passwordCtaf': true,
            // ['password-disabled']: this._disabled,
            ['password-style-' + this._style]: true,
            ['password-block']: this._block,
        });
    }
}
