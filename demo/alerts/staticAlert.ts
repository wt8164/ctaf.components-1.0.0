import { CTAFComponent, ComponentBase } from '@ctaf/framework';
import { AlertComponent} from '../../src/entry';

@CTAFComponent({
  templateUrl: './staticAlert.template.html'
})
export class DemoStaticAlertComponent extends ComponentBase {
  public closeAlert() {
    alert('alert close');
  }
}
