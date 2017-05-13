import { CTAFComponent, OnInit, ViewChild, Output, BrowserModule, FormsModule, RouterModule, NgModule, Routes, CommonModule } from '@ctaf/framework';
import { platformBrowserDynamic } from '@ctaf/framework';

import { PageService, ComponentBase, PageBase } from '@ctaf/framework';

import { itemData } from './itemData';
import { CTAFDemoPanelComponent } from './demo.panel.component';

import { BlankComponent } from './blank';
import { DemoButtonComponent } from './buttons/button';
import { DemoDropdownButtonComponent } from './buttons/dropdownbutton';
import { DemoIconButtonComponent } from './buttons/iconbutton';
import { DemoImagebuttonComponent } from './buttons/imagebutton';
import { DemoButtonGroupComponent } from './buttons/buttongroup';
import { DemoButtonToolbarComponent } from './buttons/buttontoolbar';
import { DemoLinkbuttonComponent } from './buttons/linkbutton';
import { DemoPanelComponent } from './panel/panel';
import { DemoNavbarComponent } from './navbar/navbar';
import { DemoSwitchComponent } from './forms/switch';
import { DemoCheckboxComponent } from './forms/checkbox';
import { DemoCheckboxGroupComponent } from './forms/checkboxgroup';
import { DemoRadioboxComponent } from './forms/radiobox';
import { DemoTextComponent } from './forms/text';
import { DemoPasswordComponent } from './forms/password';
import { DemoTextNumberComponent } from './forms/textnumber';
import { DemoProgressComponent } from './progressbars/progress';
import { DemoTreeComponent } from './tree/tree';
import { DemoDialogComponent } from './dialog/dialog';
import { DemoConfirmDialogComponent } from './dialog/confirmdialog';
import { DemoRadioboxGroupComponent } from './forms/radioboxgroup';
import { DemoDropDownListComponent } from './forms/dropdownlist';
import { DemoDatetimeComponent } from './forms/datetime';
import { DemoTimePickerComponent } from './forms/timepicker';
import { DemoAutoCompleteComponent } from './forms/autocomplete';
import { DemoMaskEditComponent } from './forms/maskedit';
import { DemoFileUploadComponent } from './forms/fileupload';
import { DemoTabsetComponent } from './tabs/tabs';

import { DemoLoadingComponent } from './common/loading';


import {
    DemoAnimationComponent,
    AnimationComponent1,
    AnimationComponent2,
    AnimationComponent3,
    AnimationComponent4,
    AnimationComponent5,
    AnimationComponent6,
    AnimationComponent7,
    AnimationComponent8,
    AnimationComponent9,
    AnimationComponent10,
    AnimationComponent11,
    AnimationComponent12,
    AnimationComponent13,
    AnimationComponent14,
    AnimationComponent15
} from './animations/animation';
import { DemoScrollbarComponent } from './scrollbar/scrollbar';
import { DemoHeightShowComponent } from './forms/heightshow';
import { DemoFormControlComponent } from './forms/formcontrol';
import { RichGridComponent } from './grid/rich-grid.component';
import { RichGridDeclarativeComponent } from './grid/rich-grid-declarative.component';
import { FromTemplateComponent } from './grid/from-template.component';
import { FromRichComponent } from './grid/from-rich.component';
import { ColumnWithRotatedSeriesComponent } from './chart/column-with-rotated-series.component';
import { ThreeBarChartComponent } from './chart/3d-bar-chart.component';
import { DateBasedDataComponent } from './chart/date-based-data.component';
import { LineWithDifferentNegativeColorComponent } from './chart/line-with-different-negative-color.component';
import { SimplePieChartComponent } from './chart/simple-pie-chart.component';
import { ThreeFunnelChartComponent } from './chart/3d-funnel-chart.component';
import { BubbleChartComponent } from './chart/bubble-chart.component';
import { XyLineGraphsComponent } from './chart/xy-line-graphs.component';
import { MekkoChartComponent } from './chart/mekko-chart.component';
import { ExportingChartToImageComponent } from './chart/exporting-chart-to-image.component';
import { CalendarComponent } from './calendar/calendar';


import {
    DemoNotificationServiceComponent,
    DemoBackendServiceComponent,
    DemoMessageServiceMainComponent,
    DemoMessageModule,
    DemoCtafPushServiceComponent,
    DemoWidgetMultiLanguage,
    DemoWidgetComponent,
    DemoPdfServiceComponent,
    DemoLogServiceComponent,
    DemoUsbKeyServiceComponent,
    DemoPrintServiceComponent,
    DemoClientStorageComponent
} from './service';
import { DemoAxissChartComponent, DemoToolbarChartComponent, DemoWeightChartComponent, DemoCrossCursorChartComponent, DemoXYChartComponent } from './charts';
import { DemoColumnSelectorGridComponent, DemoSubGridComponent, DemoFrozenGridComponent, DemoPagingGridComponent, DemoViewPortGridComponent } from './grids';

