import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase, ViewChildren, QueryList } from '@ctaf/framework';
import { LoadingComponent } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'loading.html'
})
export class DemoLoadingComponent extends ComponentBase {
    @ViewChild('a') a: LoadingComponent;
    @ViewChild('b') b: LoadingComponent;
    @ViewChild('c') c: LoadingComponent;

    hide() {
        this.a.hideOverlay();
    }

    show() {
        this.a.showOverlay();
    }
    set() {
        this.c.showOverlay();
        
        setTimeout(() => {
            this.c.hideOverlay();
        }, 10000);
        
    }
}
