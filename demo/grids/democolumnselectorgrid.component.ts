import { Component, ViewChild } from '@angular/core';
import { AmChartsComponent, GridOptions } from '../../src/entry';

import * as _ from 'underscore';

@Component({
    templateUrl: './democolumnselectorgrid.component.html'
})
export class DemoColumnSelectorGridComponent {
    gridOptions: GridOptions;

    ngOnInit() {
        let columnDefs = [
            { headerName: 'Athlete', field: 'athlete', width: 150 },
            { headerName: 'Age', field: 'age', width: 90 },
            { headerName: 'Country', field: 'country', width: 120 },
            { headerName: 'Year', field: 'year', width: 90 },
            { headerName: 'Date', field: 'date', width: 110 },
            { headerName: 'Sport', field: 'sport', width: 110 },
            { headerName: 'Gold', field: 'gold', width: 100 },
            { headerName: 'Silver', field: 'silver', width: 100 },
            { headerName: 'Bronze', field: 'bronze', width: 100 },
            { headerName: 'Total', field: 'total', width: 100 }
        ];

        let rowData = [
            { 'athlete': 'Michael Phelps', 'age': 23, 'country': 'United States', 'year': 2008, 'date': '24/08/2008', 'sport': 'Swimming', 'gold': 8, 'silver': 0, 'bronze': 0, 'total': 8 },
            { 'athlete': 'Michael Phelps', 'age': 19, 'country': 'United States', 'year': 2004, 'date': '29/08/2004', 'sport': 'Swimming', 'gold': 6, 'silver': 0, 'bronze': 2, 'total': 8 },
            { 'athlete': 'Michael Phelps', 'age': 27, 'country': 'United States', 'year': 2012, 'date': '12/08/2012', 'sport': 'Swimming', 'gold': 4, 'silver': 2, 'bronze': 0, 'total': 6 },
            { 'athlete': 'Natalie Coughlin', 'age': 25, 'country': 'United States', 'year': 2008, 'date': '24/08/2008', 'sport': 'Swimming', 'gold': 1, 'silver': 2, 'bronze': 3, 'total': 6 },
            { 'athlete': 'Aleksey Nemov', 'age': 24, 'country': 'Russia', 'year': 2000, 'date': '01/10/2000', 'sport': 'Gymnastics', 'gold': 2, 'silver': 1, 'bronze': 3, 'total': 6 },
            { 'athlete': 'Alicia Coutts', 'age': 24, 'country': 'Australia', 'year': 2012, 'date': '12/08/2012', 'sport': 'Swimming', 'gold': 1, 'silver': 3, 'bronze': 1, 'total': 5 },
            { 'athlete': 'Missy Franklin', 'age': 17, 'country': 'United States', 'year': 2012, 'date': '12/08/2012', 'sport': 'Swimming', 'gold': 4, 'silver': 0, 'bronze': 1, 'total': 5 },
            { 'athlete': 'Ryan Lochte', 'age': 27, 'country': 'United States', 'year': 2012, 'date': '12/08/2012', 'sport': 'Swimming', 'gold': 2, 'silver': 2, 'bronze': 1, 'total': 5 },
            { 'athlete': 'Allison Schmitt', 'age': 22, 'country': 'United States', 'year': 2012, 'date': '12/08/2012', 'sport': 'Swimming', 'gold': 3, 'silver': 1, 'bronze': 1, 'total': 5 },
            { 'athlete': 'Natalie Coughlin', 'age': 21, 'country': 'United States', 'year': 2004, 'date': '29/08/2004', 'sport': 'Swimming', 'gold': 2, 'silver': 2, 'bronze': 1, 'total': 5 },
            { 'athlete': 'Ian Thorpe', 'age': 17, 'country': 'Australia', 'year': 2000, 'date': '01/10/2000', 'sport': 'Swimming', 'gold': 3, 'silver': 2, 'bronze': 0, 'total': 5 },
            { 'athlete': 'Dara Torres', 'age': 33, 'country': 'United States', 'year': 2000, 'date': '01/10/2000', 'sport': 'Swimming', 'gold': 2, 'silver': 0, 'bronze': 3, 'total': 5 },
            { 'athlete': 'Cindy Klassen', 'age': 26, 'country': 'Canada', 'year': 2006, 'date': '26/02/2006', 'sport': 'Speed Skating', 'gold': 1, 'silver': 2, 'bronze': 2, 'total': 5 },
            { 'athlete': 'Nastia Liukin', 'age': 18, 'country': 'United States', 'year': 2008, 'date': '24/08/2008', 'sport': 'Gymnastics', 'gold': 1, 'silver': 3, 'bronze': 1, 'total': 5 },
            { 'athlete': 'Marit Bjørgen', 'age': 29, 'country': 'Norway', 'year': 2010, 'date': '28/02/2010', 'sport': 'Cross Country Skiing', 'gold': 3, 'silver': 1, 'bronze': 1, 'total': 5 },
            { 'athlete': 'Sun Yang', 'age': 20, 'country': 'China', 'year': 2012, 'date': '12/08/2012', 'sport': 'Swimming', 'gold': 2, 'silver': 1, 'bronze': 1, 'total': 4 }
        ];

        this.gridOptions = {
            columnDefs: columnDefs,
            enableRangeSelection: true,
            rowData: rowData,
            suppressMenuFilterPanel: true,
            suppressMenuMainPanel: true,
            suppressMenuColumnPanel: true,
        };
    }
}
