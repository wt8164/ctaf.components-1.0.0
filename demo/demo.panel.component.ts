import { CTAFComponent, ViewEncapsulation, OnInit, OnDestroy, Input, ComponentBase } from '@ctaf/framework';

@CTAFComponent({
  selector: 'ctaf-demo-panel',
  providers: [],
  templateUrl: 'demo.panel.html'
})

export class CTAFDemoPanelComponent extends ComponentBase {
  @Input() data: any;

  ngOnInit() { console.log('ngOnInit'); }
  ngOnDestroy() { console.log('ngOnDestroy'); }
}
/*
import {Component, ViewEncapsulation, OnInit, OnDestroy, Input } from 'ctaf_framework';

@Component({
  selector: 'ctaf-demo-panel',
  templateUrl: 'demo.panel.html',
  //styleUrls: ['page.scss'],
})

export class nameComponent implements OnInit, OnDestroy  {
    @Input() data:Array<any>;
    constructor() { }

    ngOnInit() { console.log('ngOnInit'); }
    ngOnDestroy() { console.log('ngOnDestroy'); }
}
*/
