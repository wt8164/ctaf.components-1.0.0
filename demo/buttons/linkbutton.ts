import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { LinkbuttonComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'linkbutton.html'
})
export class DemoLinkbuttonComponent extends ComponentBase {
  buttonClick() {
    alert(1);
  }
}
