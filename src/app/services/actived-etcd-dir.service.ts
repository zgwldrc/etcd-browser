import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { Node } from '../node'

@Injectable()
export class ActivedEtcdDirService {
  // Observable string sources
  private keyBroadcastSource = new Subject<Node>();

  // Observable string streams
  public keyBus$ = this.keyBroadcastSource.asObservable();

  // Service message commands
  public broadcastkey(node: Node) {
    this.keyBroadcastSource.next(node);
  }
}
