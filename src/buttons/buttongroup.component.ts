import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, EventEmitter} from '@ctaf/framework';
import * as _ from 'underscore';
import { ButtonComponent} from './button.component';

/**
 * Button 控件样式枚举。
 */

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
    selector: 'ctaf-cp-buttongroup',
    templateUrl: 'buttongroup.component.html',
})
export class ButtonGroupComponent extends ComponentBase {

	/**
	 * 控件类型名称，需要每个实现的子类进行自定义。
	 */
    protected get typeName(): string {
        return 'ButtonGroupComponent';
    }

    constructor() {
        super();
    }

    private _style: string;
    private _size: string;
    private _disabled: boolean = false;

    public buttons: ButtonComponent[] = [];

    ngAfterViewInit() {
        this.buttons.forEach((b: ButtonComponent) => {
            b.disabled = this._disabled;
            b.click.subscribe(() => {                                
                this.click.emit(this); 
            });
        });
    }

    @Input()
    set style(sty: string) {
        this.setProperty('_style', sty);
    }
    get style() {
        return this._style;
    }

    @Input()
    set disabled(d: boolean) {
        this.setProperty('_disabled', d);
    }
    get disabled(): boolean {
        return this._disabled;
    }

    @Input()
    set size(s: string) {
        this.setProperty('_size', s);
    }
    get size() {
        return this._size;
    }

    @Output() click: EventEmitter<ButtonGroupComponent> = new EventEmitter<ButtonGroupComponent>();

    private clickTrigger(event: MouseEvent) {
        // this.click.emit(this);
        event.preventDefault();
        event.stopPropagation();

    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'buttons-group': true,
            'btn-group': true,
            ['buttongroup-style-' + this._style]: !!this._style,
            // ['buttongroup-disabled']: this._disabled,
            ['buttongroup-size-' + this._size]: !!this._size
        });
    }
}
