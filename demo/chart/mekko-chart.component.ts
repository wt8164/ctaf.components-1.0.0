import { Component, ViewChild } from '@angular/core';
import { AmChartsComponent } from '../../src/entry';

import * as _ from 'underscore';

@Component({
    templateUrl: './mekko-chart.component.html'
})
export class MekkoChartComponent {
    @ViewChild('amChart') amChart: AmChartsComponent;

    categoryAxis: any;
    valueAxes: any;
    graphs: any;
    dataProvider: any;
    legend: any;

    ngOnInit() {
        this.dataProvider = [{
            'continent': 'North America',
            'trucks': 40000,
            'SUVs': 180000,
            'cars': 90000,
            'total': 310000
        }, {
            'continent': 'Asia',
            'trucks': 90000,
            'SUVs': 40000,
            'cars': 110000,
            'total': 240000
        }, {
            'continent': 'Europe',
            'trucks': 30000,
            'SUVs': 50000,
            'cars': 110000,
            'total': 190000
        }];

        this.valueAxes = [{
            'stackType': '100% stacked',
            'gridAlpha': 0.1,
            'unit': '%',
            'axisAlpha': 0
        }];


        this.graphs = [
            {
                'title': 'Trucks',
                'labelText': '[[value]]',
                'valueField': 'trucks',
                'type': 'column',
                'fillAlphas': 1
            }, {
                'title': 'SUVs',
                'labelText': '[[value]]',
                'valueField': 'SUVs',
                'type': 'column',
                'fillAlphas': 1
            },

            {
                'title': 'Cars',
                'labelText': '[[value]]',
                'valueField': 'cars',
                'type': 'column',
                'fillAlphas': 1
            }
        ];

        this.categoryAxis = {
            'gridAlpha': 0.1,
            'axisAlpha': 0,
            'widthField': 'total',
            'gridPosition': 'start'
        };

        this.legend = {};
    }
}
