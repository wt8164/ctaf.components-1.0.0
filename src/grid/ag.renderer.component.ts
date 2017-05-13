import { AgFrameworkComponent } from './ag.framework.component';

export interface AgRendererComponent extends AgFrameworkComponent<any> {
    agInit(params: any): void;                  // for clarity
    refresh?(params: any): void;
}