// import {provide} from '@ctaf/framework';
import {
    PlatformLocation,
    Location,
    LocationStrategy,
    HashLocationStrategy,
    PathLocationStrategy,
    APP_BASE_HREF
} from '@ctaf/framework';

import { MonacoEditor } from './monacoeditor';

import './page.less';

import { ComponentsModule } from '../src/entry';

const ITEMDATA: any[] = [
    {
        name: 'Container',
        children: [
            {
                name: 'Panel',
                routerLink: 'panel',
                component: DemoPanelComponent
            },
            {
                name: 'Tabs',
                routerLink: 'tabs',
                component: DemoTabsetComponent
            }
        ]
    },
    {
        name: 'Buttons',
        children: [
            {
                name: 'Button',
                routerLink: 'button',
                component: DemoButtonComponent
            },
            {
                name: 'Dropdownbutton',
                routerLink: 'dropdownbutton',
                component: DemoDropdownButtonComponent
            },
            {
                name: 'IconButton',
                routerLink: 'iconbutton',
                component: DemoIconButtonComponent
            },
            {
                name: 'ImgButton',
                routerLink: 'imgbutton',
                component: DemoImagebuttonComponent
            },
            {
                name: 'ButtonToolbar',
                routerLink: 'buttontoolbar',
                component: DemoButtonToolbarComponent
            },
            {
                name: 'LinkButton',
                routerLink: 'linkbutton',
                // component: BlankComponent
                component: DemoLinkbuttonComponent
            },
            {
                name: 'ButtonGroup',
                routerLink: 'buttongroup',
                component: DemoButtonGroupComponent
            }
        ]
    },
    {
        name: 'Forms',
        children: [
            {
                name: 'Switch',
                routerLink: 'switch',
                component: DemoSwitchComponent
            },
            {
                name: 'Checkbox',
                routerLink: 'checkbox',
                component: DemoCheckboxComponent
            },
            {
                name: 'CheckboxGroup',
                routerLink: 'checkboxgroup',
                component: DemoCheckboxGroupComponent
            },
            {
                name: 'Radiobox',
                routerLink: 'radiobox',
                component: DemoRadioboxComponent
            },
            {
                name: 'Text',
                routerLink: 'text',
                component: DemoTextComponent
            },
            {
                name: 'TextNumber',
                routerLink: 'textnumber',
                component: DemoTextNumberComponent
            },
            {
                name: 'Password',
                routerLink: 'password',
                component: DemoPasswordComponent
            },
            {
                name: 'RadioboxGroup',
                routerLink: 'RaioboxGroup',
                component: DemoRadioboxGroupComponent
            },
            {
                name: 'DropDownList',
                routerLink: 'dropdownlist',
                component: DemoDropDownListComponent
            },
            {
                name: 'FormControl',
                routerLink: 'formcontrol',
                component: DemoFormControlComponent
            },
            {
                name: 'DateTime',
                routerLink: 'datetime',
                component: DemoDatetimeComponent
            },
            {
                name: 'TimePicker',
                routerLink: 'timepicker',
                component: DemoTimePickerComponent
                // component: BlankComponent
            },
            {
                name: 'AutoComplete',
                routerLink: 'autocomplete',
                component: DemoAutoCompleteComponent
            },
            {
                name: 'FileUpload',
                routerLink: 'fileupload',
                component: DemoFileUploadComponent
            },
            {
                name: 'HeightShow',
                routerLink: 'heightshow',
                component: DemoHeightShowComponent
            }
        ]
    },
    {
        name: 'Grid',
        children: [
            {
                name: '支持列选择',
                routerLink: 'columnwithrotatedseries',
                component: DemoColumnSelectorGridComponent
            },
            {
                name: '子表',
                routerLink: 'subgrid',
                component: DemoSubGridComponent
            },
            // {
            //     name: '支持自定义排序',
            //     routerLink: '3dbarchart',
            //     component: RichGridDeclarativeComponent
            // },
            // {
            //     name: '支持默认排序',
            //     routerLink: 'datebaseddata',
            //     component: FromTemplateComponent
            // },
            // {
            //     name: 'Cell支持template',
            //     routerLink: 'linewithdifferentnegativecolor',
            //     component: FromRichComponent
            // },
            // {
            //     name: 'Column支持固定或者百分比列高',
            //     routerLink: 'simplepiechart',
            //     component: BlankComponent
            // },
            // {
            //     name: 'Column支持设置样式',
            //     routerLink: '3dfunnelchart',
            //     component: BlankComponent
            // },
            // {
            //     name: 'Cell支持点击',
            //     routerLink: 'bubblechart',
            //     component: BlankComponent
            // },
            {
                name: '支持分页',
                routerLink: 'paging',
                component: DemoPagingGridComponent
            },
            // {
            //     name: '提供默认黑白两种样式',
            //     routerLink: 'mekkochart',
            //     component: BlankComponent
            // },
            // {
            //     name: '支持列筛选',
            //     routerLink: 'exportingcharttoimage',
            //     component: BlankComponent
            // },
            {
                name: '支持行列冻结',
                routerLink: 'frozen',
                component: DemoFrozenGridComponent
            },
            // {
            //     name: '支持增行内容',
            //     routerLink: 'insert',
            //     component: BlankComponent
            // }
            {
                name: 'Viewport',
                routerLink: 'viewport',
                component: DemoViewPortGridComponent
            }
        ]
    },
    {
        name: 'Chart',
        children: [
            {
                name: '线形图支持tooltip',
                routerLink: 'tooltip',
                component: DemoToolbarChartComponent
            },
            {
                name: '线形图支持十字光标',
                routerLink: 'crosscursor',
                component: DemoCrossCursorChartComponent
            },
            {
                name: 'xyChart',
                routerLink: 'xy',
                component: DemoXYChartComponent
            },
            {
                name: '支持多X或Y轴',
                routerLink: 'axiss',
                component: DemoAxissChartComponent
            }
        ]
    },
    {
        name: 'Tree',
        children: [
            {
                name: '支持Checkbox多选',
                routerLink: 'mutlichoice',
                component: DemoTreeComponent
            },
            {
                name: '支持分组加载',
                routerLink: 'group',
                component: BlankComponent
            }
        ]
    },
    {
        name: 'Commons',
        children: [
            {
                name: 'Progress',
                routerLink: 'progress',
                component: DemoProgressComponent
            },
            {
                name: 'Navbar',
                routerLink: 'navbar',
                component: DemoNavbarComponent
            },
            {
                name: 'Animation',
                routerLink: 'animation',
                component: DemoAnimationComponent
            },
            {
                name: 'Calender',
                routerLink: 'calender',
                component: CalendarComponent
            },
            {
                name: 'MaskEdit',
                routerLink: 'maskedit',
                component: DemoMaskEditComponent
                // component: BlankComponent
            },
            {
                name: 'LoadingPanel',
                routerLink: 'loadingpanel',
                component: DemoLoadingComponent
            },
            {
                name: 'ConfirmDialog',
                routerLink: 'confirmdialog',
                component: DemoConfirmDialogComponent
            },
            {
                name: 'WarningDialog',
                routerLink: 'warningdialog',
                component: BlankComponent
            },
            {
                name: '白板Dialog',
                routerLink: 'dialog',
                component: DemoDialogComponent
            },
            {
                name: 'Scrollbar',
                routerLink: 'scrollbar',
                component: DemoScrollbarComponent
            }
        ]
    },
    {
        name: 'Service',
        children: [
            {
                name: 'Notification Service',
                routerLink: 'notificationservice',
                component: DemoNotificationServiceComponent
            },
            {
                name: 'Backend Service',
                routerLink: 'backendservice',
                component: DemoBackendServiceComponent
            },
            {
                name: 'CtafPush Service',
                routerLink: 'ctafpushservice',
                component: DemoCtafPushServiceComponent
            },
            {
                name: 'Message Service',
                routerLink: 'messageservice',
                component: DemoMessageServiceMainComponent
            },
            {
                name: 'Widget MultiLanguage',
                routerLink: 'widgetmultilanguage',
                component: DemoWidgetMultiLanguage
            },
            {
                name: 'Log Service',
                routerLink: 'logservice',
                component: DemoLogServiceComponent
            },
            {
                name: 'Pdf Service',
                routerLink: 'pdfservice',
                component: DemoPdfServiceComponent
            },
            {
                name: 'Print Service',
                routerLink: 'printservice',
                component: DemoPrintServiceComponent
            },
            {
                name: 'USBKey Service',
                routerLink: 'usbkeyservice',
                component: DemoUsbKeyServiceComponent
            },
            {
                name: 'Client Storage Service',
                routerLink: 'clientstorage',
                component: DemoClientStorageComponent
            }
        ]
    }
];


