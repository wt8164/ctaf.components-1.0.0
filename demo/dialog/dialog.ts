import { CTAFComponent, AfterViewInit, AfterViewChecked, OnInit, ComponentBase, ViewChild, ElementRef, ChangeDetectorRef
    , ViewContainerRef, NgModule, CommonModule, FormsModule } from '@ctaf/framework';
import { DialogComponent, ComponentsModule } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'dialog.html'
})
export class DemoDialogComponent extends ComponentBase {
    public count: number = 0;

    @ViewChild('dialogContainer', { read: ViewContainerRef }) dialogContainer;

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    afterHide() {
        alert('after hide');
    }

    buttonClick() {
        this.openDialog(WidgetModule, `<ctaf-wg-dialog #component></ctaf-wg-dialog>`).then((c: any) => {
            c.count = ++this.count;
            c.forceChange();
        });
    }

    public openDialog(m: any, template: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.addChild(this.dialogContainer, template, m).then((component: any) => {
                resolve(component);
            });
        });
    }
}

@CTAFComponent({
    selector: 'ctaf-wg-dialog',
    template: `
        <ctaf-cp-dialog  [(visible)]="display"> 
            <header>
                Header {{count}}
            </header>        
                Conent {{count}}
            <footer>
                <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
                <button type="text" style="color: #4D4D4D;" (click)="display=false">Yes</button>
                <button type="text" style="color: #4D4D4D;" (click)="display=false">No</button>
                </div>
            </footer>   
        </ctaf-cp-dialog>
    `
})
export class WidgetDialogComponent extends ComponentBase {
    public display: boolean = true;
    public count: number;

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, ComponentsModule],
    exports: [WidgetDialogComponent],
    declarations: [WidgetDialogComponent],
    bootstrap: [],
    providers: [],
})
export class WidgetModule {
}
