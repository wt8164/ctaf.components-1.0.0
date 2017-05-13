import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { TextComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'textnumber.html'
})
export class DemoTextNumberComponent extends ComponentBase {
  private value1: number = 9;

  private clickHandler() {
    this.value1 = 4;
  }
}
