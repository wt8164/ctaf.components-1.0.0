import { CTAFComponent, AfterViewInit, AfterViewChecked, OnInit, ComponentBase, ViewChild } from '@ctaf/framework';
import { TreeComponent, TreeModel } from '../../src/entry';
// import { TreeModel } from '../../src/tree/tree.types';

@CTAFComponent({
  templateUrl: 'tree.html',
  // styles: [`
  //   ctaf-cp-tree[data-tree=tree7]>tree-internal:first-child{
  //     padding-left:0px;
  //   }
  // `]
})
export class DemoTreeComponent extends ComponentBase {
  @ViewChild('tree1') tree1: TreeComponent;
  @ViewChild('tree5') tree5: TreeComponent;
  @ViewChild('tree6') tree6: TreeComponent;

  ngOnInit() {
    this.tree1.nodeSelected.subscribe((e) => {
      alert(<TreeModel>(e.node).value);
    });

    this.tree6.nodeLoad.subscribe((e) => {
      let _node: TreeModel = <TreeModel>(e.node);
      setTimeout(() => {
        let arr: Array<TreeModel> = [];
        arr.push({ value: 'Java', _checked: true });
        arr.push({ value: 'C++', _checked: true });
        arr.push({ value: 'C#', _checked: false });
        this.tree6.nodeLoadedHandler(_node, arr);
        // this.tree6.nodeLoadedHandler(_node, null);
      }, 500);
    });
  }

  btnhandler(e: Event) {
    let arr: Array<TreeModel> = [];
    arr = this.tree5.getChecked();
    alert(arr);
  }


  private data: Object = {
    value: 'parent',
    children: [
      {
        value: 'child1',
        children: [
          { value: 'Java', _checked: true },
          { value: 'C++', _checked: true },
          { value: 'C#', _checked: false },
        ]
      },
      {
        value: 'child2',
        children: [
          { value: 'JavaScript' },
          { value: 'CoffeeScript' },
          { value: 'Lua' },
        ]
      }
    ]
  };

  private data2: Object = {
    value: 'parent',
    children: [
      {
        value: 'child1'
      },
      {
        value: 'child2'
      }
    ]
  };

  private data3: Object = {
    value: 'parent',
    children: [
      {
        value: 'child1',
        children: [
          { value: 'Java', _checked: true },
          { value: 'C++', _checked: true },
          { value: 'C#', _checked: false },
        ]
      },
      {
        value: 'child2',
        children: [
          { value: 'JavaScript' },
          { value: 'CoffeeScript' },
          { value: 'Lua' },
        ]
      }
    ]
  };

}
