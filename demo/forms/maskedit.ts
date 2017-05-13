import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { MaskEditComponent } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'maskedit.html'
})
export class DemoMaskEditComponent extends ComponentBase {
    @ViewChild('test') test: MaskEditComponent;

    ngOnInit() {

    }

    abc(event) { console.log(this.test.input.value); };
    // 调onComplete方法，输出input的值
}

