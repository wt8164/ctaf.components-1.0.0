import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef, OnInit, ComponentBase, ElementRef } from '@ctaf/framework';

import './scrollbar.less';
@CTAFComponent({
    templateUrl: 'scrollbar.html'
})
export class DemoScrollbarComponent extends ComponentBase {
    @ViewChild('mCustomScrollbar1') mCustomScrollbar1: ElementRef;
    @ViewChild('mCustomScrollbar2') mCustomScrollbar2: ElementRef;
    @ViewChild('iScroll1') iScroll1: ElementRef;
    @ViewChild('iScroll2') iScroll2: ElementRef;
    
    ngOnInit() {
        $(this.mCustomScrollbar1.nativeElement).mCustomScrollbar({
            axis: 'yx',
            theme: 'inset-2',
            autoHideScrollbar: true,
            advanced: { updateOnContentResize: false }
        });
        $(this.mCustomScrollbar2.nativeElement).mCustomScrollbar({
            axis: 'yx',
            theme: 'inset-2',
            autoHideScrollbar: true,
            advanced: { updateOnContentResize: false }
        });
        let myScroll1 = new IScroll($(this.iScroll1.nativeElement)[0], {
            scrollX: true,
            scrollY: true,
            mouseWheel: true,
            scrollbars: true,
            interactiveScrollbars: true
        });
        let myScroll2 = new IScroll($(this.iScroll2.nativeElement)[0], {
            scrollX: true,
            scrollY: true,
            mouseWheel: true,
            scrollbars: true,
            interactiveScrollbars: true
        });

        $(this.mCustomScrollbar1.nativeElement).next('button').click(() => {
            if ($(this.mCustomScrollbar1.nativeElement).find('.content').width() === 800) {
                $(this.mCustomScrollbar1.nativeElement).find('.content').width(600).height(250);
            } else {
                $(this.mCustomScrollbar1.nativeElement).find('.content').width(800).height(600);
            }
        });
        $(this.mCustomScrollbar2.nativeElement).next('button').click(() => {
            if ($(this.mCustomScrollbar2.nativeElement).find('.content').width() === 800) {
                $(this.mCustomScrollbar2.nativeElement).find('.content').width(600).height(250);
            } else {
                $(this.mCustomScrollbar2.nativeElement).find('.content').width(800).height(600);
            }            
            $(this.mCustomScrollbar2.nativeElement).mCustomScrollbar('update'); 
        });

        $(this.iScroll1.nativeElement).next('button').click(() => {
            if ($(this.iScroll1.nativeElement).find('.content').width() === 800) {
                $(this.iScroll1.nativeElement).find('.content').width(600).height(250);
            } else {
                $(this.iScroll1.nativeElement).find('.content').width(800).height(600);
            }
        });
        $(this.iScroll2.nativeElement).next('button').click(() => {
            if ($(this.iScroll2.nativeElement).find('.content').width() === 800) {
                $(this.iScroll2.nativeElement).find('.content').width(600).height(250);
            } else {
                $(this.iScroll2.nativeElement).find('.content').width(800).height(600);
            }
            myScroll2.refresh();
        });
    }
}
