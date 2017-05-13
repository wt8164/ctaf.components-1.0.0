import {
    NgModule, Component, ElementRef, AfterViewInit, AfterViewChecked, DoCheck, Input, Output, EventEmitter, ContentChild, ViewChild,
    TemplateRef, IterableDiffers, Renderer, forwardRef, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
// import { InputTextModule } from '../inputtext/inputtext';
// import { ButtonModule } from '../button/button';
import { SharedModule } from '../../3rd/primeng/common/shared';
import { DomHandler } from '../../3rd/primeng/dom/domhandler';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ComponentBase, CTAFComponent } from '@ctaf/framework';
/* tslint:disable */
export const AUTOCOMPLETE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoCompleteComponent),
    multi: true
};

@CTAFComponent({
    selector: 'ctaf-cp-autocomplete',
    templateUrl: 'autocomplete.component.html',
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focus'
    },
    providers: [DomHandler, AUTOCOMPLETE_VALUE_ACCESSOR]
})
export class AutoCompleteComponent extends ComponentBase implements AfterViewInit, DoCheck, AfterViewChecked, ControlValueAccessor {

    @Input() minLength: number = 1;

    @Input() delay: number = 300;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() labelText: string;

    @Input() w: number;

    @Input() inputStyle: any;

    @Input() inputStyleClass: string;

    @Input() placeholder: string;

    @Input() readonly: number;

    @Input() disabled: boolean;

    @Input() maxlength: number;

    @Input() size: number;

    @Input() suggestions: any[];

    @Output() completeMethod: EventEmitter<any> = new EventEmitter();

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Output() onUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onDropdownClick: EventEmitter<any> = new EventEmitter();

    @Input() field: string;

    @Input() scrollHeight: string = '200px';

    @Input() dropdown: boolean;

    @Input() multiple: boolean;

    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
    @ViewChild('in') ipt: ElementRef;

    value: any;

    onModelChange: Function = () => { };

    onModelTouched: Function = () => { };

    timeout: any;

    differ: any;

    panel: any;

    input: any;

    multipleContainer: any;

    panelVisible: boolean = false;

    documentClickListener: any;

    suggestionsUpdated: boolean;

    highlightOption: any;

    highlightOptionChanged: boolean;

    focus: boolean = false;

    dropdownFocus: boolean = false;

    filled: boolean;

    constructor(public el: ElementRef,
        public domHandler: DomHandler,
        differs: IterableDiffers,
        public renderer: Renderer, protected cdr: ChangeDetectorRef) {
        super(cdr);
        this.differ = differs.find([]).create(null);
    }

    ngDoCheck() {
        //     let changes = this.differ.diff(this.suggestions);
        //     console.warn(this.value);
        //     changes = true; // chen add
        //     if (changes && this.panel) {
        //         console.warn('show');
        //         if (this.suggestions && this.suggestions.length) {
        //             this.show();
        //             this.suggestionsUpdated = true;
        //         } else {
        //             this.hide();
        //         }
        //     }
    }

    public completeMethodSuccess(arr: Array<string>) {
        this.suggestions = arr;
        if (this.panel) {
            if (this.suggestions && this.suggestions.length) {
                this.show();
                this.suggestionsUpdated = true;
            } else {
                this.hide();
            }
        }
    }



