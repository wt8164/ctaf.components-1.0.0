import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { ButtonToolbarComponent } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'buttontoolbar.html'
})
export class DemoButtonToolbarComponent extends ComponentBase {
    // private get getData() {
    //     let elements = document.querySelectorAll('.btn-tool-checked');
    //     let checkData: Array<any> = [];
    //     for (var i = 0; i < elements.length; i++) {
    //         checkData.push(elements[i].lastElementChild.innerHTML);
    //     }
    //     console.log(checkData);
    //     return checkData;
    // }
}
