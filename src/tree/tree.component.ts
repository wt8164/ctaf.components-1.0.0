import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, ViewChild, ViewChildren, QueryList } from '@ctaf/framework';
import { Component, EventEmitter, ElementRef, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
// import {CORE_DIRECTIVES} from '@angular/common'; // 可注释
import { TreeStatus, TreeModel, FoldingType, NodeEvent, RenamableNode, NodeSelectedEvent } from './tree.types';
import { NodeEditableDirective } from './editable/node-editable.directive'; // 可注释
import { NodeMenuComponent } from './menu/node-menu.component'; // 可注释
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeMenuService } from './menu/node-menu.service';
import { NodeDraggableDirective } from './draggable/node-draggable.directive'; // 可注释
import { NodeDraggableEventAction, NodeDraggableEvent } from './draggable/draggable.types';
import { NodeMenuEvent, NodeMenuAction, NodeMenuItemSelectedEvent, NodeMenuItemAction } from './menu/menu.types';
import { NodeEditableEvent, NodeEditableEventAction } from './editable/editable.type';
import { TreeService } from './tree.service';
import { isLeftButtonClicked, isRightButtonClicked } from './common/utils/event.utils';
// import * as _ from 'lodash';
import * as _ from 'underscore';
import { applyNewValueToRenamable, isRenamable, isValueEmpty } from './common/utils/type.utils';

/**
 * Tree
 *  基础信息

* 代码文件路径： src/forms/tree.ts
* 引用模块：ctafframework
* 父类：CTAFCompentBase
* 类型名称：TreeComponent
* 选择器名称：ctaf-cp-tree

*/

@CTAFComponent({
  selector: 'ctaf-cp-tree',
  providers: [NodeMenuService, NodeDraggableService, TreeService],
  template: `<tree-internal #treeChild [tree]="tree" [rootNodeHide]="rootNodeHide" [disabled]="disabled" [keyword]="keyword" [checkboxShow]="checkboxShow" [showTooltip]="showTooltip"></tree-internal>`,
  // ,directives: [TreeInternalComponent]
  // changeDetection: ChangeDetectionStrategy.Default
})
export class TreeComponent extends ComponentBase {
  @ViewChild('treeChild') treeChild: TreeInternalComponent;
  // private _value: Object;

  /**
   * 控件类型名称，需要每个实现的子类进行自定义。
   */
  protected get typeName(): string {
    return 'TreeComponent';
  }

  // @Input()
  // set value(o: Object) {
  //   this.setProperty('_value', o);
  // }
  // get value(): Object {
  //   return this._value;
  // }

  protected classesMap(): any {
    return _.extend(super.classesMap(), {
      'treeCtaf': true // ,
      // ['tree-block']: this._block,
      // ['tree-direction']: this._direction
    });
  }


  private _tree: TreeModel;

  @Input()
  private keyword: string;
  @Input()
  private disabled: boolean;
  @Input()
  private checkboxShow: boolean = true;
  @Input()
  private showTooltip: boolean;
  @Input()
  private rootNodeHide: boolean;
  @Input()
  public canLoading: boolean;

  public aaaaa: boolean = true;

  @Output()
  private nodeCreated: EventEmitter<any> = new EventEmitter();

  @Output()
  private nodeRemoved: EventEmitter<any> = new EventEmitter();

  @Output()
  private nodeRenamed: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  private nodeMoved: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeLoad: EventEmitter<any> = new EventEmitter();

  constructor( @Inject(TreeService) private treeService: TreeService, protected cdr: ChangeDetectorRef) {
    super(cdr);
    console.warn('constructor');
  }

  // private checkedArr: Array<any> = [];
  public getChecked(): Array<TreeModel> {
    let checkedArr: Array<any> = this.treeCheckHandler(this.tree);
    return checkedArr;
  }

  private treeCheckHandler(t: TreeModel): Array<any> {
    let checkedArr: Array<any> = [];
    let arrTree: Array<TreeModel> = t.children;
    arrTree.forEach((o: TreeModel) => {
      if (o._checked) {
        checkedArr.push(o);
      }
      if (o.children && o.children.length > 0) {
        this.treeCheckHandler(o);
      }
    });
    return checkedArr;
  }


