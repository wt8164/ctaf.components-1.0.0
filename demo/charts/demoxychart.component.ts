import { Component, ViewChild } from '@angular/core';
import { AmChartsComponent } from '../../src/entry';

import * as _ from 'underscore';

@Component({
    templateUrl: './demoxychart.component.html'
})
export class DemoXYChartComponent {
    @ViewChild('amChart') amChart: AmChartsComponent;

    ngOnInit() {
        let chartData1 = [];
        let chartData2 = [];
        let chartData3 = [];
        let chartData4 = [];

        let firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 500);
        firstDate.setHours(0, 0, 0, 0);

        for (let i = 0; i < 500; i++) {
            let newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);

            let a1 = Math.round(Math.random() * (40 + i)) + 100 + i;
            let b1 = Math.round(Math.random() * (1000 + i)) + 500 + i * 2;

            let a2 = Math.round(Math.random() * (100 + i)) + 200 + i;
            let b2 = Math.round(Math.random() * (1000 + i)) + 600 + i * 2;

            let a3 = Math.round(Math.random() * (100 + i)) + 200;
            let b3 = Math.round(Math.random() * (1000 + i)) + 600 + i * 2;

            let a4 = Math.round(Math.random() * (100 + i)) + 200 + i;
            let b4 = Math.round(Math.random() * (100 + i)) + 600 + i;

            chartData1.push({
                'date': newDate,
                'value': a1,
                'volume': b1
            });
            chartData2.push({
                'date': newDate,
                'value': a2,
                'volume': b2
            });
            chartData3.push({
                'date': newDate,
                'value': a3,
                'volume': b3
            });
            chartData4.push({
                'date': newDate,
                'value': a4,
                'volume': b4
            });
        }

        this.amChart.options = {
            'type': 'stock',
            'theme': 'dark',
            'dataSets': [ {
                'title': 'first data set',
                'fieldMappings': [ {
                    'fromField': 'value',
                    'toField': 'value'
                }, {
                    'fromField': 'volume',
                    'toField': 'volume'
                }],
                'dataProvider': chartData1,
                'categoryField': 'date'
            }, {
                'title': 'second data set',
                'fieldMappings': [ {
                    'fromField': 'value',
                    'toField': 'value'
                }, {
                    'fromField': 'volume',
                    'toField': 'volume'
                }],
                'dataProvider': chartData2,
                'categoryField': 'date'
            }, {
                'title': 'third data set',
                'fieldMappings': [ {
                    'fromField': 'value',
                    'toField': 'value'
                }, {
                    'fromField': 'volume',
                    'toField': 'volume'
                }],
                'dataProvider': chartData3,
                'categoryField': 'date'
            }, {
                'title': 'fourth data set',
                'fieldMappings': [ {
                    'fromField': 'value',
                    'toField': 'value'
                }, {
                    'fromField': 'volume',
                    'toField': 'volume'
                }],
                'dataProvider': chartData4,
                'categoryField': 'date'
            }
            ],

            'panels': [ {
                'showCategoryAxis': false,
                'title': 'Value1',
                'percentHeight': 70,
                'stockGraphs': [ {
                    'id': 'g1',
                    'valueField': 'value',
                    'comparable': true,
                    'compareField': 'value',
                    'balloonText': '[[title]]:<b>[[value]]</b>',
                    'compareGraphBalloonText': '[[title]]:<b>[[value]]</b>'
                }],
                'stockLegend': {
                    'periodValueTextComparing': '[[percents.value.close]]%',
                    'periodValueTextRegular': '[[value.close]]'
                }
            }, {
                'title': 'Volume1',
                'percentHeight': 30,
                'stockGraphs': [ {
                    'valueField': 'volume',
                    'type': 'column',
                    'showBalloon': false,
                    'fillAlphas': 1
                }],
                'stockLegend': {
                    'periodValueTextRegular': '[[value.close]]'
                }
            }],

            'chartScrollbarSettings': {
                'graph': 'g1'
            },

            'chartCursorSettings': {
                'valueBalloonsEnabled': true,
                'fullWidth': true,
                'cursorAlpha': 0.1,
                'valueLineBalloonEnabled': true,
                'valueLineEnabled': true,
                'valueLineAlpha': 0.5
            },

            'categoryAxesSettings': {
                autoGridCount: false,
                gridCount: 100,
                color: 'red',
                dashLength: 11
            }
        };
    }
}
