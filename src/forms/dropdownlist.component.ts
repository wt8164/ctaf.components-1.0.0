import { ChangeDetectorRef } from '@angular/core';
import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ViewChild, ElementRef } from '@ctaf/framework';
import * as _ from 'underscore';

/**
 * DropDownList
 *  基础信息

* 代码文件路径： src/forms/dropdownlist.ts
* 引用模块：ctafframework
* 父类：CTAFCompentBase
* 类型名称：DropDownListComponent
* 选择器名称：ctaf-cp-dropdownlist

*/
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-dropdownlist',
 *     templateUrl: 'dropdownlist.component.html'
 * })
 * export class DropDownListComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-dropdownlist',
    templateUrl: 'dropdownlist.component.html'
})
export class DropDownListComponent extends ComponentBase {
    static dropdownlists: Array<DropDownListComponent> = [];

    @ViewChild('dropdownlist') dropdownlist: ElementRef;
    /**
     * 控件类型名称，需要每个实现的子类进行自定义。
     */
    protected get typeName(): string {
        return 'DropDownListComponent';
    }

    ngOnInit() {
        $(document).click(() => {
            this.setProperty('menuState', false);
            $(this.dropdownlist.nativeElement).find('.searchinput').blur();
        });

        /**
         * 初始化val，valtext
         */
        if (!this._selectValue) {
            $(this.dropdownlist.nativeElement).find('.menuList li:eq(0)').addClass('selected');
            if (this._multiple) {
                this.val = [this._options[0].value];
                this.arr = [this._options[0].text];
                this.arrval = [this._options[0].value];
            } else {
                this.val = this._options[0].value;
            }
            this._valtext = this._options[0].text;
        }
        this.firstoptions = this._options;

        /**
         * 初始化iscroll
         */
        if (this.number > 0) {
            let iHeight = $(this.dropdownlist.nativeElement).find('.scroll-container li').outerHeight();
            // let height = $(this.dropdownlist.nativeElement).find('.scroll-container li')[0].offsetHeight;
            $(this.dropdownlist.nativeElement).find('.scroll-container').height(iHeight * this.number);
            this.listScroll = new IScroll($(this.dropdownlist.nativeElement).find('.scroll-container')[0], {
                mouseWheel: true,
                scrollbars: true,
                mouseWheelSpeed: 5,
                interactiveScrollbars: true
            });
            $(this.dropdownlist.nativeElement).find('.iScrollVerticalScrollbar ').on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
        }

    }

    ngAfterViewInit() {
        /**
         * 如果有默认选中值，需在这里渲染
         */
        if (this._selectValue) {
            this._selectValue.forEach((v, i) => {
                this.options.forEach((opt, k) => {
                    if (v === opt.value) {
                        // jq模拟事件也可以做到
                        // $(this.dropdownlist.nativeElement).find('.menuList li:eq(' + k + ')').trigger('click');
                        this.selectval(null, $(this.dropdownlist.nativeElement).find('.menuList li:eq(' + k + ')')[0]);
                    }
                });
            });
            // this.menuState = false;
            this.forceChange();
        }
    }

    ngAfterViewChecked() {
        // if (this.number > 0) {
        //     setTimeout(() => {
        //         this.listScroll.refresh();
        //     }, 0);
        // }
    }

