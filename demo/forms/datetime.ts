import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { DatetimeComponent } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'datetime.html'
})
export class DemoDatetimeComponent extends ComponentBase {
    // minDate = new Date('05-05-2015');
    public defaultDate = '10/10/2011';

    select(value) {
        // alert(value);
        console.log(value);
    }

    public date = new Date(2015, 10, 1);
    changedate() {
        console.log(this.date);
    }
    public value = new Date(2008, 8, 8);
    changevalue() {
        this.value = new Date(this.value.setDate(this.value.getDate() + 1));
    }
}
