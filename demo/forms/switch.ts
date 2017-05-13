import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { SwitchComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'switch.html'
})
export class DemoSwitchComponent extends ComponentBase {
  public state: boolean = false;
}
