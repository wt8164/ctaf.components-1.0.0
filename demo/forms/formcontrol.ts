import { ViewChild, AfterViewInit, AfterViewChecked, Output } from '@angular/core';

import { CTAFComponent, ComponentBase } from '@ctaf/framework';

import { TextComponent, FormControlComponent } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'formcontrol.html'
})
export class DemoFormControlComponent extends ComponentBase {
    @ViewChild('formcontrol1') formcontrol1: FormControlComponent;

    buttonClick() {
        this.formcontrol1.showLabel = !this.formcontrol1.showLabel;
    }
}
