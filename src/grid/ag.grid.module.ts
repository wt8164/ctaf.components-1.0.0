import { NgModule, ModuleWithProviders } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';

import { AgGridNg2Component } from './ag.grid.component';
import { AgFrameworkFactory } from './ag.framework.factory';
import { AgComponentFactory } from './ag.component.factory';
import { AgBaseComponentFactory } from './ag.component.base.factory';
import { AgGridColumnComponent } from './ag.grid.column';

@NgModule({
    imports: [],
    declarations: [
        AgGridNg2Component,
        AgGridColumnComponent
    ],
    exports: [
        AgGridNg2Component,
        AgGridColumnComponent
    ],
    providers: [ // singletons across the whole app,
        AgFrameworkFactory,
        AgComponentFactory,
        { provide: AgBaseComponentFactory, useExisting: AgComponentFactory },
        COMPILER_PROVIDERS
    ]
})
export class AgGridModule {
    /**
     * Use this if you wish to have AOT support, but note that you will NOT be able to have dynamic/angular 2
     * component within the grid (due to restrictions around the CLI)
     */
    // static withAotSupport(): ModuleWithProviders {
    //     return {
    //         ngModule: AgGridModule,
    //         providers: [
    //             Ng2FrameworkFactory,
    //             BaseComponentFactory
    //         ],
    //     };
    // }

    /**
     * Use this if you wish to have dynamic/angular 2 components within the grid, but note you will NOT be able to
     * use AOT if you use this (due to restrictions around the CLI)
     */
    static withNg2ComponentSupport(): ModuleWithProviders {
        return {
            ngModule: AgGridModule,
            providers: [ // singletons across the whole app,
                AgFrameworkFactory,
                AgComponentFactory,
                { provide: AgBaseComponentFactory, useExisting: AgComponentFactory },
                COMPILER_PROVIDERS
            ],
        };
    }

    // deprecated - please use withDynamicComponentSupport
    static forRoot() {
        return AgGridModule.withNg2ComponentSupport();
    }
}
