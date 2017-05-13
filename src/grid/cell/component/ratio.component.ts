import { ComponentBase, CTAFComponent } from '@ctaf/framework';

import { AgRendererComponent } from '../../ag.renderer.component';

// both this and the parent component could be folded into one component as they're both simple, but it illustrates how
// a fuller example could work
@CTAFComponent({
    selector: 'ratio-cell', // tslint:disable-line
    template: `
        <div class='ratioBar'>
            <div class='ratioLength' [style.width.%]="params.value * 100"></div>
        </div>
    `,
    styles: [ `
        div.ratioBar {
          display: block;
          overflow:hidden;
          border:1px solid #ccc;
          border-radius:6px;
          background-color: transparent;
          height:100%;
        }
        div.ratioLength {
            height: 100%;
            background-color: red;
        }
    `]
})
export class RatioComponent extends ComponentBase implements AgRendererComponent {
    private params: any = {};

    agInit(params: any): void {
        this.params = params;
    }
}