@CTAFComponent({
    selector: 'ctaf-page',
    templateUrl: 'page.component.html'
})
export class PageComponent extends ComponentBase {
    ITEMDATA: any[] = ITEMDATA;
}

const appRoutes: Routes = [
    { path: '', component: DemoButtonComponent }
];

const declarations = [PageComponent, DemoWidgetComponent, BlankComponent, MonacoEditor, CTAFDemoPanelComponent, AnimationComponent1, AnimationComponent2, AnimationComponent3, AnimationComponent4, AnimationComponent5, AnimationComponent6, AnimationComponent7, AnimationComponent8, AnimationComponent9, AnimationComponent10, AnimationComponent11, AnimationComponent12, AnimationComponent13, AnimationComponent14, AnimationComponent15];

ITEMDATA.forEach((v) => {
    if (!!v.children) {
        v.children.forEach((c) => {
            appRoutes.push({
                path: c.routerLink,
                component: c.component
            });

            declarations.push(c.component);
        });
    }
});

export const appRoutingProviders: any[] = [
];

// export const routing = RouterModule.forRoot(appRoutes);

PageService.bootstrap(
    [
        PageComponent
    ],
    [
        ComponentsModule,
        DemoMessageModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations,
    [
        appRoutingProviders,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        PageService
    ]
);
