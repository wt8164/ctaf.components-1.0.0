import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { CheckboxComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'checkbox.html'
})
export class DemoCheckboxComponent extends ComponentBase {
  @ViewChild('checkbox1') checkbox1 : CheckboxComponent;
  @ViewChild('checkbox2') checkbox2 : CheckboxComponent;

  public state1: boolean = false;
  public state2: boolean = true;

  ngOnInit() {
    this.checkbox1.click.subscribe((checkbox1: CheckboxComponent) => {
      alert(checkbox1.value);
    });

    this.checkbox2.click.subscribe((checkbox2: CheckboxComponent) => {
      alert(checkbox2.style);
    });
  } 
}
