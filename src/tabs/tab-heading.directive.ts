
import {Directive, TemplateRef} from '@ctaf/framework';
import {TabComponent} from './tab.component';

@Directive({ selector: '[tabHeading]' }) // tslint:disable-line
export class TabHeadingDirective {
  public templateRef: TemplateRef<any>;
  public constructor(templateRef: TemplateRef<any>, tab: TabComponent) {
    tab.headingRef = templateRef;
  }
}
