import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { IBlock } from 'src/app/interfaces/block.interface';

interface KeyValuePair {
  key: string;
  value: string;
  children?: KeyValuePair[];
}

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  key: string;
  value: string;
  level: number;
}

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.css']
})

export class BlockViewComponent implements OnInit, OnChanges {
  @Input() block: IBlock;

  private _transformer = (node: KeyValuePair, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      key: node.key,
      value: node.value,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  objToKeyValuePairs(obj: any) : KeyValuePair[]{
    let result : KeyValuePair[] = [];
    let keys = Object.keys(obj);
    for(const key of keys){
      if(Object.prototype.toString.call(obj[key]) === '[object Array]'){
        let children : KeyValuePair[] = [];
        for(const entry of obj[key]){
          children = children.concat(this.objToKeyValuePairs(entry));
        }
        result.push({key: key, value: null, children: children});
      }
      else if(typeof obj[key] === 'object'){
        result.push({key: key, value: null, children: this.objToKeyValuePairs(obj[key])});
      }
      else{
        result.push({key: key, value: obj[key]});
      }
    }
    return result;
  }

  ngOnInit(): void {
    this.dataSource.data = this.objToKeyValuePairs(this.block);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.block = changes.block.currentValue;
    this.dataSource.data = this.objToKeyValuePairs(this.block);
  }
}
