import { CTAFComponent, OnInit, OnDestroy, HostBinding, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ElementRef, ChangeDetectorRef, Optional } from '@ctaf/framework';
import { ComponentBase } from '@ctaf/framework';
import { TabComponent } from './tab.component';
import { TabHeadingDirective } from './tab-heading.directive';
import { NgModule, CommonModule, FormsModule } from '@ctaf/framework';
import { WidgetContainerComponent } from '../widgets/index';

import './tabset.less';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TabComponent, TabHeadingDirective, WidgetContainerComponent],
    exports: [TabComponent, TabHeadingDirective, WidgetContainerComponent]
})
export class TabsModule {
}

@CTAFComponent({
    selector: 'ctaf-cp-tabset',
    templateUrl: 'tabset.component.html'
})
export class TabsetComponent extends ComponentBase {

    @Input()
    public get vertical(): boolean { return this._vertical; };

    @Input()
    public get justified(): boolean { return this._justified; };

    @Input()
    public get type(): string { return this._type; };

    @Input() editable: boolean;

    @HostBinding('class.tab-container') protected clazz: boolean = true;

    @ViewChild('container')
    container: ElementRef;

    public set vertical(value: boolean) {
        this._vertical = value;
        this.setClassMap();
    }

    public set justified(value: boolean) {
        this._justified = value;
        this.setClassMap();
    }

    public set type(value: string) {
        this._type = value;
        this.setClassMap();
    }

    @Input()
    public set smallTitle(value: boolean) {
        this._smallTitle = value;
    }
    public get smallTitle(): boolean { return this._smallTitle; };

    @ViewChild('dynamicContentPlaceHolder', { read: ViewContainerRef })
    holder: ViewContainerRef;

    @ViewChild('editInput') editInput;

    public tabs: Array<TabComponent> = [];

    private isDestroyed: boolean;
    private _vertical: boolean;
    private _justified: boolean;
    private _type: string;
    private _smallTitle: boolean = false;
    private classMap: any = {};

    private _addHide: boolean = true;
    @Input()
    set addHide(addHide: boolean) {
        this.setProperty('_addHide', addHide);
    }
    get addHide(): boolean {
        return this._addHide;
    }
    @Output() public created: EventEmitter<TabsetComponent> = new EventEmitter<TabsetComponent>(false);
    @Output() public widgetclicked: EventEmitter<number> = new EventEmitter<number>(false);

    @HostBinding('class.tab-menu-show') protected menuShow: boolean = false;

    constructor(cdr: ChangeDetectorRef
        , @Optional() tab: TabComponent) {
        super(cdr);

        if (tab) {
            tab.select.subscribe(() => {
                this.tabsetRefresh();
            });
        }
    }

    public navScroll: IScroll;
    public ngOnInit(): void {
        // $(this.container.nativeElement).find('.nav').css({ width: this.navWidth });
        // if (this.navWidth + 58 > $(this.container.nativeElement).find('.nav-container').width()) {
        //     console.log(111);
        //     $(this.container.nativeElement).find('.nav-scroll').css({ width: ($(this.container.nativeElement).find('.nav-container').width() - 58) });
        //     $(this.container.nativeElement).find('.nav-add').addClass('nav-add-position');
        // } else {
        //     $(this.container.nativeElement).find('.nav-scroll').css({ width: this.navWidth });
        //     $(this.container.nativeElement).find('.nav-add').removeClass('nav-add-position');
        // }
        this.type = this.type !== 'undefined' ? this.type : 'tabs';
        // this.navScroll = new IScroll($(this.container.nativeElement).find('.nav-scroll')[ 0 ], {
        //     scrollX: true,
        //     scrollY: false,
        //     scrollbars: 'custom',
        //     mouseWheel: true
        // });
        $(window).resize(() => {
            this.refreshScroll();
        });
    }

    public refreshScroll() {
        if (this.navWidth + 58 > $(this.container.nativeElement).find('.nav-container').width()) {
            $(this.container.nativeElement).find('.nav-scroll').css({ width: ($(this.container.nativeElement).find('.nav-container').width() - 58) });
            $(this.container.nativeElement).find('.nav-add').addClass('nav-add-position');
        } else {
            $(this.container.nativeElement).find('.nav-scroll').css({ width: this.navWidth });
            $(this.container.nativeElement).find('.nav-add').removeClass('nav-add-position');
        }
        this.navScroll.refresh();
    }

    public ngOnDestroy(): void {
        this.isDestroyed = true;
    }

    ngAfterViewInit(): void {
        this.iScrollWidth();
        this.navScroll = new IScroll($(this.container.nativeElement).find('.nav-scroll')[0], {
            scrollX: true,
            scrollY: false,
            scrollbars: 'custom',
            mouseWheel: true
        });
        this.forceChange();
        this.navScroll.refresh();
    }

    // ngAfterViewChecked() {
    //     this.iScrollWidth();
    //     this.navScroll.refresh();        
    //     this.forceChange();
    // }

    /**
     * 提供此方法以便在视图显示出来时刷新
     */
    public tabsetRefresh() {
        setTimeout(() => {
            this.iScrollWidth();
            this.navScroll.refresh();
            this.forceChange();
        }, 0);
    }

    public iScrollWidth() {
        $(this.container.nativeElement).find('.nav').css({ width: this.navWidth });
        if (this.navWidth + 58 > $(this.container.nativeElement).find('.nav-container').width()) {
            $(this.container.nativeElement).find('.nav-scroll').css({ width: ($(this.container.nativeElement).find('.nav-container').width() - 58) });
            $(this.container.nativeElement).find('.nav-add').addClass('nav-add-position');
        } else {
            $(this.container.nativeElement).find('.nav-scroll').css({ width: this.navWidth });
            $(this.container.nativeElement).find('.nav-add').removeClass('nav-add-position');
        }
    }

