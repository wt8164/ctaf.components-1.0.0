import { Component } from '@angular/core';

import { AgRendererComponent } from '../../src/entry';

// both this and the parent component could be folded into one component as they're both simple, but it illustrates how
// a fuller example could work
@Component({
    selector: 'ag-ratio-cell', // tslint:disable-line
    template: `
    <ag-ratio style="height:20px" [topRatio]="params?.value?.top" [bottomRatio]="params?.value?.bottom">
    </ag-ratio>
    `,
    styles: [ `
        ag-ratio {
          display: block;
          overflow:hidden;
          border:1px solid #ccc;
          border-radius:6px;
          background: #fff;
        }
    `]
})
export class RatioParentComponent implements AgRendererComponent {
    private params: any = {
        value: { top: 0.25, bottom: 0.75 }
    };

    agInit(params: any): void {
        this.params = params;
    }
}
