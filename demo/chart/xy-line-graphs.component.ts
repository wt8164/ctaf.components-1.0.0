import { Component, ViewChild } from '@angular/core';
import { AmChartsComponent } from '../../src/entry';

import * as _ from 'underscore';

@Component({
    templateUrl: './xy-line-graphs.component.html'
})
export class XyLineGraphsComponent {
    @ViewChild('amChart') amChart: AmChartsComponent;

    trendLines: any;
    balloon: any;
    valueAxes: any;
    graphs: any;
    dataProvider: any;
    chartScrollbar: any;
    chartCursor: any;

    ngOnInit() {
        this.trendLines = [];
        this.balloon = {
            'adjustBorderColor': false,
            'shadowAlpha': 0,
            'fixedPosition': true
        };

        this.dataProvider = [{
            'date': 1,
            'ay': 6.5,
            'by': 2.2,
            'aValue': 15,
            'bValue': 10
        }, {
            'date': 2,
            'ay': 12.3,
            'by': 4.9,
            'aValue': 8,
            'bValue': 3
        }, {
            'date': 3,
            'ay': 12.3,
            'by': 5.1,
            'aValue': 16,
            'bValue': 4
        }, {
            'date': 5,
            'ay': 2.9,
            'aValue': 9
        }, {
            'date': 7,
            'by': 8.3,
            'bValue': 13
        }, {
            'date': 10,
            'ay': 2.8,
            'by': 13.3,
            'aValue': 9,
            'bValue': 13
        }, {
            'date': 12,
            'ay': 3.5,
            'by': 6.1,
            'aValue': 5,
            'bValue': 2
        }, {
            'date': 13,
            'ay': 5.1,
            'aValue': 10
        }, {
            'date': 15,
            'ay': 6.7,
            'by': 10.5,
            'aValue': 3,
            'bValue': 10
        }, {
            'date': 16,
            'ay': 8,
            'by': 12.3,
            'aValue': 5,
            'bValue': 13
        }, {
            'date': 20,
            'by': 4.5,
            'bValue': 11
        }, {
            'date': 22,
            'ay': 9.7,
            'by': 15,
            'aValue': 15,
            'bValue': 10
        }, {
            'date': 23,
            'ay': 10.4,
            'by': 10.8,
            'aValue': 1,
            'bValue': 11
        }, {
            'date': 24,
            'ay': 1.7,
            'by': 19,
            'aValue': 12,
            'bValue': 3
        }];

        this.valueAxes = [{
            'id': 'ValueAxis-1',
            'axisAlpha': 0
        }, {
            'id': 'ValueAxis-2',
            'axisAlpha': 0,
            'position': 'bottom'
        }];

        this.graphs = [{
            'balloonText': '<div style="margin: 5px;"><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>',
            'bullet': 'diamond',
            'maxBulletSize': 25,
            'lineAlpha': 0.8,
            'lineThickness': 2,
            'lineColor': '#b0de09',
            'fillAlphas': 0,
            'xField': 'date',
            'yField': 'ay',
            'valueField': 'aValue'
        }, {
            'balloonText': '<div style="margin: 5px;"><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>',
            'bullet': 'round',
            'maxBulletSize': 25,
            'lineAlpha': 0.8,
            'lineThickness': 2,
            'lineColor': '#fcd202',
            'fillAlphas': 0,
            'xField': 'date',
            'yField': 'by',
            'valueField': 'bValue'
        }];

        this.chartScrollbar = {
            'offset': 15,
            'scrollbarHeight': 5
        };

        this.chartCursor = {
            'pan': true,
            'cursorAlpha': 0,
            'valueLineAlpha': 0
        };

    }
}
