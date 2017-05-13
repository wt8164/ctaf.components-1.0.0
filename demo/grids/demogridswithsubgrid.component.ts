import { Component, ViewChild } from '@angular/core';
import { AgGridNg2Component, AgRendererComponent, GridOptions, RowNode, ComponentsModule } from '../../src/entry';

import * as _ from 'underscore';

@Component({
    template: `
        <div style="padding: 5px; height: 200px">
            <ctaf-cp-grid #agGrid [gridOptions]="gridOptions">
            </ctaf-cp-grid>
        </div>
    `
})
export class SubGirdComponent implements AgRendererComponent {
    private gridOptions: GridOptions;

    agInit(params: any): void {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.createRowData(params);
        this.gridOptions.columnDefs = this.createColumnDefs();
        this.gridOptions.onGridReady = function (p) {
            setTimeout(function () { p.api.sizeColumnsToFit(); }, 0);
        };

    }

    private createColumnDefs() {
        return [
            {
                headerName: 'Name1',
                field: 'country',
                width: 100,
            },
            {
                headerName: 'Country',
                field: 'name',
                width: 100
            }
        ];
    }

    public data = [
        { country: 'United States', name: 'Bob', gold: 1, silver: 0, bronze: 0 },
        { country: 'United States', name: 'Jack', gold: 0, silver: 1, bronze: 1 },
        { country: 'United States', name: 'Sue', gold: 1, silver: 0, bronze: 1 },
        { country: 'United Kingdom', name: 'Mary', gold: 1, silver: 1, bronze: 0 },
        { country: 'United Kingdom', name: 'Tess', gold: 0, silver: 1, bronze: 1 },
        { country: 'United Kingdom', name: 'John', gold: 0, silver: 2, bronze: 1 },
        { country: 'Jamaica', name: 'Henry', gold: 1, silver: 1, bronze: 0 },
        { country: 'South Africa', name: 'Kate', gold: 1, silver: 0, bronze: 1 },
    ];

    private createRowData(params: any) {
        console.log(params);
        return this.data.filter((d) => {
            return d.country === params.data.country;
        });
    }
}

@Component({
    templateUrl: './demogridswithsubgrid.component.html'
})
export class DemoSubGridComponent {
    @ViewChild('agGrid') agGrid: AgGridNg2Component;

    private gridOptions: GridOptions;

    constructor() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.createRowData();
        this.gridOptions.columnDefs = this.createColumnDefs();
        // this.gridOptions.groupRowInnerRendererFramework = {
        //     component: GroupInnerRowComponent
        // };
        this.gridOptions.doesDataFlower = function (dataItem) {
            return true;
        };

        this.gridOptions.isFullWidthCell = function (rowNode: RowNode) {
            return rowNode.level === 1;
        };

        this.gridOptions.onGridReady = function (params) {
            params.api.sizeColumnsToFit();

            let i = 0;
            params.api.forEachNode((rowNode) => {

                if (i % 2 === 0) {
                    rowNode.canFlower = false;
                }

                i++;
            });

            params.api.refreshView();
        };

        this.gridOptions.fullWidthCellRendererFramework = {
            component: SubGirdComponent,
            moduleImports: [ComponentsModule]
        };

        this.gridOptions.getRowHeight = function (params) {
            let rowIsDetailRow = params.node.level === 1;
            // return 100 when detail row, otherwise return 25
            return rowIsDetailRow ? 200 : 25;
        };

    }

    private createColumnDefs() {
        return [
            {
                headerName: 'Country',
                field: 'country',
                width: 100,
                cellRenderer: 'group'
            },
            {
                headerName: 'Name',
                field: 'name',
                width: 100
            },
            {
                headerName: 'Gold',
                field: 'gold',
                width: 100
            },
            {
                headerName: 'Silver',
                field: 'silver',
                width: 100
            },
            {
                headerName: 'Bronze',
                field: 'bronze',
                width: 100
            },
        ];
    }

    private createRowData() {
        return [
            { country: 'United States', name: 'Bob', gold: 1, silver: 0, bronze: 0 },
            { country: 'United States', name: 'Jack', gold: 0, silver: 1, bronze: 1 },
            { country: 'United States', name: 'Sue', gold: 1, silver: 0, bronze: 1 },
            { country: 'United Kingdom', name: 'Mary', gold: 1, silver: 1, bronze: 0 },
            { country: 'United Kingdom', name: 'Tess', gold: 0, silver: 1, bronze: 1 },
            { country: 'United Kingdom', name: 'John', gold: 0, silver: 2, bronze: 1 },
            { country: 'Jamaica', name: 'Henry', gold: 1, silver: 1, bronze: 0 },
            { country: 'South Africa', name: 'Kate', gold: 1, silver: 0, bronze: 1 },
        ];
    }

    aaa() {
        this.agGrid.api.expandAll();

        this.agGrid.api.forEachLeafNode(function (rowNode) {
            rowNode.expanded = true;
        });
        this.agGrid.api.onGroupExpandedOrCollapsed();
    }
}
