import { Component, ViewChild } from '@angular/core';
import { AmChartsComponent } from '../../src/entry';

import * as _ from 'underscore';

@Component({
    templateUrl: './simple-pie-chart.component.html'
})
export class SimplePieChartComponent {
    @ViewChild('amChart') amChart: AmChartsComponent;

    dataProvider: any;
    balloon: any;

    ngOnInit() {
        this.dataProvider = [{
            'country': 'Lithuania',
            'litres': 501.9
        }, {
            'country': 'Czech Republic',
            'litres': 301.9
        }, {
            'country': 'Ireland',
            'litres': 201.1
        }, {
            'country': 'Germany',
            'litres': 165.8
        }, {
            'country': 'Australia',
            'litres': 139.9
        }, {
            'country': 'Austria',
            'litres': 128.3
        }, {
            'country': 'UK',
            'litres': 99
        }, {
            'country': 'Belgium',
            'litres': 60
        }, {
            'country': 'The Netherlands',
            'litres': 50
        }];
        this.balloon = {
            'fixedPosition': true
        };
    }
}
