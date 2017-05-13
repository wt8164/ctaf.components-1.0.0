import { ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CTAFComponent, ComponentBase } from '@ctaf/framework';
import { AgGridNg2Component, GridOptions } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'from-template.component.html'
})
export class FromTemplateComponent extends ComponentBase {
    private gridOptions: GridOptions = <GridOptions>{};
    private squareTemplate: string = '{{params.value * params.value}}';
    private currencyPipeTemplate: string = '{{params.value | currency}}';
    private rowParamsTemplate: string = 'Field: {{params.colDef.field}}, Value: {{params.value}}';

    @ViewChild('agGrid') agGrid: AgGridNg2Component;

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngOnInit() {
        this.agGrid.columnDefs = this.createColumnDefs();
        this.agGrid.rowData = this.createRowData();
    }

    private createColumnDefs() {
        let columnDefs: any[] = [];

        columnDefs = [
            {
                headerName: 'Row',
                field: 'row'
            },
            {
                headerName: 'Square Template',
                field: 'value',
                cellRendererFramework: {
                    template: '{{params.value * params.value}}'
                },
                width: 100,
                suppressSizeToFit: false
            },
            {
                headerName: 'Currency Pipe Template',
                field: 'value',
                cellRendererFramework: {
                    template: '{{params.value | currency}}',
                    moduleImports: [ CommonModule ]
                }
            },
            {
                headerName: 'Row Params Template',
                field: 'row',
                cellRendererFramework: {
                    template: 'Field: {{params.colDef.field}}, Value: {{params.value}}'
                }
            }
        ];

        return columnDefs;
    }

    private createRowData() {
        let rowData: any[] = [];

        for (let i = 0; i < 15; i++) {
            rowData.push({
                row: 'Row ' + i,
                value: i,
                percent: Math.random()
            });
        }

        return rowData;
    }
}
