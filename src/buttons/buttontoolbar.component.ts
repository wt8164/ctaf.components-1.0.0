import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, EventEmitter} from '@ctaf/framework';
import * as _ from 'underscore';

/**
 * ButtonToolbarComponent
 * 选项按钮控件，提供选项按钮的显示，选择，数据功能，使用bootstrap的按钮样式
 * 基础信息
 * 
 * 代码文件路径： src/buttons/buttontoolbar.ts
   * 引用模块：ctafframework
   * 父类：CompentBase
   * 类型名称：ButtonToolbarComponent
   * 选择器名称：ctaf-cp-buttontoolbars
   * */
@CTAFComponent({
    selector: 'ctaf-cp-buttontoolbar',
    templateUrl: 'buttontoolbar.component.html',
})

export class ButtonToolbarComponent extends ComponentBase {

    /**
     * 控件类型名称，需要每个实现的子类进行自定义。
     */
    protected get typeName(): string {
        return 'ButtonToolbarComponent';
    }

    /**
     * @Input() style:string
     * style为已选中按钮的样式，默认为default，包括primary,success,info,warning,danger几种样式供选择
     */
    private _style: string = 'primary';
    @Input()
    set style(t: string) {
        this._style = t;
    }
    get style(): string {
        return this._style;
    }

    /**
     * @Input() text:string
     * text为选项按钮中显示的文字，默认为default
     */
    private _text: string = 'default';
    @Input()
    set text(t: string) {
        this._text = t;
    }
    get text(): string {
        return this._text;
    }

    /**
     * @Input() size:string;
     * 用于设置buttontoolbar的尺寸，默认为md，有1，2，3，4四种大小可供设置
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
    }
    get size(): string {
        return this._size;
    }



    /**
     * @Input() marginRight:number
     * 已将buttontoolbar控件设置为display:inline，取消button之间的默认边距。marginRight可设置buttontoolbar之间的右边距
     */
    private _margin: number;
    @Input()
    set marginRight(m: number) {
        this._margin = m;
    }
    get marginRight(): number {
        return this._margin;
    }

    /**
     * @Input() showCheckbox:boolean
     * showCheckbox，用于控制buttontoolbar的勾选框，设置showCheckbox="true"，可使其显示，
     */
    private _showCheckbox: boolean;
    @Input()
    set showCheckbox(d: boolean) {
        this.setProperty('_showCheckbox', d);
    }
    get showCheckbox(): boolean {
        return this._showCheckbox;
    }

    /**
     * @Input() checked:boolean
     * 用于控制按钮的已选择样式，当点击或选中勾选框时，整个buttontoolbar控件会添加一个颜色样式，通过checkClick函数控制
     */
    private _checked: boolean;
    @Input()
    set checked(c: boolean) {
        this._checked = c;
    }
    get checked(): boolean {
        return this._checked;
    }


    @Input()
    private innerClick(event) {
        this._checked = !this._checked; // 添加与取消样式颜色样式

        event.stopPropagation();
        setTimeout(() => {
            console.log(this.getData); // 执行获取buttontoolbar数据的函数
        }, 0);
        // 事件执行顺序，，等this._checked的样式执行完毕后再执行getData
    }

    @Input()
    private outerClick(event) {
        this._checked = !this._checked;
        event.stopPropagation();
        setTimeout(() => {
            console.log(this.getData);
        }, 0);
    }


    /**
     * getData
     * 获取所有已选中按钮的值，通过.btn-tool-checked样式识别，返回结果为一个数组
     */
    private get getData() {
        let elements = document.querySelectorAll('.btn-tool-checked');
        let checkData: Array<any> = []; // typescript数组泛类.
        for (let i = 0; i < elements.length; i++) {
            checkData.push(elements[i].lastElementChild.innerHTML);
        }
        // console.log(checkData);
        return checkData;
    }


    constructor() {
        super();
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'btn-group': true,
            'button-toolbar': true,
            ['checked-' + this._style]: this.checked,
            ['btn-tool-checked']: this.checked,
            ['btn-' + this._size]: true,
        });
    }
}
