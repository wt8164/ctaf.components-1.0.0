import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { ButtonGroupComponent } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'buttongroup.html'
})
export class DemoButtonGroupComponent extends ComponentBase {
    @ViewChild('buttongroup') buttongroup: ButtonGroupComponent;
    ngOnInit() {
        this.buttongroup.click.subscribe((buttongroup: ButtonGroupComponent) => {
            alert(buttongroup.style);
        });
    }
}
