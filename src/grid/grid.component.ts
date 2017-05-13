import * as _ from 'underscore';
import { Component, ViewContainerRef, Input, Output, HostBinding, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { CTAFComponent, ComponentBase } from '@ctaf/framework';

import { GridOptions } from 'ag-grid/main';
import 'ag-grid-enterprise/main';

import '../../node_modules/ag-grid/dist/styles/ag-grid.css';
import '../../node_modules/ag-grid/dist/styles/theme-dark.css';

@CTAFComponent({
    selector: 'ctaf-cp-grid',
    templateUrl: 'grid.component.html',
})
export class GridComponent extends ComponentBase {
    private gridOptions: GridOptions = <GridOptions>{};

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
    }

    private _columnDefs: any;
    public set columnDefs(c: any) {
        this.gridOptions.columnDefs = c;
    }
    public get columnDefs() {
        return this.gridOptions.columnDefs;
    }

    private _rowData: any;
    public set rowData(r: any) {
        this.gridOptions.rowData = r;
    }
    public get rowData() {
        return this.gridOptions.rowData;
    }

    ngAfterViewInit() {
        this.gridOptions.api.sizeColumnsToFit();
    }
}
