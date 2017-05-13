import { Component, ViewChild } from '@angular/core';
import { AmChartsComponent } from '../../src/entry';

import * as _ from 'underscore';

@Component({
    templateUrl: './3d-funnel-chart.component.html'
})
export class ThreeFunnelChartComponent {
    @ViewChild('amChart') amChart: AmChartsComponent;

    balloon: any;
    balloonText: any;
    dataProvider: any;

    ngOnInit() {
        this.dataProvider = [{
            'title': 'Website visits',
            'value': 200
        }, {
            'title': 'Downloads',
            'value': 123
        }, {
            'title': 'Requested price list',
            'value': 98
        }, {
            'title': 'Contaced for more info',
            'value': 72
        }, {
            'title': 'Purchased',
            'value': 35
        }, {
            'title': 'Contacted for support',
            'value': 35
        }, {
            'title': 'Purchased additional products',
            'value': 26
        }];

        this.balloon = {
            'fixedPosition': true
        };

        this.balloonText = '[[title]]: [[value]]n[[description]]';
    }
}
