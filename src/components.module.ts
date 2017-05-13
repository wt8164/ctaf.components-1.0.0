import { NgModule, CommonModule, FormsModule } from '@ctaf/framework';
import { ButtonModule } from '../3rd/primeng/button/button';
import { SharedModule } from '../3rd/primeng/common/shared';
import { InputTextModule } from '../3rd/primeng/inputtext/inputtext';

import { BUTTONS_DIRECTIVES } from './buttons/index';
import { NAVBARS_DIRECTIVES } from './navbars/index';
import { PROGRESSBARS_DIRECTIVES } from './progressbars/index';
import { TREE_DIRECTIVES } from './tree/index';
import { DIALOG_DIRECTIVES } from './dialog/index';
import { PANEL_DIRECTIVES } from './panel/index';
import { TABS_DIRECTIVES, TabsModule } from './tabs/index';
import { FORMS_DIRECTIVES } from './forms/index';
import { WIDGETS_DIRECTIVES } from './widgets/index';
import { CALENDAR_DIRECTIVES } from './calendar/index';

import { ModuleWithProviders } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';

import { GRID_DIRECTIVES, AgFrameworkFactory, AgComponentFactory, AgBaseComponentFactory } from './grid/index';
import { CHART_DIRECTIVES } from './chart/index';
import {COMMON_DIRECTIVES} from './common/index';

const ALL_DIRECTIVES = [
    BUTTONS_DIRECTIVES,
    NAVBARS_DIRECTIVES,
    PROGRESSBARS_DIRECTIVES,
    TREE_DIRECTIVES,
    DIALOG_DIRECTIVES,
    PANEL_DIRECTIVES,
    TABS_DIRECTIVES,
    FORMS_DIRECTIVES,
    WIDGETS_DIRECTIVES,
    GRID_DIRECTIVES,
    CHART_DIRECTIVES,
    CALENDAR_DIRECTIVES,
    COMMON_DIRECTIVES
];

/**
 * 控件集合模块。
 * 包含了项目下所有的控件集合。
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ButtonModule,
        InputTextModule
    ],
    exports: [ALL_DIRECTIVES, TabsModule, SharedModule],
    declarations: ALL_DIRECTIVES,
    providers: [ // singletons across the whole app,
        AgFrameworkFactory,
        AgComponentFactory,
        { provide: AgBaseComponentFactory, useExisting: AgComponentFactory },
        COMPILER_PROVIDERS
    ]
})

export class ComponentsModule { }
