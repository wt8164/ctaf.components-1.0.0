import { CTAFComponent, ComponentBase, Injectable, ApplicationRef, Compiler, ReflectiveInjector, ComponentRef, ChangeDetectorRef, Output, Input } from '@ctaf/framework';
import { PageService } from '@ctaf/framework';
import { AlertComponent } from './alert';

import './alertgroup.less';

@Injectable()
export class AlertController {
    private static _instance: AlertController;

    constructor(public appRef: ApplicationRef, public compiler: Compiler) {
        if (!AlertController._instance) {
            AlertController._instance = this;
            console.log('1111');
        }
        console.log('2222');
    }

    public static get current() {
        return AlertController._instance;
    }

    private componetRef: ComponentRef<AlertGroup>;

    create() {

        // if (!this.template) return;
        // let f = this.compiler.compileComponentSync(AlertGroup);
        // this.componetRef = this.appRef['_rootComponents'][0]['_hostElement'].vcRef.createComponent(f);

        // this.compiler.compileComponentAsync(AlertGroup)
        //     .then(factory => {
        //         const injector = ReflectiveInjector.fromResolvedProviders([]);
        //         this.appRef['_rootComponents'][0]['_hostElement'].vcRef.createComponent(factory, 0, injector);
        //     });
    }

    show() {
        if (!this.componetRef) {
            this.create();
        }

        this.componetRef.instance.addAlert();
    }
}

@CTAFComponent({
    templateUrl: 'alertgroup.template.html'
})
export class AlertGroup extends ComponentBase {
    constructor(public cdRef: ChangeDetectorRef) { super(cdRef); }

    @Output()
    @Input()
    public alerts: Array<Object> = [

    ];

    public closeAlert(i: number): void {
        this.alerts.splice(i, 1);

        // this.cdRef.detectChanges();
        console.log('closeAlert');
    }

    public addAlert(): void {
        this.alerts.push(
            {
                msg: 'Another alert!',
                type: 'warning',
                closable: true,
                dismissOnTimeout: 3000
            }
        );

        // this.cdRef.detectChanges();
        console.log('addAlert');
    }
}
