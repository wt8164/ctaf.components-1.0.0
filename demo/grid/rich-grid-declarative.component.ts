import { Component } from '@angular/core';

import { GridOptions, IFilter } from '../../src/entry';

import ProficiencyFilter from './proficiencyFilter';
import SkillFilter from './skillFilter';
import RefData from './refData';

// only import this if you are using the ag-Grid-Enterprise
// import 'ag-grid-enterprise/main';

@Component({
    templateUrl: './rich-grid-declarative.component.html',
    styles: [ '.toolbar button {margin: 2px; padding: 0px;}' ],
})
export class RichGridDeclarativeComponent {

    private gridOptions: GridOptions;
    private showGrid: boolean;
    private rowData: any[];
    private columnDefs: any[];
    private rowCount: string;

    constructor() {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};
        this.createRowData();
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
                mobile: this.createRandomPhoneNumber(),
                landline: this.createRandomPhoneNumber()
            });
        }

        this.rowData = rowData;
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

    private onQuickFilterChanged($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    }

    private countryCellRenderer(params) {
        let flag = `<img border='0' width='15' height='10' style='margin- bottom: 2px' src='/demo/grid/images/flags/${RefData.COUNTRY_CODES[ params.value ]}.png'>`;
        return flag + ' ' + params.value;
    }

    private skillsCellRenderer(params) {
        let data = params.data;
        let skills = [];
        RefData.IT_SKILLS.forEach(function (skill) {
            if (data && data.skills && data.skills[ skill ]) {
                skills.push(`<img src="/demo/grid/images/skills/${skill}.png" width="16px" title="${skill}" />`);
            }
        });
        return skills.join(' ');
    }

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

    private getSkillFilter(): any {
        return SkillFilter;
    }

    private getProficiencyFilter(): any {
        return ProficiencyFilter;
    }

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

