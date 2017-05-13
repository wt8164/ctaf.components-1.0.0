import { Component, ViewChild } from '@angular/core';
import { AmChartsComponent } from '../../src/entry';

import * as _ from 'underscore';

@Component({
    templateUrl: './line-with-different-negative-color.component.html'
})
export class LineWithDifferentNegativeColorComponent {
    @ViewChild('amChart') amChart: AmChartsComponent;

    chartData: any;
    valueAxes: any;
    graphs: any;
    categoryAxis: any;
    listeners: any;
    chartScrollbar: any;
    chartCursor: any;

    ngOnInit() {
        this.valueAxes = [{
            'inside': true,
            'axisAlpha': 0
        }];
        this.chartScrollbar = {};
        this.chartCursor = {};
        this.graphs = [{
            'id': 'g1',
            'balloonText': '<div style="margin:5px; font-size:19px;"><span style="font-size:13px;">[[category]]</span><br>[[value]]</div>',
            'bullet': 'round',
            'bulletBorderAlpha': 1,
            'bulletBorderColor': '#FFFFFF',
            'hideBulletsCount': 50,
            'lineThickness': 2,
            'lineColor': '#fdd400',
            'negativeLineColor': '#67b7dc',
            'valueField': 'visits'
        }];

        this.categoryAxis = {
            'parseDates': true,
            'axisAlpha': 0,
            'minHorizontalGap': 55
        };

        this.chartData = generatechartData();
        function generatechartData() {
            let chartData = [];
            let firstDate = new Date();
            firstDate.setDate(firstDate.getDate() - 150);
            for (let i = 0; i < 150; i++) {
                // we create date objects here. In your data, you can have date strings
                // and then set format of your dates using chart.dataDateFormat property,
                // however when possible, use date objects, as this will speed up chart rendering.
                let newDate = new Date(firstDate);
                newDate.setDate(newDate.getDate() + i);

                let visits = Math.round(Math.random() * 90 - 45);

                chartData.push({
                    date: newDate,
                    visits: visits
                });
            }
            return chartData;
        }
    }
}

