import {
    ChangeDetectorRef,
    ElementRef,
    CTAFComponent,
    ComponentBase,
    ContentChildren,
    ViewChildren,
    QueryList,
    ViewChild,
    ViewContainerRef,
    Type,
    WidgetBase,
    Optional,
    forwardRef,
    Inject
} from '@ctaf/framework';
import { WidgetPanelComponent } from './widgetpanel';
import * as _ from 'underscore';

import './jquery-ui.draggable.js';
import './jquery.gridList.js';
import './widgetcontainer.less';

import { TabComponent } from '../tabs/tab.component';
import { TabsetComponent } from '../tabs/tabset.component';

@CTAFComponent({
    selector: 'ctaf-cp-widgetcontainer',
    templateUrl: 'widgetcontainer.component.html'
})
export class WidgetContainerComponent extends ComponentBase {
    public gridList: any;

    // @ViewChildren(WidgetPanelComponent) panel1s: QueryList<WidgetPanelComponent>;
    // @ContentChildren(WidgetPanelComponent) panel2s: QueryList<WidgetPanelComponent>;

    @ViewChild('widgetPanelPlaceHolder', { read: ViewContainerRef })
    widgetPanelPlaceHolder: ViewContainerRef;

    constructor(
        protected cdr: ChangeDetectorRef,
        public element: ElementRef,
        /* tslint:disable */@Inject(forwardRef(() => TabComponent)) @Optional() public tab: TabComponent
    ) {
        super(cdr);

        if (this.tab) {
            this.tab.select.subscribe(() => {
                setTimeout(() => {
                    this.refreshScroll();
                }, 0);
            });
        }
    }

    public addWidget(widget: Type<any>): Promise<any> {
        let y = $(this.gridList).gridList('getMaxY');

        return new Promise<any>((resolve, reject) => {
            this.addChild(this.widgetPanelPlaceHolder, (<any>widget).getTemplate(), [ widget ])
                .then((c: WidgetBase) => {
                    c.x = 0;
                    c.y = y;
                    setTimeout(() => {
                        this.refresh();
                        this.refreshScroll();
                    }, 0);

                    resolve(c);
                }).catch((reasone: any) => {
                    reject(reasone);
                });
        });
    }

    private height: number;
    private elementHeight: number;
    @ViewChild('scrollElement') scrollElement: ElementRef;
    ngAfterViewInit() {
        this.gridList = $(this.element.nativeElement).find('.grid').gridList(
            {
                lanes: 12,
                direction: 'vertical',
                itemSelector: 'div.ctaf-cp-widgetpanel[data-w]',
                widthHeightRatio: 264 / 294,
                heightToFontSizeRatio: 0.25,
                onChange: (changedItems) => {
                    // console.log(changedItems);
                },
                onStop: () => {
                    let height = this.scrollElement.nativeElement.offsetHeight;
                    this.elementHeight = height;
                    this.height = (height / 12 * $(this.gridList).gridList('getMaxY'));
                    this.forceChange();
                    setTimeout(() => {
                        this.refreshScroll();
                    }, 0);
                }
            },
            {
                containment: 'widgetcontainer',
                handle: '.panel-heading'
            });

        this.initScroll();

        $(window).resize(() => {
            this.refreshScroll();
        });
    }

    public initScroll() {
        let height = this.scrollElement.nativeElement.offsetHeight;
        this.elementHeight = height;
        this.height = (height / 12 * $(this.gridList).gridList('getMaxY'));
        this.forceChange();
        setTimeout(() => {
            $(this.scrollElement.nativeElement).mCustomScrollbar({
                theme: 'inset-2',
                autoHideScrollbar: true
            });
        }, 0);
    }

    public refreshScroll() {
        let height = this.scrollElement.nativeElement.offsetHeight;
        if (height > 0) {
            this.elementHeight = height;
            this.height = (height / 12 * $(this.gridList).gridList('getMaxY'));
            this.forceChange();
            setTimeout(() => {
                $(this.scrollElement.nativeElement).mCustomScrollbar('update');
            }, 0);
        }
    }

    public refresh() {
        $(this.gridList).gridList('reInit');
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            'widgetcontainer': true
        });
    }
}
