import { Pipe, PipeTransform } from '@angular/core';
import {Node} from './node';
@Pipe({
  name: 'valuekey'
})
export class ValuekeyPipe implements PipeTransform {

  transform(nodes: Node[]): Node[] {
    return nodes.filter(node => node.hasOwnProperty('value'));
  }

}
