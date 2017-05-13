export class FoldingType {
  /* tslint:disable */public static Expanded: FoldingType = new FoldingType('node-expanded fa fa-minus');
  public static Collapsed: FoldingType = new FoldingType('node-collapsed fa fa-plus');
  public static Leaf: FoldingType = new FoldingType('node-leaf fa fa-angle-right');

  constructor(private _cssClass: string) {
  }

  public get cssClass(): string {
    return this._cssClass;
  }
}

export interface TreeModel {
  value: string | RenamableNode;
  children?: Array<TreeModel>;
  _status?: TreeStatus;
  _foldingType?: FoldingType;
  _indexInParent?: number;
  _checked?: boolean;
  // _disabled?: boolean;
}

export enum TreeStatus {
  New,
  Modified,
  EditInProgress
}

export interface RenamableNode {
  setName(name: string): void;
  toString(): string;
}

export interface NodeEvent {
  node: TreeModel;
}

export interface NodeSelectedEvent extends NodeEvent {
}

export interface NodeLoadEvent extends NodeEvent {
}

export interface NodeDestructiveEvent extends NodeEvent {
  parent: TreeModel;
}

export interface NodeMovedEvent extends NodeDestructiveEvent {
}

export interface NodeRemovedEvent extends NodeDestructiveEvent {
}

export interface NodeCreatedEvent extends NodeDestructiveEvent {
}

export interface NodeRenamedEvent extends NodeDestructiveEvent {
  newValue: string | RenamableNode;
  oldValue: string | RenamableNode;
}


