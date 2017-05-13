import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { RadioboxComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'radiobox.html'
})
export class DemoRadioboxComponent extends ComponentBase {
  @ViewChild('radiobox1') radiobox1 : RadioboxComponent;
  @ViewChild('radiobox2') radiobox2 : RadioboxComponent;
  
  public state1: boolean = false;
  public state2: boolean = true;

  ngOnInit() {
    this.radiobox1.click.subscribe((radiobox1: RadioboxComponent) => {
      alert(radiobox1.value);
    });

    this.radiobox2.click.subscribe((radiobox2: RadioboxComponent) => {
      alert(radiobox2.style);
    });
  } 
}
