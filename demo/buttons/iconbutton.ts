import { CTAFComponent, ComponentBase } from '@ctaf/framework';
import { IconButtonComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'iconbutton.html'
})
export class DemoIconButtonComponent extends ComponentBase { 
  
  iconButtonClick(e: MouseEvent) {
      alert('test');
  }
  
}
