import { TreeComponent, TreeInternalComponent } from './tree.component';
import { NodeEditableDirective } from './editable/node-editable.directive';
import { NodeMenuComponent } from './menu/node-menu.component';
import { NodeDraggableDirective } from './draggable/node-draggable.directive';
import { HighLightPipe } from './highlight.pipe';

export * from './tree.component';
export * from './editable/node-editable.directive';
export * from './menu/node-menu.component';
export * from './draggable/node-draggable.directive';
export * from './tree.types';

/**
 * tree 目录下所有的指令和组件集合。
 */
export const TREE_DIRECTIVES = [
    TreeComponent,
    TreeInternalComponent,
    NodeEditableDirective,
    NodeMenuComponent,
    NodeDraggableDirective,
    HighLightPipe
];