  public ngOnInit(): void {
    console.warn('ngOnInit');
    this.treeService.nodeRemoved$.subscribe((e: NodeEvent) => {
      this.nodeRemoved.emit(e);
    });

    this.treeService.nodeRenamed$.subscribe((e: NodeEvent) => {
      this.nodeRenamed.emit(e);
    });

    this.treeService.nodeCreated$.subscribe((e: NodeEvent) => {
      this.nodeCreated.emit(e);
    });

    this.treeService.nodeSelected$.subscribe((e: NodeEvent) => {
      this.nodeSelected.emit(e);
    });

    this.treeService.nodeLoad$.subscribe((e: NodeEvent) => {
      this.nodeLoad.emit(e);
    });

    this.treeService.nodeMoved$.subscribe((e: NodeEvent) => {
      this.nodeMoved.emit(e);
    });
    this.treeChild.checkboxClicked.subscribe((node) => {
      console.warn(node);
    });
  }

  public nodeLoadedHandler(t: TreeModel, arr: Array<TreeModel>) {
    this.treeChild.nodeLoadedHandler(t, arr);
  }

  @Input()
  private set tree(t: TreeModel) {
    // if (this.disabled) {
    //   t._disabled = true;
    //   t = this.setupTreeDisabled(t);
    // }
    this.setProperty('_tree', t);
    console.warn('set tree');
  }

  private get tree(): TreeModel {
    console.warn('get tree');
    return this._tree;
  }

  // private setupTreeDisabled(t: TreeModel): TreeModel {
  //   let arrTree: Array<TreeModel> = t.children;
  //   arrTree.forEach((o: TreeModel) => {
  //     o._disabled = t._disabled;
  //     if (o.children && o.children.length > 0) {
  //       this.setupTreeDisabled(o);
  //     }
  //   });
  //   return t;
  // }

  // private checkboxClickedHandler(node) {
  //   console.log(node);
  // }
}

