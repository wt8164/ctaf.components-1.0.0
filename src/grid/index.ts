import { AgGridNg2Component } from './ag.grid.component';
import { AgGridColumnComponent } from './ag.grid.column';

export * from './ag.grid.component';
export * from './ag.grid.column';
export * from './ag.renderer.component'
export * from './ag.framework.factory';
export * from './ag.component.factory';
export * from './ag.component.base.factory';

export * from 'ag-grid/main';

// cell 
// component
// export * from './cell/component/ratio.component';

/**
 * grid 目录下所有的指令和组件集合。
 */
export const GRID_DIRECTIVES = [ AgGridNg2Component, AgGridColumnComponent ];

