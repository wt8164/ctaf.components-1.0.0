import { Component, ViewChild } from '@angular/core';
import { AmChartsComponent } from '../../src/entry';

import * as _ from 'underscore';

@Component({
    templateUrl: './bubble-chart.component.html'
})
export class BubbleChartComponent {
    @ViewChild('amChart') amChart: AmChartsComponent;

    valueAxes: any;
    graphs: any;
    balloon: any;
    dataProvider: any;

    ngOnInit() {
        this.dataProvider = [{
            'y': 10,
            'x': 14,
            'value': 59,
            'y2': -5,
            'x2': -3,
            'value2': 44
        }, {
            'y': 5,
            'x': 3,
            'value': 50,
            'y2': -15,
            'x2': -8,
            'value2': 12
        }, {
            'y': -10,
            'x': 8,
            'value': 19,
            'y2': -4,
            'x2': 6,
            'value2': 35
        }, {
            'y': -6,
            'x': 5,
            'value': 65,
            'y2': -5,
            'x2': -6,
            'value2': 168
        }, {
            'y': 15,
            'x': -4,
            'value': 92,
            'y2': -10,
            'x2': -8,
            'value2': 102
        }, {
            'y': 13,
            'x': 1,
            'value': 8,
            'y2': -2,
            'x2': 0,
            'value2': 41
        }, {
            'y': 1,
            'x': 6,
            'value': 35,
            'y2': 0,
            'x2': -3,
            'value2': 16
        }];
        this.valueAxes = [{
            'position': 'bottom',
            'axisAlpha': 0
        }, {
            'minMaxMultiplier': 1.2,
            'axisAlpha': 0,
            'position': 'left'
        }];
        this.graphs = [{
            'balloonText': 'x:<b>[[x]]</b> y:<b>[[y]]</b><br>value:<b>[[value]]</b>',
            'bullet': 'circle',
            'bulletBorderAlpha': 0.2,
            'bulletAlpha': 0.8,
            'lineAlpha': 0,
            'fillAlphas': 0,
            'valueField': 'value',
            'xField': 'x',
            'yField': 'y',
            'maxBulletSize': 100
        }, {
            'balloonText': 'x:<b>[[x]]</b> y:<b>[[y]]</b><br>value:<b>[[value]]</b>',
            'bullet': 'diamond',
            'bulletBorderAlpha': 0.2,
            'bulletAlpha': 0.8,
            'lineAlpha': 0,
            'fillAlphas': 0,
            'valueField': 'value2',
            'xField': 'x2',
            'yField': 'y2',
            'maxBulletSize': 100
        }];

        this.balloon = {
            'fixedPosition': true,
        };
    }
}
