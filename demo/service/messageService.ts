import { NgModule, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CTAFComponent, ComponentBase, Message } from '@ctaf/framework';
import { ComponentsModule } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'messageservice.html'
})
export class DemoMessageServiceMainComponent extends ComponentBase {
    constructor(cdr: ChangeDetectorRef) {
        super(cdr);

        this.messageService.On('demoComponent1', (message: Message) => {
            alert(message.subject);
        });

        this.messageService.On('demoComponent2', (message: Message) => {
            alert(message.subject);
        });
    }

    BoradCaset() {
        this.messageService.BoradCaset(new Message('main boradcaset', '...'));
    }
}

@CTAFComponent({
    selector: 'ctaf-demo-mescp1',
    template: `<div><ctaf-cp-button (click)='sendMessage()' title='测试控件1发送消息'></ctaf-cp-button></div>`
})
export class DemoMessageService1Component extends ComponentBase {
    constructor(cdr: ChangeDetectorRef) {
        super(cdr);

        this.messageService.received.subscribe((message: Message) => {
            alert('component 1 receivced');
        });
    }

    sendMessage() {
        this.messageService.Send('demoComponent1', new Message('component 1 message', '...'));
    }
}

@CTAFComponent({
    selector: 'ctaf-demo-mescp2',
    template: `<div><ctaf-cp-button (click)='sendMessage()' title='测试控件2发送消息'></ctaf-cp-button></div>`
})
export class DemoMessageService2Component extends ComponentBase {
    constructor(cdr: ChangeDetectorRef) {
        super(cdr);

        this.messageService.received.subscribe((message: Message) => {
            alert('component 2 receivced');
        });
    }

    sendMessage() {
        this.messageService.Send('demoComponent2', new Message('component 2 message', '...'));
    }
}

@NgModule({
    imports: [ CommonModule, FormsModule, ComponentsModule ],
    exports: [ DemoMessageService1Component, DemoMessageService2Component ],
    declarations: [ DemoMessageService1Component, DemoMessageService2Component ],
    bootstrap: [],
    providers: [],
})
export class DemoMessageModule {
}
