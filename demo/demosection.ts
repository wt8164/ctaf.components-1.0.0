import { CTAFComponent, OnInit, ComponentBase } from '@ctaf/framework';

@CTAFComponent({
    selector: 'demo-section',
    template: '<div><ng-content></ng-content></div>'
})
export class DemoSectionComponent extends ComponentBase {
    
}