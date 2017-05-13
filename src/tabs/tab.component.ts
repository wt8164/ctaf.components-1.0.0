import {
    CTAFComponent,
    OnDestroy,
    Input,
    Output,
    HostBinding,
    TemplateRef,
    EventEmitter,
    DomSanitizer,
    SafeResourceUrl,
    ComponentBase,
    ContentChild,
    ViewContainerRef,
    Type,
    Optional,
    forwardRef,
    Inject,
    ChangeDetectorRef
} from '@ctaf/framework';
import { TabsetComponent } from './tabset.component';
import { WidgetContainerComponent } from '../widgets/widgetcontainer';
import * as _ from 'underscore';

@CTAFComponent({
    selector: 'ctaf-cp-tab, [ctafTab]',
    templateUrl: 'tab.component.html'
})
export class TabComponent extends ComponentBase {
    @Input() public heading: string;
    @Input() public disabled: boolean;
    @Input() public removable: boolean;
    @Input() public url: string;
    @Input() editable: boolean;

    public editting: boolean = false;
    public headingInput: string;

    @ContentChild(WidgetContainerComponent)
    widgetContainer: WidgetContainerComponent;

    public get safeUrl(): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }

    protected hostClassesMap(): any {
        return _.extend(super.hostClassesMap(), {
            'tab-pane': true,
            'active': this.active
        });
    }

    /** tab active state toggle */
    @HostBinding('class.active')
    @Input()
    public get active(): boolean {
        return this._active;
    }

    @Output() public select: EventEmitter<TabComponent> = new EventEmitter<TabComponent>(false);
    @Output() public deselect: EventEmitter<TabComponent> = new EventEmitter<TabComponent>(false);
    @Output() public removed: EventEmitter<TabComponent> = new EventEmitter<TabComponent>(false);
    @Output() public created: EventEmitter<TabComponent> = new EventEmitter<TabComponent>(false);

    public set active(active: boolean) {
        if (this.disabled && active || !active) {
            if (!active) {
                this._active = active;
            }

            this.deselect.emit(this);
            return;
        }

        this._active = active;
        this.select.emit(this);

        if (this.tabset) {
            this.tabset.tabs.forEach((tab: TabComponent) => {
                if (tab !== this) {
                    tab.active = false;
                }
            });
        }
    }

    public setActive() {
        this.active = true;
        this.forceChange();
    }

    @HostBinding('class.tab-pane') public addClass: boolean = true;

    public headingRef: TemplateRef<any>;
    private _active: boolean;

    public constructor(
        cdr: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
    /* tslint:disable */ @Inject(forwardRef(() => TabsetComponent))
        @Optional() public tabset: TabsetComponent) { // tslint:disable-line
        super(cdr);
        if (this.tabset) {
            this.tabset.registerTab(this);
        }
    }

    public ngOnInit(): void {
        this.removable = !!this.removable;
    }

    public ngOnDestroy(): void {
        // this._destroyed = true;
        this.tabset.removeTab(null, this, true);
    }

    static getTemplate(attr: any): string {
        return `
            <ctaf-cp-tab #component
                heading="${attr.title}" 
            >
                <ctaf-cp-widgetcontainer></ctaf-cp-widgetcontainer>
            </ctaf-cp-tab>`;
    }
}
