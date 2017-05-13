import { ChangeDetectorRef } from '@angular/core';

import { CTAFComponent, WidgetBase, ComponentBase, PageService, TranslateService } from '@ctaf/framework';

import { WidgetPanelComponent, ComponentsModule } from '../../src/entry';

import { locales } from './locales/locales';

@CTAFComponent({
    selector: 'ctaf-wg-widget',
    template: `
        <ctaf-cp-widgetpanel title="Widget" [h]="h" [w]="w" [x]="x" [y]="y" height="100%">
            {{"Hello Widget!" | translate}}
        </ctaf-cp-widgetpanel>
    `
})
export class DemoWidgetComponent extends WidgetBase {

    constructor(protected cdr: ChangeDetectorRef, public translateservice: TranslateService) {
        super(cdr, translateservice);
    }

    ngAfterViewInit() {

    }

    protected locales() {
        return locales;
    }
}

@CTAFComponent({
    templateUrl: 'widgetMultiLanguage.html'
})
export class DemoWidgetMultiLanguage extends ComponentBase {
    a() {
        this.context.language = this.context.language === 'zh' ? 'en' : 'zh';
    }
}

