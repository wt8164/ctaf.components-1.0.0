import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { CheckboxComponent, CheckboxGroupComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'checkboxgroup.html'
})
export class DemoCheckboxGroupComponent extends ComponentBase {
  @ViewChild('checkboxgroup') checkboxgroup : CheckboxGroupComponent;
  @ViewChild('checkboxgroupval') checkboxgroupval : CheckboxGroupComponent;

  ngOnInit() {
    this.checkboxgroup.click.subscribe((checkboxgroup: CheckboxGroupComponent) => {
      alert(checkboxgroup.style);
    });
  }

  alertVal() {
    alert(this.checkboxgroupval.arrVal);
  }  
}