@CTAFComponent({
  selector: 'tree-internal',
  // styleUrls: ['./tree.component.css'],
  templateUrl: './tree.component.html',
  // ,directives: [NodeEditableDirective, TreeInternalComponent, NodeMenuComponent, NodeDraggableDirective, CORE_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TreeInternalComponent extends ComponentBase {
  @ViewChild('treeContainer') treeContainer: ElementRef;

  @ViewChildren(TreeInternalComponent) treeChild: QueryList<TreeInternalComponent>;

  @Input()
  private tree: TreeModel;

  @Input()
  private parentTree: TreeModel;

  @Input()
  private rootNodeHide: boolean = false;

  @Input()
  private indexInParent: number;

  @Input()
  private keyword: string;
  @Input()
  private disabled: boolean;
  @Input()
  private checkboxShow: boolean;
  @Input()
  private showTooltip: boolean;

  @Output()
  private nodeRemoved: EventEmitter<NodeEvent> = new EventEmitter<NodeEvent>();

  @Output()
  public checkboxClicked: EventEmitter<NodeEvent> = new EventEmitter<NodeEvent>();

  private _isLeaf: boolean;
  private _isSelected: boolean = false;
  private _isMenuVisible: boolean = false;

  private get isLeaf(): boolean {
    return this._isLeaf;
  }
  private set isLeaf(v: boolean) {
    this.setProperty('_isLeaf', v);
  }

  private get isSelected(): boolean {
    return this._isSelected;
  }
  private set isSelected(v: boolean) {
    this.setProperty('_isSelected', v);
  }

  private get isMenuVisible(): boolean {
    return this._isMenuVisible;
  }

  private set isMenuVisible(v: boolean) {
    this.setProperty('_isMenuVisible', v);
  }

  private aaaa: boolean = false;

  public constructor(
    protected cdr: ChangeDetectorRef,
    private treecomponent: TreeComponent,
    @Inject(NodeMenuService) private nodeMenuService: NodeMenuService,
    @Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService,
    @Inject(TreeService) private treeService: TreeService,
    @Inject(ElementRef) private element: ElementRef) {
    super(cdr);
    this.aaaa = treecomponent.aaaaa;
  }

  public ngOnInit(): void {
    this.indexInParent = 0;

    this.isLeaf = !Array.isArray(this.tree.children);
    this.tree._indexInParent = this.indexInParent;

    this.setUpNodeSelectedEventHandler();
    this.setUpMenuEventHandler();
    this.setUpDraggableEventHandler();

    this.treeChild.forEach((a: TreeInternalComponent) => {
      a.checkboxClicked.subscribe((node) => {
        this.checkboxClicked.emit(node);
      });
    });
  }

  private setUpNodeSelectedEventHandler() {
    this.treeService.nodeSelected$
      .filter((e: NodeSelectedEvent) => {
        return this.tree !== e.node;
      })
      .subscribe(
      _ => {
        this.isSelected = false;
      }
      );
  }

  private setUpMenuEventHandler() {
    this.nodeMenuService.nodeMenuEvents$
      .filter((e: NodeMenuEvent) => this.element.nativeElement !== e.sender)
      .filter((e: NodeMenuEvent) => e.action === NodeMenuAction.Close)
      .subscribe(_ => this.isMenuVisible = false);
  }

  // DRAG-N-DROP -------------------------------------------------------------------------------------------------------

  private setUpDraggableEventHandler() {
    this.nodeDraggableService.draggableNodeEvents$
      .filter((e: NodeDraggableEvent) => e.action === NodeDraggableEventAction.Remove)
      .filter((e: NodeDraggableEvent) => e.captured.element === this.element)
      .subscribe((e: NodeDraggableEvent) => {
        this.onChildRemoved({ node: e.captured.tree }, this.parentTree);
      });

    this.nodeDraggableService.draggableNodeEvents$
      .filter((e: NodeDraggableEvent) => e.action !== NodeDraggableEventAction.Remove)
      .filter((e: NodeDraggableEvent) => e.target === this.element)
      .filter((e: NodeDraggableEvent) => !this.hasChild(e.captured.tree))
      .subscribe((e: NodeDraggableEvent) => {
        if (this.isSiblingOf(e.captured.tree)) {
          return this.swapWithSibling(e.captured.tree);
        }

        if (this.isFolder()) {
          return this.moveNodeToThisTreeAndRemoveFromPreviousOne(e);
        } else {
          return this.moveNodeToParentTreeAndRemoveFromPreviousOne(e);
        }
      });
  }

  private moveNodeToThisTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent): void {
    this.tree.children.push(e.captured.tree);
    // this.nodeDraggableService.draggableNodeEvents$.next(_.merge(e, {action: NodeDraggableEventAction.Remove}));
    this.nodeDraggableService.draggableNodeEvents$.next(_.extend(e, { action: NodeDraggableEventAction.Remove }));

    this.treeService.nodeMoved$.next({
      node: e.captured.tree,
      parent: this.tree
    });
  }

  private moveNodeToParentTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent): void {
    this.parentTree.children.splice(this.indexInParent, 0, e.captured.tree);
    // this.nodeDraggableService.draggableNodeEvents$.next(_.merge(e, {action: NodeDraggableEventAction.Remove}));
    this.nodeDraggableService.draggableNodeEvents$.next(_.extend(e, { action: NodeDraggableEventAction.Remove }));

    this.treeService.nodeMoved$.next({
      node: e.captured.tree,
      parent: this.parentTree
    });
  }

  private isEditInProgress() {
    return this.tree._status === TreeStatus.EditInProgress
      || this.tree._status === TreeStatus.New;
  }

  private isFolder() {
    return !this.isLeaf;
  }

  private hasChild(child: TreeModel): boolean {
    return _.includes(this.tree.children, child);
  }

  private isSiblingOf(child: TreeModel) {
    return this.parentTree && _.includes(this.parentTree.children, child);
  }

  private swapWithSibling(sibling: TreeModel): void {
    const siblingIndex = this.parentTree.children.indexOf(sibling);
    const thisTreeIndex = this.parentTree.children.indexOf(this.tree);

    this.parentTree.children[siblingIndex] = this.tree;
    this.parentTree.children[thisTreeIndex] = sibling;

    this.tree._indexInParent = siblingIndex;
    sibling._indexInParent = thisTreeIndex;

    this.treeService.nodeMoved$.next({
      node: this.tree,
      parent: this.parentTree
    });
  }

  // FOLDING -----------------------------------------------------------------------------------------------------------

  private isNodeExpanded(): boolean {
    return this.tree._foldingType === FoldingType.Expanded;
  }

  private switchFoldingType(e: any, tree: TreeModel): void {
    this.handleFoldingType(e.target.parentNode.parentNode, tree);
    this.treeService.nodeLoad$.next({ node: this.tree });
  }

  private getFoldingTypeCssClass(node: TreeModel): string {
    if (!node._foldingType) {
      if (node.children) {
        node._foldingType = FoldingType.Expanded;
      } else {
        node._foldingType = FoldingType.Leaf;
        if (this.treecomponent.canLoading) {
          node._foldingType = FoldingType.Collapsed;
        }
      }
    }

    return node._foldingType.cssClass;
  }

  private getNextFoldingType(node: TreeModel): FoldingType {
    if (node._foldingType === FoldingType.Expanded) {
      return FoldingType.Collapsed;
    }

    return FoldingType.Expanded;
  }

  private handleFoldingType(parent: TreeModel, node: TreeModel) {
    if (node._foldingType === FoldingType.Leaf) {
      return;
    }

    node._foldingType = this.getNextFoldingType(node);
  }

  // MENU --------------------------------------------------------------------------------------------------------------

  private onMenuItemSelected(e: NodeMenuItemSelectedEvent) {
    switch (e.nodeMenuItemAction) {
      case NodeMenuItemAction.NewTag:
        this.onNewSelected(e);
        break;
      case NodeMenuItemAction.NewFolder:
        this.onNewSelected(e);
        break;
      case NodeMenuItemAction.Rename:
        this.onRenameSelected();
        break;
      case NodeMenuItemAction.Remove:
        this.onRemoveSelected();
        break;
      default:
        throw new Error(`Chosen menu item doesn't exist`);
    }
  }

  private onRenameSelected() {
    this.tree._status = TreeStatus.EditInProgress;
    this.isMenuVisible = false;
  }

  private onRemoveSelected() {
    this.treeService.nodeRemoved$.next({
      node: this.tree,
      parent: this.parentTree
    });

    this.nodeRemoved.emit({ node: this.tree });
  }

  private onNewSelected(e: NodeMenuItemSelectedEvent) {
    if (!this.tree.children || !this.tree.children.push) {
      this.tree.children = [];
    }
    const newNode: TreeModel = { value: '', _status: TreeStatus.New };

    if (e.nodeMenuItemAction === NodeMenuItemAction.NewFolder) {
      newNode.children = [];
    }

    this.isLeaf ? this.parentTree.children.push(newNode) : this.tree.children.push(newNode);
    this.isMenuVisible = false;
  }

  private onChildRemoved(e: NodeEvent, parent: TreeModel = this.tree) {
    const childIndex = _.findIndex(parent.children, child => child === e.node);
    if (childIndex >= 0) {
      parent.children.splice(childIndex, 1);
    }
  }

  private showMenu(e: MouseEvent): void {
    if (isRightButtonClicked(e) && !this.disabled) {
      this.isMenuVisible = !this.isMenuVisible;
      this.nodeMenuService.nodeMenuEvents$.next({
        sender: this.element.nativeElement,
        action: NodeMenuAction.Close
      });
    }
    e.preventDefault();
  }

  private applyNewValue(e: NodeEditableEvent, node: TreeModel): void {
    if (e.action === NodeEditableEventAction.Cancel) {
      if (isValueEmpty(e.value)) {
        return this.nodeRemoved.emit({ node: this.tree });
      }

      node._status = TreeStatus.Modified;
      return;
    }

    if (isValueEmpty(e.value)) {
      return;
    }

    const nodeOldValue = node.value;

    if (isRenamable(node.value)) {
      node.value = applyNewValueToRenamable(node.value as RenamableNode, e.value);
    } else {
      node.value = e.value;
    }

    if (node._status === TreeStatus.New) {
      this.treeService.nodeCreated$.next({ node, parent: this.parentTree });
    }

    if (node._status === TreeStatus.EditInProgress) {
      this.treeService.nodeRenamed$.next({
        node,
        parent: this.parentTree,
        oldValue: nodeOldValue,
        newValue: node.value
      });
    }

    node._status = TreeStatus.Modified;
  }

  private onNodeSelected(e: MouseEvent) {
    if (isLeftButtonClicked(e)) {
      this.isSelected = true;
      this.treeService.nodeSelected$.next({ node: this.tree });
    }
  }

  // 点击checkbox
  private checkHandler(e: MouseEvent): void {
    this.checkboxClicked.emit({ node: this.tree });
    this.tree._checked = !this.tree._checked;
    if (this.tree.children && this.tree.children.length > 0) {
      this.setupTreeCheck(this.tree);
    }

    // this.tree = _.clone(this.tree);
    // setTimeout(() => {
    //   this.forceChange();

    // }, 0);
  }

  private setupTreeCheck(t: TreeModel): void {
    let arrTree: Array<TreeModel> = t.children;
    arrTree.forEach((o: TreeModel) => {
      o._checked = t._checked;
      // this.cdr.detach();
      // this.cdr.detectChanges();

      if (o.children && o.children.length > 0) {
        this.setupTreeCheck(o);
      }
    });
  }

  // 点击加载
  public nodeLoadedHandler(t: TreeModel, arr: Array<TreeModel>): void {
    t.children = [];
    if (arr && arr.length > 0) {
      t.children = arr;
      this.cdr.detectChanges();
    } else {
      t._foldingType = FoldingType.Leaf;
    }
  }

}