    public registerTab(tab: TabComponent): void {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && tab.active !== false;
        // tab.active = tab.active !== false;
    }

    private tabHeaderClick(e: MouseEvent, tab: TabComponent) {
        this.tabs.forEach((t: TabComponent) => {
            t.editting = false;
        });
        tab.editting = tab.editable || this.editable;
        tab.headingInput = tab.heading;
        setTimeout(() => {
            this.editInput.nativeElement.focus();
        }, 0);
    }

    private inputBlur(e: MouseEvent, tab: TabComponent) {
        tab.editting = false;
    }

    private inputKeydown(e: KeyboardEvent, tab: TabComponent) {
        if (e.keyCode === 13 || e.charCode === 13) {
            tab.heading = tab.headingInput;
            tab.editting = false;
        } else if (e.keyCode === 27 || e.charCode === 27) {
            tab.editting = false;
        }
    }

    public menuButtonClick() {
        this.menuShow = !this.menuShow;
    }

    public widgetClick(n: number) {
        this.widgetclicked.emit(n);
    }

    public removeTab(e: MouseEvent, tab: TabComponent, ngOnDestroy?: boolean): void {
        if (!ngOnDestroy) {
            let index = this.tabs.indexOf(tab);
            if (index === -1 || this.isDestroyed) {
                return;
            }
            // Select a new tab if the tab to be removed is selected and not destroyed
            if (tab.active && this.hasAvailableTabs(index)) {
                let newActiveIndex = this.getClosestTabIndex(index);
                this.tabs[newActiveIndex].active = true;
            }

            tab.removed.emit(tab);
            this.tabs.splice(index, 1);
            if (e) {
                $(this.container.nativeElement).find('.nav-tabs').css({ width: this.navWidth });
                if (this.navWidth + 58 > $(this.container.nativeElement).find('.nav-container').width()) {
                    $(this.container.nativeElement).find('.nav-scroll').css({ width: ($(this.container.nativeElement).find('.nav-container').width() - 58) });
                    $(this.container.nativeElement).find('.nav-scroll').siblings('.nav-add').addClass('nav-add-position');
                } else {
                    $(this.container.nativeElement).find('.nav-scroll').css({ width: this.navWidth });
                    $(this.container.nativeElement).find('.nav-scroll').siblings('.nav-add').removeClass('nav-add-position');
                }
            }
            setTimeout(() => {
                this.navScroll.refresh();
            }, 0);

            tab.destroy();
        }
    }

    private getClosestTabIndex(index: number): number {
        let tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }

        for (let step = 1; step <= tabsLength; step += 1) {
            let prevIndex = index - step;
            let nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    }

    private hasAvailableTabs(index: number): boolean {
        let tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }

        for (let i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    }

    public getActiverTab(): TabComponent {
        return this.tabs.find((tab: TabComponent) => {
            return tab.active;
        });
    }

    private setClassMap(): void {
        this.classMap = {
            'nav-stacked': this.vertical,
            'nav-justified': this.justified,
            ['nav-' + (this.type || 'tabs')]: true
        };
    }

    private count: number = 0;
    private get navWidth(): number {
        return (this.tabs.length * 140);
    }

    public module: any;
    public addTab(e?: MouseEvent, template?: string, modules?: any) {
        return new Promise<ComponentBase>((resolve, reject) => {
            if (!this.module) {
                this.module = TabsModule;
            }

            this.count++;
            let attr: any = {
                title: `Tab-${this.count}`,
                removable: true,
                active: true
            };

            if (!template) {
                template = TabComponent.getTemplate(attr);
            }

            this.addChild(this.holder, template, modules ? modules : [this.module])
                .then((c: TabComponent) => {
                    c.removable = attr.removable;
                    c.active = attr.active;

                    $(this.container.nativeElement).find('.nav-scroll').find('.nav').css({ width: this.navWidth });
                    // console.log(e.target.nodeName === "SPAN");

                    if (this.navWidth + 58 > $(this.container.nativeElement).find('.nav-container').width()) {
                        $(this.container.nativeElement).find('.nav-scroll').css({ width: ($(this.container.nativeElement).find('.nav-container').width() - 58) });
                        $(this.container.nativeElement).find('.nav-add').addClass('nav-add-position');
                    } else {
                        $(this.container.nativeElement).find('.nav-scroll').css({ width: this.navWidth });
                    }
                    setTimeout(() => {
                        this.navScroll.refresh();

                        resolve(c);
                    }, 0);
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    }

    public addTabTemplate(header: string, template: string, modules: any) {
        return this.addTab(null, `<ctaf-cp-tab #component heading='${header}'>${template}</ctaf-cp-tab>`, modules);
    }

    // setActive()
    private focusTab(e: MouseEvent) {
        // if(this.navScroll){
        // if(($(e.target).parent('li').index()+1)*140-$(this.container.nativeElement).find('.nav-add').siblings('.nav-scroll').width()>0){
        // this.navScroll.scrollTo($(this.container.nativeElement).find('.nav-add').siblings('.nav-scroll').width()-($(e.target).parent('li').index()+1)*140,0);
        // }else{
        // this.navScroll.scrollTo(0,0);
        // }
        // }
        this.navScroll.scrollToElement($(this.container.nativeElement).find('.nav .nav-item').get(($(e.target).parent('li').index())));
    }

}

