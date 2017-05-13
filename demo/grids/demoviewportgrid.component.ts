import { Component, ViewChild } from '@angular/core';
import { CTAFComponent, ComponentBase } from '@ctaf/framework';
import { AgGridNg2Component, AgRendererComponent, GridOptions, RowNode, ComponentsModule, IViewportDatasource, IViewportDatasourceParams } from '../../src/entry';
import { Observable } from 'rxjs/observable';
import { timer } from 'rxjs/observable/timer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as _ from 'underscore';

@CTAFComponent({
    templateUrl: './demoviewportgrid.component.html'
})
export class DemoViewPortGridComponent extends ComponentBase {
    @ViewChild('agGrid') agGrid: AgGridNg2Component;

    private gridOptions: GridOptions;

    constructor() {
        super();

        this.gridOptions = <GridOptions>{
            enableRangeSelection: true,
            enableColResize: true,
            debug: true,
            rowSelection: 'multiple',
            rowModelType: 'viewport',
            // implement this so that we can do selection
            getRowNodeId: function (data) {
                // the code is unique, so perfect for the id
                console.log(data);
                return data.code;
            }
        };

        this.gridOptions.columnDefs = this.createColumnDefs();

        this.gridOptions.onGridReady = function (params) {
            params.api.sizeColumnsToFit();
        };
    }

    private createColumnDefs() {
        return [
            {
                headerName: 'Country',
                field: 'country',
                width: 100
            },
            {
                headerName: 'Name',
                field: 'name',
                width: 100
            },
            {
                headerName: 'Gold',
                field: 'gold',
                width: 100,
                cellRenderer: 'animateShowChange'

            },
            {
                headerName: 'Silver',
                field: 'silver',
                width: 100,
                cellRenderer: 'animateShowChange'

            },
            {
                headerName: 'Bronze',
                field: 'bronze',
                width: 100, 
                cellRenderer: 'animateSlide'
            },
        ];
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let viewportDatasource = new ViewportDatasource();
            this.gridOptions.api.setViewportDatasource(viewportDatasource);
        }, 0);
    }
}

class CData {
    country: string;
    name: string;
    gold: number;
    silver: number;
    bronze: number;

    constructor() {

    }
}

class ViewportDatasource implements IViewportDatasource {
    private params: IViewportDatasourceParams;

    public data = [
        { code: 1, country: 'United States', name: 'Bob', gold: 1, silver: 0, bronze: 0 },
        { code: 2, country: 'United States', name: 'Jack', gold: 0, silver: 1, bronze: 1 },
        { code: 3, country: 'United States', name: 'Sue', gold: 1, silver: 0, bronze: 1 },
        { code: 4, country: 'United Kingdom', name: 'Mary', gold: 1, silver: 1, bronze: 0 },
        { code: 5, country: 'United Kingdom', name: 'Tess', gold: 0, silver: 1, bronze: 1 },
        { code: 6, country: 'United Kingdom', name: 'John', gold: 0, silver: 2, bronze: 1 },
        { code: 7, country: 'Jamaica', name: 'Henry', gold: 1, silver: 1, bronze: 0 },
        { code: 8, country: 'South Africa', name: 'Kate', gold: 1, silver: 0, bronze: 1 },
    ];

    public number1 = timer(1000, 2050);
    public number2 = timer(1000, 1950);
    public number3 = timer(1000, 2000);

    constructor() {
        this.number1.subscribe((x: number) => {
            let rowIndex = this.getRandom(this.data.length);
            let newValue = this.getRandom(50);
            this.data[rowIndex].gold = newValue;
            this.onDataUpdated(rowIndex, 'gold', newValue);
        });

        this.number2.subscribe((x: number) => {
            let rowIndex = this.getRandom(this.data.length);
            let newValue = this.getRandom(50);
            this.data[rowIndex].gold = newValue;
            this.onDataUpdated(rowIndex, 'silver', newValue);
        });

        this.number3.subscribe((x: number) => {
            let rowIndex = this.getRandom(this.data.length);
            let newValue = this.getRandom(50);
            this.data[rowIndex].gold = newValue;
            this.onDataUpdated(rowIndex, 'bronze', newValue);
        });
    }

    getRandom(n: number): number {
        return Math.floor(Math.random() * (n - 1) + 1);
    }

    /** Gets called exactly once before viewPort is used. Passes methods to be used to tell viewPort of data loads / changes. */
    init(params: IViewportDatasourceParams): void {
        this.params = params;

        this.params.setRowCount(this.data.length);
        this.params.setRowData(this.data);

    }

    /** Tell the viewport what the scroll position of the grid is, so it knows what rows it has to get */
    setViewportRange(firstRow: number, lastRow: number): void {

    }
    /** Gets called once when viewPort is no longer used. If you need to do any cleanup, do it here. */
    destroy(): void {
        this.number1 = null;
        this.number2 = null;
        this.number3 = null;
    }

    // process rowData event
    onRowData() {
        this.params.setRowData(this.data);
    };

    // process dataUpdated event
    onDataUpdated(rowIndex: number, columnId: string, newValue: number) {
        let rowNode = this.params.getRow(rowIndex);
        rowNode.setDataValue(columnId, newValue);
    };

    // process rowCount event
    onRowCountChanged(event) {
        this.params.setRowCount(this.data.length);
    };
}


