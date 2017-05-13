import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase, ViewChildren, QueryList } from '@ctaf/framework';
import { ButtonComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'button.html'
})
export class DemoButtonComponent extends ComponentBase {
  @ViewChild('clickButton') clickButton: ButtonComponent;

  @ViewChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;

  ngOnInit() {
    this.clickButton.click.subscribe((button: ButtonComponent) => {
      alert(button.title + '1');
    });
  }

  buttonClick(button) {
    alert(button.title);
  }
}
