import { CTAFComponent, ComponentBase, ChangeDetectorRef, ViewChild } from '@ctaf/framework';

import { GridOptions, IFilter, AgGridNg2Component, RowNode } from '../../src/entry';

import RefData from './refData';

@CTAFComponent({
    templateUrl: 'demopaginggrid.component.html'
})
export class DemoPagingGridComponent extends ComponentBase {
    @ViewChild('agGrid') agGrid: AgGridNg2Component;

    public gridOptions: GridOptions;
    public showGrid: boolean;
    private rowData: any[];
    public rowCount: string;

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);

        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{
            debug: true,
            // tell grid we want virtual row model type
            rowModelType: 'virtual',
            // how big each page in our page cache will be, default is 100
            paginationPageSize: 20,
            // how many extra blank rows to display to the user at the end of the dataset,
            // which sets the vertical scroll and then allows the grid to request viewing more rows of data.
            // default is 1, ie show 1 row.
            paginationOverflowSize: 1,
            // how many server side requests to send at a time. if user is scrolling lots, then the requests
            // are throttled down
            maxConcurrentDatasourceRequests: 1,
            // how many rows to initially show in the grid. having 1 shows a blank row, so it looks like
            // the grid is loading from the users perspective (as we have a spinner in the first col)
            paginationInitialRowCount: 1,
            // how many pages to store in cache. default is undefined, which allows an infinite sized cache,
            // pages are never purged. this should be set for large data to stop your browser from getting
            // full of data
            maxPagesInCache: 3
        };
        this.showGrid = true;

        this.gridOptions.processRowPostCreate = (a) => {
            console.log('add Node');
            console.log(a.node.data);
        };

        this.gridOptions.onVirtualRowRemoved = (a) => {
            console.log('remove');
            console.log(a.node.data);
        };

        this.gridOptions.onModelUpdated = (a) => {
            console.log(this.agGrid.api.getRenderedNodes());
        }

        this.createRowData();
    }

    private createRowData() {
        let rowData: any[] = [];

        for (let i = 0; i < 1000; i++) {
            let countryData = RefData.countries[i % RefData.countries.length];
            rowData.push({
                name: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length] + i,
                skills: {
                    android: Math.random() < 0.4,
                    html5: Math.random() < 0.4,
                    mac: Math.random() < 0.4,
                    windows: Math.random() < 0.4,
                    css: Math.random() < 0.4
                },
                address: RefData.addresses[i % RefData.addresses.length],
                years: Math.round(Math.random() * 100),
                proficiency: Math.round(Math.random() * 100),
                country: countryData.country,
                continent: countryData.continent,
                language: countryData.language,
                mobile: this.createRandomPhoneNumber(),
                landline: this.createRandomPhoneNumber()
            });
        }

        this.rowData = rowData;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let dataSource = {
                rowCount: null,
                getRows: (params) => {
                    console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                    // At this point in your code, you would call the server, using $http if in AngularJS.
                    // To make the demo look real, wait for 500ms before returning
                    setTimeout(() => {
                        // take a slice of the total rows
                        let rowsThisPage = this.rowData.slice(params.startRow, params.endRow);
                        // if on or after the last page, work out the last row.
                        let lastRow = -1;
                        if (33 <= params.endRow) {
                            lastRow = this.rowData.length;
                        }
                        // call the success callback
                        params.successCallback(rowsThisPage, lastRow);
                    }, 100);
                }
            };

            this.agGrid.api.setDatasource(dataSource);
        }, 0);
    }

    private calculateRowCount() {
        if (this.agGrid.api && this.rowData) {
            let model = this.agGrid.api.getModel();
            let totalRows = this.rowData.length;
            let processedRows = model.getRowCount();
            this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
        }
    }

    private onModelUpdated() {
        console.log('onModelUpdated');
        this.calculateRowCount();
    }

    private onReady() {
        console.log('onReady');
        this.calculateRowCount();
    }

    public onQuickFilterChanged($event) {
        this.agGrid.api.setQuickFilter($event.target.value);
    }

    private countryCellRenderer(params) {
        return params.value + '1';
    }

    // noinspection JSUnusedLocalSymbols
    private skillsCellRenderer(params) {
        let data = params.data;
        let skills = [];
        RefData.IT_SKILLS.forEach(function (skill) {
            if (data && data.skills && data.skills[skill]) {
                skills.push(`<div>${skill}</div>`);
            }
        });
        return skills.join(' ');
    }

    // noinspection JSUnusedLocalSymbols
    private percentCellRenderer(params) {
        let value = params.value;

        let eDivPercentBar = document.createElement('div');
        eDivPercentBar.className = 'div-percent-bar';
        eDivPercentBar.style.width = value + '%';
        if (value < 20) {
            eDivPercentBar.style.backgroundColor = 'red';
        } else if (value < 60) {
            eDivPercentBar.style.backgroundColor = '#ff9900';
        } else {
            eDivPercentBar.style.backgroundColor = '#00A000';
        }

        let eValue = document.createElement('div');
        eValue.className = 'div-percent-value';
        eValue.innerHTML = value + '%';

        let eOuterDiv = document.createElement('div');
        eOuterDiv.className = 'div-outer-div';
        eOuterDiv.appendChild(eValue);
        eOuterDiv.appendChild(eDivPercentBar);

        return eOuterDiv;
    }

    // noinspection JSUnusedLocalSymbols
    private getCountryFilterParams(): any {
        return {
            cellRenderer: this.countryCellRenderer,
            cellHeight: 20
        };
    }

    private createRandomPhoneNumber() {
        let result = '+';
        for (let i = 0; i < 12; i++) {
            result += Math.round(Math.random() * 10);
            if (i === 2 || i === 5 || i === 8) {
                result += ' ';
            }
        }
        return result;
    }
}