    ngAfterViewInit() {
        this.input = this.domHandler.findSingle(this.el.nativeElement, 'input');
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-autocomplete-panel');

        if (this.multiple) {
            this.multipleContainer = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-autocomplete-multiple-container');
        }

        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.hide();
        });
    }

    ngAfterViewChecked() {
        if (this.suggestionsUpdated) {
            this.align();
            this.suggestionsUpdated = false;
        }

        if (this.highlightOptionChanged) {
            let listItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
            if (listItem) {
                this.domHandler.scrollInView(this.panel, listItem);
            }
            this.highlightOptionChanged = false;
        }
    }

    writeValue(value: any): void {
        this.value = value;
        this.filled = this.value && this.value !== '';
        this.forceChange();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    onInput(event) {
        let value = event.target.value;
        if (!this.multiple) {
            this.value = value;
            this.onModelChange(value);
        }

        if (value.length === 0) {
            this.hide();
        }

        if (value.length >= this.minLength) {
            // Cancel the search request if user types within the timeout
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                this.search(event, value);
            }, this.delay);
        } else {
            this.suggestions = null;
        }
        this.updateFilledState();


        // console.warn(event.key);
        // var reg = /[\u4e00-\u9fa5]/;
        // // var reg = /[0-9]/;
        // return !reg.test(event.key);
    }

    search(event: any, query: string) {
        // allow empty string but not undefined or null
        if (query === undefined || query === null || query.trim() === '') {
            return;
        }

        this.completeMethod.emit({
            originalEvent: event,
            query: query.trim()
        });
    }

    selectItem(option: any) {
        if (this.multiple) {
            this.input.value = '';
            this.value = this.value || [];
            if (!this.isSelected(option)) {
                this.value.push(option);
                this.onModelChange(this.value);
            }
        } else {
            this.input.value = this.field ? this.resolveFieldData(option) : option;
            this.value = option;
            this.onModelChange(this.value);
            this.highlightOption = option; // chen add
            this.hide(); // chen add
        }

        this.onSelect.emit(option);

        this.input.focus();
    }
    private liClicked: boolean = false;
    mouseleaveHandler() {
        let opt=this.highlightOption;
        this.highlightOption = null;
        if (this.liClicked === true) {
            this.highlightOption = opt;
        }
    }

    show() {
        if (!this.panelVisible && (this.focus || this.dropdownFocus)) {
            this.panelVisible = true;
            this.panel.style.zIndex = ++DomHandler.zindex;
            this.domHandler.fadeIn(this.panel, 200);
        }
    }

    align() {
        if (this.multiple) {
            this.domHandler.relativePosition(this.panel, this.multipleContainer);
        } else {
            this.domHandler.relativePosition(this.panel, this.input);
        }
    }

    hide() {
        this.panelVisible = false;
    }

    handleDropdownClick(event) {
        this.onDropdownClick.emit({
            originalEvent: event,
            query: this.input.value
        });
    }

    removeItem(item: any) {
        let itemIndex = this.domHandler.index(item);
        let removedValue = this.value.splice(itemIndex, 1)[0];
        this.onUnselect.emit(removedValue);
        this.onModelChange(this.value);
    }

    resolveFieldData(data: any): any {
        if (data && this.field) {
            if (this.field.indexOf('.') === -1) {
                return data[this.field];
            } else {
                let fields: string[] = this.field.split('.');
                let value = data;
                for (let i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        } else {
            return null;
        }
    }

    onKeydown(event) {
        if (this.panelVisible) {
            let highlightItemIndex = this.findOptionIndex(this.highlightOption);
            // console.warn(this.highlightOption);
            // console.warn(highlightItemIndex);
            switch (event.which) {
                // down
                case 40:
                    if (highlightItemIndex !== -1) {
                        let nextItemIndex = highlightItemIndex + 1;
                        if (nextItemIndex !== (this.suggestions.length)) {
                            this.highlightOption = this.suggestions[nextItemIndex];
                            this.highlightOptionChanged = true;
                        }
                    } else {
                        this.highlightOption = this.suggestions[0];
                    }

                    event.preventDefault();
                    break;

                // up
                case 38:
                    if (highlightItemIndex > 0) {
                        let prevItemIndex = highlightItemIndex - 1;
                        this.highlightOption = this.suggestions[prevItemIndex];
                        this.highlightOptionChanged = true;
                    }

                    event.preventDefault();
                    break;

                // enter
                case 13:
                    if (this.highlightOption) {
                        this.selectItem(this.highlightOption);
                        this.hide();
                    }
                    event.preventDefault();
                    break;

                // escape
                case 27:
                    this.hide();
                    event.preventDefault();
                    break;


                // tab
                case 9:
                    if (this.highlightOption) {
                        this.selectItem(this.highlightOption);
                    }
                    this.hide();
                    break;
            }
        } else {
            // if (event.which === 40 && this.suggestions) {
            if (event.which === 13 && this.suggestions) {
                this.search(event, event.target.value);
            }
        }

        if (this.multiple) {
            switch (event.which) {
                // backspace
                case 8:
                    if (this.value && this.value.length && !this.input.value) {
                        let removedValue = this.value.pop();
                        this.onUnselect.emit(removedValue);
                        this.onModelChange(this.value);
                    }
                    break;
            }
        }
    }

    onFocus() {
        this.focus = true;
    }

    onBlur() {
        this.focus = false;
        this.onModelTouched(); // chen add
        if (!this.highlightOption) {
            this.panelVisible = false; // chen add
        }
    }

    onDropdownFocus() {
        this.dropdownFocus = true;
    }

    onDropdownBlur() {
        this.dropdownFocus = false;
    }

    isSelected(val: any): boolean {
        let selected: boolean = false;
        if (this.value && this.value.length) {
            for (let i = 0; i < this.value.length; i++) {
                if (this.domHandler.equals(this.value[i], val)) {
                    selected = true;
                    break;
                }
            }
        }
        return selected;
    }

    findOptionIndex(option): number {
        let index: number = -1;
        if (this.suggestions) {
            for (let i = 0; i < this.suggestions.length; i++) {
                if (this.domHandler.equals(option, this.suggestions[i])) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    updateFilledState() {
        this.filled = this.input && this.input.value !== '';
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }
}

// @NgModule({
//     imports: [CommonModule, InputTextModule, ButtonModule, SharedModule],
//     exports: [AutoComplete, SharedModule],
//     declarations: [AutoComplete]
// })
// export class AutoCompleteModule { }
