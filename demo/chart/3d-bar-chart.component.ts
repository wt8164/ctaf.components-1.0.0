import { Component, ViewChild } from '@angular/core';
import { AmChartsComponent } from '../../src/entry';

import * as _ from 'underscore';

@Component({
    templateUrl: './3d-bar-chart.component.html'
})
export class ThreeBarChartComponent {
    @ViewChild('amChart') amChart: AmChartsComponent;

    valueAxes: any;
    graphs: any;
    categoryAxis: any;
    dataProvider: any;
    export: any;

    ngOnInit() {
        this.dataProvider = [{
            'year': 2005,
            'income': 23.5
        }, {
            'year': 2006,
            'income': 26.2
        }, {
            'year': 2007,
            'income': 30.1
        }, {
            'year': 2008,
            'income': 29.5
        }, {
            'year': 2009,
            'income': 24.7
        }];
        this.valueAxes = [{
            'title': 'Income in millions, USD'
        }];
        this.graphs = [{
            'balloonText': 'Income in [[category]]:[[value]]',
            'fillAlphas': 1,
            'lineAlpha': 0.2,
            'title': 'Income',
            'type': 'column',
            'valueField': 'income'
        }];
        this.categoryAxis = {
            'gridPosition': 'start',
            'fillAlpha': 0.05,
            'position': 'left'
        };
    }
}
