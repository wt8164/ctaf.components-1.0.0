import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { DropdownButtonComponent } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'dropdownbutton.html'
})
export class DemoDropdownButtonComponent extends ComponentBase {
    @ViewChild('clickButton') clickButton: DropdownButtonComponent;

    ngOnInit() {
        this.clickButton.click.subscribe((button: DropdownButtonComponent) => {
            // event.preventDefault();
            // event.stopPropagation();
            alert(button.text);
        });
    }

    buttonClick(button) {
        // alert(button.text);    
    }

    itemclick(item) {
        console.log(item.value);
    }
}
