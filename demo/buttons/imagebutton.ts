import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { ImagebuttonComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'imagebutton.html'
})
export class DemoImagebuttonComponent extends ComponentBase {
  @ViewChild('clickImagebutton') clickImagebutton: ImagebuttonComponent;
  ngOnInit() {
    this.clickImagebutton.click.subscribe(() => {
      alert('Hello World');
    });
  }
}
