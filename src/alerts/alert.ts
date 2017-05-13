import {CTAFComponent, OnInit, Input, Output, EventEmitter, HostBinding, ComponentBase} from '@ctaf/framework';

import './alert.less';

// TODO: templateUrl
@CTAFComponent({
    selector: 'ctaf-cp-alert',
    templateUrl: 'alert.template.html'
})
export class AlertComponent extends ComponentBase {
    @Input() public type: string = 'warning';
    @Input() public dismissible: boolean;
    @Input() public dismissOnTimeout: number;

    @Output() public close: EventEmitter<AlertComponent> = new EventEmitter<AlertComponent>(false);

    constructor() {
        super();
    }

    private closed: boolean;
    // private classes: Array<string> = [];

    public ngOnInit(): any {
        this.classes[0] = `alert-${this.type}`;
        if (this.dismissible) {
            this.classes[1] = 'alert-dismissible';
        } else {
            this.classes.length = 1;
        }

        if (this.dismissOnTimeout) {
            setTimeout(() => this.onClose(), this.dismissOnTimeout);
        }
    }

    // todo: mouse event + touch + pointer
    public onClose(): void {
        this.closed = true;
        this.close.emit(this);
    }
}