    /**
     * 封装重新计算iscroll容器尺寸函数，在点击list后执行
     */
    public listIscrollRefresh() {
        if (this.number > 0) {
            let iHeight = $(this.dropdownlist.nativeElement).find('.scroll-container li').outerHeight();
            // let height = $(this.dropdownlist.nativeElement).find('.scroll-container li')[0].offsetHeight;
            $(this.dropdownlist.nativeElement).find('.scroll-container').height(iHeight * this.number);
            setTimeout(() => {
                this.listScroll.refresh();
            });
        }
    }

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);

        DropDownListComponent.dropdownlists.push(this);
    }
    /**
     * 设置IScroll实例
     */
    public listScroll: IScroll;
    /**
     * 设置显示几行选项
     */

    private _number: number;
    @Input()
    set number(n: number) {
        this.setProperty('_number', n);
    }
    get number(): number {
        return this._number;
    }
    /**
     * 设置下拉菜单style
     * 参数有primary，success,info,warning,danger
     */
    private _selectValue: Array<any>;
    @Input()
    set selectValue(s: Array<any>) {
        this.setProperty('_selectValue', s);
    }

    /**
     * 设置下拉菜单style
     * 参数有primary，success,info,warning,danger
     */
    private _style: string;
    @Input()
    set style(s: string) {
        this.setProperty('_style', s);
    }

    /**
     * 设置下拉菜单禁用(disabled)
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
     * 设置视觉下拉菜单options
     * 设置隐藏下拉菜单firstoptions
     */
    private _firstoptions: Array<any>;
    @Input()
    set firstoptions(o: Array<any>) {
        this.setProperty('_firstoptions', o);
    }
    get firstoptions(): Array<any> {
        return this._firstoptions;
    }
    private _options: Array<any>;
    @Input()
    set options(o: Array<any>) {
        this.setProperty('_options', o);
    }
    get options(): Array<any> {
        return this._options;
    }

    /**
	 * @Input() _valtext: any
	 * 设置选中的value值，单选为字符串，多选为数组
     * 设置显示option文本
	 */
    public val: any;
    private _valtext: any;
    @Input()
    get valtext(): any {
        return this._valtext;
    };

    /**
     * 设置下拉菜单开关状态
     */
    private menuState: boolean = false;
    private menuShow(event: MouseEvent) {
        DropDownListComponent.dropdownlists.forEach((v, k) => {
            if (v !== this) {
                v.menuState = false;
            }
            v.forceChange();
        });
        this.menuState = !this.menuState;
        this.forceChange();
        if (this._searchbox) {
            setTimeout(() => {
                if (this.menuState) {
                    $(this.dropdownlist.nativeElement).find('.searchinput').focus();
                    this.searchvalue = '';
                    this.options = this.firstoptions;
                } else {
                    $(this.dropdownlist.nativeElement).find('.searchinput').blur();
                }
            }, 0);
        }



        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * 设置下拉菜单可多选时阻止事件冒泡
     */
    private stopPro(event: MouseEvent) {
        if (this.multiple) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * 设置下拉菜单禁用时阻止事件冒泡
     */
    private stopProMark(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * 设置选中项类
     * 渲染视觉选中值
     * 设置真正select的value值     
     */
    private arr = [];
    private arrval = [];
    @Input()
    get arrvalue(): Array<any> {
        return this.arrval;
    }
    @Output()
    private selectval(e?: MouseEvent, ss?) {
        let ele = e === null ? ss : e.target;

        if (this.multiple) {
            $(ele).toggleClass('selected');
            if ($(ele).hasClass('selected')) {
                this.arr.push($(ele).text());
                this.arrval.push($(this.dropdownlist.nativeElement).find('.selectpicker').find('option[title="' + $(ele).text() + '"]').attr('value'));
                // contains选择方法在此不适合，弃用
                // this.arrval.push($(this.dropdownlist.nativeElement).find('.selectpicker').find('option:contains(' + $(ele).text() + ') ').attr('value'));
            } else {
                let removeval = $(this.dropdownlist.nativeElement).find('.selectpicker').find('option[title="' + $(ele).text() + '"]').attr('value');
                // let removeval = $(this.dropdownlist.nativeElement).find('.selectpicker').find('option:contains(' + $(ele).text() + ') ').attr('value');
                this.arr.splice(this.arr.indexOf($(ele).text()), 1);
                this.arrval.splice(this.arrval.indexOf(removeval), 1);
            }
            $(ele).parents('.menu').siblings('.selectpicker').val(this.arrval);
            if (this.arr.length === 0) {
                this.val = null;
                this._valtext = 'Nothing selected';
            } else {
                this.val = this.arrval;
                this._valtext = _.clone(this.arr);
            }

        } else {
            $(ele).addClass('selected').siblings().removeClass('selected');
            this.val = $(ele).parents('.menu').siblings('.selectpicker').find('option[title="' + $(ele).text() + '"]').attr('value');
            $(ele).parents('.menu').siblings('.selectpicker').val(this.val);
            this._valtext = $(ele).text();
        }
    }
    /**
     * 设置multiple="multiple"时为多选状态
     */
    private _multiple: string;
    @Input()
    set multiple(m: string) {
        this.setProperty('_multiple', m);
    }
    get multiple(): string {
        return this._multiple;
    }

    /**
     * 设置searchbox="true"时有搜索栏
     */
    private _searchbox: boolean = false;
    @Input()
    set searchbox(s: boolean) {
        this.setProperty('_searchbox', s);
    }
    get searchbox(): boolean {
        return this._searchbox;
    }

    /**
     * 设置搜索关键字
     */
    private _searchvalue: string;
    @Input()
    set searchvalue(s: string) {
        this.setProperty('_searchvalue', s);
    }
    get searchvalue(): string {
        return this._searchvalue;
    }

    /**
     * 关键字改变时执行事件
     */
    @Output()
    private searchtextchange() {
        this._options = [];
        if (this.searchvalue) {
            for (let i = 0; i < this.firstoptions.length; i++) {
                // if (this.firstoptions[i].text.indexOf(this.searchvalue) !== -1) {
                //     this._options.push(this.firstoptions[i]);
                // }
                let re = new RegExp(this.searchvalue, 'i');
                if (this.firstoptions[i].text.search(re) !== -1) {
                    this._options.push(this.firstoptions[i]);
                }
            }
        } else {
            this._options = this.firstoptions;
        }

    }

    /**
     * 设置高度，四种尺寸
     * lg>md>sm>xs
     */
    private _height: string;
    @Input()
    set height(h: string) {
        this.setProperty('_height', h);
    }

    /**
     * 设置下拉菜单禁用(disabled)
     */
    private _showTooltip: boolean = true;
    @Input()
    set showTooltip(s: boolean) {
        this.setProperty('_showTooltip', s);
    }
    get showTooltip(): boolean {
        return this._showTooltip;
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'dropdownlistctaf': true,
            ['menu-show']: this.menuState,
            ['searchbox-show']: this._searchbox,
            ['height-' + this._height]: !!this._height,
            ['style-' + this._style]: !!this._style
        });
    }
}
