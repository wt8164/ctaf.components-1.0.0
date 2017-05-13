import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ChangeDetectorRef, Inject, forwardRef, ViewChild, Optional, EventEmitter, ElementRef} from '@ctaf/framework';
import * as _ from 'underscore';


/**
 * FileUpload

*  文件上传控件，提供点击选取文件和直接拖拽上传文件。
  *  基础信息

   * 代码文件路径： src/forms/fileupload.ts
   * 引用模块：ctafframework
   * 父类：CompentBase
   * 类型名称：FileUploadComponent
   * 选择器名称：ctaf-cp-fileupload
 */
/**
 * 代码结构
 * @Component({
 *     selector: 'ctaf-cp-fileupload',
 *     templateUrl: 'fileupload.component.html'
 * })
 * export class FileUploadComponent extends ComponentBase {
 * }
 */

@CTAFComponent({
    selector: 'ctaf-cp-fileupload',
    templateUrl: 'fileupload.component.html'
})
export class FileUploadComponent extends ComponentBase {

    /**
     * 控件类型名称，需要每个实现的子类进行自定义。
     */
    protected get typeName(): string {
        return 'FileUploadComponent';
    }

    
    /**
     * @Input() disabled:boolean
     * 当设置的属性值为 true 时，禁止选取拖拽上传文件。
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
     * @Input() text:string
     * 设置FileUpload控件上传文件提示按钮名称。
     */
    private _text: string = '浏览';
    @Input()
    set text(s: string) {
        this.setProperty('_text', s);
    }
    get text(): string {
        return this._text;
    }

     /**
     * fileName：string
     * 
     */
    
    private fileName: string;
    public filechange(): void {
        this.fileName = this.bieming.nativeElement.value;
    }
    @ViewChild('qwe') bieming : ElementRef;

    /**
     * @Input() style:string
     * FileUpload 控件外观样式属性。包含以下几种外观样式,默认值为空：
     * success,info,warning,danger
     */

    private _color: string = 'file-btn-primary';
    @Input()
    set style(d: string) {
        this.setProperty('_color', 'file-btn-' + d);
    }
    get style(): string {
        return this._color;
    }

   /**
	 * @Input() size: string
	 *  FileUpload 控件外观大小属性。包含以下几种大小属性，默认值为2：
	 *  3 > 超大。
     *  2 > 中等
	 *  1 > 小号。
	 *  0 > 超小。
	 */

    private _size: string = '2';
    @Input()
    set size(d: string) {
        this.setProperty('_size', + d);
    }
    get size(): string {
        return this._size;
    }

    /**
	 * @Input() w: string
	 *  FileUpload 控件外观长度属性，默认为空：
	 */

    private _w: number = 148;
    @Input()
    set w(t: number) {
        this._w = t;
    }
    get w(): number {
        return this._w;
    }

    protected classesMap(): any {
    return _.extend(super.classesMap(), {
        'fileuploadwrap': true,
        ['size-' + this._size]: true,
    });
}
}
