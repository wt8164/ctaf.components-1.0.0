import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { RadioboxComponent, RadioboxGroupComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'radioboxgroup.html'
})
export class DemoRadioboxGroupComponent extends ComponentBase {
  @ViewChild('radioboxgroup') radioboxgroup : RadioboxGroupComponent;
  @ViewChild('radioboxgroupval') radioboxgroupval : RadioboxGroupComponent;

  ngOnInit() {
    this.radioboxgroup.click.subscribe((radioboxgroup: RadioboxGroupComponent) => {
      alert(radioboxgroup.style);
    });
  }

  alertVal() {
    alert(this.radioboxgroupval.arrVal);
  }  
}
