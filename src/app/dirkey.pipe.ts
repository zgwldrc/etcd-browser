import { Pipe, PipeTransform } from '@angular/core';
import {Node} from './node';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
@Pipe({
  name: 'dirkey'
})
export class DirkeyPipe implements PipeTransform {

  transform(nodes: Node[]): Node[] {
    return nodes.filter(node => node.dir)
  }
}