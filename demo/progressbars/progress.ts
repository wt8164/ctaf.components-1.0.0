import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { ProgressComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'progressbar.html'
})
export class DemoProgressComponent extends ComponentBase {
  private progressVal: number= 89;
  private progressVal2: number= 40;
}
