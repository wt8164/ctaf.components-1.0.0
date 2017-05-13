import { Component, ViewChild } from '@angular/core';
import { AmChartsComponent } from '../../src/entry';

import * as _ from 'underscore';

@Component({
    templateUrl: './demoaxisschart.component.html'
})
export class DemoAxissChartComponent {
    @ViewChild('amChart') amChart: AmChartsComponent;

    public _chartData: any;
    public get chartData() {
        this._chartData = [];
        let firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 100);

        for (let i = 0; i < 100; i++) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            let newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);

            let visits = Math.round(Math.sin(i * 5) * i);
            let hits = Math.round(Math.random() * 80) + 500 + i * 3;
            let views = Math.round(Math.random() * 6000) + i * 4;

            this._chartData.push({
                date: newDate,
                visits: visits,
                hits: hits,
                views: views
            });
        }
        return this._chartData;
    }

    ngOnInit() {
        this.amChart.options = {
            'type': 'serial',
            'pathToImages': '/node_modules/@ctaf/components/images/amcharts/',
            'theme': 'dark',
            'legend': {
                'useGraphSettings': true
            },
            'dataProvider': this.chartData,
            'synchronizeGrid': true,
            'valueAxes': [{
                'id': 'v1',
                'axisColor': '#006600',
                'axisThickness': 2,
                'axisAlpha': 1,
                'position': 'left'
            }, {
                'id': 'v2',
                'axisColor': '#03D202',
                'axisThickness': 2,
                'offset': 50,
                'axisAlpha': 1,
                'position': 'left'
            }, {
                'id': 'v3',
                'axisColor': '#2fDE09',
                'axisThickness': 2,
                'gridAlpha': 0,
                'offset': 100,
                'axisAlpha': 1,
                'position': 'left'
            }],
            'graphs': [{
                'valueAxis': 'v1',
                'lineColor': '#FF6600',
                'bullet': 'round',
                'bulletBorderThickness': 1,
                'hideBulletsCount': 30,
                'title': 'red line',
                'valueField': 'visits',
                'fillAlphas': 0
            }, {
                'valueAxis': 'v2',
                'lineColor': '#FCD202',
                'bullet': 'square',
                'bulletBorderThickness': 1,
                'hideBulletsCount': 30,
                'title': 'yellow line',
                'valueField': 'hits',
                'fillAlphas': 0
            }, {
                'valueAxis': 'v3',
                'lineColor': '#B0DE09',
                'bullet': 'triangleUp',
                'bulletBorderThickness': 1,
                'hideBulletsCount': 30,
                'title': 'green line',
                'valueField': 'views',
                'fillAlphas': 0
            }],
            'chartScrollbar': {},
            'chartCursor': {
                'cursorPosition': 'mouse'
            },
            'categoryField': 'date',
            'categoryAxis': {
                'parseDates': true,
                'axisColor': '#DADADA',
                'minorGridEnabled': true
            }
        };
    }
}
