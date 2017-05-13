import { 
    Input, 
    ChangeDetectorRef, 
    Optional,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import {
    CTAFComponent,
    WidgetBase,
} from '@ctaf/framework';

import { PanelComponent } from '../panel/panel.component';
import { ButtonComponent } from '../buttons/button.component';
import { WidgetContainerComponent } from './widgetcontainer';

import './widgetpanel.less';

@CTAFComponent({
    selector: 'ctaf-cp-widgetpanel',
    templateUrl: 'widgetpanel.component.html'
})
export class WidgetPanelComponent extends PanelComponent {
    // public container: WidgetContainerComponent;

    @ViewChild('dialogContainer', {read: ViewContainerRef}) dialogContainer;

    constructor(
        protected cdr: ChangeDetectorRef,
        @Optional() private container: WidgetContainerComponent
    ) {
        super(cdr);
    }

    @Input() x: number;
    @Input() y: number;
    @Input() w: number = 1;
    @Input() h: number = 1;

    public static getTemplate(): string {
        return `
            <ctaf-cp-widgetpanel #component [w]='4' [h]='3' title='aaaaa'>111</ctaf-cp-widgetpanel>
        `;
    }

    public destroy() {
        super.destroy();

        if (this.container) {
            setTimeout(() => {
                this.container.refresh();
            }, 0);
        }
    }

    protected classesMap(): any {
        return {
            'ctaf-cp-widgetpanel': true
        };
    }

    public openDialog(m: any, template: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.addChild(this.dialogContainer, template, m).then((component: any) => {
                resolve(component);
            });
        });
    }
}
