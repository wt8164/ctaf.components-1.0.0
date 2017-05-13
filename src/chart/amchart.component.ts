import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
    ViewContainerRef,
    ElementRef,
    ContentChildren,
    QueryList,
    OnInit,
    AfterViewInit,
    HostBinding,
    SimpleChange,
    ChangeDetectorRef
} from '@angular/core';

import { ComponentBase, CTAFComponent } from '@ctaf/framework';

import 'amcharts';
import 'amcharts.serial';
import 'amcharts.pie';
import 'amcharts.funnel';
import 'amcharts.gantt';
import 'amcharts.gauge';
import 'amcharts.radar';
import 'amcharts.xy';
import 'amcharts.amstock';
import 'amcharts.theme.light';
import 'amcharts.theme.dark';

@CTAFComponent({
    template: ``,
    selector: 'ctaf-cp-amchart'
})
export class AmChartsComponent extends ComponentBase {
    // public pathToImages = '/3rd/amcharts/amcharts/images/';
    public pathToImages = '/node_modules/@ctaf/components/images/amcharts/';
    public chart: AmCharts.AmChart;

    // HostBinding host block
    @HostBinding('style.display') display = 'block';

    // HostBinding host width 
    @HostBinding('style.width') width = '100%';

    // HostBinding host height
    @HostBinding('style.height') height = '400px';

    // HostBinding host block
    @HostBinding('attr.id') cid;

    @Input() options: any = <any>{}; // TODO better type for this

    constructor(public el: ElementRef, cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngOnInt() {

    }

    ngOnChanges() {
        if (this.chart) {
            this.chart.validateNow();
        }
    }

    ngAfterViewInit() {
        this.options.pathToImages = this.pathToImages;
        this.chart = AmCharts.makeChart(this.cid, this.options);
    }

    ngOnDestroy() {
        if (this.chart) {
            this.chart.clear();
        }
    }

    @Input()
    set type(v: any) {
        this.options.type = v;
    }
    get type() {
        return this.options.type;
    }

    @Input()
    set theme(v: any) {
        this.options.theme = v;
    }
    get theme() {
        return this.options.theme;
    }

    @Input()
    set marginRight(v: any) {
        this.options.marginRight = v;
    }
    get marginRight() {
        return this.options.marginRight;
    }

    @Input()
    set marginLeft(v: any) {
        this.options.marginLeft = v;
    }
    get marginLeft() {
        return this.options.marginLeft;
    }

    @Input()
    set startX(v: any) {
        this.options.startX = v;
    }
    get startX() {
        return this.options.startX;
    }

    @Input()
    set legend(v: any) {
        this.options.legend = v;
    }
    get legend() {
        return this.options.legend;
    }

    @Input()
    set outlineAlpha(v: any) {
        this.options.outlineAlpha = v;
    }
    get outlineAlpha() {
        return this.options.outlineAlpha;
    }

    @Input()
    set outlineColor(v: any) {
        this.options.outlineColor = v;
    }
    get outlineColor() {
        return this.options.outlineColor;
    }

    @Input()
    set outlineThickness(v: any) {
        this.options.outlineThickness = v;
    }
    get outlineThickness() {
        return this.options.outlineThickness;
    }

    @Input()
    set labelPosition(v: any) {
        this.options.labelPosition = v;
    }
    get labelPosition() {
        return this.options.labelPosition;
    }

    @Input()
    set autoMarginOffset(v: any) {
        this.options.marginLeft = v;
    }
    get autoMarginOffset() {
        return this.options.marginLeft;
    }

    @Input()
    set balloonText(v: any) {
        this.options.balloonText = v;
    }
    get balloonText() {
        return this.options.balloonText;
    }

    @Input()
    set depth3D(v: any) {
        this.options.depth3D = v;
    }
    get depth3D() {
        return this.options.depth3D;
    }

    @Input()
    set angle(v: any) {
        this.options.angle = v;
    }
    get angle() {
        return this.options.angle;
    }

    @Input()
    set rotate(v: boolean) {
        this.options.rotate = v;
    }
    get rotate() {
        return this.options.rotate;
    }

    @Input()
    set marginBottom(v: boolean) {
        this.options.marginBottom = v;
    }
    get marginBottom() {
        return this.options.marginBottom;
    }

    @Input()
    set dataDateFormat(v: boolean) {
        this.options.dataDateFormat = v;
    }
    get dataDateFormat() {
        return this.options.dataDateFormat;
    }

    @Input()
    set listeners(v: boolean) {
        this.options.listeners = v;
    }
    get listeners() {
        return this.options.listeners;
    }

    @Input()
    set trendLines(v: boolean) {
        this.options.trendLines = v;
    }
    get trendLines() {
        return this.options.trendLines;
    }

    @Input()
    set allLabels(v: boolean) {
        this.options.allLabels = v;
    }
    get allLabels() {
        return this.options.allLabels;
    }

    @Input()
    set titles(v: boolean) {
        this.options.titles = v;
    }
    get titles() {
        return this.options.titles;
    }

    @Input()
    set valueField(v: boolean) {
        this.options.valueField = v;
    }
    get valueField() {
        return this.options.valueField;
    }

    @Input()
    set titleField(v: boolean) {
        this.options.titleField = v;
    }
    get titleField() {
        return this.options.titleField;
    }

    @Input()
    set mouseWheelZoomEnabled(v: any) {
        this.options.mouseWheelZoomEnabled = v;
    }
    get mouseWheelZoomEnabled() {
        return this.options.mouseWheelZoomEnabled;
    }

    @Input()
    set chartScrollbar(v: any) {
        this.options.chartScrollbar = v;
    }
    get chartScrollbar() {
        return this.options.chartScrollbar;
    }

    @Input()
    set balloon(v: any) {
        this.options.balloon = v;
    }
    get balloon() {
        return this.options.balloon;
    }

        @Input()
    set valueScrollbar(v: any) {
        this.options.valueScrollbar = v;
    }
    get valueScrollbar() {
        return this.options.valueScrollbar;
    }

    @Input()
    set dataProvider(v: any) {
        this.options.dataProvider = v;
    }
    get dataProvider() {
        return this.options.dataProvider;
    }

    @Input()
    set valueAxes(v: any) {
        this.options.valueAxes = v;
    }
    get valueAxes() {
        return this.options.valueAxes;
    }

    @Input()
    set startDuration(v: any) {
        this.options.startDuration = v;
    }
    get startDuration() {
        return this.options.startDuration;
    }

    @Input()
    set graphs(v: any) {
        this.options.graphs = v;
    }
    get graphs() {
        return this.options.graphs;
    }

    @Input()
    set graphsType(v: any) {
        this.options.graphs.type = v;
    }
    get graphsType() {
        return this.options.graphs.type;
    }

    @Input()
    set chartCursor(v: any) {
        this.options.chartCursor = v;
    }
    get chartCursor() {
        return this.options.chartCursor;
    }

    @Input()
    set categoryField(v: any) {
        this.options.categoryField = v;
    }
    get categoryField() {
        return this.options.categoryField;
    }

    @Input()
    set categoryAxis(v: any) {
        this.options.categoryAxis = v;
    }
    get categoryAxis() {
        return this.options.categoryAxis;
    }
}
