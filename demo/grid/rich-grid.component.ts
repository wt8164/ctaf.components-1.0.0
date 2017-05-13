import { Component } from '@angular/core';

import { GridOptions } from '../../src/entry';

import ProficiencyFilter from './proficiencyFilter';
import SkillFilter from './skillFilter';
import RefData from './refData';

// only import this if you are using the ag-Grid-Enterprise
// import 'ag-grid-enterprise/main';

@Component({
    templateUrl: './rich-grid.component.html',
    styles: [ '.toolbar button {margin: 2px; padding: 0px;}' ],
})
export class RichGridComponent {

    private gridOptions: GridOptions;
    private showGrid: boolean;
    private rowData: any[];
    private columnDefs: any[];
    private rowCount: string;

    constructor() {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};
        this.createRowData();
        this.createColumnDefs();
        this.showGrid = true;
    }

    private createRowData() {
        let rowData: any[] = [];

        for (let i = 0; i < 10000; i++) {
            let countryData = RefData.countries[ i % RefData.countries.length ];
            rowData.push({
                name: RefData.firstNames[ i % RefData.firstNames.length ] + ' ' + RefData.lastNames[ i % RefData.lastNames.length ],
                skills: {
                    android: Math.random() < 0.4,
                    html5: Math.random() < 0.4,
                    mac: Math.random() < 0.4,
                    windows: Math.random() < 0.4,
                    css: Math.random() < 0.4
                },
                address: RefData.addresses[ i % RefData.addresses.length ],
                years: Math.round(Math.random() * 100),
                proficiency: Math.round(Math.random() * 100),
                country: countryData.country,
                continent: countryData.continent,
                language: countryData.language,
                mobile: createRandomPhoneNumber(),
                landline: createRandomPhoneNumber()
            });
        }

        this.rowData = rowData;
    }

    private createColumnDefs() {
        this.columnDefs = [
            {
                headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
                suppressMenu: true, pinned: true
            },
            {
                headerName: 'Employee',
                children: [
                    {
                        headerName: 'Name', field: 'name',
                        width: 150, pinned: true
                    },
                    {
                        headerName: 'Country', field: 'country', width: 150,
                        cellRenderer: countryCellRenderer, pinned: true,
                        filterParams: { cellRenderer: countryCellRenderer, cellHeight: 20 }
                    },
                ]
            },
            {
                headerName: 'IT Skills',
                children: [
                    {
                        headerName: 'Skills',
                        width: 125,
                        suppressSorting: true,
                        cellRenderer: skillsCellRenderer,
                        filter: SkillFilter
                    },
                    {
                        headerName: 'Proficiency',
                        field: 'proficiency',
                        width: 120,
                        cellRenderer: percentCellRenderer,
                        filter: ProficiencyFilter
                    },
                ]
            },
            {
                headerName: 'Contact',
                children: [
                    { headerName: 'Mobile', field: 'mobile', width: 150, filter: 'text' },
                    { headerName: 'Land-line', field: 'landline', width: 150, filter: 'text' },
                    { headerName: 'Address', field: 'address', width: 500, filter: 'text' }
                ]
            }
        ];
    }

    private calculateRowCount() {
        if (this.gridOptions.api && this.rowData) {
            let model = this.gridOptions.api.getModel();
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

    private onCellClicked($event) {
        console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellValueChanged($event) {
        console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
    }

    private onCellDoubleClicked($event) {
        console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellContextMenu($event) {
        console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellFocused($event) {
        console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
    }

    private onRowSelected($event) {
        // taking out, as when we 'select all', it prints to much to the console!!
        // console.log('onRowSelected: ' + $event.node.data.name);
    }

    private onSelectionChanged() {
        console.log('selectionChanged');
    }

    private onBeforeFilterChanged() {
        console.log('beforeFilterChanged');
    }

    private onAfterFilterChanged() {
        console.log('afterFilterChanged');
    }

    private onFilterModified() {
        console.log('onFilterModified');
    }

    private onBeforeSortChanged() {
        console.log('onBeforeSortChanged');
    }

    private onAfterSortChanged() {
        console.log('onAfterSortChanged');
    }

    private onVirtualRowRemoved($event) {
        // because this event gets fired LOTS of times, we don't print it to the
        // console. if you want to see it, just uncomment out this line
        // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
    }

    private onRowClicked($event) {
        console.log('onRowClicked: ' + $event.node.data.name);
    }

    private onQuickFilterChanged($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    }

    // here we use one generic event to handle all the column type events.
    // the method just prints the event name
    private onColumnEvent($event) {
        console.log('onColumnEvent: ' + $event);
    }

}

function skillsCellRenderer(params) {
    let data = params.data;
    let skills = [];
    RefData.IT_SKILLS.forEach(function (skill) {
        if (data && data.skills && data.skills[ skill ]) {
            skills.push(`<img src='/demo/grid/images/skills/${skill}.png' width='16px' title='${skill}' />`);
        }
    });
    return skills.join(' ');
}

function countryCellRenderer(params) {
    let flag = `<img border='0' width='15' height='10' style='margin-bottom: 2px' src='/demo/grid/images/flags/${RefData.COUNTRY_CODES[ params.value ]}.png'>`;
    return flag + ' ' + params.value;
}

function createRandomPhoneNumber() {
    let result = '+';
    for (let i = 0; i < 12; i++) {
        result += Math.round(Math.random() * 10);
        if (i === 2 || i === 5 || i === 8) {
            result += ' ';
        }
    }
    return result;
}

function percentCellRenderer(params) {
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
