import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@ctaf/framework';
import { NgModule, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, EventEmitter, Renderer, ContentChild, trigger, state, style, transition, animate } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DomHandler } from './domhandler';
// import { Header, SharedModule } from './shared';

import { DomHandler } from '../../3rd/primeng/dom/domhandler';
import { Header } from '../../3rd/primeng/common/shared';
import * as _ from 'underscore';

@CTAFComponent({
    selector: 'ctaf-cp-dialog',
    templateUrl: 'dialog.component.html',
    animations: [
        trigger('dialogState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ],
    providers: [DomHandler]
})
export class DialogComponent extends ComponentBase implements OnDestroy {

    @Input() header: string;

    @Input() draggable: boolean = true;

    @Input() resizable: boolean = true;

    @Input() minWidth: number = 150;

    @Input() minHeight: number = 250;

    @Input() width: any;

    @Input() height: any;

    @Input() contentHeight: any;

    @Input() modal: boolean;

    @Input() closeOnEscape: boolean = true;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() responsive: boolean;

    @Input() appendTo: any;

    // @Input() style: any;
    private _style: string = 'dialog-style-primary';

    private _bgColor: string;

    @Input() styleClass: string;

    @ContentChild(Header) headerFacet;

    @ViewChild('container') containerViewChild: ElementRef;
    @ViewChild('headervc') headervc: ElementRef;
    @ViewChild('footervc') footervc: ElementRef;

    @ViewChild('content') contentViewChild: ElementRef;

    @Output() onBeforeShow: EventEmitter<any> = new EventEmitter();

    @Output() onAfterShow: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeHide: EventEmitter<any> = new EventEmitter();

    @Output() onAfterHide: EventEmitter<any> = new EventEmitter();

    @Output() visibleChange: EventEmitter<any> = new EventEmitter();

    _visible: boolean;

    dragging: boolean;

    documentDragListener: any;

    resizing: boolean;

    documentResizeListener: any;

    documentResizeEndListener: any;

    documentResponsiveListener: any;

    documentEscapeListener: any;

    lastPageX: number;

    lastPageY: number;

    mask: HTMLDivElement;

    shown: boolean;

    container: HTMLDivElement;

    contentContainer: HTMLDivElement;

    positionInitialized: boolean;

    constructor(
        protected cdr: ChangeDetectorRef,
        public el: ElementRef, 
        public domHandler: DomHandler, 
        public renderer: Renderer) {
            super(cdr);
    }

    @Input() get visible(): boolean {
        return this._visible;
    }

    set visible(val: boolean) {
        this._visible = val;

        if (this._visible) {
            this.onBeforeShow.emit({});
            this.shown = true;
        }

        if (this.modal && !this._visible) {
            this.disableModality();
        }
    }

    show() {
        if (!this.positionInitialized) {
            this.center();
            this.positionInitialized = true;
        }

        this.container.style.zIndex = String(++DomHandler.zindex);

        if (this.modal) {
            this.enableModality();
        }
    }

    ngAfterViewInit() {
        this.container = <HTMLDivElement>this.containerViewChild.nativeElement;
        this.contentContainer = <HTMLDivElement>this.contentViewChild.nativeElement;

        if (this.draggable) {
            this.documentDragListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
                this.onDrag(event);
            });
        }

        if (this.resizable) {
            this.documentResizeListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
                this.onResize(event);
            });

            this.documentResizeEndListener = this.renderer.listenGlobal('body', 'mouseup', (event) => {
                if (this.resizing) {
                    this.resizing = false;
                }
            });
        }

        if (this.responsive) {
            this.documentResponsiveListener = this.renderer.listenGlobal('window', 'resize', (event) => {
                this.center();
            });
        }

        if (this.closeOnEscape && this.closable) {
            this.documentEscapeListener = this.renderer.listenGlobal('body', 'keydown', (event) => {
                if (event.which === 27) {
                   /* tslint:disable */ if (parseInt(this.container.style.zIndex) === DomHandler.zindex)  {
                        this.hide(event);
                    }
                }
            });
        }

        if (this.appendTo) {
            if (this.appendTo === 'body') {
                document.body.appendChild(this.container);
            }else {
                this.appendTo.appendChild(this.container);
            }
        }
    }

    ngAfterViewChecked() {
        if (this.shown) {
            this.show();
            this.onAfterShow.emit({});
            this.shown = false;
        }
    }

    center() {
        let elementWidth = this.domHandler.getOuterWidth(this.container);
        let elementHeight = this.domHandler.getOuterHeight(this.container);
        if (elementWidth === 0 && elementHeight === 0) {
            this.container.style.visibility = 'hidden';
            this.container.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.container);
            elementHeight = this.domHandler.getOuterHeight(this.container);
            this.container.style.display = 'none';
            this.container.style.visibility = 'visible';
        }
        let viewport = this.domHandler.getViewport();
        let x = (viewport.width - elementWidth) / 2;
        let y = (viewport.height - elementHeight) / 2;

        this.container.style.left = x + 'px';
        this.container.style.top = y + 'px';
    }

    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
            this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
            document.body.appendChild(this.mask);
        }
    }

    disableModality() {
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
    }

    hide(event) {
        this.onBeforeHide.emit(event);
        this.visibleChange.emit(false);
        this.onAfterHide.emit(event);
        event.preventDefault();
    }

    moveOnTop() {
        this.container.style.zIndex = String(++DomHandler.zindex);
    }

    initDrag(event) {
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }

    onDrag(event) {
        if (this.dragging) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let leftPos = parseInt(this.container.style.left);
            let topPos = parseInt(this.container.style.top);

            this.container.style.left = leftPos + deltaX + 'px';
            this.container.style.top = topPos + deltaY + 'px';

            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }

    endDrag(event) {
        if (this.draggable) {
            this.dragging = false;
        }
    }

    initResize(event) {
        if (this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }

    onResize(event) {
        if (this.resizing) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = this.domHandler.getOuterWidth(this.container);
            let containerHeight = this.domHandler.getOuterHeight(this.container); // dai
            // let contentHeight = this.domHandler.getHeight(this.contentContainer);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;

            if (newWidth > this.minWidth) {
                this.container.style.width = newWidth + 'px';
            }

            if (newHeight > this.minHeight) {
                this.container.style.height = newHeight + 'px';
                // this.contentContainer.style.height = newHeight + 'px';
                this.contentContainer.style.height = (newHeight - 25 - this.domHandler.getOuterHeight(this.headervc.nativeElement) - this.domHandler.getOuterHeight(this.footervc.nativeElement)) + 'px';
            }

            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            this.cdr.detectChanges();
        }
    }

    ngOnDestroy() {
        this.disableModality();

        if (this.documentDragListener) {
            this.documentDragListener();
        }

        if (this.resizable) {
            this.documentResizeListener();
            this.documentResizeEndListener();
        }

        if (this.responsive) {
            this.documentResponsiveListener();
        }

        if (this.closeOnEscape && this.closable) {
            this.documentEscapeListener();
        }

        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }

    //chen add
    @Input()
    set style(sty: string) {
        this.setProperty('_style', 'dialog-style-' + sty);
    }

    get style(): string {
        return this._style;
    }

    @Input()
    set bgColor(sty: string) {
        this.setProperty('_bgColor', sty);
    }

    get bgColor(): string {
        return this._bgColor;
    }

}
