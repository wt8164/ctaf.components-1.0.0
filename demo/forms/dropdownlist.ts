import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, Output, ComponentBase } from '@ctaf/framework';
import { DropDownListComponent } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'dropdownlist.html'
})
export class DemoDropDownListComponent extends ComponentBase {
    @ViewChild('dropdownlist1') dropdownlist1: DropDownListComponent;
    @ViewChild('dropdownlist2') dropdownlist2: DropDownListComponent;
    @ViewChild('dropdownlist3') dropdownlist3: DropDownListComponent;
    @ViewChild('dropdownlist4') dropdownlist4: DropDownListComponent;

    public options = [{ value: 'option1', text: 'AAA' }, { value: 'option2', text: 'BBB' }, { value: 'option3', text: 'CCC' }];
    public optionsMore = [{ value: 'option1', text: 'AAA' }, { value: 'option2', text: 'BBB' }, { value: 'option3', text: 'CCC' }, { value: 'option4', text: 'Abb' }, { value: 'option5', text: 'BcB' }, { value: 'option6', text: 'abc' }, { value: 'option7', text: 'BcB' }, { value: 'option8', text: 'abc' }];
    @Output()
    private alertval1() {
        alert(this.dropdownlist1.val);
    }

    @Output()
    private alertval2() {
        alert(this.dropdownlist2.val);
    }

    @Output()
    private alertval3() {
        alert(this.dropdownlist3.val);
    }

    @Output()
    private alertval4() {
        alert(this.dropdownlist4.val);
    }

}
