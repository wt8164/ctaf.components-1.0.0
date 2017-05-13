import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ChangeDetectorRef, ContentChild } from '@ctaf/framework';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';

@CTAFComponent({
    selector: 'ctaf-cp-confirmdialog',
    templateUrl: 'confirmdialog.component.html'
})
export class ConfirmDialogComponent extends ComponentBase {

    @Input() header: string = 'Confirmation';
    
    @Input() preIcon: string;

    @Input() width: any = 300;

    @Input() height: any;

    @Output() onConfirm: EventEmitter<any> = new EventEmitter();

    @Output() onCancel: EventEmitter<any> = new EventEmitter();
    
    _visible: boolean;

    constructor(
        protected cdr: ChangeDetectorRef
    ) {
        super(cdr);
    }

    get visible(): boolean {
        return this._visible;
    }

    @Input()
    set visible(val: boolean) {
        this._visible = val;
    }

    private clickHandler(b: boolean) {
        if (b) {
            this.onConfirm.emit({});
        } else {
            this.onCancel.emit({});
        }
    }

}
