import { CTAFComponent, AfterViewInit, AfterViewChecked, OnInit, ComponentBase, ViewChild, ElementRef } from '@ctaf/framework';
import { ConfirmDialogComponent } from '../../src/entry';

@CTAFComponent({
  templateUrl: 'confirmdialog.html'
})
export class DemoConfirmDialogComponent extends ComponentBase {
  @ViewChild('dialog1') dialog1: ConfirmDialogComponent;
  private display: boolean = false;

  ngOnInit() {
    this.dialog1.onConfirm.subscribe((e) => {
      this.display = false;
      alert('confirm');
    });

    this.dialog1.onCancel.subscribe((e) => {
      this.display = false;
      alert('cancel');
    });
  }

}
