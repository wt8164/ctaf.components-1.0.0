import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, EventEmitter, ChangeDetectorRef, Optional, ViewChild, ElementRef } from '@ctaf/framework';
import { DomHandler } from '../../3rd/primeng/dom/domhandler';
import * as _ from 'underscore';
import './loading.less';

@CTAFComponent({
    templateUrl: 'loading.component.html',
    selector: 'ctaf-cp-loading',
    // styleUrls: ['loading.less']
    providers: [DomHandler]
})

export class LoadingComponent extends ComponentBase {
    @Input() overlay: boolean = true;

    @Input() appendTo: any;

    @Input() tips: string;

    @ViewChild('loading') loadingChild: ElementRef;

    cover: HTMLDivElement;

    constructor(cdr: ChangeDetectorRef, public el: ElementRef, public domHandler: DomHandler) {
        super(cdr);
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

        this.cover = <HTMLDivElement>this.loadingChild.nativeElement;

        if (this.appendTo) {
            if (this.appendTo === 'body') {
                document.body.appendChild(this.cover);
            } else {
                // this.appendTo.appendChild(this.cover);
                let id = document.getElementById(this.appendTo);
                // console.log(id);
                id.appendChild(this.cover);
            }
        }

        this.forceChange();
    };

    showOverlay() {
        // if (this.appendTo) {
        //     this.domHandler.absolutePosition(this.overlay, event.target)
        // }
        // else {
        //     this.domHandler.relativePosition(this.overlay, event.target)
        // };
        this.overlay = true;
        this.forceChange();
        this.cover.style.zIndex = String(++DomHandler.zindex);
        // this.cover.style.zIndex = '1045';
    }
    hideOverlay() {
        this.overlay = false;
        this.forceChange();
    }
    ngOnDestroy() {
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.cover);
        }
    }

}
