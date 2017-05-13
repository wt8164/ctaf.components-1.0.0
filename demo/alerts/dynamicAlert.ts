

import { CTAFComponent, ComponentBase } from '@ctaf/framework';
import { AlertController } from '../../src/entry';

@CTAFComponent({
    template: '<button (click)="buttonClick()"></button>`',
    providers: [AlertController]
})
export class DemoDynamicAlertComponent extends ComponentBase {
    constructor(public alertcontroller: AlertController) { super(); }

    public buttonClick() {
        this.alertcontroller.show();
    }
}
